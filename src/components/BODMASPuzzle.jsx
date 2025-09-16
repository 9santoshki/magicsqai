import React, { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import html2canvas from 'html2canvas';
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaClock, FaCalculator, FaLightbulb, FaBook, FaExclamationTriangle } from 'react-icons/fa';
import { MdRefresh, MdDelete, MdCheck, MdWarning, MdInfo } from 'react-icons/md';
import DifficultyLevel from './DifficultyLevel';
import { puzzleConfigs } from './puzzleConfigs';

const urlToShare = 'https://magicsquare.live/';

// Function to get daily puzzle based on current date
const getDailyPuzzle = () => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  
  // Use a consistent random starting point based on the year
  // This ensures the same starting point for the entire year but different each year
  const yearSeed = today.getFullYear();
  const randomOffset = (yearSeed * 17 + 42) % puzzleConfigs.length; // Simple pseudo-random based on year
  
  // Add day of year to random offset and cycle through available puzzles
  const puzzleIndex = (randomOffset + dayOfYear) % puzzleConfigs.length;
  return puzzleConfigs[puzzleIndex];
};

const BODMASPuzzle = () => {
  // Get today's puzzle
  const [config] = useState(() => getDailyPuzzle());
  
  // Timer state
  const computeInitialCellValues = (config) => {
    return config.grid.reduce((acc, row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        acc[`cell-${rowIndex + 1}-${colIndex + 1}`] = cell.fixed ? cell.value : '';
      });
      return acc;
    }, {});
  };

  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [selectedCell, setSelectedCell] = useState(null);
  const [result, setResult] = useState('');
  const [resultColor, setResultColor] = useState('black');
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [isPuzzleCompleted, setIsPuzzleCompleted] = useState(false);
  const [showRules, setShowRules] = useState(true); // Default open
  const [showHints, setShowHints] = useState(false);
  const [mobileRulesExpanded, setMobileRulesExpanded] = useState(true); // Default open
  const [mobileActiveTab, setMobileActiveTab] = useState('rules');
  const [warningMessage, setWarningMessage] = useState('');
  const puzzleRef = useRef(null);
  const timerRef = useRef();

  // Initialize cell values from config
  const [cellValues, setCellValues] = useState(
    () => computeInitialCellValues(config)
  );

  const blanksLeft = config.difficulty;

  // Show warning message
  const showWarning = (message) => {
    setWarningMessage(message);
    setTimeout(() => setWarningMessage(''), 3000);
  };

  // Reset when config changes
  useEffect(() => {
    setCellValues(computeInitialCellValues(config));
    setSeconds(0);
    setIsTimerRunning(true);
    setSelectedCell(null);
    setResult('');
    setShowShareButtons(false);
    setIsPuzzleCompleted(false);
    setWarningMessage('');
  }, [config]);

  // Timer effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  // Format timer display
  const formatTime = (timeInSeconds) => {
    const mins = String(Math.floor(timeInSeconds / 60)).padStart(2, '0');
    const secs = String(timeInSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Get current date string for display
  const getCurrentDateString = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Check if number is allowed in the cell
  const isNumberAllowed = useCallback((number, cellId) => {
    const [_, row, col] = cellId.split('-').map(Number);
    const size = config.grid.length;

    for (let i = 1; i <= size; i++) {
      const rowCellId = `cell-${row}-${i}`;
      const colCellId = `cell-${i}-${col}`;
      if (rowCellId !== cellId && cellValues[rowCellId] === number) return false;
      if (colCellId !== cellId && cellValues[colCellId] === number) return false;
    }

    return true;
  }, [cellValues, config.grid.length]);

  // Handle cell selection
  const handleCellClick = (cellId) => {
    setSelectedCell(cellId);
  };

  // Handle number button click
  const handleNumberClick = (number) => {
    if (!selectedCell) {
      showWarning('Please select a cell first');
      return;
    }
    
    if (isNumberAllowed(number, selectedCell)) {
      setCellValues(prev => ({ ...prev, [selectedCell]: number }));
      setSelectedCell(null);
    } else {
      showWarning(`Number ${number} already exists in this row or column`);
    }
  };

  // Handle cell input change
  const handleCellChange = (e, cellId) => {
    const value = e.target.value;
    
    // Check for invalid characters
    if (!/^[1-9]?$/.test(value)) {
      showWarning('Only digits 1-9 are permitted');
      e.target.value = cellValues[cellId];
      return;
    }

    if (value === '' || isNumberAllowed(value, cellId)) {
      setCellValues(prev => ({ ...prev, [cellId]: value }));
    } else {
      showWarning(`Number ${value} already exists in this row or column`);
      e.target.value = cellValues[cellId];
    }
  };

  // Handle delete
  const handleDelete = () => {
    if (selectedCell) {
      setCellValues(prev => ({ ...prev, [selectedCell]: '' }));
      setSelectedCell(null);
    } else {
      showWarning('Please select a cell to clear');
    }
  };

  // Handle reset
  const handleReset = () => {
    setCellValues(computeInitialCellValues(config)); 
    setResult('');
    setShowShareButtons(false);
    setIsPuzzleCompleted(false);
    setSeconds(0); 
    setIsTimerRunning(true); 
    setSelectedCell(null);
    setWarningMessage('');
  };

  // Check solution
  const checkSolution = () => {
    const size = config.grid.length;
    let allFilled = true;
    const rowResults = [];

    for (let row = 1; row <= size; row++) {
      let rowCorrect = true;
      for (let col = 1; col <= size; col++) {
        const cellId = `cell-${row}-${col}`;
        const val = cellValues[cellId];
        
        if (!config.grid[row-1][col-1].fixed && val === "") {
          allFilled = false;
        }
        
        if (val && parseInt(val) !== config.answers[row - 1][col - 1]) {
          rowCorrect = false;
        }
      }
      rowResults.push(rowCorrect);
    }

    if (!allFilled) {
      setResult("Please complete all fields to validate your solution");
      setResultColor("#dc3545");
      setShowShareButtons(true);
    } else if (rowResults.every(Boolean)) {
      setResult("✓ Excellent! Challenge completed successfully");
      setResultColor("#198754");
      setIsTimerRunning(false);
      setIsPuzzleCompleted(true);
      setShowShareButtons(true);
    } else {
      const summary = rowResults
        .map((correct, i) => `Row ${i + 1}: ${correct ? "✓" : "✗"}`)
        .join(" • ") + " • Please review and try again";
      setResult(summary);
      setResultColor("#fd7e14");
      setShowShareButtons(true);
    }
  };

  // Share on social media
  const shareOnSocialMedia = async (platform) => {
    if (!puzzleRef.current) return;

    try {
      const canvas = await html2canvas(puzzleRef.current);
      const image = canvas.toDataURL('image/png');
      const dateString = getCurrentDateString();
      
      let message;
      if (isPuzzleCompleted) {
        const timeTaken = formatTime(seconds);
        message = `I solved today's BODMAS Challenge (${dateString}) in ${timeTaken}! Can you beat my time?`;
      } else {
        message = `Check out today's BODMAS Challenge (${dateString})! Test your mathematical skills.`;
      }

      if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}&quote=${encodeURIComponent(message)}`, '_blank');
      } else if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(urlToShare)}`, '_blank');
      } else if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${message} ${urlToShare}`)}`,'_blank'  );
      }
      else if (platform === 'linkedin') {
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(urlToShare)}&title=${encodeURIComponent(message)}`, '_blank');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const size = config.grid.length;

  // Rules and Hints Component
  const RulesAndHints = ({ isSidebar = false }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isSidebar ? '12px' : '12px',
      width: '100%',
    }}>
      {/* Welcome Card - Sidebar Only */}
      {isSidebar && (
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          padding: '12px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
        }}>
          <div style={{
            fontSize: '1.2rem',
            marginBottom: '6px',
          }}>
            🧮
          </div>
          <h3 style={{
            margin: '0 0 4px 0',
            fontSize: '0.9rem',
            fontWeight: '600',
            letterSpacing: '0.3px',
          }}>
            Control Center
          </h3>
          <p style={{
            margin: '0',
            fontSize: '0.7rem',
            opacity: 0.9,
            lineHeight: '1.4',
          }}>
            Everything you need to solve the puzzle
          </p>
        </div>
      )}

      {/* Rules */}
      <div style={{
        background: '#ffffff',
        borderRadius: isSidebar ? '12px' : '8px',
        padding: isSidebar ? '12px' : '15px',
        boxShadow: isSidebar ? '0 4px 20px rgba(0,0,0,0.08)' : '0 2px 12px rgba(0,0,0,0.05)',
        border: '1px solid #e8ecef',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (isSidebar) {
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (isSidebar) {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}>
        <h3 style={{
          margin: '0 0 10px 0',
          color: '#2c3e50',
          fontSize: isSidebar ? '0.9rem' : 'clamp(0.9rem, 4vw, 1rem)',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          letterSpacing: '0.3px',
          transition: 'color 0.2s ease',
        }}
        onClick={() => setShowRules(!showRules)}
        onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#2c3e50'}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <FaBook style={{ 
              color: 'white', 
              fontSize: isSidebar ? '0.7rem' : '0.7rem'
            }} />
          </div>
          Game Rules 
          <span style={{
            marginLeft: 'auto',
            fontSize: '0.7rem',
            color: '#6c757d',
            transition: 'transform 0.2s ease',
            transform: showRules ? 'rotate(180deg)' : 'rotate(0deg)',
          }}>
            ▼
          </span>
        </h3>
        {showRules && (
          <div>
            <ol style={{
              listStyleType: 'none',
              paddingLeft: '0',
              lineHeight: '1.5',
              color: '#5a6c7d',
              fontSize: isSidebar ? '0.75rem' : 'clamp(0.8rem, 3vw, 0.9rem)',
              margin: '0',
              counterReset: 'rule-counter',
            }}>
              {[
                'Apply BODMAS rule: evaluate left to right in rows, top to bottom in columns',
                'Fill empty cells with digits 1-9 to complete all equations',
                'Each digit may appear only once per row or column equation',
                'All digits 1-9 must be used at least once in the complete grid'
              ].map((rule, index) => (
                <li key={index} style={{
                  marginBottom: '8px',
                  paddingLeft: '20px',
                  position: 'relative',
                  counterIncrement: 'rule-counter',
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.6rem',
                    fontWeight: '600',
                  }}>
                    {index + 1}
                  </span>
                  {rule}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Hints */}
      <div style={{
        background: '#ffffff',
        borderRadius: isSidebar ? '12px' : '8px',
        padding: isSidebar ? '12px' : '15px',
        boxShadow: isSidebar ? '0 4px 20px rgba(0,0,0,0.08)' : '0 2px 12px rgba(0,0,0,0.05)',
        border: '1px solid #e8ecef',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (isSidebar) {
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (isSidebar) {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}>
        <h3 style={{
          margin: '0 0 10px 0',
          color: '#2c3e50',
          fontSize: isSidebar ? '0.9rem' : 'clamp(0.9rem, 4vw, 1rem)',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          letterSpacing: '0.3px',
          transition: 'color 0.2s ease',
        }}
        onClick={() => setShowHints(!showHints)}
        onMouseEnter={(e) => e.currentTarget.style.color = '#f39c12'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#2c3e50'}>
          <div style={{
            background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
            borderRadius: '50%',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <FaLightbulb style={{ 
              color: 'white', 
              fontSize: isSidebar ? '0.7rem' : '0.7rem'
            }} />
          </div>
          Pro Tips 
          <span style={{
            marginLeft: 'auto',
            fontSize: '0.7rem',
            color: '#6c757d',
            transition: 'transform 0.2s ease',
            transform: showHints ? 'rotate(180deg)' : 'rotate(0deg)',
          }}>
            ▼
          </span>
        </h3>
        {showHints && (
          <div>
            <div style={{ 
              background: 'linear-gradient(135deg, #fff7e6 0%, #fef3e2 100%)',
              borderRadius: '6px',
              padding: '8px',
              marginBottom: '8px',
              border: '1px solid #f39c12',
              fontSize: isSidebar ? '0.7rem' : 'clamp(0.75rem, 3vw, 0.85rem)',
            }}>
              <strong>💡 Pro Tip:</strong> Start with equations that have fewer unknowns!
            </div>
            <ol style={{
              listStyleType: 'none',
              paddingLeft: '0',
              lineHeight: '1.5',
              color: '#5a6c7d',
              fontSize: isSidebar ? '0.75rem' : 'clamp(0.8rem, 3vw, 0.9rem)',
              margin: '0',
              counterReset: 'tip-counter',
            }}>
              {[
                'Follow BODMAS order: Division/Multiplication first, then Addition/Subtraction',
                'Process operations sequentially from left to right (rows) or top to bottom (columns)',
                'Use elimination: if a number appears in a row/column, it cannot appear again',
                'Cross-reference: check both row and column constraints for each cell'
              ].map((tip, index) => (
                <li key={index} style={{
                  marginBottom: '8px',
                  paddingLeft: '20px',
                  position: 'relative',
                  counterIncrement: 'tip-counter',
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.6rem',
                    fontWeight: '600',
                  }}>
                    {index + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Input Panel - Sidebar Only */}
      {isSidebar && (
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e8ecef',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px',
            gap: '6px',
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              borderRadius: '50%',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FaCalculator style={{ 
                color: 'white', 
                fontSize: '0.7rem'
              }} />
            </div>
            <h3 style={{
              margin: '0',
              color: '#2c3e50',
              fontSize: '0.9rem',
              fontWeight: '600',
              letterSpacing: '0.3px',
            }}>
              Number Input
            </h3>
          </div>
          
          {/* Number Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '6px',
            marginBottom: '10px',
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                style={{
                  width: '100%',
                  height: '32px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(108, 117, 125, 0.2)',
                  touchAction: 'manipulation',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #5a6268 0%, #343a40 100%)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 3px 8px rgba(108, 117, 125, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6c757d 0%, #495057 100%)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(108, 117, 125, 0.2)';
                }}
                onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {num}
              </button>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '6px',
          }}>
            <button
              onClick={handleDelete}
              style={{
                padding: '6px 3px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                touchAction: 'manipulation',
                height: '28px',
                boxShadow: '0 2px 6px rgba(220, 53, 69, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #c82333 0%, #a71e2a 100%)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 3px 8px rgba(220, 53, 69, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(220, 53, 69, 0.2)';
              }}
              onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <MdDelete style={{ fontSize: '0.8rem' }} />
              Clear
            </button>
            
            <button
              onClick={handleReset}
              style={{
                padding: '6px 3px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #fd7e14 0%, #e55a00 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                touchAction: 'manipulation',
                height: '28px',
                boxShadow: '0 2px 6px rgba(253, 126, 20, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #e55a00 0%, #cc4f00 100%)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 3px 8px rgba(253, 126, 20, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #fd7e14 0%, #e55a00 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(253, 126, 20, 0.2)';
              }}
              onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <MdRefresh style={{ fontSize: '0.8rem' }} />
              Reset
            </button>
            
            <button
              onClick={checkSolution}
              style={{
                padding: '6px 3px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #198754 0%, #146c43 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                touchAction: 'manipulation',
                height: '28px',
                boxShadow: '0 2px 6px rgba(25, 135, 84, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #146c43 0%, #0f5132 100%)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 3px 8px rgba(25, 135, 84, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #198754 0%, #146c43 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(25, 135, 84, 0.2)';
              }}
              onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <MdCheck style={{ fontSize: '0.8rem' }} />
              Check
            </button>
          </div>
        </div>
      )}

      {/* Progress Card - Sidebar Only */}
      {isSidebar && (
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e8ecef',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginBottom: '4px',
          }}>
            <div style={{
              fontSize: '1rem',
            }}>
              ⏱️
            </div>
            <h4 style={{
              margin: '0',
              color: '#2c3e50',
              fontSize: '0.8rem',
              fontWeight: '600',
            }}>
              Progress
            </h4>
          </div>
          <div style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#667eea',
            fontFamily: 'monospace',
            letterSpacing: '1px',
          }}>
            {formatTime(seconds)}
          </div>
        </div>
      )}
    </div>
  );

  // Mobile Compact Rules Component
  const MobileCompactRules = () => {
    const handleTabClick = (tab) => {
      if (mobileRulesExpanded && mobileActiveTab === tab) {
        // If clicking the same active tab when expanded, collapse
        setMobileRulesExpanded(false);
      } else {
        // If collapsed or clicking different tab, expand and switch
        setMobileActiveTab(tab);
        setMobileRulesExpanded(true);
      }
    };
    
    return (
      <div style={{
        background: '#ffffff',
        borderRadius: '8px',
        padding: '8px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        marginBottom: '8px',
        border: '1px solid #f1f3f4',
      }}>
        {/* Tab Headers */}
        <div style={{
          display: 'flex',
          gap: '4px',
          marginBottom: mobileRulesExpanded ? '8px' : '0',
        }}>
          <button
            onClick={() => handleTabClick('rules')}
            style={{
              flex: 1,
              padding: '6px 8px',
              fontSize: '0.75rem',
              fontWeight: '500',
              background: mobileActiveTab === 'rules' && mobileRulesExpanded ? 
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9fa',
              color: mobileActiveTab === 'rules' && mobileRulesExpanded ? 'white' : '#6c757d',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <FaBook style={{ fontSize: '0.7rem' }} />
            Rules
            <span style={{
              fontSize: '0.6rem',
              transition: 'transform 0.2s ease',
              transform: mobileRulesExpanded && mobileActiveTab === 'rules' ? 'rotate(180deg)' : 'rotate(0deg)',
            }}>
              ▼
            </span>
          </button>
          <button
            onClick={() => handleTabClick('tips')}
            style={{
              flex: 1,
              padding: '6px 8px',
              fontSize: '0.75rem',
              fontWeight: '500',
              background: mobileActiveTab === 'tips' && mobileRulesExpanded ? 
                'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)' : '#f8f9fa',
              color: mobileActiveTab === 'tips' && mobileRulesExpanded ? 'white' : '#6c757d',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <FaLightbulb style={{ fontSize: '0.7rem' }} />
            Tips
            <span style={{
              fontSize: '0.6rem',
              transition: 'transform 0.2s ease',
              transform: mobileRulesExpanded && mobileActiveTab === 'tips' ? 'rotate(180deg)' : 'rotate(0deg)',
            }}>
              ▼
            </span>
          </button>
        </div>

        {/* Tab Content - Only show when expanded */}
        {mobileRulesExpanded && (
          <div style={{
            minHeight: '60px',
            fontSize: '0.7rem',
            lineHeight: '1.4',
            color: '#5a6c7d',
          }}>
            {mobileActiveTab === 'rules' ? (
              <div>
                <div style={{ marginBottom: '4px', fontWeight: '600', color: '#2c3e50' }}>
                  Game Rules:
                </div>
                <div style={{ fontSize: '0.65rem' }}>
                  • Apply BODMAS rule: evaluate left to right in rows, top to bottom in columns<br/>
                  • Fill empty cells with digits 1-9 to complete all equations<br/>
                  • Each digit may appear only once per row or column equation
                </div>
              </div>
            ) : (
              <div>
                <div style={{ 
                  background: 'linear-gradient(135deg, #fff7e6 0%, #fef3e2 100%)',
                  borderRadius: '4px',
                  padding: '6px',
                  marginBottom: '6px',
                  border: '1px solid #f39c12',
                  fontSize: '0.65rem',
                }}>
                  <strong>💡 Pro Tip:</strong> Start with equations that have fewer unknowns!
                </div>
                <div style={{ fontSize: '0.65rem' }}>
                  • Follow BODMAS order: Division/Multiplication first, then Addition/Subtraction<br/>
                  • Process operations sequentially from left to right (rows) or top to bottom (columns)
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Mobile Input Panel Component
  const MobileInputPanel = () => (
    <div style={{
      background: '#ffffff',
      borderRadius: '8px',
      padding: '8px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      marginBottom: '8px',
      border: '1px solid #f1f3f4',
    }}>
      {/* Number Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '4px',
        marginBottom: '6px',
      }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            style={{
              width: '100%',
              height: '28px',
              fontSize: '0.8rem',
              fontWeight: '600',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              touchAction: 'manipulation',
              boxShadow: '0 1px 4px rgba(108, 117, 125, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#5a6268';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#6c757d';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {num}
          </button>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '4px',
      }}>
        <button
          onClick={handleDelete}
          style={{
            padding: '4px 2px',
            fontSize: '0.7rem',
            fontWeight: '600',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            touchAction: 'manipulation',
            height: '24px',
            boxShadow: '0 1px 4px rgba(220, 53, 69, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#c82333';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#dc3545';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MdDelete style={{ fontSize: '0.8rem' }} />
          Clear
        </button>
        
        <button
          onClick={handleReset}
          style={{
            padding: '4px 2px',
            fontSize: '0.7rem',
            fontWeight: '600',
            background: '#fd7e14',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            touchAction: 'manipulation',
            height: '24px',
            boxShadow: '0 1px 4px rgba(253, 126, 20, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e55a00';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fd7e14';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MdRefresh style={{ fontSize: '0.8rem' }} />
          Reset
        </button>
        
        <button
          onClick={checkSolution}
          style={{
            padding: '4px 2px',
            fontSize: '0.7rem',
            fontWeight: '600',
            background: '#198754',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            touchAction: 'manipulation',
            height: '24px',
            boxShadow: '0 1px 4px rgba(25, 135, 84, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#146c43';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#198754';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MdCheck style={{ fontSize: '0.8rem' }} />
          Submit
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
      fontFamily: "'Segoe UI', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '15px 10px',
    }}>
      {/* Warning Message */}
      {warningMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(220, 53, 69, 0.3)',
          zIndex: 1000,
          fontSize: '1rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'slideDown 0.3s ease-out',
          maxWidth: '90vw',
          textAlign: 'center',
        }}>
          <MdWarning style={{ fontSize: '1.2rem' }} />
          {warningMessage}
        </div>
      )}

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: window.innerWidth < 768 ? '5px' : '20px',
        color: '#495057',
        padding: window.innerWidth < 768 ? '0 10px' : '0 10px',
      }}>
        {/* Site Logo and Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: window.innerWidth < 768 ? '4px' : '8px',
          marginBottom: window.innerWidth < 768 ? '2px' : '4px',
        }}>
          <div style={{
            fontSize: window.innerWidth < 768 ? '1.2rem' : '2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            🧮
          </div>
          <h1 style={{
            fontSize: window.innerWidth < 768 ? 'clamp(1rem, 4vw, 1.2rem)' : 'clamp(1.5rem, 5vw, 2.2rem)',
            fontWeight: '400',
            margin: '0',
            letterSpacing: '0.2px',
            color: '#343a40',
          }}>
            BODMAS Challenge
          </h1>
        </div>
        {window.innerWidth >= 768 && (
          <p style={{
            fontSize: 'clamp(0.9rem, 3vw, 1rem)',
            opacity: 0.8,
            margin: '0',
            fontWeight: '400',
            letterSpacing: '0.2px',
          }}>
            Daily Mathematical Puzzle
          </p>
        )}
      </div>

      {/* Main Container - Single Column Layout */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 10px',
      }}>
        {/* Main Game Container */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          border: '1px solid #e9ecef',
        }}>
          {/* Game Header */}
          <div style={{
            background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
            padding: '12px 15px',
            color: 'white',
          }}>
            {/* Single Row Layout - Timer, Difficulty, and Social Share */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              {/* Timer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,0.15)',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: 'clamp(0.8rem, 3vw, 0.9rem)',
                fontWeight: '500',
                minWidth: 'fit-content',
              }}>
                <FaClock style={{ fontSize: '0.8rem' }} />
                <span style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>
                  {formatTime(seconds)}
                </span>
              </div>
              
              {/* Social Share - Center */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                flex: '1',
                minWidth: 'fit-content',
              }}>
                {[
                  { icon: FaFacebook, color: '#1877f2', platform: 'facebook' },
                  { icon: FaTwitter, color: '#1da1f2', platform: 'twitter' },
                  { icon: FaWhatsapp, color: '#25d366', platform: 'whatsapp' },
                  { icon: FaLinkedin, color: '#0077b5', platform: 'linkedin' }
                ].map(({ icon: Icon, color, platform }) => (
                  <Icon
                    key={platform}
                    onClick={() => shareOnSocialMedia(platform)}
                    style={{
                      fontSize: '1rem',
                      cursor: 'pointer',
                      color,
                      background: 'white',
                      borderRadius: '50%',
                      padding: '6px',
                      width: '28px',
                      height: '28px',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                    }}
                    onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                    onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ))}
              </div>

              {/* Difficulty - Right */}
              <div style={{ minWidth: 'fit-content' }}>
                <DifficultyLevel blanksLeft={blanksLeft} />
              </div>
            </div>
          </div>

          {/* Game Board */}
          <div style={{ 
            padding: '12px'
          }} ref={puzzleRef}>
            {/* Compact Rules - Always at top */}
            <div style={{
              marginBottom: '8px',
            }}>
              <MobileCompactRules />
            </div>

            {/* Puzzle Grid */}
            <div style={{
              background: '#ffffff',
              borderRadius: '8px',
              padding: window.innerWidth < 768 ? '10px' : '15px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              marginBottom: window.innerWidth < 768 ? '10px' : '15px',
              border: '1px solid #f1f3f4',
            }}>
              <table style={{
                borderCollapse: 'collapse',
                margin: '0 auto',
                fontSize: 'clamp(0.8rem, 3vw, 1rem)',
              }}>
                <tbody>
                  {config.grid.map((row, rowIndex) => (
                    <Fragment key={`row-${rowIndex}`}>
                      <tr>
                        {row.map((cell, colIndex) => {
                          const cellId = `cell-${rowIndex + 1}-${colIndex + 1}`;
                          const isFixed = cell.fixed;
                          
                          return (
                            <Fragment key={`cell-${rowIndex}-${colIndex}`}>
                              <td style={{ padding: '4px' }}>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  pattern="[1-9]"
                                  id={cellId}
                                  style={{
                                    width: 'clamp(35px, 8vw, 45px)',
                                    height: 'clamp(35px, 8vw, 45px)',
                                    textAlign: 'center',
                                    fontSize: 'clamp(1rem, 4vw, 1.3rem)',
                                    fontWeight: '500',
                                    border: isFixed ? '1px solid #dee2e6' : 
                                      selectedCell === cellId ? '2px solid #6c757d' : '1px solid #e9ecef',
                                    borderRadius: '6px',
                                    background: isFixed ? '#f8f9fa' : 
                                      selectedCell === cellId ? '#f1f3f4' : '#ffffff',
                                    color: isFixed ? '#6c757d' : '#495057',
                                    transition: 'all 0.2s ease',
                                    cursor: isFixed ? 'not-allowed' : 'pointer',
                                    boxShadow: selectedCell === cellId ? 
                                      '0 0 0 2px rgba(108, 117, 125, 0.2)' : 
                                      '0 1px 3px rgba(0,0,0,0.05)',
                                    fontFamily: 'inherit',
                                  }}
                                  value={cellValues[cellId]}
                                  disabled={isFixed}
                                  onChange={!isFixed ? (e) => handleCellChange(e, cellId) : undefined}
                                  onClick={!isFixed ? () => handleCellClick(cellId) : undefined}
                                  onFocus={!isFixed ? () => setSelectedCell(cellId) : undefined}
                                />
                              </td>
                              {colIndex < row.length - 1 && (
                                <td style={{
                                  padding: '4px',
                                  fontSize: 'clamp(1rem, 4vw, 1.2rem)',
                                  fontWeight: '500',
                                  color: '#495057',
                                  textAlign: 'center',
                                  minWidth: '20px',
                                }}>
                                  {config.rowOperators[rowIndex][colIndex]}
                                </td>
                              )}
                            </Fragment>
                          );
                        })}
                        <td style={{
                          padding: '4px 8px',
                          fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                          fontWeight: '500',
                          color: '#198754',
                          background: '#f8fff9',
                          borderRadius: '6px',
                          whiteSpace: 'nowrap',
                          border: '1px solid #d1e7dd',
                        }}>
                          = {config.rowTargets[rowIndex]}
                        </td>
                      </tr>
                      
                      {rowIndex < size - 1 && (
                        <tr>
                          {config.colOperators[rowIndex].map((operator, colIndex) => (
                            <Fragment key={`op-${rowIndex}-${colIndex}`}>
                              <td style={{
                                padding: '4px',
                                fontSize: 'clamp(1rem, 4vw, 1.2rem)',
                                fontWeight: '500',
                                color: '#495057',
                                textAlign: 'center',
                              }}>
                                {operator}
                              </td>
                              {colIndex < size - 1 && <td style={{ padding: '4px' }}></td>}
                            </Fragment>
                          ))}
                        </tr>
                      )}
                    </Fragment>
                  ))}
                  
                  <tr>
                    {config.colTargets.map((target, index) => (
                      <Fragment key={`col-target-${index}`}>
                        <td style={{
                          padding: '4px',
                          fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                          fontWeight: '500',
                          color: '#198754',
                          background: '#f8fff9',
                          borderRadius: '6px',
                          textAlign: 'center',
                          border: '1px solid #d1e7dd',
                        }}>
                          = {target}
                        </td>
                        {index < size - 1 && <td style={{ padding: '4px' }}></td>}
                      </Fragment>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Input Panel */}
            <MobileInputPanel />

            {/* Result Display */}
            {result && (
              <div style={{
                background: '#ffffff',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                marginBottom: '8px',
                border: '1px solid #f1f3f4',
                textAlign: 'center',
              }}>
                <div style={{
                  color: resultColor,
                  fontSize: 'clamp(0.85rem, 3vw, 1rem)',
                  fontWeight: '500',
                  lineHeight: '1.4',
                }}>
                  {result}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translate(-50%, -100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 767px) {
          .sidebar-rules {
            display: none !important;
          }
          .mobile-rules {
            display: block !important;
          }
        }

        @media (min-width: 768px) {
          .sidebar-rules {
            display: block !important;
          }
          .mobile-rules {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BODMASPuzzle;
