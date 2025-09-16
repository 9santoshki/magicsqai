import React from 'react';

const DifficultyLevel = ({ blanksLeft }) => {
  const getDifficultyInfo = (blanks) => {
    if (blanks <= 3) {
      return { level: 'Easy', color: '#28a745', emoji: '😊' };
    } else if (blanks <= 6) {
      return { level: 'Medium', color: '#fd7e14', emoji: '🤔' };
    } else {
      return { level: 'Hard', color: '#dc3545', emoji: '😤' };
    }
  };

  const { level, color, emoji } = getDifficultyInfo(blanksLeft);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      background: 'rgba(255,255,255,0.15)',
      padding: '6px 10px',
      borderRadius: '6px',
      fontSize: 'clamp(0.8rem, 3vw, 0.9rem)',
      fontWeight: '500',
      color: 'white',
      minWidth: 'fit-content',
    }}>
      <span style={{ fontSize: '0.8rem' }}>{emoji}</span>
      <span>{level}</span>
    </div>
  );
};

export default DifficultyLevel;
