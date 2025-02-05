const updateGameStats = (user) => {
  user.totalClicks += 1;
  user.totalScore += 1;

  // Dynamic probability for extra 10 points (scales with total clicks)
  let extraPointsChance = 0.4 + Math.min(user.totalClicks / 1000, 0.1); // Starts at 40%, increases by 10% max
  if (Math.random() < extraPointsChance) {
    user.totalScore += 10;
  }

  // Streak-based prize winning system
  let basePrizeChance = 0.25; // Default 25% chance
  let streakBonus = Math.min(user.totalClicks / 50, 0.2); // Up to +20% bonus for frequent clicks
  let adjustedPrizeChance = basePrizeChance + streakBonus;

  let wonPrize = false;
  if (Math.random() < adjustedPrizeChance) {
    user.prizesWon += 1;
    wonPrize = true;
  }

  return { user, wonPrize };
};

export { updateGameStats };
