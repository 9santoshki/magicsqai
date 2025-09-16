import React, { useState } from 'react';
import BODMASPuzzle from './components/BODMASPuzzle';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return <BODMASPuzzle />;
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
