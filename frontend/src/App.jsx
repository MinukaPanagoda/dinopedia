import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import { Compass, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('encyclopedia');
  const searchInputRef = useRef(null);

  const handleSearchClick = () => {
    setActiveTab('encyclopedia');
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="app-root">
      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSearchClick={handleSearchClick}
      />

      {/* Main Content */}
      <main>
        <HomePage 
          setActiveTab={setActiveTab} 
          searchInputRef={searchInputRef}
        />
      </main>

      {/* Footer */}
      <footer className="footer-wrap">
        <div className="footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F59E0B', fontWeight: '800', fontSize: '1.2rem' }}>
            <Compass size={22} /> DinoPedia
          </div>
          <p className="footer-desc">
            An open educational initiative dedicated to paleontology, fossil preservation, and exploring the wonders of the Mesozoic Era.
          </p>
          <p className="footer-copy">
            © {new Date().getFullYear()} DinoPedia • Built with React & Vite
          </p>
        </div>
      </footer>
    </div>
  );
}
