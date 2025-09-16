import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const StarRating = ({ difficulty, maxStars = 5 }) => {
  // Get difficulty level from puzzle config (1-5)
  const clampedDifficulty = Math.max(1, Math.min(5, difficulty));
  
  // Golden rating colors - different shades of gold for visual appeal
  const getStarColor = (starIndex, filledStars) => {
    if (starIndex < filledStars) {
      // Use different shades of gold for filled stars
      return '#ffd700'; // Pure gold
    }
    return '#e9ecef'; // Empty star color (light gray)
  };

  const getDifficultyLabel = (stars) => {
    const labels = ['', 'Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];
    return labels[stars] || 'Unknown';
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '2px',
    }}>
      {[...Array(maxStars)].map((_, index) => {
        const isFilled = index < clampedDifficulty;
        const StarIcon = isFilled ? FaStar : FaRegStar;
        const starColor = getStarColor(index, clampedDifficulty);
        
        return (
          <StarIcon
            key={index}
            style={{
              fontSize: '0.8rem',
              color: starColor,
              filter: isFilled ? `drop-shadow(0 1px 2px ${starColor}40)` : 'none',
              transition: 'all 0.2s ease',
            }}
          />
        );
      })}
      <span style={{
        fontSize: '0.7rem',
        marginLeft: '4px',
        color: '#6c757d',
        fontWeight: '500',
      }}>
        ({clampedDifficulty})
      </span>
    </div>
  );
};

export default StarRating;
