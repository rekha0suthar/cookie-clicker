import React from 'react';
import { motion } from 'framer-motion';

const ClickButton = ({ handleClick }) => {
  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.7)',
      }}
      style={{
        padding: '15px 30px',
        fontSize: '20px',
        borderRadius: '10px',
        border: 'none',
        background: 'linear-gradient(90deg, #ff4d4d, #ff9966)',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
        outline: 'none',
        transition: '0.3s ease-in-out',
      }}
    >
      Click Me! 🎯
    </motion.button>
  );
};

export default ClickButton;
