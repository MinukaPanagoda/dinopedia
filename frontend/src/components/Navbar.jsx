import React, { useState } from 'react';
import { Sparkles, BookOpen, Clock, Award, Scale, Search, Menu, X } from 'lucide-react';
import DinoSkull from './DinoSkull';

export default function Navbar({ activeTab, setActiveTab, onSearchClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'encyclopedia', label: 'Dinosaurs', icon: BookOpen },
    { id: 'periods', label: 'Eras & Timeline', icon: Clock },
    { id: 'quiz', label: 'Quiz Arena', icon: Award },
    { id: 'compare', label: 'Compare Lab', icon: Scale },
  ];

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        {/* Brand */}
        <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); setActiveTab('encyclopedia'); }}>
          <div className="nav-logo-icon">
            <DinoSkull size={24} />
          </div>
          <div className="brand-text-wrap">
            <div className="brand-title">Dino<span>Pedia</span></div>
            <div className="brand-badge">Prehistoric Archive</div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right CTA & Search */}
        <div className="nav-actions">
          <button className="nav-search-trigger" onClick={onSearchClick} title="Search prehistoric life">
            <Search size={15} />
            <span>Search species...</span>
          </button>

          <button 
            className="nav-cta-btn" 
            onClick={() => setActiveTab('quiz')}
          >
            <Sparkles size={16} />
            <span>Dino Quiz</span>
          </button>

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
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
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
