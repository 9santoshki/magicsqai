import React from 'react';

const About = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: "'Segoe UI', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        border: '1px solid #dee2e6',
      }}>
        {/* Header with Logo */}
        <div style={{
          background: '#f8f9fa',
          padding: '30px',
          textAlign: 'center',
          borderBottom: '1px solid #e9ecef',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '10px',
          }}>
            <img 
              src="/magicsqlogo.png" 
              alt="Magic Square Logo" 
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '8px',
              }}
            />
            <h1 style={{
              margin: '0',
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#2c3e50',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}>
              Magic Square
            </h1>
          </div>
          <p style={{
            margin: '0',
            fontSize: '1.2rem',
            color: '#6c757d',
            fontWeight: '500',
          }}>
            Boost your Brainpower!
          </p>
        </div>

        {/* Content */}
        <div style={{
          padding: '40px',
          lineHeight: '1.8',
          color: '#495057',
        }}>
          <h2 style={{
            color: '#2c3e50',
            fontSize: '1.8rem',
            marginBottom: '20px',
            fontWeight: '600',
          }}>
            About Magic Square
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '25px',
          }}>
            Welcome to Magic Square, the ultimate mathematical puzzle challenge that combines the power of BODMAS (Brackets, Orders, Division/Multiplication, Addition/Subtraction) with strategic thinking and problem-solving skills.
          </p>

          <h3 style={{
            color: '#2c3e50',
            fontSize: '1.4rem',
            marginBottom: '15px',
            fontWeight: '600',
          }}>
            What is BODMAS?
          </h3>
          
          <p style={{
            fontSize: '1rem',
            marginBottom: '25px',
          }}>
            BODMAS is the mathematical order of operations that ensures calculations are performed correctly. In Magic Square, you'll apply these rules to solve complex equation puzzles where every number placement matters.
          </p>

          <h3 style={{
            color: '#2c3e50',
            fontSize: '1.4rem',
            marginBottom: '15px',
            fontWeight: '600',
          }}>
            How to Play
          </h3>
          
          <ul style={{
            fontSize: '1rem',
            marginBottom: '25px',
            paddingLeft: '20px',
          }}>
            <li style={{ marginBottom: '8px' }}>Fill empty cells with digits 1-9 to complete mathematical equations</li>
            <li style={{ marginBottom: '8px' }}>Each digit can appear only once per row or column equation</li>
            <li style={{ marginBottom: '8px' }}>All digits 1-9 must be used at least once in the puzzle</li>
            <li style={{ marginBottom: '8px' }}>Follow BODMAS rules: solve left to right in rows, top to bottom in columns</li>
          </ul>

          <h3 style={{
            color: '#2c3e50',
            fontSize: '1.4rem',
            marginBottom: '15px',
            fontWeight: '600',
          }}>
            Challenge Yourself
          </h3>
          
          <p style={{
            fontSize: '1rem',
            marginBottom: '25px',
          }}>
            With varying difficulty levels from 1 to 5 stars, Magic Square offers puzzles for everyone from beginners to mathematical experts. Track your solving time, share your achievements, and return daily for new challenges!
          </p>

          <div style={{
            background: '#e3f2fd',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #bbdefb',
            marginTop: '30px',
          }}>
            <h4 style={{
              color: '#1976d2',
              fontSize: '1.2rem',
              marginBottom: '10px',
              fontWeight: '600',
            }}>
              Connect with us
            </h4>
            <p style={{
              fontSize: '1rem',
              color: '#1565c0',
              margin: '0',
            }}>
              Join our community of puzzle enthusiasts and mathematical minds. Share your solving strategies, compete with friends, and discover the joy of mathematical thinking!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
