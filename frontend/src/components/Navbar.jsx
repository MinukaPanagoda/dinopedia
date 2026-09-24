import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import DinoSkull from './DinoSkull';

/**
 * Theropod 3-Toed Dino Claw Footprint
 */
function DinoClawPrint({ size = 15, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={`nav-claw-badge ${className}`}
    >
      <path d="M12 2C10.8 4.2 10.5 6.8 11.2 9.5C11.6 7.2 12.4 4.5 12 2Z" />
      <path d="M6 5.5C5.2 7.8 5.8 10.2 7.8 12C7 9.8 6.9 7.2 6 5.5Z" />
      <path d="M18 5.5C19.2 7.2 19.1 9.8 18.2 12C20.2 10.2 20.8 7.8 18 5.5Z" />
      <path d="M8.5 13C8.5 16.5 10 19.5 12 19.5C14 19.5 15.5 16.5 15.5 13C14.3 13.8 13.2 14.2 12 14.2C10.8 14.2 9.7 13.8 8.5 13Z" />
    </svg>
  );
}

/**
 * Prehistoric Dinosaur Egg Icon (for Quizzes)
 */
function DinoEggIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C7.5 2 4 8 4 14C4 18.5 7.5 22 12 22C16.5 22 20 18.5 20 14C20 8 16.5 2 12 2Z" />
      <path d="M8 12L11 14L9 16L14 15L16 17" strokeWidth="1.8" stroke="var(--amber-primary)" />
    </svg>
  );
}

/**
 * Paleontologist Fossil Pickaxe Icon (for Discoveries)
 */
function FossilPickIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4.5L19.5 9.5" />
      <path d="M17 7L6 18C5.2 18.8 4 18.8 3.2 18C2.4 17.2 2.4 16 3.2 15.2L14.2 4.2" />
      <path d="M16 3C19 2 22 3 22 3C22 3 21 6 20 9" stroke="var(--amber-primary)" />
    </svg>
  );
}

/**
 * Dinosaur Duel Horns / Scale (for Compare)
 */
function DinoDuelIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19L11 12M11 12C9 9 5 7 2 7C2 10 4 14 7 16L11 12Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M20 19L13 12M13 12C15 9 19 7 22 7C22 10 20 14 17 16L13 12Z" fill="currentColor" fillOpacity="0.25" />
      <circle cx="12" cy="12" r="2.5" fill="var(--amber-primary)" />
    </svg>
  );
}

/**
 * Jurassic Cinema / Film Icon (for Entertainment)
 */
function JurassicCinemaIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 9.5H22M2 14.5H22M7 4V20M17 4V20" />
      <circle cx="12" cy="12" r="1.5" fill="var(--amber-primary)" />
    </svg>
  );
}

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'age-of-dinosaurs', label: 'Age of Dinosaurs', icon: DinoSkull },
    { id: 'compare', label: 'Compare Dinosaurs', icon: DinoDuelIcon },
    { id: 'discoveries', label: 'New Discoveries', icon: FossilPickIcon },
    { id: 'quizzes', label: 'Quizzes', icon: DinoEggIcon },
    { id: 'entertainment', label: 'Entertainment', icon: JurassicCinemaIcon },
  ];

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
            <DinoSkull size={26} />
          </div>
          <div className="brand-text-wrap">
            <div className="brand-title">
              Dino<span>Pedia</span>
            </div>
            <div className="brand-badge">
              <Sparkles size={10} /> EST. 252M B.C. • MESOZOIC ARCHIVE
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {isActive && <DinoClawPrint size={14} />}
              </button>
            );
          })}
        </div>

        {/* Right Action Area - Mobile Menu Toggle */}
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
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                style={{ width: '100%', justifyContent: 'space-between', padding: '0.75rem 1rem' }}
                onClick={() => handleNavClick(item.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {isActive && <DinoClawPrint size={16} />}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
