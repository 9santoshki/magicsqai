
import React from 'react';
import { FaClock, FaShare, FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import StarRating from '../StarRating';

const PuzzleHeader = ({
  seconds,
  formatTime,
  difficultyStars,
  shareResult,
}) => {
  const isMobile = window.innerWidth < 768;
  
  // Responsive values
  const padding = isMobile ? '12px 10px' : '15px 12px';
  const titleFontSize = isMobile ? '1.4rem' : '1.8rem';
  const timerFontSize = isMobile ? '0.8rem' : '0.9rem';
  const shareTextFontSize = isMobile ? '0.75rem' : '0.9rem';
  const shareIconFontSize = isMobile ? '0.75rem' : '0.9rem'; // Match text size
  const shareButtonSize = isMobile ? '24px' : '30px'; // Adjusted size
  const difficultyFontSize = isMobile ? '0.75rem' : '0.85rem';
  const gap = isMobile ? '8px' : '12px';
  const shareButtonGap = isMobile ? '3px' : '5px'; // Reduced gap

  return (
    <div style={{
      background: '#f8f9fa',
      padding: padding,
      color: '#495057',
      borderBottom: '1px solid #e9ecef',
      borderRadius: '0 0 10px 10px',
    }}>
      {/* BODMAS Challenge Header Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
      }}>
        <h2 style={{
          margin: '0',
          fontSize: titleFontSize,
          fontWeight: '700',
          color: '#2c3e50',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)',
        }}>
          BODMAS Challenge
        </h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: difficultyFontSize,
          fontWeight: '600', // Slightly more bold
          color: '#6c757d',
          background: '#ffffff',
          padding: '4px 10px',
          borderRadius: '20px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}>
          <span>Difficulty:</span>
          <StarRating difficulty={difficultyStars} />
        </div>
      </div>
      
      {/* Timer and Sharing Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: gap,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#ffffff',
          padding: '6px 12px',
          borderRadius: '20px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}>
          <FaClock style={{ fontSize: '0.9rem', color: '#6c757d' }} />
          <span style={{
            fontFamily: 'inherit',
            fontSize: shareTextFontSize, // Match the share text font size
            fontWeight: '600', // Match the share text font weight
            color: '#495057',
          }}>
            {formatTime(seconds)}
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: shareTextFontSize,
          color: '#6c757d',
          background: '#ffffff',
          padding: '6px 12px',
          borderRadius: '20px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          flex: 1,
          minWidth: isMobile ? '120px' : 'auto',
          overflow: 'hidden',
        }}>
          <div style={{ 
            fontWeight: '600', 
            color: '#495057', 
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            marginRight: '0', // Remove auto margin to bring text closer to icons
          }}>
            <FaShare style={{ fontSize: '0.9rem', color: '#495057' }} />
            <span>Challenge your friends</span>
          </div>
          <div style={{
            display: 'flex',
            gap: shareButtonGap,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            marginLeft: '8px', // Add small left margin to separate from text
          }}>
            <style>{`
              .social-buttons::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {[
              { platform: 'facebook', icon: FaFacebook, color: '#1877f2' },
              { platform: 'twitter', icon: FaTwitter, color: '#1da1f2' },
              { platform: 'whatsapp', icon: FaWhatsapp, color: '#25d366' },
              { platform: 'linkedin', icon: FaLinkedin, color: '#0077b5' },
            ].map(({ platform, icon: Icon, color }) => (
              <button
                key={platform}
                onClick={() => shareResult(platform)}
                style={{
                  background: '#ffffff',
                  color: color,
                  border: `2px solid ${color}`,
                  borderRadius: '50%',
                  width: shareButtonSize,
                  height: shareButtonSize,
                  cursor: 'pointer',
                  fontSize: shareIconFontSize,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = color;
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.1)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${color}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = color;
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                }}
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleHeader;
