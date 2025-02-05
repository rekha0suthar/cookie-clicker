import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ClickButton from './components/ClickButton';
import CounterDisplay from './components/CounterDisplay';
import PrizeDisplay from './components/PrizeDisplay';
import FloatingClick from './components/FloatingClick'; // Import floating effect
import Confetti from 'react-confetti';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import UserList from './components/UserList';
import { ClickContext } from './context/ClickContext';
import { generateRandomUserId } from './utils';

const App = () => {
  const {
    userId,
    setUserId,
    setTotalClicks,
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
  }, []);

  const handleClick = async (event) => {
    const res = await axios.post(
      'https://cookie-clicker-ashen.vercel.app/api/click',
      { userId }
    );
    setTotalClicks(res.data.totalClicks);
    setTotalScore(res.data.totalScore);
    setPrizesWon(res.data.prizesWon);

    const clickNumber = res.data.totalScore % 10 === 0 ? 10 : 1;

    if (res.data.wonPrize) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      toast.success('🎉 You won a prize!');
    } else if (clickNumber === 10) {
      toast.info('🔥 Bonus 10 points!');
    }

    // Capture click position for floating numbers
    const x = event.clientX;
    const y = event.clientY;

    const newFloatingClick = { id: Date.now(), number: clickNumber, x, y };
    setFloatingClicks((prev) => [...prev, newFloatingClick]);

    // Remove after animation
    setTimeout(() => {
      setFloatingClicks((prev) =>
        prev.filter((c) => c.id !== newFloatingClick.id)
      );
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        textAlign: 'center',
        padding: '20px',
        background: 'linear-gradient(to right, #222, #444)',
        color: 'white',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {showConfetti && <Confetti />}
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>
        🔥 Cookie Clicker Clone 🔥
      </h1>

      <CounterDisplay />
      <PrizeDisplay />
      <ClickButton handleClick={handleClick} />

      {/* Floating Clicks */}
      {floatingClicks.map((click) => (
        <FloatingClick
          key={click.id}
          number={click.number}
          x={click.x}
          y={click.y}
        />
      ))}
      <UserList />

      <ToastContainer autoClose={2000} closeOnClick />
    </motion.div>
  );
};

export default App;
