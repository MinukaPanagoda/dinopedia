import React from 'react';
import { Compass, Sparkles, Layers, ArrowRight, Clock, Shield } from 'lucide-react';
import DinoSkull from './DinoSkull';

export default function AgeOfDinosaursPage({ setActiveTab }) {
  return (
    <div className="home-container" style={{ padding: '3.5rem 1.5rem 6rem', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Badge */}
        <div className="section-tag" style={{ margin: '0 auto 1.25rem', justifyContent: 'center' }}>
          <Sparkles size={15} /> Prehistoric Classification & Clades
        </div>

        {/* Title */}
        <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', marginBottom: '1rem' }}>
          Age of <span className="hero-title-gradient">Dinosaurs</span>
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '720px', margin: '0 auto 3rem', lineHeight: '1.7' }}>
          Dedicated paleontological classification explorer. Explore dinosaur species categorized by evolutionary clades, anatomical adaptations, skeletal structures, and geological time horizons.
        </p>

        {/* Under Construction / Dedicated Page Foundation Card */}
        <div 
          className="glass-panel"
          style={{
            padding: '3rem 2rem',
            background: 'linear-gradient(180deg, rgba(17, 24, 34, 0.85) 0%, rgba(10, 15, 22, 0.95) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '24px',
            boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.8), 0 0 35px -5px rgba(245, 158, 11, 0.15)',
            marginBottom: '3rem'
          }}
        >
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '20px', 
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.15))',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: 'var(--amber-light)'
          }}>
            <DinoSkull size={32} />
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', marginBottom: '0.75rem' }}>
            Age of Dinosaurs Section Under Construction
          </h2>

          <p style={{ color: '#E2E8F0', maxWidth: '640px', margin: '0 auto 2rem', lineHeight: '1.65', fontSize: '1rem' }}>
            This dedicated section is being prepared. Soon, you will be able to explore detailed anatomical clades (Saurischia vs Ornithischia), tooth morphometrics, and complete fossil record databases.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab && setActiveTab('home')}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.85rem 1.85rem',
                fontSize: '1rem',
                fontWeight: '700',
                borderRadius: '9999px',
                cursor: 'pointer'
              }}
            >
              <span>Back to Home (Chapters & Eras)</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setActiveTab && setActiveTab('compare')}
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.85rem 1.85rem',
                fontSize: '1rem',
                fontWeight: '700',
                borderRadius: '9999px',
                cursor: 'pointer'
              }}
            >
              <span>Compare Dinosaurs</span>
            </button>
          </div>
        </div>

        {/* Feature Preview Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '1.5rem', 
          textAlign: 'left' 
        }}>
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <Layers size={24} style={{ color: 'var(--amber-primary)', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff', marginBottom: '0.4rem' }}>
              Clade Classifications
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Theropods, Sauropodomorphs, Thyreophorans, Ornithopods, and Marginocephalians mapped out.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <Shield size={24} style={{ color: 'var(--emerald-primary)', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff', marginBottom: '0.4rem' }}>
              Anatomical Defense & Predation
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Armored thagomizers, cranial frills, serrated carinae teeth, and bite-force comparisons.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <Clock size={24} style={{ color: '#38BDF8', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff', marginBottom: '0.4rem' }}>
              Exact Stratigraphic Horizons
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Detailed rock layer formations (Morrison, Hell Creek, Yixian) and fossil dating.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
