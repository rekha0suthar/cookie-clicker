import React, { createContext, useState } from 'react';

const ClickContext = createContext({});

const ClickContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [prizesWon, setPrizesWon] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [floatingClicks, setFloatingClicks] = useState([]);
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
      }}
    >
      {children}
    </ClickContext.Provider>
  );
};

export { ClickContext, ClickContextProvider };
