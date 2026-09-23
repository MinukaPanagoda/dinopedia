import React from 'react';
import { X, MapPin, Ruler, Weight, Gauge, Zap, Volume2, Sparkles } from 'lucide-react';

export default function DinoModal({ dino, onClose }) {
  if (!dino) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header-banner">
          <div className="modal-img-wrap">
            <img src={dino.image} alt={dino.name} className="modal-img" />
          </div>

          <div className="modal-titles">
            <span className="dino-period-tag">{dino.periodMYA} • {dino.period}</span>
            <h2 className="modal-dino-name">{dino.name}</h2>
            <p className="dino-meaning">"{dino.meaning}"</p>
            <div className="modal-discovery-site">
              <MapPin size={15} color="#10B981" />
              <span>{dino.discovered}</span>
            </div>
          </div>
        </div>

        {/* Vital Stats Matrix */}
        <div className="dino-stats-row" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
          <div className="dino-stat-item">
            <span className="dino-stat-val" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Ruler size={16} color="#F59E0B" /> {dino.lengthM} m
            </span>
            <span className="dino-stat-lbl">Body Length</span>
          </div>
          <div className="dino-stat-item">
            <span className="dino-stat-val" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Weight size={16} color="#10B981" /> {dino.weightTons} T
            </span>
            <span className="dino-stat-lbl">Estimated Weight</span>
          </div>
          <div className="dino-stat-item">
            <span className="dino-stat-val" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Gauge size={16} color="#38BDF8" /> {dino.speedKmh} km/h
            </span>
            <span className="dino-stat-lbl">Top Speed</span>
          </div>
        </div>

        {/* Anatomical Traits */}
        <h4 style={{ fontSize: '0.9rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
          Key Anatomical Traits
        </h4>
        <div className="traits-list">
          {dino.traits.map((trait, i) => (
            <span key={i} className="trait-tag">
              ⚡ {trait}
            </span>
          ))}
        </div>

        {/* Description */}
        <h4 style={{ fontSize: '0.9rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
          Paleobiological Overview
        </h4>
        <p style={{ color: '#D1D5DB', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          {dino.description}
        </p>

        {/* Fun Fact */}
        <div className="modal-funfact">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: '#F59E0B', marginBottom: '4px' }}>
            <Sparkles size={16} /> Did You Know?
          </div>
          <p>{dino.funFact}</p>
        </div>
      </div>
    </div>
  );
}
