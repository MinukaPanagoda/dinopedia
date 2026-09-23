import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ComparePage from './components/ComparePage';
import DiscoveriesPage from './components/DiscoveriesPage';
import QuizPage from './components/QuizPage';
import EntertainmentPage from './components/EntertainmentPage';
import DinoSkull from './components/DinoSkull';

export default function App() {
  const [activeTab, setActiveTab] = useState('age-of-dinosaurs');

  const renderContent = () => {
    switch (activeTab) {
      case 'compare':
        return <ComparePage />;
      case 'discoveries':
        return <DiscoveriesPage />;
      case 'quizzes':
        return <QuizPage />;
      case 'entertainment':
        return <EntertainmentPage />;
      case 'age-of-dinosaurs':
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
          <p className="footer-desc">
            An open educational paleontology archive exploring the Mesozoic Era • Triassic, Jurassic, and Cretaceous chronologies.
          </p>
          <p className="footer-copy">
            © {new Date().getFullYear()} DinoPedia • Built with React & Vite
          </p>
        </div>
      </footer>
    </div>
  );
}
