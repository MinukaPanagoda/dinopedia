import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AgeOfDinosaursPage from './components/AgeOfDinosaursPage';
import ComparePage from './components/ComparePage';
import DiscoveriesPage from './components/DiscoveriesPage';
import QuizPage from './components/QuizPage';
import EntertainmentPage from './components/EntertainmentPage';
import DinoSkull from './components/DinoSkull';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const titles = {
      'home': 'DinoPedia • Mesozoic Dinosaur Archive',
      'age-of-dinosaurs': 'Age of Dinosaurs • Triassic, Jurassic & Cretaceous | DinoPedia',
      'compare': 'Dinosaur Scale & Anatomy Comparison | DinoPedia',
      'discoveries': 'Fossil Discoveries & Paleontology Digs | DinoPedia',
      'quizzes': 'T-Rex Survival Game & Trivia Quiz | DinoPedia',
      'entertainment': 'Prehistoric Entertainment & Dino Media | DinoPedia'
    };
    document.title = titles[activeTab] || 'DinoPedia';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard navigation: Press [1-6] to switch tabs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) {
        return;
      }
      const tabMap = {
        '1': 'home',
        '2': 'age-of-dinosaurs',
        '3': 'compare',
        '4': 'discoveries',
        '5': 'quizzes',
        '6': 'entertainment'
      };
      if (tabMap[e.key]) {
        setActiveTab(tabMap[e.key]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'age-of-dinosaurs':
        return <AgeOfDinosaursPage setActiveTab={setActiveTab} />;
      case 'compare':
        return <ComparePage />;
      case 'discoveries':
        return <DiscoveriesPage />;
      case 'quizzes':
        return <QuizPage />;
      case 'entertainment':
        return <EntertainmentPage />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-root">
      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content */}
      <main>
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="footer-wrap">
        <div className="footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#F59E0B', fontWeight: '800', fontSize: '1.25rem' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #F59E0B, #B45309)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <DinoSkull size={18} />
            </div>
            <span>DinoPedia</span>
          </div>

          {/* Quick Footer Navigation Links */}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center', margin: '0.75rem 0 0.5rem' }}>
            {[
              { id: 'home', label: 'Home' },
              { id: 'age-of-dinosaurs', label: 'Age of Dinosaurs' },
              { id: 'compare', label: 'Size Comparison' },
              { id: 'discoveries', label: 'Discoveries' },
              { id: 'quizzes', label: 'T-Rex Game & Quiz' },
              { id: 'entertainment', label: 'Entertainment' },
            ].map(link => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === link.id ? 'var(--amber-primary)' : 'var(--text-dim)',
                  fontSize: '0.85rem',
                  fontWeight: activeTab === link.id ? '700' : '500',
                  cursor: 'pointer',
                  padding: '4px 6px',
                  transition: 'color 0.2s ease'
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <p className="footer-desc">
            An open educational paleontology archive exploring the Mesozoic Era • Triassic, Jurassic, and Cretaceous chronologies.
          </p>
          <p className="footer-copy">
            © {new Date().getFullYear()} DinoPedia • Built with React & Vite
          </p>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.5rem', opacity: 0.85 }}>
            ⌨️ Keyboard Navigation: Press keys <span style={{ color: 'var(--amber-light)', fontWeight: '700' }}>[1–6]</span> to jump between tabs
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Back to top"
          aria-label="Scroll back to top"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #F59E0B, #D97706)',
            color: '#111827',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(245, 158, 11, 0.45)',
            zIndex: 99,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(245, 158, 11, 0.45)';
          }}
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
