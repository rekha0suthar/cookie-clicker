import React, { useContext } from 'react';
import { ClickContext } from '../context/ClickContext';

const CounterDisplay = () => {
  const { totalClicks, totalScore } = useContext(ClickContext);
  return (
    <div>
      <h2>Clicks: {totalClicks}</h2>
      <h2>Score: {totalScore}</h2>
    </div>
  );
};

export default CounterDisplay;
