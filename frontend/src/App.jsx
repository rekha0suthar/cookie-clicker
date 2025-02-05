import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ClickButton from './components/ClickButton';
import UserStats from './components/UserStats';
import FloatingClick from './components/FloatingClick'; // Import floating effect
import Confetti from 'react-confetti';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import UserList from './components/UserList';
import { ClickContext } from './context/ClickContext';
import { generateRandomUserId } from './utils';
import './App.css';

const App = () => {
  const {
    userId,
    setUserId,
    setTotalClicks,
    totalScore,
    setTotalScore,
    setPrizesWon,
    showConfetti,
    setShowConfetti,
    floatingClicks,
    setFloatingClicks,
  } = useContext(ClickContext);

  useEffect(() => {
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      storedUserId = generateRandomUserId();
      localStorage.setItem('userId', storedUserId);
    }
    setUserId(storedUserId);

    axios
      .get(`https://cookie-clicker-ashen.vercel.app/api/stats/${storedUserId}`)
      .then((res) => {
        setTotalClicks(res.data.totalClicks);
        setTotalScore(res.data.totalScore);
        setPrizesWon(res.data.prizesWon);
      })
      .catch(() => console.log('User data not found, creating new user...'));
  }, [setTotalClicks, setTotalScore, setPrizesWon, setUserId]);

  const handleClick = async (event) => {
    // ✅ Optimistic UI update
    setTotalClicks((prev) => prev + 1);
    setTotalScore((prev) => prev + 1);

    const clickNumber = totalScore % 10 === 9 ? 10 : 1; // Ensure 10 points logic before UI update
    setTotalScore((prev) => prev + (clickNumber === 10 ? 10 : 0));

    // ✅ Floating click effect (instantly update)
    const x = event.clientX;
    const y = event.clientY;
    const newFloatingClick = { id: Date.now(), number: clickNumber, x, y };
    setFloatingClicks((prev) => [...prev, newFloatingClick]);

    // Remove floating number after animation
    setTimeout(() => {
      setFloatingClicks((prev) =>
        prev.filter((c) => c.id !== newFloatingClick.id)
      );
    }, 1000);

    // ✅ Send API request in the background
    try {
      const res = await axios.post(
        'https://cookie-clicker-ashen.vercel.app/api/click',
        { userId }
      );

      setTotalClicks(res.data.totalClicks);
      setTotalScore(res.data.totalScore);
      setPrizesWon(res.data.prizesWon);

      if (res.data.wonPrize) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        toast.success('🎉 You won a prize!');
      } else if (clickNumber === 10) {
        toast.info('🔥 Bonus 10 points!');
      }
    } catch (error) {
      console.error('Failed to sync with server:', error);
      // Rollback UI state if request fails
      setTotalClicks((prev) => prev - 1);
      setTotalScore((prev) => prev - (clickNumber === 10 ? 10 : 1));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="container"
    >
      {/* This is used to show some animation on win */}
      {showConfetti && <Confetti />}
      <h1>🔥 Cookie Clicker Clone 🔥</h1>
      {/* Component for User Stata */}
      <UserStats />
      {/* Click Button  */}
      <ClickButton handleClick={handleClick} />

      {/* Leaderboard */}
      <UserList />

      {/* Floating Clicks */}
      {floatingClicks.map((click) => (
        <FloatingClick
          key={click.id}
          number={click.number}
          x={click.x}
          y={click.y}
        />
      ))}
      {/* Toast to show popups */}
      <ToastContainer autoClose={1000} closeOnClick />
    </motion.div>
  );
};

export default App;
