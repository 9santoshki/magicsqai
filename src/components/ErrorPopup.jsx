import React, { useEffect } from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const ErrorPopup = ({ message, isVisible, onClose, type = 'error', timeout = 3000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, timeout]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      maxWidth: '90vw',
      width: 'auto',
      minWidth: '300px',
      animation: 'slideDown 0.3s ease-out',
    }}>
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
        `}
      </style>
      
      <div style={{
        background: '#ffffff',
        color: '#dc3545',
        padding: '20px 25px',
        borderRadius: '15px',
        boxShadow: '0 12px 40px rgba(220, 53, 69, 0.3)',
        border: '3px solid #dc3545',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        fontSize: '1.2rem',
        fontWeight: '700',
        lineHeight: '1.4',
        textAlign: 'left',
      }}>
        <FaExclamationTriangle style={{
          fontSize: '1.5rem',
          color: '#dc3545',
          flexShrink: 0,
        }} />
        
        <div style={{
          flex: 1,
          wordBreak: 'break-word',
          color: '#dc3545',
        }}>
          {message}
        </div>
        
        <button
          onClick={onClose}
          style={{
            background: 'rgba(220, 53, 69, 0.1)',
            border: '1px solid #dc3545',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#dc3545',
            fontSize: '1rem',
            flexShrink: 0,
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(220, 53, 69, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(220, 53, 69, 0.1)';
          }}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
