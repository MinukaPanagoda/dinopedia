import React, { useState, useEffect, useRef } from 'react';
import bgImage from '../assets/homepage_bg.jpg';
import { PRE_DINOSAUR_ERA, TIMELINE_PERIODS } from '../data/timeline';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Flame, 
  Globe2, 
  Wind, 
  Clock, 
  Compass, 
  ShieldAlert, 
  Info, 
  Layers,
  ArrowRight,
  BookOpen,
  Search,
  X,
  Zap,
  Swords
} from 'lucide-react';
import DinoSkull from './DinoSkull';
import DinoModal from './DinoModal';
import { DINOSAURS, PERIODS } from '../data/dinosaurs';

export default function HomePage({ 
  setActiveTab, 
  searchQuery = '', 
  setSearchQuery, 
  highlightedDinoId, 
  setHighlightedDinoId, 
  onCompareDino 
}) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [selectedDinoModal, setSelectedDinoModal] = useState(null);
  const [selectedEra, setSelectedEra] = useState('all'); // 'all', 'Triassic', 'Jurassic', 'Cretaceous'
  const [dietFilter, setDietFilter] = useState('all'); // 'all', 'Carnivore', 'Herbivore'
  const [cladeFilter, setCladeFilter] = useState('all'); // 'all', 'Theropod', 'Sauropod', 'Armored'
  const [sortBy, setSortBy] = useState('default');
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const searchInputRef = useRef(null);

  // Era color mapper
  const eraColors = {
    Triassic: '#F59E0B',
    Jurassic: '#10B981',
    Cretaceous: '#EC4899',
  };

  // Synchronize external searchQuery
  useEffect(() => {
    if (searchQuery !== undefined) {
      setLocalQuery(searchQuery);
    }
  }, [searchQuery]);

  // When a dinosaur is highlighted, ensure its era is active
  useEffect(() => {
    if (highlightedDinoId) {
      const target = DINOSAURS.find(d => d.id === highlightedDinoId);
      if (target && target.periodEra && selectedEra !== 'all' && selectedEra !== target.periodEra) {
        setSelectedEra(target.periodEra);
      }
    }
  }, [highlightedDinoId]);

  const handleQueryChange = (val) => {
    setLocalQuery(val);
    if (setSearchQuery) setSearchQuery(val);
    if (highlightedDinoId && setHighlightedDinoId) {
      setHighlightedDinoId(null);
    }
  };

  const handleResetSearch = () => {
    setLocalQuery('');
    if (setSearchQuery) setSearchQuery('');
    setSelectedEra('all');
    setDietFilter('all');
    setCladeFilter('all');
    setSortBy('default');
    if (setHighlightedDinoId) setHighlightedDinoId(null);
    searchInputRef.current?.focus();
  };

  // Era count helper
  const eraCounts = {
    all: DINOSAURS.length,
    Triassic: DINOSAURS.filter(d => d.periodEra === 'Triassic').length,
    Jurassic: DINOSAURS.filter(d => d.periodEra === 'Jurassic').length,
    Cretaceous: DINOSAURS.filter(d => d.periodEra === 'Cretaceous').length,
  };

  // Active era info from PERIODS data
  const currentPeriodInfo = PERIODS.find(p => p.id === selectedEra);

  // Dynamic filter matching era, diet, clade, search query, and sorting
  const filteredDinosaurs = DINOSAURS.filter(dino => {
    // 1. Era filter
    if (selectedEra !== 'all' && dino.periodEra !== selectedEra) {
      return false;
    }

    // 2. Diet filter
    if (dietFilter !== 'all') {
      if (dietFilter === 'Carnivore' && !(dino.diet && dino.diet.includes('Carnivore'))) {
        return false;
      }
      if (dietFilter === 'Herbivore' && dino.diet !== 'Herbivore') {
        return false;
      }
    }

    // 3. Clade filter
    if (cladeFilter !== 'all') {
      if (cladeFilter === 'Theropod' && !(dino.type === 'Theropod' || (dino.subType && dino.subType.toLowerCase().includes('theropod')))) {
        return false;
      }
      if (cladeFilter === 'Sauropod' && !(dino.type === 'Sauropod' || (dino.subType && dino.subType.toLowerCase().includes('sauropod')))) {
        return false;
      }
      if (cladeFilter === 'Armored' && !(dino.type === 'Thyreophoran' || dino.type === 'Ceratopsian' || dino.type === 'Pachycephalosaur')) {
        return false;
      }
    }

    // 4. Search query
    const q = localQuery.toLowerCase().trim();
    if (q) {
      const name = dino.name.toLowerCase();
      const meaning = (dino.meaning || '').toLowerCase();
      const type = (dino.type || '').toLowerCase();
      const subType = (dino.subType || '').toLowerCase();
      const diet = (dino.diet || '').toLowerCase();
      const period = (dino.period || '').toLowerCase();
      const era = (dino.periodEra || '').toLowerCase();
      const traits = (dino.traits || []).join(' ').toLowerCase();

      const matches = (
        name.includes(q) ||
        meaning.includes(q) ||
        type.includes(q) ||
        subType.includes(q) ||
        diet.includes(q) ||
        period.includes(q) ||
        era.includes(q) ||
        traits.includes(q) ||
        ((q === 't-rex' || q === 'trex' || q === 't rex') && name.includes('tyrannosaurus')) ||
        ((q === 'raptor' || q === 'raptors') && (name.includes('velociraptor') || subType.includes('raptor'))) ||
        ((q === 'bronto' || q === 'brontosaurus') && (name.includes('apatosaurus') || subType.includes('sauropod')))
      );
      if (!matches) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'length') return b.lengthM - a.lengthM;
    if (sortBy === 'weight') return b.weightTons - a.weightTons;
    if (sortBy === 'speed') return b.speedKmh - a.speedKmh;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // 5 Chronological Prehistoric Chapters
  const CHAPTERS = [
    {
      id: 'pre-dinosaur',
      number: '01',
      badge: 'Phase 0 // Pre-Dinosaur',
      shortTitle: 'Before Dinosaurs',
      span: PRE_DINOSAUR_ERA.timeSpan,
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.4)',
      icon: Flame,
      type: 'pre-dino'
    },
    {
      id: 'triassic',
      number: '02',
      badge: 'Dawn of Ruling Reptiles',
      shortTitle: 'Triassic Period',
      span: '252 – 201 MYA',
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.4)',
      icon: Clock,
      type: 'period',
      period: TIMELINE_PERIODS.find(p => p.id === 'triassic')
    },
    {
      id: 'jurassic',
      number: '03',
      badge: 'Golden Age of Giants',
      shortTitle: 'Jurassic Period',
      span: '201 – 145 MYA',
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)',
      icon: DinoSkull,
      type: 'period',
      period: TIMELINE_PERIODS.find(p => p.id === 'jurassic')
    },
    {
      id: 'cretaceous',
      number: '04',
      badge: 'Apex Diversity & Wonder',
      shortTitle: 'Cretaceous Period',
      span: '145 – 66 MYA',
      color: '#EF4444',
      glow: 'rgba(239, 68, 68, 0.4)',
      icon: Layers,
      type: 'period',
      period: TIMELINE_PERIODS.find(p => p.id === 'cretaceous')
    },
    {
      id: 'extinction-legacy',
      number: '05',
      badge: 'Living Avian Dynasty',
      shortTitle: 'Extinction & Birds',
      span: '66 MYA – Today',
      color: '#38BDF8',
      glow: 'rgba(56, 189, 248, 0.4)',
      icon: Globe2,
      type: 'period',
      period: TIMELINE_PERIODS.find(p => p.id === 'extinction-legacy')
    }
  ];

  const currentChapter = CHAPTERS[activeChapterIndex];

  const goToChapter = (index) => {
    if (index >= 0 && index < CHAPTERS.length) {
      setActiveChapterIndex(index);
      const stage = document.getElementById('timeline-stage');
      if (stage) {
        const yOffset = -85;
        const y = stage.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handleHeroExplore = () => {
    goToChapter(0);
  };

  return (
    <div className="home-root">
      {/* Hero Section */}
      <section 
        className="home-hero-section"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5, 8, 12, 0.75) 0%, rgba(5, 8, 12, 0.35) 25%, rgba(5, 8, 12, 0.2) 60%, rgba(8, 11, 14, 1) 100%), url(${bgImage})`,
          minHeight: '85vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1rem, 4vw, 1.5rem)',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', zIndex: 2 }}>
          <div className="section-tag" style={{ margin: '0 auto 1.25rem', justifyContent: 'center' }}>
            <Sparkles size={14} /> Chronological Earth Archive
          </div>

          <h1 
            className="hero-fixed-title"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.85rem, 5.5vw, 4.4rem)',
              fontWeight: '900',
              lineHeight: '1.18',
              letterSpacing: '-0.02em',
              color: '#FEF3C7',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 158, 11, 0.45)',
              marginBottom: '1.25rem'
            }}
          >
            Step into a world <span className="hero-title-gradient">ruled by giants</span>
          </h1>

          <p style={{ 
            fontSize: 'clamp(0.95rem, 2vw, 1.25rem)', 
            color: '#E5E7EB', 
            maxWidth: '720px', 
            margin: '0 auto 2.5rem',
            lineHeight: '1.6',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}>
            From the fiery ashes of the pre-dinosaur Paleozoic world to the golden age of Jurassic titans. Journey across 500 million years of evolutionary wonder.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={handleHeroExplore}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.85rem 1.85rem',
                fontSize: '1rem',
                fontWeight: '700',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#000',
                boxShadow: '0 0 25px rgba(245, 158, 11, 0.45)',
                cursor: 'pointer'
              }}
            >
              <BookOpen size={18} />
              <span>Explore Prehistoric Chapters</span>
              <ChevronDown size={18} />
            </button>

            {setActiveTab && (
              <button 
                onClick={() => setActiveTab('compare')}
                className="btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.85rem 1.85rem',
                  fontSize: '1rem',
                  fontWeight: '700',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer'
                }}
              >
                <span>Compare Dinosaurs</span>
                <ArrowRight size={16} />
              </button>
            )}

            <button 
              onClick={() => {
                const archiveSection = document.getElementById('dino-archive-section');
                if (archiveSection) {
                  archiveSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setTimeout(() => searchInputRef.current?.focus(), 300);
                }
              }}
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.85rem 1.85rem',
                fontSize: '1rem',
                fontWeight: '700',
                borderRadius: '9999px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#FEF3C7',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer'
              }}
            >
              <Search size={16} />
              <span>Search All Dinosaurs</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MESOZOIC DINOSAUR SPECIMEN ARCHIVE & SEARCH SECTION
          ========================================================================= */}
      <section id="dino-archive-section" className="home-archive-section">
        <div className="home-archive-header">
          <div className="section-tag" style={{ margin: '0 auto 0.75rem', justifyContent: 'center' }}>
            <DinoSkull size={15} /> Authenticated Specimen Registry
          </div>
          <h2 className="home-archive-title">
            Mesozoic Dinosaur <span>Specimen Archive</span>
          </h2>
          <p className="home-archive-subtitle">
            Filter through 180 million years of dinosaur evolution. Select a geological epoch below, refine by feeding habits or anatomical clades, or search directly by specimen name.
          </p>
        </div>

        {/* 1. Grand Era Selection Cards Deck */}
        <div className="era-selector-grid">
          {/* Card: All Eras */}
          <button
            type="button"
            className={`era-card-button ${selectedEra === 'all' ? 'active' : ''}`}
            style={{
              '--era-theme': '#38BDF8',
              '--era-glow': 'rgba(56, 189, 248, 0.35)'
            }}
            onClick={() => setSelectedEra('all')}
          >
            <div className="era-card-top">
              <div className="era-card-icon-wrap" style={{ color: '#38BDF8' }}>
                🌍
              </div>
              <span className="era-card-count">{eraCounts.all} Specimens</span>
            </div>
            <div className="era-card-name">All Mesozoic Eras</div>
            <div className="era-card-dates">252 – 66 MYA</div>
            <p className="era-card-tagline">
              Complete Triassic, Jurassic & Cretaceous archives
            </p>
          </button>

          {/* Period Cards: Triassic, Jurassic, Cretaceous */}
          {PERIODS.map(period => {
            const isSelected = selectedEra === period.id;
            return (
              <button
                key={period.id}
                type="button"
                className={`era-card-button ${isSelected ? 'active' : ''}`}
                style={{
                  '--era-theme': period.color,
                  '--era-glow': period.bgGlow
                }}
                onClick={() => setSelectedEra(period.id)}
              >
                <div className="era-card-top">
                  <div className="era-card-icon-wrap">
                    {period.icon}
                  </div>
                  <span className="era-card-count">
                    {eraCounts[period.id] || 0} Specimens
                  </span>
                </div>
                <div className="era-card-name">{period.name} Period</div>
                <div className="era-card-dates">{period.dates}</div>
                <p className="era-card-tagline">
                  {period.highlight}
                </p>
              </button>
            );
          })}
        </div>

        {/* 2. Era Intelligence & Planetary Environmental Banner */}
        {currentPeriodInfo && (
          <div 
            className="era-intel-banner"
            style={{
              '--era-theme': currentPeriodInfo.color,
              '--era-glow': currentPeriodInfo.bgGlow
            }}
          >
            <div className="era-intel-left">
              <div className="era-intel-badge-icon">
                {currentPeriodInfo.icon}
              </div>
              <div>
                <div className="era-intel-title-row">
                  <span className="era-intel-name">{currentPeriodInfo.full}</span>
                  <span className="era-intel-dates">{currentPeriodInfo.dates} ({currentPeriodInfo.spanMYA})</span>
                </div>
                <p className="era-intel-desc">
                  {currentPeriodInfo.description}
                </p>
              </div>
            </div>

            <div className="era-intel-stats">
              <div className="era-intel-stat-item">
                <span className="era-intel-stat-lbl">Planetary Climate</span>
                <span className="era-intel-stat-val">{currentPeriodInfo.climate}</span>
              </div>
              <div className="era-intel-stat-item">
                <span className="era-intel-stat-lbl">Atmosphere & Air</span>
                <span className="era-intel-stat-val">{currentPeriodInfo.atmosphere}</span>
              </div>
            </div>

            <button 
              type="button" 
              className="era-reset-btn"
              onClick={() => setSelectedEra('all')}
              title="Show all Mesozoic dinosaurs"
            >
              ✕ All Eras
            </button>
          </div>
        )}

        {/* 3. Search Bar Hub & Granular Sub-Filters */}
        <div className="home-search-hub">
          {/* Main Search Input */}
          <div className="home-search-input-wrap">
            <Search size={22} className="home-search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              value={localQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder={
                selectedEra === 'all'
                  ? "Search all dinosaurs by name, period, or diet... (e.g. T-Rex, Spinosaurus, Velociraptor)"
                  : `Search within the ${selectedEra} Period... (e.g. ${
                      selectedEra === 'Triassic' ? 'Herrerasaurus, Coelophysis' : 
                      selectedEra === 'Jurassic' ? 'Allosaurus, Brachiosaurus' : 
                      'T-Rex, Velociraptor, Spinosaurus'
                    })`
              }
              className="home-search-input"
              aria-label="Search dinosaur by name"
            />
            {localQuery && (
              <button 
                type="button" 
                onClick={handleResetSearch}
                className="home-search-clear"
                title="Clear search query"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sub-Filters: Diet, Clade & Sorting */}
          <div className="era-subfilters-row">
            {/* Feeding Habit / Diet Filter */}
            <div className="era-subfilter-group">
              <span className="era-subfilter-label">Diet:</span>
              {[
                { id: 'all', label: 'All' },
                { id: 'Carnivore', label: 'Carnivore 🥩' },
                { id: 'Herbivore', label: 'Herbivore 🌿' }
              ].map(d => (
                <button
                  key={d.id}
                  type="button"
                  className={`era-subfilter-pill ${dietFilter === d.id ? 'active' : ''}`}
                  onClick={() => setDietFilter(d.id)}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Anatomical Clade Filter */}
            <div className="era-subfilter-group">
              <span className="era-subfilter-label">Clade:</span>
              {[
                { id: 'all', label: 'All' },
                { id: 'Theropod', label: 'Theropods 🦖' },
                { id: 'Sauropod', label: 'Sauropods 🦕' },
                { id: 'Armored', label: 'Armored 🛡️' }
              ].map(c => (
                <button
                  key={c.id}
                  type="button"
                  className={`era-subfilter-pill ${cladeFilter === c.id ? 'active' : ''}`}
                  onClick={() => setCladeFilter(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown & Count Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="era-sort-select"
                aria-label="Sort dinosaurs"
              >
                <option value="default">Sort: Default</option>
                <option value="length">Length: Longest First</option>
                <option value="weight">Weight: Heaviest First</option>
                <option value="speed">Speed: Fastest First</option>
                <option value="name">Name: A to Z</option>
              </select>

              <div className="home-filter-stats-badge">
                <Sparkles size={14} />
                <span>
                  <strong>{filteredDinosaurs.length}</strong> {selectedEra === 'all' ? 'Mesozoic' : selectedEra} Specimens
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dinosaurs Grid */}
        {filteredDinosaurs.length > 0 ? (
          <div className="dinosaurs-grid">
            {filteredDinosaurs.map(dino => {
              const isHighlighted = highlightedDinoId === dino.id;
              const eraColor = eraColors[dino.periodEra] || '#F59E0B';

              return (
                <div 
                  key={dino.id} 
                  id={`dino-card-${dino.id}`}
                  className={`dino-card ${isHighlighted ? 'highlighted-dino-card' : ''}`}
                  style={{ position: 'relative' }}
                >
                  {isHighlighted && (
                    <div className="highlight-badge-pill">
                      <Sparkles size={12} />
                      <span>MATCHED SPECIMEN</span>
                    </div>
                  )}

                  <div className="dino-card-media">
                    <img 
                      src={dino.image} 
                      alt={dino.name} 
                      className="dino-card-img" 
                      loading="lazy" 
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1000&q=80';
                      }}
                    />
                    <div className="dino-media-overlay" />
                    <div className={`dino-diet-badge ${dino.diet}`}>
                      {dino.diet}
                    </div>
                  </div>

                  <div className="dino-card-body">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                      <span className="dino-period-tag" style={{ color: eraColor }}>
                        {dino.periodEra} Era • {dino.periodMYA}
                      </span>
                      <span className="dino-type-pill" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                        {dino.type}
                      </span>
                    </div>

                    <h3 className="dino-card-title">{dino.name}</h3>
                    <p className="dino-meaning">"{dino.meaning}"</p>
                    
                    <p className="dino-card-desc">
                      {dino.description}
                    </p>

                    {/* Anatomy / Metric Stats Row */}
                    <div className="dino-stats-row">
                      <div className="dino-stat-item">
                        <span className="dino-stat-val">{dino.lengthM} m</span>
                        <span className="dino-stat-lbl">Length</span>
                      </div>
                      <div className="dino-stat-item">
                        <span className="dino-stat-val">{dino.weightTons} t</span>
                        <span className="dino-stat-lbl">Weight</span>
                      </div>
                      <div className="dino-stat-item">
                        <span className="dino-stat-val">{dino.speedKmh} km/h</span>
                        <span className="dino-stat-lbl">Speed</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '0.65rem' }}>
                      <button
                        type="button"
                        className="dino-card-btn"
                        onClick={() => setSelectedDinoModal(dino)}
                        title={`Open detailed dossier for ${dino.name}`}
                        style={{ flex: 1 }}
                      >
                        <Zap size={14} />
                        <span>View Bio</span>
                      </button>

                      <button
                        type="button"
                        className="dino-card-btn"
                        onClick={() => {
                          if (onCompareDino) {
                            onCompareDino(dino.id);
                          } else if (setActiveTab) {
                            setActiveTab('compare');
                          }
                        }}
                        title={`Compare ${dino.name} against other titans`}
                        style={{
                          flex: '0 0 auto',
                          padding: '0.65rem 0.9rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderColor: 'rgba(255, 255, 255, 0.15)',
                          color: '#fff'
                        }}
                      >
                        <Swords size={14} />
                        <span>Compare</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'rgba(14, 20, 27, 0.5)',
            borderRadius: '20px',
            border: '1px dashed rgba(245, 158, 11, 0.3)',
            maxWidth: '650px',
            margin: '0 auto 4rem'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(245, 158, 11, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              color: 'var(--amber-primary)'
            }}>
              <DinoSkull size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '0.5rem' }}>
              No Prehistoric Specimens Found
            </h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              No dinosaur matches "{localQuery}". Try searching for <strong>Tyrannosaurus</strong>, <strong>T-Rex</strong>, <strong>Velociraptor</strong>, <strong>Spinosaurus</strong>, or <strong>Stegosaurus</strong>.
            </p>
            <button
              type="button"
              onClick={handleResetSearch}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.65rem 1.5rem',
                borderRadius: '999px',
                fontSize: '0.9rem',
                fontWeight: '700'
              }}
            >
              <X size={15} />
              <span>Reset Search & Filters</span>
            </button>
          </div>
        )}
      </section>

      {/* Main Chapter System Exhibit */}
      <main id="timeline-stage" className="timeline-stage-wrapper">
        
        {/* Section Header */}
        <div className="timeline-stage-header">
          <div className="section-tag" style={{ margin: '0 auto 0.75rem', justifyContent: 'center' }}>
            <Compass size={14} /> Interactive Geological Archive
          </div>
          <h2 className="timeline-stage-title">
            The Prehistoric Earth Journey
          </h2>
          <p className="timeline-stage-subtitle">
            Explore 500 million years chapter-by-chapter. Select an era below or use the next/previous controls to navigate through prehistoric time.
          </p>
        </div>

        {/* Sticky Chapter Navigation Bar (Tabs / Steps) */}
        <nav className="timeline-stepper-track" aria-label="Era Chapters">
          {CHAPTERS.map((chapter, idx) => {
            const Icon = chapter.icon;
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={chapter.id}
                className={`timeline-step-btn ${isActive ? 'active' : ''}`}
                style={{
                  '--step-color': chapter.color,
                  '--step-glow': chapter.glow
                }}
                onClick={() => goToChapter(idx)}
              >
                <div className="timeline-step-num">{chapter.number}</div>
                <Icon size={18} style={{ color: isActive ? chapter.color : 'inherit', flexShrink: 0 }} />
                <div className="timeline-step-info">
                  <span className="timeline-step-title">{chapter.shortTitle}</span>
                  <span className="timeline-step-span">{chapter.span}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Active Chapter Stage Display */}
        <div key={currentChapter.id} className="timeline-stage-content">
          
          {/* =================================================================
              CHAPTER 1: PRE-DINOSAUR EPOCH
              ================================================================= */}
          {currentChapter.type === 'pre-dino' && (
            <section id="pre-dinosaur" className="pre-dino-section" style={{ marginBottom: '2rem' }}>
              {/* Section Header */}
              <div className="pre-dino-header">
                <div className="pre-dino-tag">
                  <Flame size={14} /> Chapter 01 // Pre-Dinosaur Epoch
                </div>
                <h2 className="pre-dino-title">
                  {PRE_DINOSAUR_ERA.title}
                </h2>
                <div style={{ color: 'var(--amber-light)', fontWeight: '700', fontSize: '1.15rem', marginBottom: '1rem' }}>
                  {PRE_DINOSAUR_ERA.subtitle}
                </div>
                <p className="pre-dino-overview">
                  {PRE_DINOSAUR_ERA.overview}
                </p>
              </div>

              {/* Planetary & Atmospheric Baseline */}
              <div className="paleo-stats-bar">
                <div className="paleo-stat-item">
                  <span className="paleo-stat-label">Geological Era</span>
                  <span className="paleo-stat-val">{PRE_DINOSAUR_ERA.era} ({PRE_DINOSAUR_ERA.timeSpan})</span>
                </div>
                <div className="paleo-stat-item">
                  <span className="paleo-stat-label">Atmosphere & Air</span>
                  <span className="paleo-stat-val">{PRE_DINOSAUR_ERA.atmosphere}</span>
                </div>
                <div className="paleo-stat-item">
                  <span className="paleo-stat-label">Supercontinent</span>
                  <span className="paleo-stat-val">{PRE_DINOSAUR_ERA.supercontinent}</span>
                </div>
                <div className="paleo-stat-item">
                  <span className="paleo-stat-label">Planetary Climate</span>
                  <span className="paleo-stat-val">{PRE_DINOSAUR_ERA.climate}</span>
                </div>
              </div>

              {/* Era Visual Banner */}
              {PRE_DINOSAUR_ERA.image && (
                <div className="era-visual-banner">
                  <div className="era-image-wrapper">
                    <img 
                      src={PRE_DINOSAUR_ERA.image} 
                      alt={PRE_DINOSAUR_ERA.imageAlt} 
                      className="era-image-photo" 
                      loading="lazy"
                    />
                    <div className="era-image-overlay" />
                    <div className="era-image-badge">
                      <Sparkles size={14} /> Paleozoic Primeval Panorama • 541–252 MYA
                    </div>
                  </div>
                  <div className="era-image-caption">
                    <Info size={16} className="era-caption-icon" />
                    <span>{PRE_DINOSAUR_ERA.imageCaption}</span>
                  </div>
                </div>
              )}

              {/* 4 Landmark Pre-Dinosaur Epochs */}
              <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#fff', marginBottom: '0.4rem' }}>
                  The 4 Evolutionary Chapters Leading to Dinosaurs
                </h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.92rem' }}>
                  How life evolved from simple sea organisms into towering terrestrial predators
                </p>
              </div>

              <div className="paleo-epoch-grid">
                {PRE_DINOSAUR_ERA.keyMilestones.map((milestone, idx) => (
                  <div key={idx} className="paleo-epoch-card">
                    <div>
                      <div className="paleo-epoch-badge">{milestone.mya}</div>
                      <h4 className="paleo-epoch-name">{milestone.period}</h4>
                      <div className="paleo-epoch-tagline">{milestone.tagline}</div>
                      <p className="paleo-epoch-desc">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prehistoric Creatures Spotlight (Not Dinosaurs!) */}
              <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#fff', marginBottom: '0.4rem' }}>
                  Titans of the Ancient Earth (The Non-Dinosaurs)
                </h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.92rem' }}>
                  Famous prehistoric animals that ruled Earth millions of years before dinosaurs existed
                </p>
              </div>

              <div className="pre-creatures-grid">
                {PRE_DINOSAUR_ERA.prehistoricCreatures.map((creature, idx) => (
                  <div key={idx} className="pre-creature-card">
                    <span className="pre-creature-not-dino-chip">
                      Stem-Mammal / Not a Dinosaur
                    </span>
                    <h4 className="pre-creature-name">{creature.name}</h4>
                    <div className="pre-creature-type">{creature.type} • {creature.period}</div>
                    <p className="pre-creature-desc">{creature.desc}</p>
                    
                    <div style={{ 
                      background: 'rgba(255,255,255,0.04)', 
                      borderLeft: '2px solid #38BDF8', 
                      padding: '0.5rem 0.75rem', 
                      borderRadius: '0 8px 8px 0',
                      fontSize: '0.8rem',
                      color: '#BAE6FD',
                      marginBottom: '1rem'
                    }}>
                      <Info size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                      {creature.notADinosaurNote}
                    </div>

                    <div className="pre-creature-meta">
                      <span><strong>Diet:</strong> {creature.diet}</span>
                      <span><strong>Length:</strong> {creature.length}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* The Great Dying (Permian-Triassic Extinction) Event Callout */}
              <div className="great-dying-box">
                <div className="great-dying-tag">
                  <ShieldAlert size={14} /> Planetary Cataclysm // 251.9 MYA
                </div>
                <h3 className="great-dying-title">
                  {PRE_DINOSAUR_ERA.theGreatDying.title}
                </h3>
                <div className="great-dying-casualties">
                  Casualties: {PRE_DINOSAUR_ERA.theGreatDying.casualties}
                </div>
                <p className="great-dying-text">
                  {PRE_DINOSAUR_ERA.theGreatDying.cause}
                </p>
                <div className="great-dying-verdict">
                  <strong>The Evolutionary Catalyst: </strong>
                  {PRE_DINOSAUR_ERA.theGreatDying.significance}
                </div>
              </div>
            </section>
          )}

          {/* =================================================================
              CHAPTERS 2 - 5: MESOZOIC & LEGACY PERIODS
              ================================================================= */}
          {currentChapter.type === 'period' && currentChapter.period && (
            <article 
              className="timeline-card"
              style={{ '--period-color': currentChapter.period.highlightColor, marginBottom: '2rem' }}
            >
              {/* Period Header */}
              <div className="period-card-header">
                <div>
                  <span className="period-tag-pill" style={{ borderColor: currentChapter.period.highlightColor, color: currentChapter.period.highlightColor }}>
                    Chapter {currentChapter.number} // {currentChapter.period.badge}
                  </span>
                  <h3 className="period-title">{currentChapter.period.title}</h3>
                </div>

                <div className="period-span-badge">
                  {currentChapter.period.spanMYA}
                </div>
              </div>

              {/* Period Geography, Climate & Key Event */}
              <div className="period-meta-grid">
                <div className="period-meta-item">
                  <span className="period-meta-label">
                    <Wind size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Climate & Atmosphere
                  </span>
                  <span className="period-meta-value">{currentChapter.period.climate}</span>
                </div>
                <div className="period-meta-item">
                  <span className="period-meta-label">
                    <Globe2 size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Geography & Continents
                  </span>
                  <span className="period-meta-value">{currentChapter.period.geography}</span>
                </div>
                <div className="period-meta-item">
                  <span className="period-meta-label">
                    <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Key Evolutionary Catalyst
                  </span>
                  <span className="period-meta-value">{currentChapter.period.keyEvent}</span>
                </div>
              </div>

              {/* Period Visual Panorama */}
              {currentChapter.period.image && (
                <div className="period-visual-card">
                  <div className="period-image-container">
                    <img 
                      src={currentChapter.period.image} 
                      alt={currentChapter.period.imageAlt || currentChapter.period.title} 
                      className="period-image-img"
                      loading="lazy"
                    />
                    <div className="period-image-overlay" />
                    <div className="period-image-badge" style={{ borderColor: currentChapter.period.highlightColor }}>
                      <span className="period-image-badge-dot" style={{ backgroundColor: currentChapter.period.highlightColor }} />
                      <span>{currentChapter.period.title} Panorama</span>
                      <span style={{ opacity: 0.5 }}>•</span>
                      <span style={{ color: currentChapter.period.highlightColor }}>{currentChapter.period.spanMYA}</span>
                    </div>
                  </div>
                  <div className="period-image-caption">
                    <Info size={16} style={{ color: currentChapter.period.highlightColor, flexShrink: 0, marginTop: '2px' }} />
                    <p>{currentChapter.period.imageCaption}</p>
                  </div>
                </div>
              )}

              {/* Main Period Description */}
              <p className="period-description">
                {currentChapter.period.description}
              </p>

              {/* Key Dinosaurs in this Era */}
              <div>
                <h4 className="period-dinos-title">
                  <DinoSkull size={18} />
                  <span>Key Evolutionary Specimens of the {currentChapter.period.title}</span>
                </h4>

                <div className="period-dinos-grid">
                  {currentChapter.period.dinosaurs.map((dino, dIdx) => {
                    // Match with DINOSAURS dataset if available
                    const matchedDino = DINOSAURS.find(d => 
                      d.name.toLowerCase().includes(dino.name.toLowerCase()) || 
                      dino.name.toLowerCase().includes(d.name.toLowerCase())
                    ) || {
                      id: dino.name.toLowerCase().replace(/\s+/g, '-'),
                      name: dino.name,
                      meaning: dino.role,
                      period: currentChapter.period.title,
                      periodEra: currentChapter.shortTitle.split(' ')[0],
                      periodMYA: currentChapter.span,
                      epoch: currentChapter.period.badge,
                      type: dino.role.includes('Carnivore') || dino.role.includes('Predator') ? 'Theropod' : 'Sauropod / Herbivore',
                      subType: dino.role,
                      diet: dino.role.includes('Carnivore') || dino.role.includes('Predator') ? 'Carnivore' : 'Herbivore',
                      lengthM: parseFloat(dino.size) || 9.0,
                      weightTons: 4.5,
                      speedKmh: 35,
                      image: currentChapter.period.image || 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1000&q=80',
                      description: `${dino.name} was a prominent prehistoric organism of the ${currentChapter.period.title}. ${dino.fact}`,
                      traits: [dino.role, dino.size, currentChapter.period.badge],
                      funFact: dino.fact
                    };

                    return (
                      <div 
                        key={dIdx} 
                        className="period-dino-card"
                        onClick={() => setSelectedDinoModal(matchedDino)}
                        style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}
                        title={`Click to open full fossil sheet for ${dino.name}`}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div className="period-dino-name">{dino.name}</div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--amber-primary)', fontWeight: '700' }}>⚡ View Bio</span>
                        </div>
                        <div className="period-dino-role">{dino.role}</div>
                        <div className="period-dino-size">{dino.size}</div>
                        <p className="period-dino-fact">{dino.fact}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          )}

          {/* Bottom Interactive Chapter Navigation Controls */}
          <div className="timeline-stage-nav-bar">
            {/* Previous Button */}
            <button
              className="timeline-stage-btn timeline-stage-btn-prev"
              onClick={() => goToChapter(activeChapterIndex - 1)}
              disabled={activeChapterIndex === 0}
              aria-label="Previous Chapter"
            >
              <ChevronLeft size={18} />
              <span>
                {activeChapterIndex > 0 
                  ? `Previous: ${CHAPTERS[activeChapterIndex - 1].shortTitle}` 
                  : 'Start of Timeline'}
              </span>
            </button>

            {/* Chapter Indicator Dots */}
            <div className="timeline-stage-indicator">
              <span className="timeline-stage-counter">
                Chapter {activeChapterIndex + 1} of {CHAPTERS.length}
              </span>
              <div className="timeline-stage-dots">
                {CHAPTERS.map((ch, idx) => (
                  <button
                    key={ch.id}
                    className={`timeline-stage-dot ${activeChapterIndex === idx ? 'active' : ''}`}
                    style={{ '--active-color': ch.color }}
                    onClick={() => goToChapter(idx)}
                    title={`Go to ${ch.shortTitle}`}
                    aria-label={`Go to chapter ${idx + 1}: ${ch.shortTitle}`}
                  />
                ))}
              </div>
            </div>

            {/* Next Button or Compare Dinosaurs on final page */}
            {activeChapterIndex < CHAPTERS.length - 1 ? (
              <button
                className="timeline-stage-btn timeline-stage-btn-next"
                style={{ '--btn-accent': CHAPTERS[activeChapterIndex + 1].color }}
                onClick={() => goToChapter(activeChapterIndex + 1)}
                aria-label="Next Chapter"
              >
                <span>Next: {CHAPTERS[activeChapterIndex + 1].shortTitle}</span>
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                className="timeline-stage-btn timeline-stage-btn-next"
                style={{ '--btn-accent': '#10B981' }}
                onClick={() => setActiveTab && setActiveTab('compare')}
                aria-label="Compare Dinosaurs"
              >
                <span>Compare Dinosaurs</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Dino Modal Bio Sheet */}
      {selectedDinoModal && (
        <DinoModal 
          dino={selectedDinoModal} 
          onClose={() => setSelectedDinoModal(null)} 
          onCompare={(d) => {
            setSelectedDinoModal(null);
            if (setActiveTab) setActiveTab('compare');
          }}
        />
      )}
    </div>
  );
}
