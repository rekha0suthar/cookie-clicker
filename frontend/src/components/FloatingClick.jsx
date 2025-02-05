import React from 'react';
import { motion } from 'framer-motion';

const FloatingClick = ({ number, x, y }) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 0, y: -50, scale: 1.5 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#ffcc00',
        pointerEvents: 'none',
      }}
    >
      +{number}
    </motion.div>
  );
};

export default FloatingClick;
