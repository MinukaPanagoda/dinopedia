import React, { useState } from 'react';
import { Clock, Scale, Sparkles, Award, Gamepad2, Menu, X } from 'lucide-react';
import DinoSkull from './DinoSkull';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'age-of-dinosaurs', label: 'Age of Dinosaurs', icon: Clock },
    { id: 'compare', label: 'Compare Dinosaurs', icon: Scale },
    { id: 'discoveries', label: 'New Discoveries', icon: Sparkles },
    { id: 'quizzes', label: 'Quizzes', icon: Award },
    { id: 'entertainment', label: 'Entertainment', icon: Gamepad2 },
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
            <DinoSkull size={24} />
          </div>
          <div className="brand-text-wrap">
            <div className="brand-title">Dino<span>Pedia</span></div>
            <div className="brand-badge">Prehistoric Archive</div>
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
              </button>
            );
          })}
        </div>

        {/* Right Action Area - Mobile toggle */}
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
                style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
