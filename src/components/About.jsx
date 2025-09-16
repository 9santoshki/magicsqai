import React from 'react';
import { FaCalculator, FaBrain, FaGamepad, FaTrophy, FaUsers, FaLightbulb } from 'react-icons/fa';

const About = () => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      lineHeight: '1.6',
      background: '#f8f9fa',
      minHeight: '100vh',
    }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
        color: 'white',
        padding: '40px 20px',
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(108, 117, 125, 0.2)',
      }}>
        <img 
          src="/magicsqlogo.png" 
          alt="Magic SQ Logo"
          style={{
            height: '60px',
            width: 'auto',
            marginBottom: '15px',
            filter: 'brightness(0) invert(1)',
          }}
        />
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '700',
          margin: '0 0 15px 0',
          letterSpacing: '0.5px',
        }}>
          About Magic Square
        </h1>
        <p style={{
          fontSize: '1.1rem',
          opacity: 0.9,
          margin: '0',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Master the order of operations through engaging daily mathematical puzzles
        </p>
      </div>

      {/* What is BODMAS */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: '600',
          color: '#495057',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <FaCalculator style={{ color: '#6c757d' }} />
          What is BODMAS?
        </h2>
        <div style={{
          background: '#ffffff',
          padding: '25px',
          borderRadius: '10px',
          border: '1px solid #dee2e6',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <p style={{
            fontSize: '1rem',
            color: '#495057',
            marginBottom: '15px',
          }}>
            <strong>BODMAS</strong> is an acronym that helps you remember the correct order of mathematical operations:
          </p>
          <ul style={{
            fontSize: '1rem',
            color: '#495057',
            paddingLeft: '20px',
          }}>
            <li><strong>B</strong>rackets (Parentheses)</li>
            <li><strong>O</strong>rders (Exponents/Powers)</li>
            <li><strong>D</strong>ivision and <strong>M</strong>ultiplication (left to right)</li>
            <li><strong>A</strong>ddition and <strong>S</strong>ubtraction (left to right)</li>
          </ul>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: '600',
          color: '#495057',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <FaGamepad style={{ color: '#6c757d' }} />
          How the Game Works
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)',
          gap: '20px',
        }}>
          {[
            {
              icon: FaBrain,
              title: 'Daily Puzzles',
              description: 'Get a new 5×5 mathematical grid puzzle every day with varying difficulty levels.',
              color: '#6c757d'
            },
            {
              icon: FaLightbulb,
              title: 'Fill the Grid',
              description: 'Complete empty cells with digits 1-9 to make all equations correct using BODMAS rules.',
              color: '#6c757d'
            },
            {
              icon: FaTrophy,
              title: 'Track Progress',
              description: 'Monitor your solving time and share your achievements with friends.',
              color: '#6c757d'
            },
            {
              icon: FaUsers,
              title: 'Social Sharing',
              description: 'Share your completed puzzles on social media and challenge your friends.',
              color: '#6c757d'
            },
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid #dee2e6',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
              }}>
                <div style={{
                  background: `${feature.color}20`,
                  padding: '10px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <feature.icon style={{ color: feature.color, fontSize: '1.2rem' }} />
                </div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#495057',
                  margin: '0',
                }}>
                  {feature.title}
                </h3>
              </div>
              <p style={{
                fontSize: '0.95rem',
                color: '#6c757d',
                margin: '0',
                lineHeight: '1.5',
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Game Rules */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: '600',
          color: '#495057',
          marginBottom: '20px',
        }}>
          Game Rules
        </h2>
        <div style={{
          background: '#ffffff',
          padding: '25px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: '1px solid #dee2e6',
        }}>
          <ol style={{
            fontSize: '1rem',
            color: '#495057',
            paddingLeft: '20px',
            lineHeight: '1.8',
          }}>
            <li>Apply BODMAS rule: evaluate left to right in rows, top to bottom in columns</li>
            <li>Fill empty cells with digits 1-9 to complete all equations</li>
            <li>Each digit may appear only once per row or column equation</li>
            <li>All digits 1-9 must be used at least once in the complete grid</li>
          </ol>
        </div>
      </section>

      {/* Mission Statement */}
      <section>
        <div style={{
          background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
          color: 'white',
          padding: '30px',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: '600',
            margin: '0 0 15px 0',
          }}>
            Our Mission
          </h2>
          <p style={{
            fontSize: '1rem',
            opacity: 0.9,
            margin: '0',
            lineHeight: '1.6',
          }}>
            We believe that learning mathematics should be fun and engaging. Magic Square 
            combines the satisfaction of puzzle-solving with essential mathematical skills, 
            helping players of all ages strengthen their understanding of the order of operations 
            while enjoying a daily mental workout.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
