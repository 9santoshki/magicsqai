import React, { useState, useEffect, useRef } from 'react';

const DraggableNumber = ({ number, onDrop, isMobile, setDragOverCell }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [overCell, setOverCell] = useState(null); // Track which cell the number is over
  const buttonRef = useRef(null);

  const handleMouseDown = (e) => {
    if (!isMobile) return; // Only enable for mobile
    
    const rect = buttonRef.current.getBoundingClientRect();
    const startX = e.clientX || (e.touches && e.touches[0]?.clientX);
    const startY = e.clientY || (e.touches && e.touches[0]?.clientY);
    
    if (!startX || !startY) return; // Ensure we have valid coordinates
    
    setInitialPosition({
      x: startX - rect.left,
      y: startY - rect.top
    });
    
    setDragging(true);
  };

  const handleTouchStart = (e) => {
    // Note: We can't call preventDefault here due to passive event listener restrictions
    // The browser will handle touch events normally
    handleMouseDown(e.touches[0]);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e) => {
      e.preventDefault();
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
      
      if (clientX && clientY) {
        setPosition({
          x: clientX - initialPosition.x,
          y: clientY - initialPosition.y
        });
        
        // Find the cell that the number is hovering over
        const cells = document.querySelectorAll('input[id^="cell-"]');
        let closestCell = null;
        let minDistance = Infinity;
        
        cells.forEach(cell => {
          if (cell.disabled) return; // Skip disabled cells
          
          const cellRect = cell.getBoundingClientRect();
          const cellCenterX = cellRect.left + cellRect.width / 2;
          const cellCenterY = cellRect.top + cellRect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(clientX - cellCenterX, 2) + 
            Math.pow(clientY - cellCenterY, 2)
          );
          
          if (distance < minDistance && distance < 60) { // Smaller threshold for hover detection
            minDistance = distance;
            closestCell = cell;
          }
        });
        
        // Update the local state and the parent component
        if (closestCell) {
          setOverCell(closestCell.id);
          setDragOverCell(closestCell.id);
        } else {
          setOverCell(null);
          setDragOverCell(null);
        }
      }
    };

    const handleMouseUp = () => {
      // Find the closest cell to drop the number to
      const cells = document.querySelectorAll('input[id^="cell-"]');
      let closestCell = null;
      let minDistance = Infinity;
      
      cells.forEach(cell => {
        if (cell.disabled) return; // Skip disabled cells
        
        const cellRect = cell.getBoundingClientRect();
        const cellCenterX = cellRect.left + cellRect.width / 2;
        const cellCenterY = cellRect.top + cellRect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(position.x - cellCenterX, 2) + 
          Math.pow(position.y - cellCenterY, 2)
        );
        
        if (distance < minDistance && distance < 120) { // Increased threshold for better UX
          minDistance = distance;
          closestCell = cell;
        }
      });
      
      if (closestCell) {
        // Then call the onDrop function with both the number and the cell ID
        onDrop(number, closestCell.id);
      }
      
      // Clear the drag over state
      setDragOverCell(null);
      setDragging(false);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);

    // Prevent scrolling while dragging
    if (dragging) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      
      // Re-enable scrolling when drag ends
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      
      // Clear drag over state if unmounting during drag
      if (dragging) {
        setDragOverCell(null);
      }
    };
  }, [dragging, initialPosition, position, number, onDrop, setDragOverCell]);

  const buttonStyle = {
    position: dragging ? 'fixed' : 'static',
    left: dragging ? `${position.x}px` : 'auto',
    top: dragging ? `${position.y}px` : 'auto',
    zIndex: dragging ? 1000 : 'auto',
    minWidth: isMobile ? '36px' : '28px',
    height: isMobile ? '36px' : '28px',
    fontSize: isMobile ? '0.9rem' : '0.8rem',
    fontWeight: '600',
    background: dragging 
      ? 'linear-gradient(135deg, #0056b3 0%, #004085 100%)' // Darker when dragging
      : 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
    color: 'white',
    border: dragging ? '2px solid #ffffff' : 'none', // Add border when dragging
    borderRadius: '4px',
    cursor: dragging ? 'grabbing' : 'grab',
    transition: 'all 0.2s ease',
    boxShadow: dragging
      ? '0 8px 20px rgba(0, 123, 255, 0.5)' // Stronger shadow when dragging
      : '0 1px 3px rgba(0, 123, 255, 0.2)',
    touchAction: 'none', // Prevent default touch behaviors
    userSelect: 'none', // Prevent text selection
    pointerEvents: dragging ? 'none' : 'auto',
    transform: dragging ? 'scale(1.2)' : 'scale(1)', // More noticeable when dragging
    opacity: dragging ? 0.9 : 1, // Slightly transparent to allow seeing underlying content
  };

  return (
    <button
      ref={buttonRef}
      style={buttonStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      title={dragging ? `Dropping on Cell: ${overCell || 'None'}` : `Drag to place number ${number}`}
    >
      {number}
    </button>
  );
};

export default DraggableNumber;