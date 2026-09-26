import React, { useState } from 'react';
import bgImage from '../assets/homepage_bg.jpg';
import { PRE_DINOSAUR_ERA, TIMELINE_PERIODS } from '../data/timeline';
import { 
  Sparkles, 
  ChevronDown, 
  Flame, 
  Globe2, 
  Wind, 
  Clock, 
  Compass, 
  ShieldAlert, 
  Info, 
  Layers,
  ArrowRight
} from 'lucide-react';
import DinoSkull from './DinoSkull';

export default function HomePage({ setActiveTab }) {
  const [activeNav, setActiveNav] = useState('pre-dinosaur');

  const scrollToSection = (id) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for sticky nav
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
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
          padding: '4rem 1.5rem 5rem',
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
              fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
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
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
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
              onClick={() => scrollToSection('pre-dinosaur')}
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
              <span>Explore Pre-Dinosaur World</span>
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

      {/* Main Timeline Section */}
      <main className="timeline-main-container">
        {/* Sticky Timeline Navigator */}
        <div className="timeline-sticky-nav">
          <div className="timeline-nav-pills">
            <button 
              className={`timeline-pill-btn ${activeNav === 'pre-dinosaur' ? 'active' : ''}`}
              onClick={() => scrollToSection('pre-dinosaur')}
            >
              <Flame size={15} />
              <span>Before Dinosaurs</span>
            </button>

            <button 
              className={`timeline-pill-btn ${activeNav === 'triassic' ? 'active' : ''}`}
              onClick={() => scrollToSection('triassic')}
            >
              <Clock size={15} />
              <span>Triassic (252M)</span>
            </button>

            <button 
              className={`timeline-pill-btn ${activeNav === 'jurassic' ? 'active' : ''}`}
              onClick={() => scrollToSection('jurassic')}
            >
              <DinoSkull size={15} />
              <span>Jurassic (201M)</span>
            </button>

            <button 
              className={`timeline-pill-btn ${activeNav === 'cretaceous' ? 'active' : ''}`}
              onClick={() => scrollToSection('cretaceous')}
            >
              <Layers size={15} />
              <span>Cretaceous (145M)</span>
            </button>

            <button 
              className={`timeline-pill-btn ${activeNav === 'extinction-legacy' ? 'active' : ''}`}
              onClick={() => scrollToSection('extinction-legacy')}
            >
              <Globe2 size={15} />
              <span>Extinction & Birds</span>
            </button>
          </div>
        </div>

        {/* =================================================================
            1. PRE-DINOSAUR EPOCH (The World Before Dinosaurs)
            ================================================================= */}
        <section id="pre-dinosaur" className="pre-dino-section">
          {/* Section Header */}
          <div className="pre-dino-header">
            <div className="pre-dino-tag">
              <Flame size={14} /> Phase 0 // Pre-Dinosaur Epoch
            </div>
            <h2 className="pre-dino-title">
              {PRE_DINOSAUR_ERA.title}
            </h2>
            <div style={{ color: 'var(--amber-light)', fontWeight: '700', fontSize: '1.1rem', marginBottom: '1rem' }}>
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
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '0.4rem' }}>
              The 4 Evolutionary Chapters Leading to Dinosaurs
            </h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
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
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '0.4rem' }}>
              Titans of the Ancient Earth (The Non-Dinosaurs)
            </h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
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
                  fontSize: '0.78rem',
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

        {/* Section Divider */}
        <div className="timeline-section-divider">
          <div className="section-tag" style={{ justifyContent: 'center', margin: '0 auto 0.75rem' }}>
            <Compass size={14} /> The Mesozoic Era
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#fff', marginBottom: '0.5rem' }}>
            The Reign of the Dinosaurs
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Explore how dinosaurs conquered the Triassic, reached titanic heights in the Jurassic, and ruled supreme in the Cretaceous.
          </p>
        </div>

        {/* =================================================================
            2. THE MESOZOIC TIMELINE PERIODS (Triassic, Jurassic, Cretaceous, Legacy)
            ================================================================= */}
        <div className="timeline-periods-list">
          {TIMELINE_PERIODS.map((period) => (
            <article 
              key={period.id} 
              id={period.id}
              className="timeline-card"
              style={{ '--period-color': period.highlightColor }}
            >
              {/* Period Header */}
              <div className="period-card-header">
                <div>
                  <span className="period-tag-pill" style={{ borderColor: period.highlightColor, color: period.highlightColor }}>
                    {period.badge}
                  </span>
                  <h3 className="period-title">{period.title}</h3>
                </div>

                <div className="period-span-badge">
                  {period.spanMYA}
                </div>
              </div>

              {/* Period Geography, Climate & Key Event */}
              <div className="period-meta-grid">
                <div className="period-meta-item">
                  <span className="period-meta-label">
                    <Wind size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Climate & Atmosphere
                  </span>
                  <span className="period-meta-value">{period.climate}</span>
                </div>
                <div className="period-meta-item">
                  <span className="period-meta-label">
                    <Globe2 size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Geography & Continents
                  </span>
                  <span className="period-meta-value">{period.geography}</span>
                </div>
                <div className="period-meta-item">
                  <span className="period-meta-label">
                    <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Key Evolutionary Catalyst
                  </span>
                  <span className="period-meta-value">{period.keyEvent}</span>
                </div>
              </div>

              {/* Period Visual Panorama */}
              {period.image && (
                <div className="period-visual-card">
                  <div className="period-image-container">
                    <img 
                      src={period.image} 
                      alt={period.imageAlt || period.title} 
                      className="period-image-img"
                      loading="lazy"
                    />
                    <div className="period-image-overlay" />
                    <div className="period-image-badge" style={{ borderColor: period.highlightColor }}>
                      <span className="period-image-badge-dot" style={{ backgroundColor: period.highlightColor }} />
                      <span>{period.title} Landscape</span>
                      <span style={{ opacity: 0.5 }}>•</span>
                      <span style={{ color: period.highlightColor }}>{period.spanMYA}</span>
                    </div>
                  </div>
                  <div className="period-image-caption">
                    <Info size={16} style={{ color: period.highlightColor, flexShrink: 0, marginTop: '2px' }} />
                    <p>{period.imageCaption}</p>
                  </div>
                </div>
              )}

              {/* Main Period Description */}
              <p className="period-description">
                {period.description}
              </p>

              {/* Key Dinosaurs in this Era */}
              <div>
                <h4 className="period-dinos-title">
                  <DinoSkull size={18} />
                  <span>Key Evolutionary Specimens of the {period.title}</span>
                </h4>

                <div className="period-dinos-grid">
                  {period.dinosaurs.map((dino, dIdx) => (
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
          ))}
        </div>
      </main>
    </div>
  );
}
