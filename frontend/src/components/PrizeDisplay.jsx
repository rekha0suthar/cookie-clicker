import React, { useContext } from 'react';
import { ClickContext } from '../context/ClickContext';

const PrizeDisplay = () => {
  const { prizesWon } = useContext(ClickContext);
  return (
    <div>
      <h3>Prizes Won: {prizesWon}</h3>
    </div>
  );
};

export default PrizeDisplay;
