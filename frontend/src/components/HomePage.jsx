import React, { useState } from 'react';
import { PERIODS } from '../data/dinosaurs';
import { Activity } from 'lucide-react';

export default function HomePage() {
  const [selectedEra, setSelectedEra] = useState('All');

  return (
    <div className="home-container">
      {/* Age of Dinosaurs Hero & Timeline Section */}
      <section className="hero-section" style={{ padding: '4rem 1rem 6rem' }}>
        <h1 className="hero-title">
          Age of <span className="hero-title-gradient">Dinosaurs</span>
        </h1>

        <p className="hero-subtitle" style={{ maxWidth: '680px', margin: '0 auto 3rem' }}>
          Comprehensive prehistoric classification. Explore every species categorized by their 
          <strong> geological era</strong>, <strong>exact lived timeline</strong>, and <strong>anatomical clade</strong>.
        </p>

        {/* Geological Macro Timeline Visualizer */}
        <div className="timeline-visual-scale glass-panel">
          <div className="timeline-scale-header">
            <span className="timeline-scale-title">
              <Activity size={15} color="#F59E0B" /> Mesozoic Era Timeline Span (186 Million Years)
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
    </div>
  );
}
