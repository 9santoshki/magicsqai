import React, { useState, useEffect } from 'react';
import BODMASPuzzle from './components/BODMASPuzzle';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [puzzleId, setPuzzleId] = useState(null);

  // Update document title based on current page
  useEffect(() => {
    switch (currentPage) {
      case 'about':
        document.title = 'About Magic Square - Mathematical Puzzle Game';
        break;
      case 'contact':
        document.title = 'Contact Us - Magic Square Puzzle';
        break;
      case 'home':
      default:
        document.title = 'Magic Square - Daily Mathematical Puzzle Game';
    }
  }, [currentPage]);

  // Parse puzzle ID from URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('puzzleId');
    if (idParam && !isNaN(idParam)) {
      setPuzzleId(parseInt(idParam, 10));
    }
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    // Clear puzzle ID when navigating away from home
    if (page !== 'home') {
      setPuzzleId(null);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return <BODMASPuzzle puzzleId={puzzleId} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
    }}>
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main style={{
        flex: 1,
        padding: currentPage === 'home' ? '0' : '20px 0',
      }}>
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
