import React, { useState, useEffect, useRef, useCallback } from 'react';

import { MdWarning } from 'react-icons/md';

import StarRating from './StarRating';
import ErrorPopup from './ErrorPopup';
import { puzzleConfigs } from './puzzleConfigs';
import DailyChallengeInfo from './DailyChallengeInfo';
import PuzzleHeader from './bodmas/PuzzleHeader';
import RulesAndTips from './bodmas/RulesAndTips';
import PuzzleGrid from './bodmas/PuzzleGrid';
import ControlPanel from './bodmas/ControlPanel';
import ResultDisplay from './bodmas/ResultDisplay';
import './bodmas/BODMASPuzzle.css';

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
  const [mobileActiveTab, setMobileActiveTab] = useState('rules');
  const [warningMessage, setWarningMessage] = useState('');
  const [errorPopup, setErrorPopup] = useState({ message: '', isVisible: false, type: 'error' });
  const timerRef = useRef();
  const puzzleRef = useRef();

  // Initialize cell values from config
  const [cellValues, setCellValues] = useState(
    () => computeInitialCellValues(config)
  );

  const difficultyStars = Math.max(1, Math.min(5, config.difficulty));

  // Show error popup
  const showErrorPopup = (message, type = 'error') => {
    console.log('showErrorPopup called with:', { message, type });
    // Close any existing popup first
    setErrorPopup({ message: '', isVisible: false, type });
    // Set the new message in the next render cycle
    setTimeout(() => {
      setErrorPopup({ message, isVisible: true, type });
    }, 10);
  };

  const closeErrorPopup = () => {
    console.log('closeErrorPopup called');
    setErrorPopup({ message: '', isVisible: false, type: 'error' });
  };

  // Reset when config changes
  useEffect(() => {
    setCellValues(computeInitialCellValues(config));
    setSeconds(0);
    setIsTimerRunning(true);
    setSelectedCell(null);
    setResult('');
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

    // Check row constraint
    for (let i = 1; i <= size; i++) {
      const rowCellId = `cell-${row}-${i}`;
      if (rowCellId !== cellId && cellValues[rowCellId] && parseInt(cellValues[rowCellId]) === number) {
        console.log(`Found duplicate ${number} in row ${row} at cell ${rowCellId}`);
        return { allowed: false, error: `Number ${number} already exists in row ${row}.` };
      }
    }

    // Check column constraint
    for (let i = 1; i <= size; i++) {
      const colCellId = `cell-${i}-${col}`;
      if (colCellId !== cellId && cellValues[colCellId] && parseInt(cellValues[colCellId]) === number) {
        console.log(`Found duplicate ${number} in column ${col} at cell ${colCellId}`);
        return { allowed: false, error: `Number ${number} already exists in column ${col}.` };
      }
    }

    return { allowed: true, error: null };
  }, [cellValues, config.grid.length]);

  // Handle cell selection
  const handleCellClick = (cellId) => {
    setSelectedCell(cellId);
  };

  // Handle number button click
  const handleNumberClick = (number) => {
    console.log('handleNumberClick called with:', number);
    console.log('selectedCell:', selectedCell);
    
    if (!selectedCell) {
      console.log('No cell selected, showing error');
      showErrorPopup('⚠️ Please select a cell first', 'error');
      return;
    }
    
    console.log('Checking if number is allowed:', number, selectedCell);
    const validation = checkNumberAllowed(number, selectedCell);
    console.log('Validation result:', validation);
    
    if (validation.allowed) {
      console.log('Number allowed, setting cell value');
      setCellValues(prev => ({ ...prev, [selectedCell]: number.toString() }));
      setSelectedCell(null);
    } else {
      console.log('Number not allowed, showing error:', validation.error);
      showErrorPopup(`❌ Rule Violation: ${validation.error}`, 'error');
    }
  };

  // Handle cell input change
  const handleCellChange = (e, cellId) => {
    const value = e.target.value;
    
    if (value !== '' && (!/^[1-9]$/.test(value))) {
      showErrorPopup('❌ Please enter only single digits from 1 to 9', 'error');
      e.target.value = cellValues[cellId] || '';
      return;
    }

    if (value === '') {
      setCellValues(prev => ({ ...prev, [cellId]: value }));
    } else {
      const number = parseInt(value);
      const validation = checkNumberAllowed(number, cellId);
      if (validation.allowed) {
        setCellValues(prev => ({ ...prev, [cellId]: value }));
      } else {
        showErrorPopup(`❌ Rule Violation: ${validation.error}`, 'error');
        // Keep the previous value in the input field
        e.target.value = cellValues[cellId] || '';
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
    setSeconds(0);
    setIsTimerRunning(true);
  };

  // Evaluate expression using BODMAS
  const evaluateExpression = (expression) => {
    try {
      return Function(`"use strict"; return (${expression})`)();
    } catch {
      return null;
    }
  };

  // Check solution
  const checkSolution = () => {
    const size = config.grid.length;
    let allFilled = true;

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
      showErrorPopup(`❌ Rule Violation: Missing digits ${missingDigits.join(', ')}.`, 'error');
      setResult(`Missing digits: ${missingDigits.join(', ')}.`);
      setResultColor('#dc3545');
      return;
    }

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
        showErrorPopup(`❌ Row ${row} equation is incorrect.`, 'error');
        setResult(`❌ Row ${row} equation is incorrect.`);
        setResultColor('#dc3545');
        return;
      }
    }

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
        showErrorPopup(`❌ Column ${col} equation is incorrect.`, 'error');
        setResult(`❌ Column ${col} equation is incorrect.`);
        setResultColor('#dc3545');
        return;
      }
    }

    setResult('🎉 Congratulations! Puzzle solved correctly!\n\nDaily Challenge - Boost your Brainpower!\nReturn tomorrow for a new challenge!');
    setResultColor('#28a745');
  };

  // Share functionality
  const shareResult = async (platform) => {
    console.log('Sharing to', platform);
  };

  return (
    <div className="bodmas-puzzle-container" ref={puzzleRef}>
      {warningMessage && (
        <div className="warning-message">
          <MdWarning />
          {warningMessage}
        </div>
      )}

      <div className="bodmas-puzzle-main">
        <div className="bodmas-puzzle-game-container">
          <PuzzleHeader
            seconds={seconds}
            formatTime={formatTime}
            difficultyStars={difficultyStars}
            shareResult={shareResult}
          />
          <RulesAndTips
            mobileActiveTab={mobileActiveTab}
            setMobileActiveTab={setMobileActiveTab}
          />
          <PuzzleGrid
            config={config}
            cellValues={cellValues}
            selectedCell={selectedCell}
            handleCellChange={handleCellChange}
            handleCellClick={handleCellClick}
            setSelectedCell={setSelectedCell}
          />
          <ControlPanel
            handleNumberClick={handleNumberClick}
            handleDelete={handleDelete}
            handleReset={handleReset}
            checkSolution={checkSolution}
          />
          <ResultDisplay result={result} resultColor={resultColor} />
          <DailyChallengeInfo />
        </div>
      </div>

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