import React from 'react';

const DragInstructions = ({ isMobileView }) => {
  if (!isMobileView) {
    return null;
  }

  return (
    <div style={{
      padding: '8px',
      background: '#e7f3ff',
      borderRadius: '6px',
      border: '1px solid #b8daff',
      marginBottom: '8px',
      textAlign: 'center',
      fontSize: '0.8rem',
      color: '#004085',
    }}>
      <span>💡 Drag numbers from below and place them on the grid</span>
    </div>
  );
};

export default DragInstructions;