import React, { useState, useEffect, useCallback } from 'react';
import { 
  Flame, 
  RotateCcw, 
  Lightbulb, 
  Trophy, 
  Skull, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Compass, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

// Word Pool with categories and paleontological clues
const WORD_LIST = [
  {
    word: "TYRANNOSAURUS",
    category: "Theropod Apex Predator",
    hint: "The 12-meter apex predator with a bone-crushing 57,000 N bite force."
  },
  {
    word: "TRICERATOPS",
    category: "Horned Ceratopsian",
    hint: "Three-horned armored herbivore with a solid neck frill capable of withstanding T-Rex charges."
  },
  {
    word: "VELOCIRAPTOR",
    category: "Feathered Dromaeosaur",
    hint: "Agile, bird-like Cretaceous hunter armed with lethal sickle claws on its second toes."
  },
  {
    word: "BRACHIOSAURUS",
    category: "Colossal Sauropod",
    hint: "High-browsing giant whose front limbs were longer than its back limbs to reach treetops."
  },
  {
    word: "SPINOSAURUS",
    category: "Semiaquatic Titan",
    hint: "Giant river predator with a 1.8-meter dorsal sail and crocodile-like fish-catching snout."
  },
  {
    word: "ANKYLOSAURUS",
    category: "Armored Living Tank",
    hint: "Covered in thick osteoderm plates and equipped with a heavy bone club tail."
  },
  {
    word: "STEGOSAURUS",
    category: "Plated Herbivore",
    hint: "Defended itself with four sharp thagomizer tail spikes and thermal back plates."
  },
  {
    word: "PTERODACTYL",
    category: "Mesozoic Winged Reptile",
    hint: "Soared through prehistoric skies; technically a flying pterosaur, not a true dinosaur."
  },
  {
    word: "DILOPHOSAURUS",
    category: "Early Jurassic Predator",
    hint: "Famous for dual symmetrical plate-like crests running along the top of its skull."
  },
  {
    word: "ARCHAEOPTERYX",
    category: "Avian Transitional Fossil",
    hint: "The famous fossil bridging feathered non-avian theropods directly to modern birds."
  },
  {
    word: "PALEONTOLOGY",
    category: "Scientific Field",
    hint: "The study of ancient life, fossils, prehistoric footprints, and geological deep time."
  },
  {
    word: "FOSSILIZATION",
    category: "Geological Process",
    hint: "The gradual process where minerals replace organic bone tissue, turning bones to stone."
  },
  {
    word: "ALLOSAURUS",
    category: "Jurassic Apex Predator",
    hint: "Known as the 'lion of the Jurassic', it used its upper jaw like an axe against prey."
  },
  {
    word: "CARNOTAURUS",
    category: "Horned Abelisaurid",
    hint: "Named the 'meat-eating bull', it possessed two prominent horns above its eyes."
  },
  {
    word: "IGUANODON",
    category: "Thumb-Spiked Herbivore",
    hint: "One of the first dinosaurs ever discovered, armed with rigid, conical thumb spikes."
  },
  {
    word: "PANGAEA",
    category: "Ancient Supercontinent",
    hint: "The single colossal landmass surrounded by Panthalassa ocean where early dinosaurs evolved."
  },
  {
    word: "CRETACEOUS",
    category: "Geological Period",
    hint: "The final, most biodiverse chapter of the Mesozoic that ended with the asteroid impact."
  },
  {
    word: "JURASSIC",
    category: "Geological Period",
    hint: "The warm, tropical greenhouse era when giant sauropods ruled the Earth."
  }
];

const MAX_MISTAKES = 6;

// Sound synthesizer using Web Audio API
function playSound(type, soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (type === 'correct') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'stomp') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(95, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 0.35);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'chomp') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.7);
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.9);
    } else if (type === 'win') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const noteTime = now + (i * 0.12);
        gain.gain.setValueAtTime(0.2, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteTime);
        osc.stop(noteTime + 0.35);
      });
    }
  } catch {
    // Audio context may be blocked by browser policy
  }
}

/**
 * Articulated Animated T-Rex SVG with Upper & Lower Chomping Jaws
 */
function ArticulatedTRex({ stage = 0, isDead = false }) {
  const eyeColor = stage >= 4 ? '#EF4444' : '#F59E0B';

  return (
    <div className={`trex-figure ${isDead ? 'trex-eating-mode' : `stage-${stage}`}`}>
      <svg 
        width="160" 
        height="115" 
        viewBox="0 0 160 115" 
        fill="none" 
        className="trex-svg-body"
      >
        {/* Tail */}
        <path d="M12 78 C32 68, 52 58, 72 54 C52 70, 32 88, 8 85 Z" fill="#92400E" />
        
        {/* Main Body */}
        <path d="M68 52 C82 38, 102 42, 116 46 C122 58, 116 78, 102 85 C88 88, 72 82, 68 52 Z" fill="#B45309" />
        
        {/* Tiny Theropod Forearm */}
        <path d="M108 65 L114 71 L118 69" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        
        {/* Muscular Hind Leg & Claws */}
        <path d="M84 72 C92 78, 94 92, 88 102 L82 106 M88 102 L94 106" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
        
        {/* Powerful Neck */}
        <path d="M106 46 C116 36, 126 32, 134 29 C128 42, 122 52, 114 58 Z" fill="#D97706" />

        {/* ================= UPPER JAW & CRANIUM (Swings UP and CHOMPS DOWN) ================= */}
        <g className={`trex-jaw-upper ${isDead ? 'anim-upper-chomp' : `jaw-open-${stage}`}`}>
          {/* Cranium Base */}
          <path d="M120 30 C130 18, 146 16, 156 22 C158 26, 156 32, 146 36 C136 38, 126 38, 120 35 Z" fill="#F59E0B" />
          {/* Eye Socket & Fiery Eye */}
          <circle cx="134" cy="23" r="3.2" fill={eyeColor} />
          <circle cx="135" cy="22" r="1.2" fill="#fff" />
          {/* Antorbital Fenestra cutout */}
          <ellipse cx="144" cy="26" rx="3.5" ry="2" fill="#78350F" opacity="0.6" />
          {/* Sharp Upper Teeth Row */}
          <path d="M126 35 L129 41 L132 35 L135 42 L138 35 L141 41 L144 35 L147 41 L150 36 L153 40" stroke="#FFF" strokeWidth="2.2" strokeLinejoin="round" fill="#FFF" />
        </g>

        {/* ================= LOWER JAW / MANDIBLE (Swings DOWN and SNAPS UP) ================= */}
        <g className={`trex-jaw-lower ${isDead ? 'anim-lower-chomp' : `jaw-drop-${stage}`}`}>
          {/* Mandible Bone */}
          <path d="M120 38 C128 41, 142 44, 154 38 C150 46, 134 48, 120 44 Z" fill="#B45309" />
          {/* Pink Guttural Tongue */}
          <path d="M124 40 C132 39, 140 41, 142 39" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sharp Lower Teeth Row */}
          <path d="M128 38 L131 33 L134 38 L137 32 L140 38 L143 33 L146 38 L149 34 L152 38" stroke="#FFF" strokeWidth="2" strokeLinejoin="round" fill="#FFF" />
        </g>
      </svg>
    </div>
  );
}

export default function TRexHangman() {
  const [currentWordIdx, setCurrentWordIdx] = useState(() => Math.floor(Math.random() * WORD_LIST.length));
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [screenShaking, setScreenShaking] = useState(false);

  const currentItem = WORD_LIST[currentWordIdx];
  const targetWord = currentItem.word;

  const mistakes = Array.from(guessedLetters).filter(letter => !targetWord.includes(letter)).length;
  const isDead = mistakes >= MAX_MISTAKES;
  const isWon = targetWord.split('').every(letter => guessedLetters.has(letter));
  const isGameOver = isDead || isWon;

  const handleGuess = useCallback((letter) => {
    if (isGameOver || guessedLetters.has(letter)) return;

    setGuessedLetters(prev => {
      const next = new Set(prev);
      next.add(letter);
      return next;
    });

    if (targetWord.includes(letter)) {
      playSound('correct', soundEnabled);
      const wordComplete = targetWord.split('').every(l => l === letter || guessedLetters.has(l));
      if (wordComplete) {
        setScore(s => s + 100 + (MAX_MISTAKES - mistakes) * 20);
        setStreak(st => st + 1);
        playSound('win', soundEnabled);
      }
    } else {
      const newMistakes = mistakes + 1;
      setScreenShaking(true);
      setTimeout(() => setScreenShaking(false), 450);

      if (newMistakes >= MAX_MISTAKES) {
        setStreak(0);
        playSound('chomp', soundEnabled);
      } else {
        playSound('stomp', soundEnabled);
      }
    }
  }, [guessedLetters, isGameOver, mistakes, soundEnabled, targetWord]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        handleGuess(char);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGuess]);

  const handleNextWord = () => {
    let nextIdx = Math.floor(Math.random() * WORD_LIST.length);
    if (nextIdx === currentWordIdx && WORD_LIST.length > 1) {
      nextIdx = (nextIdx + 1) % WORD_LIST.length;
    }
    setCurrentWordIdx(nextIdx);
    setGuessedLetters(new Set());
    setShowHint(false);
  };

  const handleRestartGame = () => {
    setScore(0);
    setStreak(0);
    handleNextWord();
  };

  const distanceSteps = [60, 45, 30, 18, 8, 2, 0];
  const currentDistance = distanceSteps[Math.min(mistakes, MAX_MISTAKES)];

  const threatMessages = [
    "Jungle is silent... T-Rex is stalking in the shadows.",
    "Ground tremors! T-Rex caught your scent.",
    "Footsteps shaking the mud! Approaching fast.",
    "Danger! Menacing growl echoes through the trees!",
    "IT'S RIGHT BEHIND YOU! Jaws snapping!",
    "LUNGE! Jaws wide open! One mistake left!",
    "CHOMP! Jaws snapped shut! You became T-Rex lunch!"
  ];

  return (
    <div className={`trex-game-compact ${screenShaking ? 'shake-screen' : ''}`}>
      {/* Top Header & Stats Bar */}
      <div className="game-top-bar">
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <div className="game-stat-pill">
            <Trophy size={14} color="#F59E0B" />
            <span>Score: <strong>{score}</strong></span>
          </div>
          <div className="game-stat-pill">
            <Flame size={14} color="#EF4444" />
            <span>Streak: <strong>{streak}</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <button 
            className={`btn-hint ${showHint ? 'active' : ''}`}
            onClick={() => setShowHint(!showHint)}
          >
            <Lightbulb size={13} />
            <span>{showHint ? "Hide Clue" : "Clue"}</span>
          </button>

          <button 
            className="game-audio-toggle"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Mute Sounds" : "Unmute Sounds"}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      </div>

      {/* Cinematic Widescreen T-Rex Arena (Fits on 1 Screen) */}
      <div className={`trex-arena-compact ${isDead ? 'arena-blood-flash' : ''}`}>
        {/* Threat Distance Bar */}
        <div className="compact-threat-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: '700' }}>
            <span className="threat-radar-dot" />
            <span style={{ color: mistakes >= 4 ? '#F87171' : '#FBBF24' }}>
              <strong>{currentDistance}m</strong> — {threatMessages[mistakes]}
            </span>
          </div>
          <div className="compact-meter-track">
            <div 
              className="compact-meter-fill" 
              style={{ width: `${(mistakes / MAX_MISTAKES) * 100}%` }} 
            />
          </div>
        </div>

        {/* Viewport Scene */}
        <div className="compact-viewport">
          {/* Moving T-Rex */}
          <div className={`trex-track-container pos-step-${mistakes}`}>
            <ArticulatedTRex stage={mistakes} isDead={isDead} />
          </div>

          {/* Explorer Character */}
          <div className="explorer-track-container">
            {isWon ? (
              <div className="explorer-escaped-car">
                <span style={{ fontSize: '1.8rem' }}>🚙💨</span>
                <span className="escaped-text">ESCAPED!</span>
              </div>
            ) : isDead ? (
              <div className="explorer-eaten-scene">
                {/* Explorer's Hat Flying Off */}
                <div className="flying-safari-hat">🤠</div>
                {/* Blood / Dust Splatter */}
                <div className="chomp-splatter-burst">💥 CHOMP!</div>
                {/* Skeleton Bones Remaining */}
                <div className="leftover-bones">🦴</div>
              </div>
            ) : (
              <div className={`explorer-standing ${mistakes >= 4 ? 'explorer-panicking' : ''}`}>
                <div style={{ fontSize: '1.9rem', lineHeight: 1 }}>🤠</div>
                <div style={{ fontSize: '0.9rem', marginTop: '-4px' }}>🔦</div>
                <div className="explorer-nametag">You</div>
              </div>
            )}
          </div>
        </div>

        {/* Ground Line */}
        <div className="arena-ground-line" />
      </div>

      {/* Clue Banner if Active */}
      {showHint && (
        <div className="compact-hint-card">
          <Sparkles size={14} color="#F59E0B" />
          <span><strong>Clue:</strong> {currentItem.hint}</span>
        </div>
      )}

      {/* Word Category & Word Slots (Combined) */}
      <div className="word-section-compact">
        <div className="compact-category-tag">
          <Compass size={13} />
          <span>Category: <strong>{currentItem.category}</strong></span>
        </div>

        {/* Secret Word Display */}
        <div className="secret-word-row">
          {targetWord.split('').map((letter, idx) => {
            const revealed = isGameOver || guessedLetters.has(letter);
            const isMissing = isDead && !guessedLetters.has(letter);
            return (
              <div 
                key={idx} 
                className={`compact-slot ${revealed ? 'revealed' : ''} ${isMissing ? 'missing' : ''}`}
              >
                <span>{revealed ? letter : ''}</span>
                <div className="compact-slot-bar" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Outcome Overlays (Win / Lose) */}
      {isWon && (
        <div className="compact-banner win">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="#34D399" />
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#34D399', fontWeight: '800' }}>YOU SURVIVED!</h3>
          </div>
          <p style={{ margin: '4px 0 10px', fontSize: '0.85rem', color: '#E5E7EB' }}>
            You solved <strong>{targetWord}</strong> and escaped before the T-Rex caught you!
          </p>
          <button className="btn-primary" onClick={handleNextWord} style={{ padding: '0.45rem 1.25rem', fontSize: '0.88rem' }}>
            <span>Next Word</span>
            <ChevronRight size={15} />
          </button>
        </div>
      )}

      {isDead && (
        <div className="compact-banner lose">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Skull size={20} color="#F87171" />
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#F87171', fontWeight: '900' }}>
              CHOMPED! YOU WERE EATEN!
            </h3>
          </div>
          <p style={{ margin: '4px 0 10px', fontSize: '0.85rem', color: '#E5E7EB' }}>
            The dinosaur was <strong style={{ color: '#FBBF24' }}>{targetWord}</strong>!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <button className="btn-primary" onClick={handleNextWord} style={{ padding: '0.45rem 1.15rem', fontSize: '0.88rem' }}>
              <RotateCcw size={14} />
              <span>Try Again</span>
            </button>
            <button className="btn-secondary" onClick={handleRestartGame} style={{ padding: '0.45rem 1.15rem', fontSize: '0.88rem' }}>
              <span>Reset Score</span>
            </button>
          </div>
        </div>
      )}

      {/* Compact Keyboard */}
      <div className="compact-keyboard">
        {"QWERTYUIOPASDFGHJKLZXCVBNM".split('').map((char) => {
          const isGuessed = guessedLetters.has(char);
          const isCorrect = isGuessed && targetWord.includes(char);
          const isWrong = isGuessed && !targetWord.includes(char);

          return (
            <button
              key={char}
              className={`compact-key ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
              onClick={() => handleGuess(char)}
              disabled={isGuessed || isGameOver}
            >
              {char}
            </button>
          );
        })}
      </div>
    </div>
  );
}
