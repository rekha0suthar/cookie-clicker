import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { generateRandomUserId } from '../utils';

const BASE_API_URI = 'https://cookie-clicker-ashen.vercel.app/api';

const ClickContext = createContext({});

const ClickContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [prizesWon, setPrizesWon] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [floatingClicks, setFloatingClicks] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchUserStats = async () => {
    try {
      let storedUserId = localStorage.getItem('userId');
      if (!storedUserId) {
        storedUserId = generateRandomUserId();
        localStorage.setItem('userId', storedUserId);
      }
      setUserId(storedUserId);

      const res = await axios.get(`${BASE_API_URI}/stats/${storedUserId}`);
      setTotalClicks(res.data.totalClicks);
      setTotalScore(res.data.totalScore);
      setPrizesWon(res.data.prizesWon);
    } catch (err) {
      console.log('User data not found, creating new user...');
    }
  };

  const fetchUsersStats = async () => {
    try {
      const res = await axios.get(`${BASE_API_URI}/stats`);
      setUsers(res.data);
    } catch (err) {
      console.log('Error fetching user stats');
    }
  };

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
      const res = await axios.post(`${BASE_API_URI}/click`, { userId });

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
    <ClickContext.Provider
      value={{
        userId,
        setUserId,
        totalClicks,
        setTotalClicks,
        totalScore,
        setTotalScore,
        prizesWon,
        setPrizesWon,
        showConfetti,
        setShowConfetti,
        floatingClicks,
        setFloatingClicks,
        users,
        setUsers,
        fetchUserStats,
        fetchUsersStats,
        handleClick,
      }}
    >
      {children}
    </ClickContext.Provider>
  );
};

export { ClickContext, ClickContextProvider };
