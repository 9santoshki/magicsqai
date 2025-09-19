import React from 'react';
import { MdInfo } from 'react-icons/md';

const DailyChallengeInfo = () => {
  const isMobile = window.innerWidth < 768;
  
  // More compact sizing for mobile
  const padding = isMobile ? '0.5rem 0.75rem' : '0.75rem 1rem';
  const iconSize = isMobile ? '0.9rem' : '1rem';
  const titleSize = isMobile ? '0.8rem' : '0.875rem';
  const descriptionSize = isMobile ? '0.65rem' : '0.75rem';
  const borderRadius = isMobile ? '0.4rem' : '0.5rem';
  const gap = isMobile ? '0.4rem' : '0.5rem';

  return (
    <div style={{ 
      marginTop: isMobile ? '0.75rem' : '1rem',
      display: 'block',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: gap,
        background: 'linear-gradient(to right, #eff6ff, #dbeafe)',
        padding: padding,
        borderRadius: borderRadius,
        border: '1px solid #bfdbfe',
        color: '#1e3a8a',
      }}>
        <MdInfo style={{ fontSize: iconSize }} />
        <div style={{
          flex: 1,
        }}>
          <h3 style={{
            margin: 0,
            fontSize: titleSize,
            fontWeight: 500,
            letterSpacing: '-0.025em'
          }}>
            Daily Challenge
          </h3>
          <p style={{
            margin: '0.2rem 0 0 0',
            fontSize: descriptionSize,
            opacity: 0.9,
            lineHeight: '1.4',
            letterSpacing: '-0.05em'
          }}>
            New puzzle available daily. Return tomorrow for your next mathematical challenge.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyChallengeInfo;
