import React from 'react';
import bgImage from '../assets/homepage_bg.jpg';

export default function HomePage() {
  return (
    <div 
      className="home-page-wrapper"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(5, 8, 12, 0.75) 0%, rgba(5, 8, 12, 0.35) 22%, rgba(5, 8, 12, 0.05) 50%, rgba(5, 8, 12, 0.7) 100%), url(${bgImage})`,
        height: 'calc(100vh - 72px)',
        minHeight: '520px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '3.5rem',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div className="home-container" style={{ textAlign: 'center', padding: '0 1.5rem', zIndex: 2 }}>
        <h1 
          className="hero-fixed-title"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
            fontWeight: '800',
            lineHeight: '1.2',
            letterSpacing: '-0.01em',
            color: '#FFFFFF',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 4px 24px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 0, 0, 0.65)',
            margin: '0 auto',
            maxWidth: '1000px'
          }}
        >
          Step into a world ruled by giants
        </h1>
      </div>
    </div>
  );
}
