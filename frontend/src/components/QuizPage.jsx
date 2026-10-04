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
  },
  {
    q: "Which titanosaur is widely estimated as one of the heaviest land animals to ever walk Earth?",
    options: ["Argentinosaurus", "Diplodocus", "Iguanodon", "Parasaurolophus"],
    correct: 0,
    explanation: "Argentinosaurus weighed between 70 to 90 metric tons and reached lengths exceeding 35 meters in prehistoric South America."
  },
  {
    q: "What unique aerodynamic feature made the small dromaeosaur Microraptor famous?",
    options: ["Bat-like leathery skin wings", "Flight feathers on both arms and hind legs (four wings)", "A gas-filled sail crest", "Jet-propelled gliding membranes"],
    correct: 1,
    explanation: "Microraptor was a 'four-winged' glider/flyer possessing long asymmetrical flight feathers on its front forearms and hind legs."
  },
  {
    q: "Scientifically speaking, was the gigantic marine reptile Mosasaurus a true dinosaur?",
    options: ["Yes, a marine branch of sauropods", "No, it was an aquatic squamate reptile related to monitor lizards and snakes", "Yes, it evolved directly from Plesiosaurs", "No, it was a mammal ancestor"],
    correct: 1,
    explanation: "Mosasaurus was not a dinosaur! It was an apex marine lizard belonging to squamata, closely related to modern monitor lizards and snakes."
  },
  {
    q: "What fossilized tree resin famously preserves delicate Mesozoic insects and dinosaur feathers?",
    options: ["Obsidian", "Amber", "Coprolite", "Silica"],
    correct: 1,
    explanation: "Fossilized tree resin known as Amber acts as a natural time capsule, preserving 3D insect exoskeletons and microscopic feather structures."
  },
  {
    q: "Which dinosaur had a massive dome-shaped skull reinforced with dense bone up to 9 inches thick?",
    options: ["Pachycephalosaurus", "Triceratops", "Brachiosaurus", "Carnotaurus"],
    correct: 0,
    explanation: "Pachycephalosaurus had an extremely thickened skull roof, likely used for flank-butting, species recognition, or combat display."
  },
  {
    q: "What does the scientific name 'Velociraptor' literally translate to in Latin?",
    options: ["Terrible Lizard", "Swift Seizer / Swift Thief", "Armored Giant", "Three-Horned Face"],
    correct: 1,
    explanation: "Velociraptor translates to 'swift seizer' or 'swift thief', describing its agility, speed, and lethal sickle-clawed feet."
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
    <div className="home-container" style={{ padding: '1.25rem 1rem 2.5rem', maxWidth: activeMode === 'hangman' ? '1280px' : '860px', transition: 'max-width 0.3s ease' }}>
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
            {/* Visual Progress Bar */}
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '1.25rem' }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%`, 
                  background: 'linear-gradient(90deg, #F59E0B, #EAB308)', 
                  borderRadius: '999px',
                  transition: 'width 0.4s ease'
                }} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              <span>Question {currentIdx + 1} of {QUESTIONS.length}</span>
              <span>Score: <strong style={{ color: 'var(--amber-primary)' }}>{score}</strong></span>
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
                <p style={{ color: '#F1F5F9', fontSize: '0.95rem', lineHeight: '1.6' }}>
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
          <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            {(() => {
              const pct = Math.round((score / QUESTIONS.length) * 100);
              let rank = { title: "Paleontology Novice", color: "#9CA3AF", icon: "🦕", msg: "Keep exploring the Mesozoic era to hone your knowledge!" };
              if (pct === 100) {
                rank = { title: "Master Paleontologist", color: "#F59E0B", icon: "👑", msg: "Exceptional! You have paleontologist-level mastery of prehistory!" };
              } else if (pct >= 75) {
                rank = { title: "Senior Fossil Hunter", color: "#10B981", icon: "🦖", msg: "Great job! Your dinosaur knowledge is sharp and accurate." };
              } else if (pct >= 50) {
                rank = { title: "Mesozoic Explorer", color: "#3B82F6", icon: "🧭", msg: "Solid effort! A few more digs and you'll be an expert." };
              }

              return (
                <div>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '2.5rem' }}>
                    {rank.icon}
                  </div>

                  <div style={{ display: 'inline-block', padding: '0.3rem 0.95rem', borderRadius: '999px', background: `${rank.color}22`, border: `1px solid ${rank.color}66`, color: rank.color, fontSize: '0.88rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                    {rank.title}
                  </div>

                  <h2 style={{ fontSize: '2.1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                    Quiz Completed!
                  </h2>

                  <p style={{ fontSize: '1.2rem', color: '#CBD5E1', marginBottom: '0.5rem' }}>
                    You scored <strong style={{ color: 'var(--amber-primary)', fontSize: '1.5rem', fontWeight: '900' }}>{score}</strong> / <strong>{QUESTIONS.length}</strong> ({pct}%)
                  </p>

                  <div style={{ width: '100%', maxWidth: '340px', height: '10px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', margin: '0.75rem auto 1.25rem', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: rank.color, borderRadius: '999px', transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                  </div>

                  <p style={{ fontSize: '0.98rem', color: '#E2E8F0', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: '1.6', fontWeight: '500' }}>
                    {rank.msg}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={handleRestart}
                      className="btn-primary"
                    >
                      <RotateCcw size={16} /> Retake Quiz
                    </button>
                    <button
                      onClick={() => {
                        handleRestart();
                        setActiveMode('hangman');
                      }}
                      className="category-tab-btn"
                      style={{ padding: '0.65rem 1.25rem' }}
                    >
                      <Gamepad2 size={16} /> Play T-Rex Game
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )
      )}
    </div>
  );
}
