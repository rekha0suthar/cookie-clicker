import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  totalClicks: {
    type: Number,
    default: 0,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  prizesWon: {
    type: Number,
    default: 0,
  },
});

const User = model('User', userSchema);

export default User; // Export the User model
