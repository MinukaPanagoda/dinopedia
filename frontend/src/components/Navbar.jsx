import React, { useState } from 'react';
import { Clock, Menu, X, Sparkles } from 'lucide-react';
import DinoSkull from './DinoSkull';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        {/* Brand */}
        <a 
          href="#" 
          className="nav-brand" 
          onClick={(e) => { 
            e.preventDefault(); 
            handleNavClick('age-of-dinosaurs'); 
          }}
        >
          <div className="nav-logo-icon">
            <DinoSkull size={24} />
          </div>
          <div className="brand-text-wrap">
            <div className="brand-title">Dino<span>Pedia</span></div>
            <div className="brand-badge">Prehistoric Archive</div>
          </div>
        </a>

        {/* Desktop Navigation - Only Age of Dinosaurs */}
        <div className="nav-links">
          <button
            className={`nav-link-btn ${activeTab === 'age-of-dinosaurs' ? 'active' : ''}`}
            onClick={() => handleNavClick('age-of-dinosaurs')}
          >
            <Clock size={17} />
            <span>Age of Dinosaurs</span>
          </button>
        </div>

        {/* Right Action Area - Clean / Mobile toggle */}
        <div className="nav-actions">
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          padding: '1rem 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          marginTop: '0.75rem'
        }}>
          <button
            className={`nav-link-btn ${activeTab === 'age-of-dinosaurs' ? 'active' : ''}`}
            style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
            onClick={() => handleNavClick('age-of-dinosaurs')}
          >
            <Clock size={18} />
            <span>Age of Dinosaurs</span>
          </button>
        </div>
      )}
    </nav>
  );
}
