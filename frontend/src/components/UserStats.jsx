import React, { useContext } from 'react';
import { ClickContext } from '../context/ClickContext';

const UserStats = () => {
  const { totalClicks, totalScore, prizesWon } = useContext(ClickContext);
  return (
    <div>
      <h2>Clicks: {totalClicks}</h2>
      <h2>Score: {totalScore}</h2>
      <h3>Prizes Won: {prizesWon}</h3>
    </div>
  );
};

export default UserStats;
