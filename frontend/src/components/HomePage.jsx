import React, { useState, useMemo } from 'react';
import { DINOSAURS, PERIODS, DINO_TYPES } from '../data/dinosaurs';
import { 
  Clock, 
  Search, 
  Layers, 
  Calendar, 
  Activity,
  ArrowRight
} from 'lucide-react';
import DinoModal from './DinoModal';

export default function HomePage() {
  const [selectedEra, setSelectedEra] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDiet, setSelectedDiet] = useState('All');
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' | 'eras' | 'types'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalDino, setActiveModalDino] = useState(null);

  // Filtered dinosaurs
  const filteredDinos = useMemo(() => {
    return DINOSAURS.filter((d) => {
      const matchesEra = selectedEra === 'All' || d.periodEra.toLowerCase() === selectedEra.toLowerCase();
      const matchesType = selectedType === 'All' || d.type.toLowerCase() === selectedType.toLowerCase();
      const matchesDiet = selectedDiet === 'All' || d.diet.toLowerCase().includes(selectedDiet.toLowerCase());
      const matchesSearch = 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.epoch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.subType.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesEra && matchesType && matchesDiet && matchesSearch;
    }).sort((a, b) => b.myaStart - a.myaStart); // Chronological: oldest to youngest
  }, [selectedEra, selectedType, selectedDiet, searchQuery]);

  // Grouped by Eras
  const dinosByEra = useMemo(() => {
    return PERIODS.map(period => ({
      period,
      dinosaurs: filteredDinos.filter(d => d.periodEra.toLowerCase() === period.name.toLowerCase())
    }));
  }, [filteredDinos]);

  // Grouped by Types
  const dinosByType = useMemo(() => {
    return DINO_TYPES.filter(t => t.id !== 'All').map(type => ({
      type,
      dinosaurs: filteredDinos.filter(d => d.type.toLowerCase() === type.id.toLowerCase())
    })).filter(group => group.dinosaurs.length > 0);
  }, [filteredDinos]);

  const getEraColor = (era) => {
    switch (era) {
      case 'Triassic': return '#F59E0B';
      case 'Jurassic': return '#10B981';
      case 'Cretaceous': return '#EC4899';
      default: return '#F59E0B';
    }
  };

  const getTypeColor = (type) => {
    const found = DINO_TYPES.find(t => t.id === type);
    return found ? found.badgeColor : '#38BDF8';
  };

  // Calculate percentage along 252 - 66 MYA scale (186 MY total)
  const getTimelineBarPosition = (startMya, endMya) => {
    const totalSpan = 252 - 66; // 186
    const leftPercent = Math.max(0, Math.min(100, ((252 - startMya) / totalSpan) * 100));
    const widthPercent = Math.max(3, Math.min(100 - leftPercent, ((startMya - endMya) / totalSpan) * 100));
    return { left: `${leftPercent}%`, width: `${widthPercent}%` };
  };

  return (
    <div className="home-container">
      {/* Age of Dinosaurs Header Banner */}
      <section className="hero-section" style={{ paddingBottom: '2rem' }}>
        <h1 className="hero-title">
          Age of <span className="hero-title-gradient">Dinosaurs</span>
        </h1>

        <p className="hero-subtitle">
          Comprehensive prehistoric classification. Explore every species categorized by their 
          <strong> geological era</strong>, <strong>exact lived timeline</strong>, and <strong>anatomical clade</strong>.
        </p>

        {/* Geological Macro Timeline Visualizer */}
        <div className="timeline-visual-scale glass-panel">
          <div className="timeline-scale-header">
            <span className="timeline-scale-title">
              <Activity size={14} /> Mesozoic Era Timeline Span (186 Million Years)
            </span>
            <span className="timeline-scale-note">252 MYA ➔ 66 MYA</span>
          </div>

          <div className="timeline-segments-track">
            {PERIODS.map(p => {
              const isSelected = selectedEra === p.name;
              return (
                <button
                  key={p.id}
                  className={`timeline-segment-block ${isSelected ? 'active-era' : ''}`}
                  style={{ 
                    '--segment-color': p.color,
                    flex: p.name === 'Triassic' ? '51' : p.name === 'Jurassic' ? '56' : '79'
                  }}
                  onClick={() => setSelectedEra(selectedEra === p.name ? 'All' : p.name)}
                >
                  <div className="segment-indicator" />
                  <div className="segment-info">
                    <span className="segment-name">{p.name}</span>
                    <span className="segment-dates">{p.dates}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Categorization & Compendium Section */}
      <section id="age-of-dinosaurs-compendium" style={{ marginTop: '2rem' }}>
        <div className="section-header">
          <div>
            <div className="section-tag">
              <Layers size={14} /> Species Compendium
            </div>
            <h2 className="section-title">Prehistoric Archive</h2>
            <p style={{ color: '#9CA3AF', fontSize: '0.95rem', marginTop: '4px' }}>
              Showing <strong>{filteredDinos.length}</strong> dinosaurs categorized by eras, exact timelines, and clades.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="view-mode-tabs glass-panel">
            <button
              className={`view-tab-btn ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => setViewMode('timeline')}
              title="Arrange chronologically by exact timeline"
            >
              <Clock size={15} />
              <span>Exact Timeline</span>
            </button>
            <button
              className={`view-tab-btn ${viewMode === 'eras' ? 'active' : ''}`}
              onClick={() => setViewMode('eras')}
              title="Group into Triassic, Jurassic, and Cretaceous"
            >
              <Calendar size={15} />
              <span>By Eras</span>
            </button>
            <button
              className={`view-tab-btn ${viewMode === 'types' ? 'active' : ''}`}
              onClick={() => setViewMode('types')}
              title="Group by Dinosaur anatomical clades"
            >
              <Layers size={15} />
              <span>By Clades / Types</span>
            </button>
          </div>
        </div>

        {/* Multi-Criteria Categorization Filters */}
        <div className="categorization-panel glass-panel">
          {/* Era Filter Row */}
          <div className="cat-filter-row">
            <span className="cat-filter-label">
              <Calendar size={14} color="#F59E0B" /> Era / Period:
            </span>
            <div className="cat-pill-group">
              {['All', 'Triassic', 'Jurassic', 'Cretaceous'].map(era => (
                <button
                  key={era}
                  className={`cat-pill-btn ${selectedEra === era ? 'active' : ''}`}
                  style={selectedEra === era && era !== 'All' ? { background: getEraColor(era), borderColor: getEraColor(era) } : {}}
                  onClick={() => setSelectedEra(era)}
                >
                  {era === 'All' ? 'All Eras (252–66 MYA)' : `${era} Period`}
                </button>
              ))}
            </div>
          </div>

          {/* Dinosaur Type / Clade Filter Row */}
          <div className="cat-filter-row">
            <span className="cat-filter-label">
              <Layers size={14} color="#38BDF8" /> Type of Dinosaur:
            </span>
            <div className="cat-pill-group">
              {DINO_TYPES.map(type => (
                <button
                  key={type.id}
                  className={`cat-pill-btn ${selectedType === type.id ? 'active' : ''}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  {type.name} {type.subtitle ? `(${type.subtitle})` : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Diet & Search Row */}
          <div className="cat-filter-bottom-row">
            <div className="cat-filter-diet">
              <span className="cat-filter-label" style={{ minWidth: 'auto' }}>Diet:</span>
              {['All', 'Carnivore', 'Herbivore'].map(diet => (
                <button
                  key={diet}
                  className={`cat-pill-btn-sm ${selectedDiet === diet ? 'active' : ''}`}
                  onClick={() => setSelectedDiet(diet)}
                >
                  {diet}
                </button>
              ))}
            </div>

            <div className="search-input-wrap" style={{ flex: '1', maxWidth: '380px' }}>
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search species, clades, formations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* View Mode 1: Exact Chronological Timeline */}
        {viewMode === 'timeline' && (
          <div className="timeline-flow-wrap">
            <div className="dinosaurs-grid">
              {filteredDinos.length > 0 ? (
                filteredDinos.map((dino) => (
                  <DinoCard 
                    key={dino.id} 
                    dino={dino} 
                    getEraColor={getEraColor} 
                    getTypeColor={getTypeColor}
                    getTimelineBarPosition={getTimelineBarPosition}
                    onOpenModal={setActiveModalDino} 
                  />
                ))
              ) : (
                <EmptyFilterState onReset={() => { setSelectedEra('All'); setSelectedType('All'); setSelectedDiet('All'); setSearchQuery(''); }} />
              )}
            </div>
          </div>
        )}

        {/* View Mode 2: Grouped by Eras */}
        {viewMode === 'eras' && (
          <div className="grouped-eras-flow">
            {dinosByEra.map(({ period, dinosaurs }) => {
              if (dinosaurs.length === 0 && selectedEra !== 'All') return null;

              return (
                <div key={period.id} className="era-section-group">
                  <div 
                    className="era-group-header glass-panel"
                    style={{ borderLeft: `5px solid ${period.color}` }}
                  >
                    <div className="era-group-meta">
                      <span className="era-group-icon">{period.icon}</span>
                      <div>
                        <h3 className="era-group-title">{period.full}</h3>
                        <p className="era-group-sub">
                          {period.dates} • {period.spanMYA} Span • {period.highlight}
                        </p>
                      </div>
                    </div>
                    <span className="era-group-count" style={{ background: `${period.color}25`, color: period.color }}>
                      {dinosaurs.length} Species Documented
                    </span>
                  </div>

                  {dinosaurs.length > 0 ? (
                    <div className="dinosaurs-grid">
                      {dinosaurs.map(dino => (
                        <DinoCard 
                          key={dino.id} 
                          dino={dino} 
                          getEraColor={getEraColor} 
                          getTypeColor={getTypeColor}
                          getTimelineBarPosition={getTimelineBarPosition}
                          onOpenModal={setActiveModalDino} 
                        />
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#6B7280', padding: '1rem', fontStyle: 'italic' }}>
                      No dinosaurs in this era match the active filters.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode 3: Grouped by Dinosaur Types */}
        {viewMode === 'types' && (
          <div className="grouped-types-flow">
            {dinosByType.map(({ type, dinosaurs }) => (
              <div key={type.id} className="type-section-group">
                <div 
                  className="type-group-header glass-panel"
                  style={{ borderLeft: `5px solid ${type.badgeColor}` }}
                >
                  <div className="type-group-meta">
                    <div>
                      <h3 className="type-group-title">
                        {type.name} <span style={{ color: '#9CA3AF', fontWeight: '400', fontSize: '1.1rem' }}>({type.subtitle})</span>
                      </h3>
                      <p className="type-group-desc">{type.description}</p>
                    </div>
                  </div>
                  <span className="type-group-count" style={{ background: `${type.badgeColor}25`, color: type.badgeColor }}>
                    {dinosaurs.length} Species
                  </span>
                </div>

                <div className="dinosaurs-grid">
                  {dinosaurs.map(dino => (
                    <DinoCard 
                      key={dino.id} 
                      dino={dino} 
                      getEraColor={getEraColor} 
                      getTypeColor={getTypeColor}
                      getTimelineBarPosition={getTimelineBarPosition}
                      onOpenModal={setActiveModalDino} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Dinosaur Detail Modal */}
      {activeModalDino && (
        <DinoModal 
          dino={activeModalDino} 
          onClose={() => setActiveModalDino(null)} 
        />
      )}
    </div>
  );
}

// Reusable Dino Card Component with Era, Exact Timeline & Dinosaur Type
function DinoCard({ dino, getEraColor, getTypeColor, getTimelineBarPosition, onOpenModal }) {
  const eraColor = getEraColor(dino.periodEra);
  const typeColor = getTypeColor(dino.type);
  const barPos = getTimelineBarPosition(dino.myaStart, dino.myaEnd);

  return (
    <div className="dino-card glass-panel">
      {/* Media and Badges */}
      <div className="dino-card-media">
        <img src={dino.image} alt={dino.name} className="dino-card-img" loading="lazy" />
        <div className="dino-media-overlay" />
        
        {/* Top Badges */}
        <div className="dino-card-badge-row">
          <span 
            className="dino-era-badge"
            style={{ background: eraColor, color: '#000' }}
          >
            {dino.periodEra}
          </span>
          <span className="dino-type-badge" style={{ background: `${typeColor}30`, color: typeColor, border: `1px solid ${typeColor}50` }}>
            {dino.type}
          </span>
        </div>

        <span className={`dino-diet-badge ${dino.diet.includes('Carnivore') ? 'Carnivore' : 'Herbivore'}`}>
          {dino.diet}
        </span>
      </div>

      {/* Card Body */}
      <div className="dino-card-body">
        {/* Exact Timeline & Geological Stage */}
        <div className="dino-timeline-block">
          <div className="dino-exact-timeline-row">
            <span className="dino-exact-mya" style={{ color: eraColor }}>
              <Clock size={13} /> {dino.periodMYA}
            </span>
            <span className="dino-stage-name">{dino.epoch}</span>
          </div>

          {/* Mini Mesozoic Timeline Span indicator */}
          <div className="dino-mini-timeline-bar" title={`Lived ${dino.periodMYA} within Mesozoic (252–66 MYA)`}>
            <div 
              className="dino-mini-timeline-fill"
              style={{ 
                left: barPos.left, 
                width: barPos.width, 
                background: eraColor 
              }}
            />
          </div>
        </div>

        <h3 className="dino-card-title">{dino.name}</h3>
        <p className="dino-meaning">"{dino.meaning}"</p>
        <p className="dino-subclade-text">
          <strong>Clade:</strong> {dino.subType}
        </p>
        <p className="dino-card-desc">{dino.description}</p>

        {/* Vital Stats Row */}
        <div className="dino-stats-row">
          <div className="dino-stat-item">
            <span className="dino-stat-val">{dino.lengthM}m</span>
            <span className="dino-stat-lbl">Length</span>
          </div>
          <div className="dino-stat-item">
            <span className="dino-stat-val">{dino.weightTons}T</span>
            <span className="dino-stat-lbl">Weight</span>
          </div>
          <div className="dino-stat-item">
            <span className="dino-stat-val">{dino.speedKmh} km/h</span>
            <span className="dino-stat-lbl">Speed</span>
          </div>
        </div>

        {/* View Anatomy Button */}
        <button 
          className="dino-card-btn" 
          onClick={() => onOpenModal(dino)}
        >
          <span>Examine Anatomy & Timeline</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

function EmptyFilterState({ onReset }) {
  return (
    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3.5rem 1rem', color: '#9CA3AF' }}>
      <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '0.5rem' }}>
        No dinosaur species match this combination of filters.
      </p>
      <p style={{ marginBottom: '1.5rem', color: '#9CA3AF' }}>
        Try changing the Era, Clade, or search keyword.
      </p>
      <button className="btn-secondary" onClick={onReset}>
        Reset All Filters
      </button>
    </div>
  );
}
