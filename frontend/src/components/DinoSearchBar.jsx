import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, ChevronRight, Clock, Shield } from 'lucide-react';
import { DINOSAURS } from '../data/dinosaurs';
import DinoSkull from './DinoSkull';

export default function DinoSearchBar({ onSelectDino, placeholder = "Search dinosaurs... (Ctrl+K)" }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const mobileInputRef = useRef(null);

  // Era color mapper
  const eraColors = {
    Triassic: '#F59E0B',
    Jurassic: '#10B981',
    Cretaceous: '#EC4899',
  };

  // Filter dinosaurs with intelligent matching (supports T-Rex, raptor, periods, diets)
  const filteredDinos = query.trim() === '' ? [] : DINOSAURS.filter(dino => {
    const q = query.toLowerCase().trim();
    const name = dino.name.toLowerCase();
    const meaning = (dino.meaning || '').toLowerCase();
    const type = (dino.type || '').toLowerCase();
    const subType = (dino.subType || '').toLowerCase();
    const diet = (dino.diet || '').toLowerCase();
    const period = (dino.period || '').toLowerCase();
    const era = (dino.periodEra || '').toLowerCase();
    
    // Check direct matches
    if (name.includes(q) || meaning.includes(q) || type.includes(q) || 
        subType.includes(q) || diet.includes(q) || period.includes(q) || era.includes(q)) {
      return true;
    }

    // Common alias matching
    if ((q === 't-rex' || q === 'trex' || q === 't rex') && name.includes('tyrannosaurus')) {
      return true;
    }
    if ((q === 'raptor' || q === 'raptors') && (name.includes('velociraptor') || subType.includes('raptor'))) {
      return true;
    }
    if ((q === 'bronto' || q === 'brontosaurus') && (name.includes('apatosaurus') || subType.includes('sauropod'))) {
      return true;
    }

    return false;
  }).slice(0, 7);

  // Global keyboard shortcut: Ctrl+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setIsMobileSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle arrow key navigation in dropdown
  const handleKeyDownInput = (e) => {
    if (!isOpen || filteredDinos.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredDinos.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredDinos.length) % filteredDinos.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredDinos[selectedIndex]) {
        handleSelect(filteredDinos[selectedIndex]);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (dino) => {
    setIsOpen(false);
    setIsMobileSearchOpen(false);
    setQuery('');
    if (onSelectDino) {
      onSelectDino(dino);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="nav-search-container" ref={containerRef}>
      {/* Desktop Search Bar */}
      <div className="nav-search-box">
        <Search size={15} className="nav-search-icon" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDownInput}
          placeholder={placeholder}
          className="nav-search-input"
          aria-label="Search dinosaurs by name"
        />
        {query ? (
          <button 
            type="button" 
            onClick={handleClear} 
            className="nav-search-clear-btn" 
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        ) : (
          <kbd className="nav-search-kbd">Ctrl K</kbd>
        )}
      </div>

      {/* Mobile Search Toggle Icon */}
      <button 
        type="button" 
        className="nav-mobile-search-toggle"
        onClick={() => {
          setIsMobileSearchOpen(!isMobileSearchOpen);
          setTimeout(() => mobileInputRef.current?.focus(), 100);
        }}
        aria-label="Toggle mobile dinosaur search"
      >
        <Search size={18} />
      </button>

      {/* Mobile Floating Search Overlay */}
      {isMobileSearchOpen && (
        <div className="nav-mobile-search-overlay">
          <div className="nav-mobile-search-bar">
            <Search size={16} className="nav-search-icon" />
            <input
              ref={mobileInputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
                setSelectedIndex(0);
              }}
              placeholder="Search dinosaur by name..."
              className="nav-mobile-search-input"
              autoFocus
            />
            <button 
              type="button" 
              className="nav-search-clear-btn"
              onClick={() => {
                if (query) {
                  setQuery('');
                } else {
                  setIsMobileSearchOpen(false);
                }
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Live Search Results Dropdown */}
      {(isOpen || isMobileSearchOpen) && query.trim().length > 0 && (
        <div className="nav-search-dropdown">
          <div className="nav-search-dropdown-header">
            <span>Mesozoic Specimens</span>
            <span className="nav-search-count-badge">
              {filteredDinos.length} found
            </span>
          </div>

          {filteredDinos.length > 0 ? (
            <div className="nav-search-results-list">
              {filteredDinos.map((dino, idx) => {
                const eraColor = eraColors[dino.periodEra] || '#F59E0B';
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={dino.id}
                    className={`nav-search-item ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelect(dino)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="nav-search-item-img-wrap">
                      <img 
                        src={dino.image} 
                        alt={dino.name} 
                        className="nav-search-item-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }} 
                      />
                    </div>

                    <div className="nav-search-item-info">
                      <div className="nav-search-item-top">
                        <span className="nav-search-item-name">{dino.name}</span>
                        <span 
                          className="nav-search-item-era" 
                          style={{ borderColor: `${eraColor}40`, color: eraColor, background: `${eraColor}15` }}
                        >
                          {dino.periodEra}
                        </span>
                      </div>
                      
                      <div className="nav-search-item-meta">
                        <span className="nav-search-item-meaning">"{dino.meaning}"</span>
                        <span className="nav-search-bullet">•</span>
                        <span 
                          className="nav-search-diet-pill"
                          style={{
                            color: dino.diet === 'Carnivore' ? '#FCA5A5' : '#86EFAC'
                          }}
                        >
                          {dino.diet}
                        </span>
                        <span className="nav-search-bullet">•</span>
                        <span className="nav-search-item-length">{dino.lengthM}m</span>
                      </div>
                    </div>

                    <div className="nav-search-item-action">
                      <span className="nav-search-view-label">Highlight</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="nav-search-no-results">
              <DinoSkull size={28} className="nav-search-no-icon" />
              <p className="nav-search-no-text">No dinosaurs found matching "{query}"</p>
              <p className="nav-search-no-hint">Try searching for <strong>T-Rex</strong>, <strong>Spinosaurus</strong>, <strong>Velociraptor</strong>, or <strong>Stegosaurus</strong>.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
