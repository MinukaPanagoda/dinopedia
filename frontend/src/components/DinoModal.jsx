import React from 'react';
import { X, MapPin, Ruler, Weight, Gauge, Sparkles, Clock, Layers, Shield, Volume2, ArrowRight } from 'lucide-react';

export default function DinoModal({ dino, onClose, onCompare }) {
  if (!dino) return null;

  const eraColors = {
    Triassic: '#F59E0B',
    Jurassic: '#10B981',
    Cretaceous: '#EC4899',
  };

  const periodColor = eraColors[dino.periodEra] || '#F59E0B';

  const playDinoVocalization = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      // Low rumble procedural dinosaur bellow
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.9);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.2);
    } catch {}
  };

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span 
                className="dino-period-tag"
                style={{ background: `${periodColor}25`, color: periodColor, borderColor: `${periodColor}50` }}
              >
                {dino.periodEra} Era • {dino.periodMYA}
              </span>
              <span className="dino-type-pill" style={{ fontSize: '0.72rem', padding: '0.2rem 0.65rem' }}>
                {dino.type}
              </span>
              {dino.diet && (
                <span 
                  style={{ 
                    fontSize: '0.72rem', 
                    padding: '0.2rem 0.65rem', 
                    borderRadius: '999px',
                    background: dino.diet === 'Carnivore' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: dino.diet === 'Carnivore' ? '#FCA5A5' : '#6EE7B7',
                    fontWeight: '700'
                  }}
                >
                  {dino.diet}
                </span>
              )}
            </div>

            <h2 className="modal-dino-name">{dino.name}</h2>
            <p className="dino-meaning">"{dino.meaning}"</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
              <div className="modal-discovery-site">
                <Clock size={14} color={periodColor} />
                <span><strong>Epoch / Stage:</strong> {dino.epoch} ({dino.period})</span>
              </div>
              <div className="modal-discovery-site">
                <Layers size={14} color="#38BDF8" />
                <span><strong>Clade / Subtype:</strong> {dino.subType}</span>
              </div>
              <div className="modal-discovery-site">
                <MapPin size={14} color="#10B981" />
                <span><strong>Fossil Locality:</strong> {dino.discovered}</span>
              </div>
            </div>

            {/* Quick Actions in Header */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={playDinoVocalization}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  borderRadius: '999px',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Volume2 size={13} color="var(--amber-primary)" />
                <span>Play Roar Synth</span>
              </button>

              {onCompare && (
                <button
                  onClick={() => onCompare(dino)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.25))',
                    border: '1px solid var(--amber-primary)',
                    color: 'var(--amber-light)',
                    borderRadius: '999px',
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  <span>Compare in Lab</span>
                  <ArrowRight size={13} />
                </button>
              )}
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
          {dino.biteForceN && (
            <div className="dino-stat-item">
              <span className="dino-stat-val" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Shield size={16} color="#F97316" /> {dino.biteForceN}
              </span>
              <span className="dino-stat-lbl">Bite Force</span>
            </div>
          )}
        </div>

        {/* Anatomical Traits */}
        {dino.traits && (
          <>
            <h4 style={{ fontSize: '0.85rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
              Key Anatomical Traits
            </h4>
            <div className="traits-list" style={{ marginBottom: '1.5rem' }}>
              {dino.traits.map((trait, i) => (
                <span key={i} className="trait-tag">
                  ⚡ {trait}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Description */}
        <h4 style={{ fontSize: '0.85rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
          Paleobiological Overview
        </h4>
        <p style={{ color: '#D1D5DB', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          {dino.description}
        </p>

        {/* Fun Fact */}
        {dino.funFact && (
          <div className="modal-funfact">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: '#F59E0B', marginBottom: '4px' }}>
              <Sparkles size={16} /> Prehistoric Fact
            </div>
            <p>{dino.funFact}</p>
          </div>
        )}
      </div>
    </div>
  );
}
