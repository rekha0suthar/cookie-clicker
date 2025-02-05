import { Router } from 'express';
import User from '../models/User.js';
import { updateGameStats } from '../jobs/gameLogic.js';

const router = Router();

router.post('/click', async (req, res) => {
  const { userId } = req.body;

  try {
    let user = await User.findOne({
      userId,
    });

    if (!user) {
      user = new User({ userId, totalClicks: 0, totalScore: 0, prizesWon: 0 });
    }

    const { user: updatedUser, wonPrize } = updateGameStats(user);

    await updatedUser.save();

    res.status(201).json({
      totalClicks: updatedUser.totalClicks,
      totalScore: updatedUser.totalScore,
      prizesWon: updatedUser.prizesWon,
      wonPrize,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get('/stats/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({
      totalClicks: user.totalClicks,
      totalScore: user.totalScore,
      prizesWon: user.prizesWon,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const users = await User.find().sort({ totalScore: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default router;
