import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import html2canvas from 'html2canvas';
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaClock, FaCalculator, FaLightbulb, FaBook, FaExclamationTriangle, FaShare } from 'react-icons/fa';
import { MdRefresh, MdDelete, MdCheck, MdWarning, MdInfo } from 'react-icons/md';
import StarRating from './StarRating';
import ErrorPopup from './ErrorPopup';
import { puzzleConfigs } from './puzzleConfigs';

const urlToShare = 'https://magicsquare.live/';

// Function to get daily puzzle based on current date
const getDailyPuzzle = () => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  
  const yearSeed = today.getFullYear();
  const randomOffset = (yearSeed * 17 + 42) % puzzleConfigs.length;
  
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
  const [showRules, setShowRules] = useState(true);
  const [showHints, setShowHints] = useState(false);
  const [mobileRulesExpanded, setMobileRulesExpanded] = useState(true);
  const [mobileActiveTab, setMobileActiveTab] = useState('rules');
  const [warningMessage, setWarningMessage] = useState('');
  const [errorPopup, setErrorPopup] = useState({ message: '', isVisible: false, type: 'error' });
  const puzzleRef = useRef(null);
  const timerRef = useRef();

  // Initialize cell values from config
  const [cellValues, setCellValues] = useState(
    () => computeInitialCellValues(config)
  );

  const blanksLeft = config.difficulty;
  
  // Use difficulty directly from puzzle config (already in 1-5 scale)
  const difficultyStars = Math.max(1, Math.min(5, config.difficulty));

  // Show error popup
  const showErrorPopup = (message, type = 'error') => {
    setErrorPopup({ message, isVisible: true, type });
  };

  const closeErrorPopup = () => {
    setErrorPopup(prev => ({ ...prev, isVisible: false }));
  };

  // Legacy function for backward compatibility
  const showWarning = (message) => {
    showErrorPopup(message, 'error');
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

  // Check if number is allowed in the cell and return detailed error info
  const checkNumberAllowed = useCallback((number, cellId) => {
    const [_, row, col] = cellId.split('-').map(Number);
    const size = config.grid.length;

    // Check row constraint - each digit may appear only once per row equation
    for (let i = 1; i <= size; i++) {
      const rowCellId = `cell-${row}-${i}`;
      if (rowCellId !== cellId && cellValues[rowCellId] === number) {
        return { allowed: false, error: `Number ${number} already exists in row ${row}. Each digit may appear only once per row equation.` };
      }
    }

    // Check column constraint - each digit may appear only once per column equation
    for (let i = 1; i <= size; i++) {
      const colCellId = `cell-${i}-${col}`;
      if (colCellId !== cellId && cellValues[colCellId] === number) {
        return { allowed: false, error: `Number ${number} already exists in column ${col}. Each digit may appear only once per column equation.` };
      }
    }

    return { allowed: true, error: null };
  }, [cellValues, config.grid.length]);

  // Legacy function for backward compatibility
  const isNumberAllowed = useCallback((number, cellId) => {
    return checkNumberAllowed(number, cellId).allowed;
  }, [checkNumberAllowed]);

  // Handle cell selection
  const handleCellClick = (cellId) => {
    setSelectedCell(cellId);
  };

  // Handle number button click
  const handleNumberClick = (number) => {
    if (!selectedCell) {
      showErrorPopup('⚠️ Please select a cell first', 'error');
      return;
    }
    
    const validation = checkNumberAllowed(number, selectedCell);
    if (validation.allowed) {
      setCellValues(prev => ({ ...prev, [selectedCell]: number }));
      setSelectedCell(null);
    } else {
      showErrorPopup(`❌ Rule Violation: ${validation.error}`, 'error');
    }
  };

  // Handle cell input change
  const handleCellChange = (e, cellId) => {
    const value = e.target.value;
    
    // Only allow single digits 1-9 or empty
    if (value !== '' && (!/^[1-9]$/.test(value))) {
      showErrorPopup('❌ Please enter only single digits from 1 to 9', 'error');
      e.target.value = cellValues[cellId] || '';
      return;
    }

    if (value === '') {
      setCellValues(prev => ({ ...prev, [cellId]: value }));
    } else {
      const validation = checkNumberAllowed(parseInt(value), cellId);
      if (validation.allowed) {
        setCellValues(prev => ({ ...prev, [cellId]: value }));
      } else {
        showErrorPopup(`❌ Rule Violation: ${validation.error}`, 'error');
        // Prevent the duplicate input and revert to previous value
        setTimeout(() => {
          e.target.value = cellValues[cellId] || '';
        }, 0);
        return;
      }
    }
  };

  // Handle delete/clear
  const handleDelete = () => {
    if (selectedCell) {
      setCellValues(prev => ({ ...prev, [selectedCell]: '' }));
    } else {
      showErrorPopup('⚠️ Please select a cell first', 'error');
    }
  };

  // Handle reset
  const handleReset = () => {
    setCellValues(computeInitialCellValues(config));
    setSelectedCell(null);
    setResult('');
    setShowShareButtons(false);
    setIsPuzzleCompleted(false);
    setSeconds(0);
    setIsTimerRunning(true);
  };

  // Evaluate expression using BODMAS
  const evaluateExpression = (expression) => {
    try {
      return Function(`"use strict"; return (${expression})`)();
    } catch (error) {
      return null;
    }
  };

  // Check solution
  const checkSolution = () => {
    const size = config.grid.length;
    let allFilled = true;
    let allCorrect = true;

    // Check if all cells are filled
    for (let row = 1; row <= size; row++) {
      for (let col = 1; col <= size; col++) {
        const cellId = `cell-${row}-${col}`;
        if (!cellValues[cellId]) {
          allFilled = false;
          break;
        }
      }
      if (!allFilled) break;
    }

    if (!allFilled) {
      showErrorPopup('❌ Please complete all fields to validate your solution', 'error');
      setResult('Please complete all fields to validate your solution');
      setResultColor('#dc3545');
      return;
    }

    // Check if all digits 1-9 are used at least once
    const usedDigits = new Set();
    for (let row = 1; row <= size; row++) {
      for (let col = 1; col <= size; col++) {
        const cellId = `cell-${row}-${col}`;
        const value = cellValues[cellId];
        if (value) {
          usedDigits.add(parseInt(value));
        }
      }
    }

    const missingDigits = [];
    for (let digit = 1; digit <= 9; digit++) {
      if (!usedDigits.has(digit)) {
        missingDigits.push(digit);
      }
    }

    if (missingDigits.length > 0) {
      showErrorPopup(`❌ Rule Violation: Missing digits ${missingDigits.join(', ')}. All digits 1-9 must be used at least once in the overall square.`, 'error');
      setResult(`Missing digits: ${missingDigits.join(', ')}. All digits 1-9 must be used at least once.`);
      setResultColor('#dc3545');
      return;
    }

    // Check row equations
    for (let row = 1; row <= size; row++) {
      let expression = '';
      for (let col = 1; col <= size; col++) {
        const cellId = `cell-${row}-${col}`;
        expression += cellValues[cellId];
        if (col < size) {
          expression += config.rowOperators[row - 1][col - 1];
        }
      }
      
      const result = evaluateExpression(expression);
      const expected = config.rowTargets[row - 1];
      if (result !== expected) {
        showErrorPopup(`❌ Row ${row} equation is incorrect: ${expression} = ${result} (expected ${expected})`, 'error');
        setResult(`❌ Row ${row} equation is incorrect: ${expression} = ${result} (expected ${expected})`);
        setResultColor('#dc3545');
        return;
      }
    }

    // Check column equations
    for (let col = 1; col <= size; col++) {
      let expression = '';
      for (let row = 1; row <= size; row++) {
        const cellId = `cell-${row}-${col}`;
        expression += cellValues[cellId];
        if (row < size) {
          expression += config.colOperators[row - 1][col - 1];
        }
      }
      
      const result = evaluateExpression(expression);
      const expected = config.colTargets[col - 1];
      if (result !== expected) {
        showErrorPopup(`❌ Column ${col} equation is incorrect: ${expression} = ${result} (expected ${expected})`, 'error');
        setResult(`❌ Column ${col} equation is incorrect: ${expression} = ${result} (expected ${expected})`);
        setResultColor('#dc3545');
        return;
      }
    }

    // If we reach here, all equations are correct
        setResult('🎉 Congratulations! Puzzle solved correctly!\n\nDaily Challenge - Boost your Brainpower!\nReturn tomorrow for a new challenge!');
        setResultColor('#28a745');
        setShowShareButtons(true);
        setIsPuzzleCompleted(true);
  };

  // Share functionality
  const shareResult = async (platform) => {
    try {
      const message = isPuzzleCompleted 
        ? `🧮 I just solved today's Magic Square puzzle in ${formatTime(seconds)}! Can you beat my time?`
        : `🧮 Check out this amazing Magic Square puzzle! Test your mathematical skills.`;

      if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}&quote=${encodeURIComponent(message)}`, '_blank');
      } else if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(urlToShare)}`, '_blank');
      } else if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${message} ${urlToShare}`)}`,'_blank'  );
      } else if (platform === 'linkedin') {
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(urlToShare)}&title=${encodeURIComponent(message)}`, '_blank');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const size = config.grid.length;

  return (
    <div style={{
      fontFamily: "'Segoe UI', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: window.innerWidth < 768 ? '10px 5px' : '15px 10px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh',
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
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          border: '1px solid #dee2e6',
        }}>
          {/* Game Header */}
          <div style={{
            background: '#f8f9fa',
            padding: window.innerWidth < 768 ? '10px 12px' : '12px 15px',
            color: '#495057',
            borderBottom: '1px solid #e9ecef',
          }}>
            {/* BODMAS Challenge Heading */}
            <div style={{
              textAlign: 'center',
              marginBottom: '12px',
            }}>
              <h2 style={{
                margin: '0',
                fontSize: window.innerWidth < 768 ? '1.5rem' : '1.8rem',
                fontWeight: '700',
                color: '#2c3e50',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}>
                BODMAS Challenge
              </h2>
            </div>
            {/* Header Layout - Timer, Difficulty, and Challenge Friends */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: window.innerWidth < 768 ? '8px' : '10px',
            }}>
              {/* Timer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#ffffff',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #e9ecef',
              }}>
                <FaClock style={{ fontSize: '0.8rem', color: '#6c757d' }} />
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: window.innerWidth < 768 ? '0.8rem' : '0.9rem',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  color: '#495057',
                }}>
                  {formatTime(seconds)}
                </span>
              </div>

              {/* Challenge Friends */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: window.innerWidth < 768 ? '0.7rem' : '0.8rem',
                color: '#6c757d',
              }}>
                <FaShare style={{ fontSize: '0.7rem' }} />
                <span style={{ fontWeight: '1000' }}>Challenge your friends</span>
                <div style={{
                  display: 'flex',
                  gap: '4px',
                }}>
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
                        border: `1px solid ${color}20`,
                        borderRadius: '4px',
                        padding: '3px 4px',
                        cursor: 'pointer',
                        fontSize: window.innerWidth < 768 ? '0.7rem' : '0.8rem',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = color;
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.color = color;
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <Icon />
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: window.innerWidth < 768 ? '0.7rem' : '0.8rem',
                fontWeight: '500',
                color: '#6c757d',
              }}>
                <span>Difficulty:</span>
                <StarRating difficulty={difficultyStars} />
              </div>
            </div>
          </div>

          {/* Rules and Tips Tabs */}
          <div style={{
            background: '#f8f9fa',
            borderBottom: '1px solid #e9ecef',
          }}>
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #e9ecef',
            }}>
              {[
                { key: 'rules', label: 'Rules', icon: FaBook },
                { key: 'tips', label: 'Tips', icon: FaLightbulb },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setMobileActiveTab(key)}
                  style={{
                    flex: 1,
                    padding: window.innerWidth < 768 ? '6px 10px' : '8px 12px',
                    background: mobileActiveTab === key ? '#ffffff' : 'transparent',
                    color: mobileActiveTab === key ? '#667eea' : '#6c757d',
                    border: 'none',
                    borderBottom: mobileActiveTab === key ? '2px solid #667eea' : '2px solid transparent',
                    cursor: 'pointer',
                    fontSize: window.innerWidth < 768 ? '0.7rem' : '0.8rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon style={{ fontSize: '0.7rem' }} />
                  {label}
                </button>
              ))}
            </div>

            <div style={{
              padding: window.innerWidth < 768 ? '8px 10px' : '10px 12px',
              background: '#ffffff',
              minHeight: window.innerWidth < 768 ? '50px' : '60px',
              fontSize: window.innerWidth < 768 ? '0.65rem' : '0.7rem',
              lineHeight: '1.4',
              color: '#5a6c7d',
            }}>
              {mobileActiveTab === 'rules' ? (
                  <div>
                    <div style={{ marginBottom: '4px', fontWeight: '600', color: '#2c3e50' }}>
                      Rules:
                    </div>
                    <div style={{ fontSize: window.innerWidth < 768 ? '0.6rem' : '0.65rem' }}>
                      • Use BODMAS rule - left to right in rows and top to bottom in columns<br/>
                      • Fill the blanks with single digits from 1 to 9 to complete the equations<br/>
                      • Each digit can come only once in an equation of a row or column<br/>
                    </div>
                  </div>
              ) : (
                <div>
                  <div style={{ marginBottom: '4px', fontWeight: '600', color: '#2c3e50' }}>
                    Hints:
                  </div>
                  <div style={{ fontSize: window.innerWidth < 768 ? '0.6rem' : '0.65rem' }}>
                    • Use BODMAS rule to solve equations: LEFT to RIGHT in rows, TOP to BOTTOM in columns<br/>
                    • First solve Division (/) or Multiplication (*) (whichever comes first from left), then Addition (+) or Subtraction (-)<br/>
                    • Example: 7*5+4/2-1 = 35+4/2-1 = 35+2-1 = 37-1 = 36
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Game Grid */}
          <div style={{
            padding: window.innerWidth < 768 ? '10px' : '15px',
            background: '#ffffff',
          }}>
            <div ref={puzzleRef} style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: window.innerWidth < 768 ? '10px' : '15px',
            }}>
              <table style={{
                borderCollapse: 'separate',
                borderSpacing: window.innerWidth < 768 ? '2px' : '4px',
                background: 'transparent',
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
                              <td style={{ padding: window.innerWidth < 768 ? '2px' : '4px' }}>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  pattern="[1-9]"
                                  id={cellId}
                                  style={{
                                    width: window.innerWidth < 768 ? 'clamp(28px, 10vw, 35px)' : 'clamp(35px, 8vw, 45px)',
                                    height: window.innerWidth < 768 ? 'clamp(28px, 10vw, 35px)' : 'clamp(35px, 8vw, 45px)',
                                    textAlign: 'center',
                                    fontSize: window.innerWidth < 768 ? 'clamp(0.8rem, 4vw, 1rem)' : 'clamp(1rem, 4vw, 1.3rem)',
                                    fontWeight: '500',
                                    border: isFixed ? '1px solid #6c757d' : 
                                      selectedCell === cellId ? '2px solid #007bff' : '1px solid #000000',
                                    borderRadius: '4px',
                                    background: isFixed ? '#e9ecef' : 
                                      selectedCell === cellId ? '#e3f2fd' : '#ffffff',
                                    color: isFixed ? '#6c757d' : '#000000',
                                    transition: 'all 0.2s ease',
                                    cursor: isFixed ? 'not-allowed' : 'pointer',
                                    boxShadow: selectedCell === cellId ? 
                                      '0 0 0 2px rgba(0, 123, 255, 0.2)' : 'none',
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
                                  padding: window.innerWidth < 768 ? '2px' : '4px',
                                  fontSize: window.innerWidth < 768 ? 'clamp(0.8rem, 4vw, 1rem)' : 'clamp(1rem, 4vw, 1.2rem)',
                                  fontWeight: '500',
                                  color: '#495057',
                                  textAlign: 'center',
                                  minWidth: window.innerWidth < 768 ? '15px' : '20px',
                                }}>
                                  {config.rowOperators[rowIndex][colIndex]}
                                </td>
                              )}
                            </Fragment>
                          );
                        })}
                        <td style={{
                          padding: window.innerWidth < 768 ? '2px 4px' : '4px 8px',
                          fontSize: window.innerWidth < 768 ? 'clamp(0.7rem, 3vw, 0.9rem)' : 'clamp(0.9rem, 3vw, 1.1rem)',
                          fontWeight: '500',
                          color: '#000000',
                          background: '#ffffff',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap',
                          border: 'none',
                        }}>
                          = {config.rowTargets[rowIndex]}
                        </td>
                      </tr>
                      
                      {rowIndex < size - 1 && (
                        <tr>
                          {config.colOperators[rowIndex].map((operator, colIndex) => (
                            <Fragment key={`op-${rowIndex}-${colIndex}`}>
                              <td style={{
                                padding: window.innerWidth < 768 ? '2px' : '4px',
                                fontSize: window.innerWidth < 768 ? 'clamp(0.8rem, 4vw, 1rem)' : 'clamp(1rem, 4vw, 1.2rem)',
                                fontWeight: '500',
                                color: '#495057',
                                textAlign: 'center',
                              }}>
                                {operator}
                              </td>
                              {colIndex < size - 1 && <td style={{ padding: window.innerWidth < 768 ? '2px' : '4px' }}></td>}
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
                          padding: window.innerWidth < 768 ? '2px' : '4px',
                          fontSize: window.innerWidth < 768 ? 'clamp(0.7rem, 3vw, 0.9rem)' : 'clamp(0.9rem, 3vw, 1.1rem)',
                          fontWeight: '500',
                          color: '#000000',
                          background: '#ffffff',
                          borderRadius: '4px',
                          textAlign: 'center',
                          border: 'none',
                        }}>
                          = {target}
                        </td>
                        {index < size - 1 && <td style={{ padding: window.innerWidth < 768 ? '2px' : '4px' }}></td>}
                      </Fragment>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Number Input Panel */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: '8px',
              padding: window.innerWidth < 768 ? '8px' : '12px',
              marginBottom: window.innerWidth < 768 ? '10px' : '15px',
              border: '1px solid #e9ecef',
            }}>
              {/* Number Grid - Single Row */}
              <div style={{
                display: 'flex',
                gap: window.innerWidth < 768 ? '4px' : '6px',
                marginBottom: window.innerWidth < 768 ? '8px' : '10px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num.toString())}
                    style={{
                      minWidth: window.innerWidth < 768 ? '28px' : '32px',
                      height: window.innerWidth < 768 ? '28px' : '32px',
                      fontSize: window.innerWidth < 768 ? '0.8rem' : '0.9rem',
                      flex: '1',
                      fontWeight: '600',
                      background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 6px rgba(0, 123, 255, 0.2)',
                      touchAction: 'manipulation',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #0056b3 0%, #004085 100%)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 3px 8px rgba(0, 123, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 123, 255, 0.2)';
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
                gap: window.innerWidth < 768 ? '6px' : '8px',
              }}>
                <button
                  onClick={handleDelete}
                  style={{
                    padding: window.innerWidth < 768 ? '6px 3px' : '8px 4px',
                    fontSize: window.innerWidth < 768 ? '0.7rem' : '0.8rem',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    touchAction: 'manipulation',
                    height: window.innerWidth < 768 ? '28px' : '32px',
                    boxShadow: '0 2px 6px rgba(220, 53, 69, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #c82333 0%, #a71e2a 100%)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <MdDelete style={{ fontSize: window.innerWidth < 768 ? '0.8rem' : '0.9rem' }} />
                  Clear
                </button>
                
                <button
                  onClick={handleReset}
                  style={{
                    padding: window.innerWidth < 768 ? '6px 3px' : '8px 4px',
                    fontSize: window.innerWidth < 768 ? '0.7rem' : '0.8rem',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    touchAction: 'manipulation',
                    height: window.innerWidth < 768 ? '28px' : '32px',
                    boxShadow: '0 2px 6px rgba(108, 117, 125, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #e0a800 0%, #d39e00 100%)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <MdRefresh style={{ fontSize: window.innerWidth < 768 ? '0.8rem' : '0.9rem' }} />
                  Reset
                </button>
                
                <button
                  onClick={checkSolution}
                  style={{
                    padding: window.innerWidth < 768 ? '6px 3px' : '8px 4px',
                    fontSize: window.innerWidth < 768 ? '0.7rem' : '0.8rem',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #198754 0%, #146c43 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    touchAction: 'manipulation',
                    height: window.innerWidth < 768 ? '28px' : '32px',
                    boxShadow: '0 2px 6px rgba(25, 135, 84, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #146c43 0%, #0f5132 100%)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #198754 0%, #146c43 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <MdCheck style={{ fontSize: window.innerWidth < 768 ? '0.8rem' : '0.9rem' }} />
                  Submit
                </button>
              </div>
            </div>

            {/* Result Display */}
            {result && (
              <div style={{
                textAlign: 'center',
                padding: window.innerWidth < 768 ? '10px' : '12px',
                background: resultColor === '#28a745' ? '#d4edda' : '#f8d7da',
                color: resultColor,
                borderRadius: '8px',
                fontSize: window.innerWidth < 768 ? '0.8rem' : '0.9rem',
                fontWeight: '600',
                border: `1px solid ${resultColor === '#28a745' ? '#c3e6cb' : '#f5c6cb'}`,
              }}>
                {result}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Error Popup */}
      <ErrorPopup
        message={errorPopup.message}
        isVisible={errorPopup.isVisible}
        onClose={closeErrorPopup}
        type={errorPopup.type}
      />
    </div>
  );
};

export default BODMASPuzzle;
