import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, RotateCcw, Sparkles, Gamepad2 } from 'lucide-react';
import TRexHangman from './TRexHangman';

const QUESTIONS = [
  {
    q: "Which geological period saw the very first emergence of true dinosaurs?",
    options: ["Cretaceous Period", "Triassic Period", "Jurassic Period", "Permian Period"],
    correct: 1,
    explanation: "The earliest true dinosaurs evolved during the Late Triassic Period (approx. 231 million years ago) following the Permian-Triassic extinction."
  },
  {
    q: "What is the official anatomical name given to the four defensive tail spikes of a Stegosaurus?",
    options: ["Osteoderms", "Chevrons", "Thagomizer", "Gastralia"],
    correct: 2,
    explanation: "Coined by cartoonist Gary Larson in The Far Side, 'thagomizer' was later adopted formally by paleontologists worldwide!"
  },
  {
    q: "Which dinosaur was semi-aquatic with a paddle-like tail adapted for swimming in ancient river systems?",
    options: ["Tyrannosaurus Rex", "Velociraptor", "Spinosaurus", "Ankylosaurus"],
    correct: 2,
    explanation: "Spinosaurus had dense bones, a flattened paddle tail, and crocodile-like teeth designed to hunt massive prehistoric fish in Cretaceous African waterways."
  },
  {
    q: "Are modern birds scientifically considered dinosaurs?",
    options: ["No, they are merely warm-blooded reptiles", "Yes, they are living avian theropod dinosaurs", "Only raptors evolved into mammals", "No, they share no skeletal traits"],
    correct: 1,
    explanation: "Birds belong cladistically to Avian Theropoda — birds didn't just evolve from dinosaurs, they are living dinosaurs today!"
  }
];

export default function QuizPage() {
  const [activeMode, setActiveMode] = useState('hangman'); // 'hangman' or 'trivia'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[currentIdx];

  const handleSelect = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    if (idx === question.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="home-container" style={{ padding: '1.25rem 1rem 2.5rem', maxWidth: '860px' }}>
      {/* Sleek Compact Header & Mode Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🦖 T-Rex Escape</span>
            <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: '999px', background: 'rgba(245,158,11,0.15)', color: 'var(--amber-light)', border: '1px solid rgba(245,158,11,0.3)', fontWeight: '700' }}>
              Hangman Survival
            </span>
          </h1>
        </div>

        {/* Mode Switcher Tabs (Hangman vs Trivia) */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`category-tab-btn ${activeMode === 'hangman' ? 'active' : ''}`}
            onClick={() => setActiveMode('hangman')}
            style={{ padding: '0.4rem 0.95rem', fontSize: '0.85rem' }}
          >
            <Gamepad2 size={15} />
            <span>T-Rex Game</span>
          </button>

          <button
            className={`category-tab-btn ${activeMode === 'trivia' ? 'active' : ''}`}
            onClick={() => setActiveMode('trivia')}
            style={{ padding: '0.4rem 0.95rem', fontSize: '0.85rem' }}
          >
            <Award size={15} />
            <span>Trivia Quiz</span>
          </button>
        </div>
      </div>

      {/* Render Playable T-Rex Hangman Game */}
      {activeMode === 'hangman' && (
        <TRexHangman />
      )}

      {/* Render Multiple Choice Trivia Quiz */}
      {activeMode === 'trivia' && (
        !finished ? (
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              <span>Question {currentIdx + 1} of {QUESTIONS.length}</span>
              <span>Score: {score}</span>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '1.75rem', lineHeight: '1.4' }}>
              {question.q}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {question.options.map((opt, i) => {
                const isChosen = selectedOpt === i;
                const isCorrect = i === question.correct;
                let bg = 'rgba(255,255,255,0.04)';
                let border = 'var(--border-subtle)';
                let color = '#fff';

                if (selectedOpt !== null) {
                  if (isCorrect) {
                    bg = 'rgba(16, 185, 129, 0.2)';
                    border = '#10B981';
                  } else if (isChosen) {
                    bg = 'rgba(239, 68, 68, 0.2)';
                    border = '#EF4444';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={selectedOpt !== null}
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: '12px',
                      background: bg,
                      border: `1px solid ${border}`,
                      color,
                      textAlign: 'left',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      transition: 'all 0.2s',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: selectedOpt !== null ? 'default' : 'pointer'
                    }}
                  >
                    <span>{opt}</span>
                    {selectedOpt !== null && isCorrect && <CheckCircle size={18} color="#10B981" />}
                    {selectedOpt !== null && isChosen && !isCorrect && <XCircle size={18} color="#EF4444" />}
                  </button>
                );
              })}
            </div>

            {selectedOpt !== null && (
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--amber-primary)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <Sparkles size={15} /> Explanation
                </div>
                <p style={{ color: '#E5E7EB', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {question.explanation}
                </p>
              </div>
            )}

            {selectedOpt !== null && (
              <button
                onClick={handleNext}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {currentIdx + 1 < QUESTIONS.length ? 'Next Question ➔' : 'View Results ➔'}
              </button>
            )}
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--amber-primary)' }}>
              <Award size={36} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', marginBottom: '0.5rem' }}>
              Quiz Completed!
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              You scored <strong style={{ color: 'var(--amber-primary)' }}>{score}</strong> out of <strong>{QUESTIONS.length}</strong>!
            </p>
            <button
              onClick={handleRestart}
              className="btn-primary"
              style={{ margin: '0 auto' }}
            >
              <RotateCcw size={16} /> Try Again
            </button>
          </div>
        )
      )}
    </div>
  );
}
