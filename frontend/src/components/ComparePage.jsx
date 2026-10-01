import React, { useState } from 'react';
import { DINOSAURS } from '../data/dinosaurs';
import { Scale, Ruler, Weight, Gauge, Clock, ArrowLeftRight, Swords, Shield, Zap } from 'lucide-react';

const QUICK_MATCHUPS = [
  {
    title: "Apex Titans",
    subtitle: "T-Rex vs Spinosaurus",
    dino1Id: "tyrannosaurus-rex",
    dino2Id: "spinosaurus-aegyptiacus"
  },
  {
    title: "Cretaceous Rivalry",
    subtitle: "Triceratops vs T-Rex",
    dino1Id: "triceratops-prorsus",
    dino2Id: "tyrannosaurus-rex"
  },
  {
    title: "Jurassic Giants",
    subtitle: "Brachiosaurus vs Stegosaurus",
    dino1Id: "brachiosaurus-altithorax",
    dino2Id: "stegosaurus-stenops"
  },
  {
    title: "Triassic Pioneers",
    subtitle: "Coelophysis vs Herrerasaurus",
    dino1Id: "coelophysis-bauri",
    dino2Id: "herrerasaurus-ischigualastensis"
  }
];

export default function ComparePage({ initialDino1Id }) {
  const [dino1Id, setDino1Id] = useState(
    initialDino1Id || DINOSAURS.find(d => d.id === 'tyrannosaurus-rex')?.id || DINOSAURS[0]?.id || ''
  );
  const [dino2Id, setDino2Id] = useState(DINOSAURS.find(d => d.id === 'spinosaurus-aegyptiacus')?.id || DINOSAURS[1]?.id || '');

  React.useEffect(() => {
    if (initialDino1Id && DINOSAURS.some(d => d.id === initialDino1Id)) {
      setDino1Id(initialDino1Id);
    }
  }, [initialDino1Id]);

  const dino1 = DINOSAURS.find(d => d.id === dino1Id) || DINOSAURS[0];
  const dino2 = DINOSAURS.find(d => d.id === dino2Id) || DINOSAURS[1];

  const handleSwap = () => {
    setDino1Id(dino2Id);
    setDino2Id(dino1Id);
  };

  const applyMatchup = (m) => {
    setDino1Id(m.dino1Id);
    setDino2Id(m.dino2Id);
  };

  // Metric calculation helpers
  const getComparison = (val1, val2, unit, label) => {
    const num1 = Number(val1) || 0;
    const num2 = Number(val2) || 0;
    const total = num1 + num2 || 1;
    const pct1 = Math.round((num1 / total) * 100);
    const pct2 = 100 - pct1;
    const diff = (num1 - num2).toFixed(1);

    let advantage = 'Equal';
    if (num1 > num2) advantage = `${dino1.name} +${Math.abs(diff)} ${unit}`;
    else if (num2 > num1) advantage = `${dino2.name} +${Math.abs(diff)} ${unit}`;

    return { num1, num2, pct1, pct2, advantage };
  };

  const lengthComp = getComparison(dino1.lengthM, dino2.lengthM, 'm', 'Length');
  const weightComp = getComparison(dino1.weightTons, dino2.weightTons, 'tons', 'Mass');
  const speedComp = getComparison(dino1.speedKmh, dino2.speedKmh, 'km/h', 'Speed');

  return (
    <div className="home-container" style={{ padding: '3rem 1.5rem 6rem' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ margin: '0 auto' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <Scale size={15} /> Paleontological Lab
          </div>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Compare <span className="hero-title-gradient">Dinosaurs</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto' }}>
            Pit prehistoric titans head-to-head. Analyze relative scale, anatomical mass, land velocity, and ecological niches with live telemetry bars.
          </p>
        </div>
      </div>

      {/* Quick Preset Matchups */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          <Swords size={15} color="var(--amber-primary)" />
          <span>FEATURED PALEO SHOWDOWNS</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          {QUICK_MATCHUPS.map((m, idx) => (
            <button
              key={idx}
              onClick={() => applyMatchup(m)}
              className="glass-panel"
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#E2E8F0',
                fontSize: '0.82rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <strong style={{ color: 'var(--amber-light)' }}>{m.title}:</strong>
              <span>{m.subtitle}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selectors with Swap Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {/* Selector 1 */}
        <div className="glass-panel" style={{ flex: '1 1 300px', maxWidth: '440px', padding: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--amber-primary)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            CHAMPION 1 (AMBER SECTOR)
          </label>
          <select 
            value={dino1Id} 
            onChange={(e) => setDino1Id(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(245, 158, 11, 0.4)', outline: 'none', fontSize: '0.95rem' }}
          >
            {DINOSAURS.map(d => (
              <option key={d.id} value={d.id} style={{ background: '#0E141B', color: '#fff' }}>
                {d.name} ({d.periodEra})
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          title="Swap dinosaurs"
          aria-label="Swap dinosaurs"
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.25)';
            e.currentTarget.style.borderColor = 'var(--amber-primary)';
            e.currentTarget.style.transform = 'rotate(180deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          <ArrowLeftRight size={20} />
        </button>

        {/* Selector 2 */}
        <div className="glass-panel" style={{ flex: '1 1 300px', maxWidth: '440px', padding: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#38BDF8', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            CHAMPION 2 (CYAN SECTOR)
          </label>
          <select 
            value={dino2Id} 
            onChange={(e) => setDino2Id(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(56, 189, 248, 0.4)', outline: 'none', fontSize: '0.95rem' }}
          >
            {DINOSAURS.map(d => (
              <option key={d.id} value={d.id} style={{ background: '#0E141B', color: '#fff' }}>
                {d.name} ({d.periodEra})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparative Stat Telemetry Bars */}
      <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '20px', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={18} color="var(--amber-primary)" />
          <span>Head-to-Head Telemetry Breakdown</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Length Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--amber-primary)', fontWeight: '700' }}>
                {dino1.name}: {dino1.lengthM}m ({lengthComp.pct1}%)
              </span>
              <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>
                Total Length • <strong style={{ color: '#E2E8F0' }}>{lengthComp.advantage}</strong>
              </span>
              <span style={{ color: '#38BDF8', fontWeight: '700' }}>
                {dino2.name}: {dino2.lengthM}m ({lengthComp.pct2}%)
              </span>
            </div>
            <div style={{ width: '100%', height: '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${lengthComp.pct1}%`, background: 'linear-gradient(90deg, #F59E0B, #D97706)', transition: 'width 0.4s ease' }} />
              <div style={{ width: `${lengthComp.pct2}%`, background: 'linear-gradient(90deg, #0284C7, #38BDF8)', transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* Weight Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--amber-primary)', fontWeight: '700' }}>
                {dino1.name}: {dino1.weightTons}T ({weightComp.pct1}%)
              </span>
              <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>
                Estimated Mass • <strong style={{ color: '#E2E8F0' }}>{weightComp.advantage}</strong>
              </span>
              <span style={{ color: '#38BDF8', fontWeight: '700' }}>
                {dino2.name}: {dino2.weightTons}T ({weightComp.pct2}%)
              </span>
            </div>
            <div style={{ width: '100%', height: '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${weightComp.pct1}%`, background: 'linear-gradient(90deg, #F59E0B, #D97706)', transition: 'width 0.4s ease' }} />
              <div style={{ width: `${weightComp.pct2}%`, background: 'linear-gradient(90deg, #0284C7, #38BDF8)', transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* Speed Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--amber-primary)', fontWeight: '700' }}>
                {dino1.name}: {dino1.speedKmh} km/h ({speedComp.pct1}%)
              </span>
              <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>
                Land Velocity • <strong style={{ color: '#E2E8F0' }}>{speedComp.advantage}</strong>
              </span>
              <span style={{ color: '#38BDF8', fontWeight: '700' }}>
                {dino2.name}: {dino2.speedKmh} km/h ({speedComp.pct2}%)
              </span>
            </div>
            <div style={{ width: '100%', height: '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${speedComp.pct1}%`, background: 'linear-gradient(90deg, #F59E0B, #D97706)', transition: 'width 0.4s ease' }} />
              <div style={{ width: `${speedComp.pct2}%`, background: 'linear-gradient(90deg, #0284C7, #38BDF8)', transition: 'width 0.4s ease' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Dinosaur 1 Card */}
        <div className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
          <div style={{ height: '240px', position: 'relative' }}>
            <img src={dino1.image} alt={dino1.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,20,27,0.95), transparent 70%)' }} />
            <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--amber-primary)', color: '#000', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800' }}>
              {dino1.periodEra} Era
            </span>
            <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '0.3rem 0.7rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700', border: '1px solid rgba(255,255,255,0.2)' }}>
              {dino1.diet}
            </span>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff' }}>{dino1.name}</h2>
            <p style={{ color: 'var(--amber-light)', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '1.25rem' }}>"{dino1.meaning}"</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
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
              {dino1.biteForceN && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><Shield size={16} color="#F97316" /> Bite Force</span>
                  <strong style={{ color: '#fff' }}>{dino1.biteForceN}</strong>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dinosaur 2 Card */}
        <div className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
          <div style={{ height: '240px', position: 'relative' }}>
            <img src={dino2.image} alt={dino2.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,20,27,0.95), transparent 70%)' }} />
            <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#38BDF8', color: '#000', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800' }}>
              {dino2.periodEra} Era
            </span>
            <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '0.3rem 0.7rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700', border: '1px solid rgba(255,255,255,0.2)' }}>
              {dino2.diet}
            </span>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff' }}>{dino2.name}</h2>
            <p style={{ color: '#BAE6FD', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '1.25rem' }}>"{dino2.meaning}"</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
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
              {dino2.biteForceN && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><Shield size={16} color="#F97316" /> Bite Force</span>
                  <strong style={{ color: '#fff' }}>{dino2.biteForceN}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
