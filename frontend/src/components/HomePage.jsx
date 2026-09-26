import React, { useState } from 'react';
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
  BookOpen
} from 'lucide-react';
import DinoSkull from './DinoSkull';

export default function HomePage({ setActiveTab }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

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
              color: '#FFFFFF',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 158, 11, 0.35)',
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
          </div>
        </div>
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
                  {currentChapter.period.dinosaurs.map((dino, dIdx) => (
                    <div key={dIdx} className="period-dino-card">
                      <div className="period-dino-name">{dino.name}</div>
                      <div className="period-dino-role">{dino.role}</div>
                      <div className="period-dino-size">{dino.size}</div>
                      <p className="period-dino-fact">{dino.fact}</p>
                    </div>
                  ))}
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
    </div>
  );
}
