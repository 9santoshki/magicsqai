
import React, { Fragment } from 'react';

const PuzzleGrid = ({
  config,
  cellValues,
  selectedCell,
  handleCellChange,
  handleCellClick,
  setSelectedCell,
}) => {
  const size = config.grid.length;
  const isMobile = window.innerWidth < 768;

  // Calculate responsive sizes - slightly bigger for mobile to utilize space
  const cellSize = isMobile ? 'clamp(24px, 9vw, 32px)' : 'clamp(25px, 6vw, 35px)';
  const cellHeight = isMobile ? 'clamp(24px, 9vw, 32px)' : 'clamp(25px, 6vw, 35px)';
  const fontSize = isMobile ? 'clamp(0.8rem, 3.5vw, 1rem)' : 'clamp(0.8rem, 3vw, 1.1rem)';
  const operatorFontSize = isMobile ? 'clamp(0.8rem, 3.5vw, 1rem)' : 'clamp(0.8rem, 3vw, 1rem)';
  const targetFontSize = isMobile ? 'clamp(0.7rem, 3vw, 0.9rem)' : 'clamp(0.8rem, 2.5vw, 1rem)';
  const padding = isMobile ? '12px' : '15px';
  const tablePadding = isMobile ? '1.5px' : '2px';
  const rowMargin = isMobile ? '10px' : '12px';
  const borderSpacing = isMobile ? '1.5px' : '2px';
  const operatorMinWidth = isMobile ? '14px' : '15px';
  const targetPadding = isMobile ? '2px 3px' : '2px 4px';

  return (
    <div style={{
      padding: padding,
      background: '#ffffff',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: rowMargin,
      }}>
        <table style={{
          borderCollapse: 'separate',
          borderSpacing: borderSpacing,
          background: 'transparent',
          maxWidth: '100%',
          overflowX: 'auto',
          display: 'block',
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
                        <td style={{ padding: tablePadding }}>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[1-9]"
                            id={cellId}
                            style={{
                              width: cellSize,
                              height: cellHeight,
                              textAlign: 'center',
                              fontSize: fontSize,
                              fontWeight: '500',
                              border: isFixed ? '1px solid #6c757d' : 
                                selectedCell === cellId ? '2px solid #007bff' : '1px solid #000000',
                              borderRadius: '3px',
                              background: isFixed ? '#d1d5db' : // Darker background for fixed cells
                                selectedCell === cellId ? '#e3f2fd' : '#ffffff',
                              color: isFixed ? '#495057' : '#000000', // Darker text color for fixed cells
                              transition: 'all 0.2s ease',
                              cursor: isFixed ? 'not-allowed' : 'pointer',
                              boxShadow: selectedCell === cellId ? 
                                '0 0 0 2px rgba(0, 123, 255, 0.2)' : 'none',
                              fontFamily: 'inherit',
                              boxSizing: 'border-box',
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
                            padding: tablePadding,
                            fontSize: operatorFontSize,
                            fontWeight: '500',
                            color: '#495057',
                            textAlign: 'center',
                            minWidth: operatorMinWidth,
                          }}>
                            {config.rowOperators[rowIndex][colIndex]}
                          </td>
                        )}
                      </Fragment>
                    );
                  })}
                  <td style={{
                    padding: targetPadding,
                    fontSize: targetFontSize,
                    fontWeight: '500',
                    color: '#000000',
                    background: '#ffffff',
                    borderRadius: '3px',
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
                          padding: tablePadding,
                          fontSize: operatorFontSize,
                          fontWeight: '500',
                          color: '#495057',
                          textAlign: 'center',
                        }}>
                          {operator}
                        </td>
                        {colIndex < size - 1 && <td style={{ padding: tablePadding }}></td>}
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
                    padding: tablePadding,
                    fontSize: targetFontSize,
                    fontWeight: '500',
                    color: '#000000',
                    background: '#ffffff',
                    borderRadius: '3px',
                    textAlign: 'center',
                    border: 'none',
                  }}>
                    = {target}
                  </td>
                  {index < size - 1 && <td style={{ padding: tablePadding }}></td>}
                </Fragment>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PuzzleGrid;
