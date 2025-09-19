import React, { useEffect, useRef } from 'react';
import { FaExclamationTriangle, FaTimes, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

const ErrorPopup = ({ message, isVisible, onClose, type = 'error', timeout = 3000 }) => {
  // Define styles based on type
  const getTypeStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#d4edda',
          borderColor: '#28a745',
          textColor: '#155724',
          iconColor: '#28a745',
          icon: <FaCheckCircle />
        };
      case 'info':
        return {
          backgroundColor: '#d1ecf1',
          borderColor: '#17a2b8',
          textColor: '#0c5460',
          iconColor: '#17a2b8',
          icon: <FaInfoCircle />
        };
      case 'warning':
        return {
          backgroundColor: '#fff3cd',
          borderColor: '#ffc107',
          textColor: '#856404',
          iconColor: '#ffc107',
          icon: <FaExclamationTriangle />
        };
      case 'error':
      default:
        return {
          backgroundColor: '#ffffff',
          borderColor: '#dc3545',
          textColor: '#dc3545',
          iconColor: '#dc3545',
          icon: <FaExclamationTriangle />
        };
    }
  };

  const styles = getTypeStyles(type);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (isVisible) {
      timeoutRef.current = setTimeout(() => {
        onClose();
        timeoutRef.current = null;
      }, timeout);
    }
  }, [isVisible]); // Only depend on isVisible

  if (!isVisible) {
    return null;
  }

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
        background: styles.backgroundColor,
        color: styles.textColor,
        padding: '20px 25px',
        borderRadius: '15px',
        boxShadow: `0 12px 40px rgba(${styles.iconColor === '#dc3545' ? '220, 53, 69' : styles.iconColor === '#28a745' ? '40, 167, 69' : styles.iconColor === '#17a2b8' ? '23, 162, 184' : '255, 193, 7'}, 0.3)`,
        border: `3px solid ${styles.borderColor}`,
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        fontSize: '1.2rem',
        fontWeight: '700',
        lineHeight: '1.4',
        textAlign: 'left',
      }}>
        <div style={{
          fontSize: '1.5rem',
          color: styles.iconColor,
          flexShrink: 0,
        }}>
          {styles.icon}
        </div>
        
        <div style={{
          flex: 1,
          wordBreak: 'break-word',
          color: styles.textColor,
        }}>
          {message}
        </div>
        
        <button
          onClick={onClose}
          style={{
            background: `rgba(${styles.iconColor === '#dc3545' ? '220, 53, 69' : styles.iconColor === '#28a745' ? '40, 167, 69' : styles.iconColor === '#17a2b8' ? '23, 162, 184' : '255, 193, 7'}, 0.1)`,
            border: `1px solid ${styles.borderColor}`,
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: styles.iconColor,
            fontSize: '1rem',
            flexShrink: 0,
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `rgba(${styles.iconColor === '#dc3545' ? '220, 53, 69' : styles.iconColor === '#28a745' ? '40, 167, 69' : styles.iconColor === '#17a2b8' ? '23, 162, 184' : '255, 193, 7'}, 0.2)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `rgba(${styles.iconColor === '#dc3545' ? '220, 53, 69' : styles.iconColor === '#28a745' ? '40, 167, 69' : styles.iconColor === '#17a2b8' ? '23, 162, 184' : '255, 193, 7'}, 0.1)`;
          }}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
