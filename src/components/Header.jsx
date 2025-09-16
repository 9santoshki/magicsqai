import React from 'react';

const Header = ({ currentPage, onNavigate }) => {
  return (
    <header style={{
      background: '#f8f9fa',
      color: '#343a40',
      padding: '8px 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid #e9ecef',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Logo and Title */}
        <div 
          onClick={() => onNavigate('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img 
            src="/magicsqlogo.png" 
            alt="Magic SQ Logo"
            style={{
              height: '32px',
              width: 'auto',
            }}
          />
          <div>
            <h1 style={{
              fontSize: window.innerWidth < 768 ? '1.1rem' : '1.4rem',
              fontWeight: '600',
              margin: '0',
              letterSpacing: '0.3px',
              color: '#343a40',
            }}>
              Magic Square
            </h1>
            <p style={{
              fontSize: '0.7rem',
              margin: '0',
              opacity: 0.8,
              fontWeight: '400',
              color: '#6c757d',
            }}>
              Boost your Brainpower!
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{
          display: 'flex',
          gap: window.innerWidth < 768 ? '8px' : '15px',
          alignItems: 'center',
        }}>
          {[
            { key: 'home', label: 'Home' },
            { key: 'about', label: 'About' },
            { key: 'contact', label: 'Contact' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              style={{
                background: currentPage === key ? '#e9ecef' : 'transparent',
                color: currentPage === key ? '#495057' : '#6c757d',
                border: currentPage === key ? '1px solid #dee2e6' : '1px solid transparent',
                padding: window.innerWidth < 768 ? '6px 10px' : '8px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: window.innerWidth < 768 ? '0.8rem' : '0.9rem',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                letterSpacing: '0.2px',
              }}
              onMouseEnter={(e) => {
                if (currentPage !== key) {
                  e.currentTarget.style.background = '#f1f3f4';
                  e.currentTarget.style.color = '#495057';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== key) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#6c757d';
                }
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
