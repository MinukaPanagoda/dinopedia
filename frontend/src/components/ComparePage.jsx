import React, { useState } from 'react';
import { DINOSAURS } from '../data/dinosaurs';
import { Scale, ArrowRight, Zap, Ruler, Weight, Gauge, Clock, Shield } from 'lucide-react';

export default function ComparePage() {
  const [dino1Id, setDino1Id] = useState(DINOSAURS[0]?.id || '');
  const [dino2Id, setDino2Id] = useState(DINOSAURS[1]?.id || '');

  const dino1 = DINOSAURS.find(d => d.id === dino1Id) || DINOSAURS[0];
  const dino2 = DINOSAURS.find(d => d.id === dino2Id) || DINOSAURS[1];

  return (
    <div className="home-container" style={{ padding: '3rem 1.5rem 6rem' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ margin: '0 auto' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <Scale size={15} /> Paleontological Lab
          </div>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Compare <span className="hero-title-gradient">Dinosaurs</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Pit prehistoric titans head-to-head. Analyze body length, mass, velocity, jaw force, and ecological dominance.
          </p>
        </div>
      </div>

      {/* Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--amber-primary)', marginBottom: '0.5rem' }}>
            SELECT SPECIES 1
          </label>
          <select 
            value={dino1Id} 
            onChange={(e) => setDino1Id(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid var(--border-subtle)', outline: 'none', fontSize: '1rem' }}
          >
            {DINOSAURS.map(d => (
              <option key={d.id} value={d.id} style={{ background: '#0E141B', color: '#fff' }}>
                {d.name} ({d.periodEra})
              </option>
            ))}
          </select>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#38BDF8', marginBottom: '0.5rem' }}>
            SELECT SPECIES 2
          </label>
          <select 
            value={dino2Id} 
            onChange={(e) => setDino2Id(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid var(--border-subtle)', outline: 'none', fontSize: '1rem' }}
          >
            {DINOSAURS.map(d => (
              <option key={d.id} value={d.id} style={{ background: '#0E141B', color: '#fff' }}>
                {d.name} ({d.periodEra})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Dinosaur 1 Card */}
        <div className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <div style={{ height: '240px', position: 'relative' }}>
            <img src={dino1.image} alt={dino1.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,20,27,0.95), transparent 70%)' }} />
            <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--amber-primary)', color: '#000', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800' }}>
              {dino1.periodEra}
            </span>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff' }}>{dino1.name}</h2>
            <p style={{ color: 'var(--amber-light)', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '1.25rem' }}>"{dino1.meaning}"</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><Ruler size={16} color="#F59E0B" /> Length</span>
                <strong style={{ color: '#fff' }}>{dino1.lengthM} meters</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><Weight size={16} color="#10B981" /> Weight</span>
                <strong style={{ color: '#fff' }}>{dino1.weightTons} tons</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><Gauge size={16} color="#38BDF8" /> Speed</span>
                <strong style={{ color: '#fff' }}>{dino1.speedKmh} km/h</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><Clock size={16} color="#EC4899" /> Lived</span>
                <strong style={{ color: '#fff' }}>{dino1.periodMYA}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Dinosaur 2 Card */}
        <div className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <div style={{ height: '240px', position: 'relative' }}>
            <img src={dino2.image} alt={dino2.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,20,27,0.95), transparent 70%)' }} />
            <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#38BDF8', color: '#000', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800' }}>
              {dino2.periodEra}
            </span>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff' }}>{dino2.name}</h2>
            <p style={{ color: '#BAE6FD', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '1.25rem' }}>"{dino2.meaning}"</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><Ruler size={16} color="#F59E0B" /> Length</span>
                <strong style={{ color: '#fff' }}>{dino2.lengthM} meters</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><Weight size={16} color="#10B981" /> Weight</span>
                <strong style={{ color: '#fff' }}>{dino2.weightTons} tons</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><Gauge size={16} color="#38BDF8" /> Speed</span>
                <strong style={{ color: '#fff' }}>{dino2.speedKmh} km/h</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><Clock size={16} color="#EC4899" /> Lived</span>
                <strong style={{ color: '#fff' }}>{dino2.periodMYA}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
