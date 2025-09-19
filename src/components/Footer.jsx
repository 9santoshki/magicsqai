import React from 'react';
import { FaHeart, FaGithub, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{
      background: '#f8f9fa',
      color: '#495057',
      padding: '25px 20px 15px',
      marginTop: 'auto',
      borderTop: '1px solid #e9ecef',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '40px',
          marginBottom: '20px',
        }}>
          {/* Logo and Description */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}>
              <img 
                src="/magicsqlogo.png" 
                alt="Magic SQ Logo"
                style={{
                  height: '24px',
                  width: 'auto',
                }}
              />
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                margin: '0',
                letterSpacing: '0.2px',
                color: '#343a40',
              }}>
                Magic Square
              </h3>
            </div>
            <p style={{
              fontSize: '0.85rem',
              lineHeight: '1.5',
              opacity: 0.9,
              margin: '0',
              color: '#6c757d',
            }}>
              Challenge your mathematical skills with daily BODMAS puzzles. 
              Improve your order of operations knowledge while having fun!
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h4 style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#495057',
            }}>
              Follow us on:
            </h4>
            <div style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '15px',
            }}>
              {[
                { icon: FaFacebook, color: '#1877f2', url: 'https://www.facebook.com/profile.php?id=61580108717050' },
                { icon: FaTwitter, color: '#1da1f2', url: '#' },
                { icon: FaLinkedin, color: '#0077b5', url: 'https://www.linkedin.com/company/108687992/admin/dashboard/' },
                { icon: FaGithub, color: '#333', url: '#' },
              ].map(({ icon, color, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    background: '#ffffff',
                    borderRadius: '50%',
                    color: '#6c757d',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    border: '1px solid #e9ecef',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = color;
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = '#6c757d';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {React.createElement(icon, { style: { fontSize: '0.9rem' } })}
                </a>
              ))}
            </div>
            <p style={{
              fontSize: '0.75rem',
              opacity: 0.8,
              margin: '0',
              lineHeight: '1.4',
              color: '#6c757d',
            }}>
              Follow us for daily puzzle updates!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #e9ecef',
          paddingTop: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
        }}>
          <p style={{
            fontSize: '0.75rem',
            opacity: 0.8,
            margin: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#6c757d',
          }}>
            Made with <FaHeart style={{ color: '#e74c3c', fontSize: '0.7rem' }} /> for math enthusiasts
          </p>
          <p style={{
            fontSize: '0.75rem',
            opacity: 0.8,
            margin: '0',
            color: '#6c757d',
          }}>
            © 2024 Magic Square. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
