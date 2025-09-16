import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ difficulty, maxStars = 5 }) => {
  const filledStars = Math.max(1, Math.min(maxStars, difficulty));
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '2px',
    }}>
      {[...Array(maxStars)].map((_, index) => (
        <FaStar
          key={index}
          style={{
            fontSize: '1rem',
            color: index < filledStars ? '#ffd700' : 'transparent',
            stroke: '#ffd700',
            strokeWidth: index < filledStars ? '0' : '20px',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;
