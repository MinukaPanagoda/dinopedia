import React, { useState } from 'react';
import { DINOSAURS, PERIODS, FUN_FACTS } from '../data/dinosaurs';
import { Sparkles, ArrowRight, Search, Clock, Compass, ShieldAlert, Award, Lightbulb, RefreshCw } from 'lucide-react';
import DinoModal from './DinoModal';

export default function HomePage({ setActiveTab, searchInputRef }) {
  const [selectedDiet, setSelectedDiet] = useState('All');
  const [selectedEra, setSelectedEra] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalDino, setActiveModalDino] = useState(null);
  const [factIndex, setFactIndex] = useState(0);

  const filteredDinos = DINOSAURS.filter((d) => {
    const matchesDiet = selectedDiet === 'All' || d.diet.toLowerCase().includes(selectedDiet.toLowerCase());
    const matchesEra = selectedEra === 'All' || d.periodEra.toLowerCase() === selectedEra.toLowerCase();
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.period.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiet && matchesEra && matchesSearch;
  });

  const nextFact = () => {
    setFactIndex((prev) => (prev + 1) % FUN_FACTS.length);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pill">
          <Sparkles size={14} />
          <span>Mesozoic Era • 252 to 66 Million Years Ago</span>
        </div>

        <h1 className="hero-title">
          Journey Into The <br />
          <span className="hero-title-gradient">Realm of Ancient Giants</span>
        </h1>

        <p className="hero-subtitle">
          An interactive scientific encyclopedia exploring the apex predators, towering herbivores, 
          and prehistoric ecosystems that ruled our planet for over 180 million years.
        </p>

        <div className="hero-actions">
          <a href="#encyclopedia" className="btn-primary">
            <Compass size={18} />
            <span>Explore Species</span>
          </a>
          <button 
            className="btn-secondary" 
            onClick={() => setActiveTab('quiz')}
          >
            <Award size={18} />
            <span>Test Your Knowledge</span>
          </button>
        </div>

        {/* Hero Stats */}
        <div className="hero-stats-grid">
          <div className="stat-card glass-panel">
            <div className="stat-num" style={{ color: '#F59E0B' }}>1,000+</div>
            <div className="stat-label">Documented Species</div>
          </div>
          <div className="stat-card glass-panel">
            <div className="stat-num" style={{ color: '#10B981' }}>3 Epochs</div>
            <div className="stat-label">Geological Periods</div>
          </div>
          <div className="stat-card glass-panel">
            <div className="stat-num" style={{ color: '#38BDF8' }}>186 MYA</div>
            <div className="stat-label">Reign on Earth</div>
          </div>
          <div className="stat-card glass-panel">
            <div className="stat-num" style={{ color: '#EC4899' }}>100%</div>
            <div className="stat-label">Fossil Backed</div>
          </div>
        </div>
      </section>

      {/* Geological Periods Section */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-header">
          <div>
            <div className="section-tag">
              <Clock size={14} /> Geological Timeline
            </div>
            <h2 className="section-title">The Three Great Mesozoic Eras</h2>
          </div>
        </div>

        <div className="periods-grid">
          {PERIODS.map((period) => (
            <div 
              key={period.name} 
              className="period-card glass-panel"
              style={{ '--period-color': period.color }}
            >
              <span className="period-badge">{period.dates}</span>
              <h3 className="period-name">{period.full}</h3>
              <p className="period-dates">Dominant Epoch</p>
              <p className="period-desc">{period.description}</p>
              <div className="period-highlight">
                <Sparkles size={16} />
                <span>{period.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Fact of the Day Banner */}
      <section className="fact-banner glass-panel">
        <div className="fact-content">
          <div className="fact-title-row">
            <Lightbulb size={18} />
            <span>Prehistoric Fact #{factIndex + 1}</span>
          </div>
          <p className="fact-text">"{FUN_FACTS[factIndex]}"</p>
        </div>
        <button className="fact-refresh-btn" onClick={nextFact}>
          <RefreshCw size={16} />
          <span>New Fact</span>
        </button>
      </section>

      {/* Dinosaurs Encyclopedia Section */}
      <section id="encyclopedia">
        <div className="section-header">
          <div>
            <div className="section-tag">
              <Compass size={14} /> Species Compendium
            </div>
            <h2 className="section-title">Explore Prehistoric Life</h2>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="filter-pills">
            <span style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: '600', marginRight: '0.25rem' }}>Diet:</span>
            {['All', 'Carnivore', 'Herbivore'].map((diet) => (
              <button
                key={diet}
                className={`filter-pill-btn ${selectedDiet === diet ? 'active' : ''}`}
                onClick={() => setSelectedDiet(diet)}
              >
                {diet}
              </button>
            ))}

            <span style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: '600', margin: '0 0.25rem 0 0.75rem' }}>Era:</span>
            {['All', 'Jurassic', 'Cretaceous'].map((era) => (
              <button
                key={era}
                className={`filter-pill-btn ${selectedEra === era ? 'active' : ''}`}
                onClick={() => setSelectedEra(era)}
              >
                {era}
              </button>
            ))}
          </div>

          <div className="search-input-wrap">
            <Search size={16} className="search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="Search by name, meaning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Dino Grid */}
        <div className="dinosaurs-grid">
          {filteredDinos.length > 0 ? (
            filteredDinos.map((dino) => (
              <div key={dino.id} className="dino-card glass-panel">
                <div className="dino-card-media">
                  <img src={dino.image} alt={dino.name} className="dino-card-img" loading="lazy" />
                  <div className="dino-media-overlay" />
                  <span className={`dino-diet-badge ${dino.diet.includes('Carnivore') ? 'Carnivore' : 'Herbivore'}`}>
                    {dino.diet}
                  </span>
                </div>

                <div className="dino-card-body">
                  <span className="dino-period-tag">{dino.period}</span>
                  <h3 className="dino-card-title">{dino.name}</h3>
                  <p className="dino-meaning">"{dino.meaning}"</p>
                  <p className="dino-card-desc">{dino.description}</p>

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

                  <button 
                    className="dino-card-btn" 
                    onClick={() => setActiveModalDino(dino)}
                  >
                    <span>View Anatomy & Stats</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No prehistoric species match your filter.</p>
              <button 
                className="btn-secondary" 
                onClick={() => { setSelectedDiet('All'); setSelectedEra('All'); setSearchQuery(''); }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
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
