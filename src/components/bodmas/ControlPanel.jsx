
import React from 'react';
import { MdDelete, MdRefresh, MdCheck } from 'react-icons/md';
import DraggableNumber from '../ui/DraggableNumber';

const ControlPanel = ({
  handleNumberClick,
  handleDelete,
  handleReset,
  checkSolution,
  isMobileView,
  setDragOverCell,
}) => {
  const isMobile = isMobileView; // Use isMobileView prop instead of local state
  
  // Slightly bigger sizing for mobile to utilize space
  const padding = isMobile ? '5px' : '10px';
  const marginBottom = isMobile ? '8px' : '12px';
  const gap = isMobile ? '3px' : '4px';
  const buttonGap = isMobile ? '4px' : '6px';
  
  return (
    <div style={{
      background: '#f8f9fa',
      borderRadius: '6px',
      padding: padding,
      marginBottom: marginBottom,
      border: '1px solid #e9ecef',
    }}>
      <div style={{
        display: 'flex',
        gap: gap,
        marginBottom: isMobile ? '5px' : '8px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative', // Needed for draggable elements positioning
      }}>
        {isMobile ? (
          // Draggable numbers for mobile
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <div key={num} style={{ position: 'relative', display: 'inline-block' }}>
              <DraggableNumber
                number={num.toString()}
                onDrop={(number, cellId) => {
                  // Call the handleNumberClick function with the target cell ID
                  handleNumberClick(number, cellId);
                }}
                isMobile={isMobile}
                setDragOverCell={setDragOverCell}
              />
            </div>
          ))
        ) : (
          // Regular buttons for desktop
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              style={{
                minWidth: isMobile ? '24px' : '28px',
                height: isMobile ? '24px' : '28px',
                fontSize: isMobile ? '0.7rem' : '0.8rem',
                flex: '1',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0, 123, 255, 0.2)',
                touchAction: 'manipulation',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #0056b3 0%, #004085 100%)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 123, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 123, 255, 0.2)';
              }}
              onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {num}
            </button>
          ))
        )}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: buttonGap,
      }}>
        <button
          onClick={handleDelete}
          style={{
            padding: isMobile ? '5px 2px' : '6px 3px',
            fontSize: isMobile ? '0.65rem' : '0.75rem',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
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
            height: isMobile ? '26px' : '28px',
            boxShadow: '0 1px 3px rgba(220, 53, 69, 0.2)',
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
          <MdDelete style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }} />
          Clear
        </button>
        
        <button
          onClick={handleReset}
          style={{
            padding: isMobile ? '5px 2px' : '6px 3px',
            fontSize: isMobile ? '0.65rem' : '0.75rem',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)',
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
            height: isMobile ? '26px' : '28px',
            boxShadow: '0 1px 3px rgba(108, 117, 125, 0.2)',
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
          <MdRefresh style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }} />
          Reset
        </button>
        
        <button
          onClick={checkSolution}
          style={{
            padding: isMobile ? '5px 2px' : '6px 3px',
            fontSize: isMobile ? '0.65rem' : '0.75rem',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)',  // Green gradient
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
            height: isMobile ? '26px' : '28px',
            boxShadow: '0 1px 3px rgba(40, 167, 69, 0.2)',  // Green shadow
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #1e7e34 0%, #155724 100%)';  // Darker green on hover
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)';  // Return to original green
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <MdCheck style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }} />
          Submit
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
