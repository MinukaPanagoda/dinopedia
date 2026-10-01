import React, { useState } from 'react';
import { 
  MapPin, 
  Compass, 
  Sparkles, 
  Layers, 
  Globe, 
  Calendar, 
  Info, 
  X, 
  ChevronRight, 
  Zap, 
  Filter,
  Flame,
  Clock
} from 'lucide-react';
import { FOSSIL_DIG_SITES } from '../data/digSites';
import { DINOSAURS } from '../data/dinosaurs';
import DinoSkull from './DinoSkull';

export default function FossilDigMap({ onSelectDino, onOpenDinoModal }) {
  const [selectedSiteId, setSelectedSiteId] = useState(FOSSIL_DIG_SITES[0].id);
  const [activeEraFilter, setActiveEraFilter] = useState('All');
  const [activeContinentFilter, setActiveContinentFilter] = useState('All');
  const [hoveredSiteId, setHoveredSiteId] = useState(null);

  const selectedSite = FOSSIL_DIG_SITES.find(s => s.id === selectedSiteId) || FOSSIL_DIG_SITES[0];

  // Procedural Web Audio Radar Ping Sound
  const playRadarPing = (freq = 440) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.28);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.32);
    } catch {}
  };

  // Filter dig sites
  const filteredSites = FOSSIL_DIG_SITES.filter(site => {
    const matchesEra = activeEraFilter === 'All' || site.era === activeEraFilter;
    const matchesContinent = activeContinentFilter === 'All' || site.continent === activeContinentFilter;
    return matchesEra && matchesContinent;
  });

  // Get full dinosaur objects for the selected site
  const siteDinosaurs = (selectedSite.keySpecimenIds || [])
    .map(id => DINOSAURS.find(d => d.id === id))
    .filter(Boolean);

  const handleMarkerClick = (site) => {
    setSelectedSiteId(site.id);
    const eraFreqs = { Triassic: 520, Jurassic: 660, Cretaceous: 800 };
    playRadarPing(eraFreqs[site.era] || 600);
  };

  return (
    <div className="dig-map-root">
      {/* Map Control Bar: Filters & Specimen Counter */}
      <div className="dig-map-controls-bar">
        {/* Era Filter Pills */}
        <div className="dig-map-filter-group">
          <span className="dig-map-filter-lbl">
            <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />
            Geological Era:
          </span>
          {[
            { id: 'All', label: 'All Eras', icon: '🌍' },
            { id: 'Triassic', label: 'Triassic 🌋', color: '#F59E0B' },
            { id: 'Jurassic', label: 'Jurassic 🌿', color: '#10B981' },
            { id: 'Cretaceous', label: 'Cretaceous ☄️', color: '#EC4899' },
          ].map(e => (
            <button
              key={e.id}
              type="button"
              className={`dig-map-filter-pill ${activeEraFilter === e.id ? 'active' : ''}`}
              style={{
                '--pill-accent': e.color || '#38BDF8'
              }}
              onClick={() => setActiveEraFilter(e.id)}
            >
              {e.label}
            </button>
          ))}
        </div>

        {/* Continent Filter */}
        <div className="dig-map-filter-group">
          <span className="dig-map-filter-lbl">
            <Globe size={13} style={{ display: 'inline', marginRight: '4px' }} />
            Continent:
          </span>
          {['All', 'North America', 'South America', 'Africa', 'Eurasia', 'Australia'].map(c => (
            <button
              key={c}
              type="button"
              className={`dig-map-filter-pill ${activeContinentFilter === c ? 'active' : ''}`}
              onClick={() => setActiveContinentFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Live Dig Site Counter */}
        <div className="dig-map-counter-badge">
          <Compass size={14} className="dig-map-compass-spin" />
          <span>
            <strong>{filteredSites.length}</strong> Excavation Sites Active
          </span>
        </div>
      </div>

      {/* Main Map + Dossier Two-Column Layout */}
      <div className="dig-map-grid-container">
        {/* Left: Vector Prehistoric World Projection Stage */}
        <div className="dig-map-stage-card">
          <div className="dig-map-canvas-wrap">
            {/* World Vector Map SVG */}
            <svg 
              viewBox="0 0 1000 550" 
              className="dig-map-svg"
              aria-label="Interactive Paleontological World Map"
            >
              <defs>
                {/* Ambient ocean gradient */}
                <radialGradient id="oceanGlow" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#0B131C" />
                  <stop offset="100%" stopColor="#05080C" />
                </radialGradient>

                {/* Continental landmass gradient */}
                <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#15212E" />
                  <stop offset="100%" stopColor="#0F1822" />
                </linearGradient>

                {/* Radar Grid Pattern */}
                <pattern id="radarGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245, 158, 11, 0.05)" strokeWidth="0.8" />
                </pattern>
              </defs>

              {/* Background Oceans */}
              <rect width="1000" height="550" fill="url(#oceanGlow)" rx="16" />
              <rect width="1000" height="550" fill="url(#radarGrid)" rx="16" />

              {/* Latitude and Longitude Graticule Lines */}
              <g stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" strokeDasharray="4 4">
                {/* Equator */}
                <line x1="0" y1="275" x2="1000" y2="275" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.2" />
                {/* Tropic of Cancer & Capricorn */}
                <line x1="0" y1="180" x2="1000" y2="180" />
                <line x1="0" y1="370" x2="1000" y2="370" />
                {/* Prime Meridian & Meridians */}
                <line x1="500" y1="0" x2="500" y2="550" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.2" />
                <line x1="250" y1="0" x2="250" y2="550" />
                <line x1="750" y1="0" x2="750" y2="550" />
              </g>

              {/* Stylized Continents Outlines */}
              {/* North America */}
              <path
                d="M 120 70 Q 180 50 260 70 Q 300 120 280 180 Q 250 200 220 260 Q 180 270 140 230 Q 100 170 120 70 Z"
                fill="url(#landGrad)"
                stroke="rgba(245, 158, 11, 0.3)"
                strokeWidth="1.2"
                className="continent-shape"
              />
              {/* Greenland */}
              <path
                d="M 330 40 Q 380 45 370 85 Q 320 90 330 40 Z"
                fill="url(#landGrad)"
                stroke="rgba(245, 158, 11, 0.2)"
                strokeWidth="1"
              />
              {/* South America */}
              <path
                d="M 270 280 Q 360 290 370 370 Q 340 450 300 500 Q 270 450 260 380 Q 250 320 270 280 Z"
                fill="url(#landGrad)"
                stroke="rgba(245, 158, 11, 0.3)"
                strokeWidth="1.2"
                className="continent-shape"
              />
              {/* Eurasia (Europe + Asia) */}
              <path
                d="M 450 90 Q 550 60 750 70 Q 920 110 880 220 Q 820 280 720 270 Q 650 300 570 240 Q 480 220 450 160 Q 430 110 450 90 Z"
                fill="url(#landGrad)"
                stroke="rgba(245, 158, 11, 0.3)"
                strokeWidth="1.2"
                className="continent-shape"
              />
              {/* Africa */}
              <path
                d="M 460 210 Q 560 210 590 280 Q 580 370 520 440 Q 480 430 460 350 Q 430 280 460 210 Z"
                fill="url(#landGrad)"
                stroke="rgba(245, 158, 11, 0.3)"
                strokeWidth="1.2"
                className="continent-shape"
              />
              {/* Australia */}
              <path
                d="M 800 370 Q 900 360 920 420 Q 890 470 820 460 Q 780 430 800 370 Z"
                fill="url(#landGrad)"
                stroke="rgba(245, 158, 11, 0.3)"
                strokeWidth="1.2"
                className="continent-shape"
              />
              {/* Antarctica */}
              <path
                d="M 250 535 Q 500 520 750 535 Q 500 555 250 535 Z"
                fill="url(#landGrad)"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1"
              />

              {/* Geographic Labels */}
              <text x="190" y="150" fill="rgba(255, 255, 255, 0.2)" fontSize="13" fontWeight="700" letterSpacing="3">NORTH AMERICA</text>
              <text x="290" y="380" fill="rgba(255, 255, 255, 0.2)" fontSize="13" fontWeight="700" letterSpacing="3">SOUTH AMERICA</text>
              <text x="490" y="320" fill="rgba(255, 255, 255, 0.2)" fontSize="13" fontWeight="700" letterSpacing="3">AFRICA</text>
              <text x="680" y="160" fill="rgba(255, 255, 255, 0.2)" fontSize="13" fontWeight="700" letterSpacing="3">EURASIA</text>
              <text x="830" y="420" fill="rgba(255, 255, 255, 0.2)" fontSize="13" fontWeight="700" letterSpacing="3">AUSTRALIA</text>
            </svg>

            {/* Interactive HTML Marker Pins Overlaid on Coordinates */}
            <div className="dig-map-markers-layer">
              {filteredSites.map((site) => {
                const isSelected = selectedSiteId === site.id;
                const isHovered = hoveredSiteId === site.id;

                return (
                  <div
                    key={site.id}
                    className={`dig-map-marker-anchor ${isSelected ? 'selected' : ''}`}
                    style={{
                      left: `${site.coords.x}%`,
                      top: `${site.coords.y}%`,
                      '--site-color': site.color
                    }}
                    onClick={() => handleMarkerClick(site)}
                    onMouseEnter={() => setHoveredSiteId(site.id)}
                    onMouseLeave={() => setHoveredSiteId(null)}
                    title={`${site.name} (${site.region})`}
                  >
                    {/* Sonar Animated Radar Ring */}
                    <div className="dig-map-sonar-ring" />

                    {/* Central Pin Icon */}
                    <div className="dig-map-pin-badge">
                      <MapPin size={16} />
                    </div>

                    {/* Quick Pin Tag */}
                    <div className="dig-map-pin-tag">
                      <span className="dig-map-pin-tag-name">{site.name}</span>
                    </div>

                    {/* Hover Quick Card Popup */}
                    {(isHovered || isSelected) && (
                      <div className="dig-map-hover-card">
                        <div className="dig-map-hover-top">
                          <span className="dig-map-hover-era" style={{ color: site.color }}>
                            {site.era} • {site.periodMYA}
                          </span>
                          <span className="dig-map-hover-flag">{site.country}</span>
                        </div>
                        <div className="dig-map-hover-title">{site.name}</div>
                        <div className="dig-map-hover-specimens">
                          {site.keySpecimenIds.length} Key Specimens Excavated
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Map Footer Helper */}
          <div className="dig-map-stage-footer">
            <div className="dig-map-legend">
              <span className="dig-map-legend-item">
                <span className="dig-map-legend-dot" style={{ background: '#F59E0B' }} /> Triassic Sites (252–201 MYA)
              </span>
              <span className="dig-map-legend-item">
                <span className="dig-map-legend-dot" style={{ background: '#10B981' }} /> Jurassic Sites (201–145 MYA)
              </span>
              <span className="dig-map-legend-item">
                <span className="dig-map-legend-dot" style={{ background: '#EC4899' }} /> Cretaceous Sites (145–66 MYA)
              </span>
            </div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>
              💡 Click any pulsing pin to load its excavation dossier
            </div>
          </div>
        </div>

        {/* Right: Selected Dig Site Dossier Panel */}
        <aside className="dig-site-dossier-card">
          {/* Dossier Banner Media */}
          <div className="dossier-media-wrap">
            <img 
              src={selectedSite.image} 
              alt={selectedSite.name} 
              className="dossier-img"
              loading="lazy" 
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80';
              }}
            />
            <div className="dossier-media-overlay" />
            
            <div className="dossier-badges-top">
              <span 
                className="dossier-era-pill"
                style={{
                  background: `${selectedSite.color}25`,
                  color: selectedSite.color,
                  borderColor: `${selectedSite.color}50`
                }}
              >
                {selectedSite.era} Era • {selectedSite.periodMYA}
              </span>
              <span className="dossier-continent-pill">
                {selectedSite.continent}
              </span>
            </div>

            <div className="dossier-title-group">
              <h2 className="dossier-title">{selectedSite.name}</h2>
              <div className="dossier-location-row">
                <MapPin size={15} style={{ color: selectedSite.color }} />
                <span>{selectedSite.region}, <strong>{selectedSite.country}</strong></span>
              </div>
            </div>
          </div>

          {/* Dossier Body Details */}
          <div className="dossier-body">
            {/* Overview / Significance */}
            <p className="dossier-overview">
              {selectedSite.significance}
            </p>

            {/* Environmental & Stratigraphic Data */}
            <div className="dossier-stats-grid">
              <div className="dossier-stat-box">
                <span className="dossier-stat-lbl">Paleo-Environment</span>
                <span className="dossier-stat-val">{selectedSite.environment}</span>
              </div>
              <div className="dossier-stat-box">
                <span className="dossier-stat-lbl">Rock Stratigraphy</span>
                <span className="dossier-stat-val">{selectedSite.rockType}</span>
              </div>
              <div className="dossier-stat-box" style={{ gridColumn: 'span 2' }}>
                <span className="dossier-stat-lbl">Historical Landmark</span>
                <span className="dossier-stat-val">{selectedSite.historicYear}</span>
              </div>
            </div>

            {/* Breakthrough Fact Alert Box */}
            <div className="dossier-alert-box" style={{ borderColor: `${selectedSite.color}40` }}>
              <div className="dossier-alert-header" style={{ color: selectedSite.color }}>
                <Sparkles size={14} />
                <span>Field Excavation Highlight</span>
              </div>
              <p className="dossier-alert-text">
                {selectedSite.highlightFact}
              </p>
            </div>

            {/* Key Dinosaurs Unearthed Here */}
            <div className="dossier-dinosaurs-section">
              <h3 className="dossier-dinosaurs-title">
                <DinoSkull size={17} style={{ color: 'var(--amber-primary)' }} />
                <span>Prominent Dinosaurs Unearthed Here ({siteDinosaurs.length})</span>
              </h3>

              {siteDinosaurs.length > 0 ? (
                <div className="dossier-dino-list">
                  {siteDinosaurs.map(dino => (
                    <div 
                      key={dino.id}
                      className="dossier-dino-row"
                      onClick={() => onOpenDinoModal && onOpenDinoModal(dino)}
                      title={`Open full fossil dossier for ${dino.name}`}
                    >
                      <div className="dossier-dino-img-wrap">
                        <img 
                          src={dino.image} 
                          alt={dino.name} 
                          className="dossier-dino-thumb" 
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                      
                      <div className="dossier-dino-info">
                        <div className="dossier-dino-name-row">
                          <span className="dossier-dino-name">{dino.name}</span>
                          <span 
                            className="dossier-dino-diet"
                            style={{
                              color: dino.diet === 'Carnivore' ? '#FCA5A5' : '#86EFAC'
                            }}
                          >
                            {dino.diet}
                          </span>
                        </div>
                        <div className="dossier-dino-meta">
                          <span>{dino.type}</span>
                          <span>•</span>
                          <span>{dino.lengthM}m ({dino.weightTons}t)</span>
                        </div>
                      </div>

                      <button 
                        type="button" 
                        className="dossier-dino-bio-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenDinoModal) onOpenDinoModal(dino);
                        }}
                      >
                        <Zap size={13} />
                        <span>Bio</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="dossier-empty-dinos">
                  <p>Footprint trackways, fossil egg clutches, and polar bone fragments discovered in this formation.</p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
