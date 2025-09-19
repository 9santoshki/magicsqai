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
            color: index < filledStars ? '#ffd700' : '#e0e0e0', // Light gray for empty stars
            stroke: index < filledStars ? 'none' : '#cccccc', // Border for empty stars
            strokeWidth: index < filledStars ? '0' : '1px',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;
