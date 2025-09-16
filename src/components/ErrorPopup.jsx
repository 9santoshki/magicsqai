import React, { useEffect } from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const ErrorPopup = ({ message, isVisible, onClose, type = 'error' }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000); // Auto-close after 1 second for all error types

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

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
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(220, 53, 69, 0.2)',
        border: '2px solid #dc3545',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.9rem',
        fontWeight: '600',
        lineHeight: '1.4',
      }}>
        <FaExclamationTriangle style={{
          fontSize: '1.2rem',
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
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#dc3545',
            fontSize: '0.8rem',
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
