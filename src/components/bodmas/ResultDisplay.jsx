
import React from 'react';

const ResultDisplay = ({ result, resultColor }) => {
  if (!result) return null;
  
  const isMobile = window.innerWidth < 768;
  
  // More compact sizing for mobile
  const padding = isMobile ? '6px' : '10px';
  const fontSize = isMobile ? '0.7rem' : '0.85rem';
  const borderRadius = isMobile ? '5px' : '6px';

  return (
    <div style={{
      textAlign: 'center',
      padding: padding,
      background: resultColor === '#28a745' ? '#d4edda' : '#f8d7da',
      color: resultColor,
      borderRadius: borderRadius,
      fontSize: fontSize,
      fontWeight: '600',
      border: `1px solid ${resultColor === '#28a745' ? '#c3e6cb' : '#f5c6cb'}`,
    }}>
      {result}
    </div>
  );
};

export default ResultDisplay;
