import React from 'react';

const Header = ({ currentPage, onNavigate }) => {
  const isMobile = window.innerWidth < 768;
  
  // Responsive values
  const padding = isMobile ? '8px 15px' : '8px 20px';
  const logoHeight = isMobile ? '28px' : '32px';
  const titleFontSize = isMobile ? '1.1rem' : '1.4rem';
  const subtitleFontSize = isMobile ? '0.6rem' : '0.7rem';
  const navGap = isMobile ? '6px' : '15px';
  const buttonPadding = isMobile ? '5px 8px' : '8px 14px';
  const buttonFontSize = isMobile ? '0.8rem' : '0.9rem';
  const maxWidth = isMobile ? '100%' : '1200px';
  const gap = isMobile ? '6px' : '8px';

  return (
    <header style={{
      background: '#f8f9fa',
      color: '#343a40',
      padding: padding,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid #e9ecef',
    }}>
      <div style={{
        maxWidth: maxWidth,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        gap: gap,
      }}>
        {/* Logo and Title */}
        <div 
          onClick={() => onNavigate('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: gap,
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            minWidth: '0', // Allow flex shrinking
            flex: isMobile ? '1' : 'none', // Allow expanding on mobile
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img 
            src="/magicsqlogo.png" 
            alt="Magic SQ Logo"
            style={{
              height: logoHeight,
              width: 'auto',
              flexShrink: 0,
            }}
          />
          <div style={{
            minWidth: 0, // Allow text to truncate if needed
          }}>
            <h1 style={{
              fontSize: titleFontSize,
              fontWeight: '600',
              margin: '0',
              letterSpacing: '0.3px',
              color: '#343a40',
              whiteSpace: isMobile ? 'normal' : 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: isMobile ? '1.2' : 'normal',
              wordBreak: isMobile ? 'break-word' : 'normal',
            }}>
              Magic Square
            </h1>
            <p style={{
              fontSize: subtitleFontSize,
              margin: '0',
              opacity: 0.9,
              fontWeight: '500',
              color: '#495057',
              whiteSpace: isMobile ? 'normal' : 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              letterSpacing: '0.5px',
              lineHeight: isMobile ? '1.1' : 'normal',
              wordBreak: isMobile ? 'break-word' : 'normal',
            }}>
              Boost your Brainpower!
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{
          display: 'flex',
          gap: navGap,
          alignItems: 'center',
          flexShrink: 0,
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          justifyContent: isMobile ? 'flex-end' : 'normal',
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
                padding: buttonPadding,
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: isMobile ? '0.75rem' : buttonFontSize,
                fontWeight: '500',
                transition: 'all 0.2s ease',
                letterSpacing: '0.2px',
                whiteSpace: 'nowrap',
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
