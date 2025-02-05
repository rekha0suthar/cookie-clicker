import React, { useEffect, useContext, lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import ClickButton from './components/ClickButton';
import UserStats from './components/UserStats';
import FloatingClick from './components/FloatingClick'; // Import floating effect
import Confetti from 'react-confetti';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { ClickContext } from './context/ClickContext';
import './App.css';

const UserList = lazy(() => import('./components/UserList'));
const App = () => {
  const { showConfetti, floatingClicks, fetchUserStats, handleClick } =
    useContext(ClickContext);

  useEffect(() => {
    fetchUserStats();
  }, []);

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
      <h1>🔥 Clicker Game 🔥</h1>
      {/* Component for User Stata */}
      <UserStats />
      {/* Click Button  */}
      <ClickButton handleClick={handleClick} />
      <br />
      {/* Leaderboard */}
      <Suspense fallback="Loading Leaderboard">
        <UserList />
      </Suspense>

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
