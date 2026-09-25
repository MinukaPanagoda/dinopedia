import React, { useState, useEffect, useCallback } from 'react';
import trexImage from '../assets/trex_transparent.png';
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
  ShieldCheck,
  Film,
  Hourglass,
  Layers,
  SkipForward
} from 'lucide-react';

// Word Pool categorized into Dinosaurs, Movies, and Eras
const WORD_LIST = [
  // ================= DINOSAURS =================
  {
    word: "TYRANNOSAURUS",
    group: "dinosaurs",
    category: "Theropod Apex Predator",
    hint: "The 12-meter apex predator with a bone-crushing 57,000 N bite force."
  },
  {
    word: "TRICERATOPS",
    group: "dinosaurs",
    category: "Horned Ceratopsian",
    hint: "Three-horned armored herbivore with a solid neck frill capable of withstanding T-Rex charges."
  },
  {
    word: "VELOCIRAPTOR",
    group: "dinosaurs",
    category: "Feathered Dromaeosaur",
    hint: "Agile, bird-like Cretaceous hunter armed with lethal sickle claws on its second toes."
  },
  {
    word: "BRACHIOSAURUS",
    group: "dinosaurs",
    category: "Colossal Sauropod",
    hint: "High-browsing giant whose front limbs were longer than its back limbs to reach treetops."
  },
  {
    word: "SPINOSAURUS",
    group: "dinosaurs",
    category: "Semiaquatic Titan",
    hint: "Giant river predator with a 1.8-meter dorsal sail and crocodile-like fish-catching snout."
  },
  {
    word: "ANKYLOSAURUS",
    group: "dinosaurs",
    category: "Armored Living Tank",
    hint: "Covered in thick osteoderm plates and equipped with a heavy bone club tail."
  },
  {
    word: "STEGOSAURUS",
    group: "dinosaurs",
    category: "Plated Herbivore",
    hint: "Defended itself with four sharp thagomizer tail spikes and thermal back plates."
  },
  {
    word: "PTERODACTYL",
    group: "dinosaurs",
    category: "Mesozoic Winged Reptile",
    hint: "Soared through prehistoric skies; technically a flying pterosaur, not a true dinosaur."
  },
  {
    word: "DILOPHOSAURUS",
    group: "dinosaurs",
    category: "Early Jurassic Predator",
    hint: "Famous for dual symmetrical plate-like crests running along the top of its skull."
  },
  {
    word: "ARCHAEOPTERYX",
    group: "dinosaurs",
    category: "Avian Transitional Fossil",
    hint: "The famous fossil bridging feathered non-avian theropods directly to modern birds."
  },
  {
    word: "ALLOSAURUS",
    group: "dinosaurs",
    category: "Jurassic Apex Predator",
    hint: "Known as the 'lion of the Jurassic', it used its upper jaw like an axe against prey."
  },
  {
    word: "CARNOTAURUS",
    group: "dinosaurs",
    category: "Horned Abelisaurid",
    hint: "Named the 'meat-eating bull', it possessed two prominent horns above its eyes."
  },
  {
    word: "IGUANODON",
    group: "dinosaurs",
    category: "Thumb-Spiked Herbivore",
    hint: "One of the first dinosaurs ever discovered, armed with rigid, conical thumb spikes."
  },
  {
    word: "PARASAUROLOPHUS",
    group: "dinosaurs",
    category: "Crested Hadrosaur",
    hint: "Duck-billed dinosaur with an acoustic 1.8-meter hollow curved skull crest."
  },

  // ================= MOVIES & CINEMA =================
  {
    word: "JURASSIC PARK",
    group: "movies",
    category: "1993 Sci-Fi Classic",
    hint: "Steven Spielberg's masterpiece that revolutionized cinema using CGI and animatronic dinosaurs."
  },
  {
    word: "THE LOST WORLD",
    group: "movies",
    category: "1997 Dino Sequel",
    hint: "Sequel featuring an urban rampage where an enraged T-Rex storms the streets of San Diego."
  },
  {
    word: "JURASSIC WORLD",
    group: "movies",
    category: "2015 Blockbuster",
    hint: "A luxury theme park on Isla Nublar shaken by the genetically modified Indominus Rex."
  },
  {
    word: "KING KONG",
    group: "movies",
    category: "Creature Feature",
    hint: "Legendary giant beast battling ferocious dinosaurs on perilous Skull Island."
  },
  {
    word: "LAND BEFORE TIME",
    group: "movies",
    category: "1988 Animated Feature",
    hint: "Beloved animated classic following Littlefoot the Apatosaurus seeking the Great Valley."
  },
  {
    word: "PREHISTORIC PLANET",
    group: "movies",
    category: "BBC Natural History",
    hint: "Photorealistic documentary series narrated by Sir David Attenborough with music by Hans Zimmer."
  },
  {
    word: "DINOSAUR",
    group: "movies",
    category: "Disney Animation",
    hint: "2000 Disney adventure following Aladar the Iguanodon leading a herd away from meteor devastation."
  },
  {
    word: "ICE AGE",
    group: "movies",
    category: "Animated Comedy",
    hint: "Popular film franchise where Manny and Sid discover an underground tropical dinosaur paradise."
  },
  {
    word: "THE GOOD DINOSAUR",
    group: "movies",
    category: "Pixar Studios",
    hint: "Pixar animation exploring an alternate timeline where the dinosaur asteroid missed Earth."
  },

  // ================= ERAS & PREHISTORY =================
  {
    word: "TRIASSIC",
    group: "eras",
    category: "Geological Period",
    hint: "The earliest Mesozoic period (252–201 Ma) that marked the dawn of the first true dinosaurs."
  },
  {
    word: "JURASSIC",
    group: "eras",
    category: "Geological Period",
    hint: "The warm, tropical greenhouse era (201–145 Ma) when colossal sauropods ruled the Earth."
  },
  {
    word: "CRETACEOUS",
    group: "eras",
    category: "Geological Period",
    hint: "The final Mesozoic chapter (145–66 Ma) of peak diversity ended by the Chicxulub asteroid impact."
  },
  {
    word: "MESOZOIC",
    group: "eras",
    category: "Geological Era",
    hint: "The 186-million-year 'Age of Reptiles' encompassing the Triassic, Jurassic, and Cretaceous."
  },
  {
    word: "PALEOZOIC",
    group: "eras",
    category: "Ancient Era",
    hint: "The era preceding dinosaurs that ended with 'The Great Dying' Permian extinction."
  },
  {
    word: "PERMIAN",
    group: "eras",
    category: "Pre-Dino Period",
    hint: "Final Paleozoic period dominated by sail-backed mammal ancestors like Dimetrodon."
  },
  {
    word: "CARBONIFEROUS",
    group: "eras",
    category: "Paleozoic Period",
    hint: "The lush swamp forest period with giant insects that produced Earth's vast coal deposits."
  },
  {
    word: "PANGAEA",
    group: "eras",
    category: "Ancient Supercontinent",
    hint: "The colossal single landmass surrounded by Panthalassa where early dinosaurs first evolved."
  },
  {
    word: "PALEONTOLOGY",
    group: "eras",
    category: "Scientific Field",
    hint: "The scientific study of ancient life, fossils, footprints, and geological deep time."
  },
  {
    word: "FOSSILIZATION",
    group: "eras",
    category: "Geological Process",
    hint: "The gradual process where minerals replace decaying bone and tissue, turning organic matter to stone."
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
 * Realistic Animated T-Rex using the user-uploaded cut dinosaur model
 */
function RealisticTRex({ stage = 0, isDead = false }) {
  const isEnraged = stage >= 4;

  return (
    <div className={`realistic-trex-wrapper ${isDead ? 'trex-eating-mode' : `stage-${stage}`}`}>
      <div className="realistic-trex-img-container">
        <img 
          src={trexImage} 
          alt="Tyrannosaurus Rex" 
          className="realistic-trex-img" 
          draggable="false"
        />
        {/* Menacing glowing predator eye overlay */}
        <div className={`trex-eye-glow ${isEnraged ? 'eye-enraged' : ''} ${isDead ? 'eye-bloodlust' : ''}`} />
      </div>
    </div>
  );
}

export default function TRexHangman() {
  const [selectedCategory, setSelectedCategory] = useState('mix'); // 'mix' | 'dinosaurs' | 'movies' | 'eras'
  const [currentItem, setCurrentItem] = useState(() => {
    return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [screenShaking, setScreenShaking] = useState(false);

  const targetWord = currentItem.word;

  const mistakes = Array.from(guessedLetters).filter(letter => !targetWord.includes(letter)).length;
  const isDead = mistakes >= MAX_MISTAKES;
  const isWon = targetWord.split('').every(letter => letter === ' ' || guessedLetters.has(letter));
  const isGameOver = isDead || isWon;

  const getFilteredPool = (cat) => {
    if (cat === 'mix') return WORD_LIST;
    return WORD_LIST.filter(item => item.group === cat);
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    const pool = getFilteredPool(cat);
    let nextItem = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1 && nextItem.word === currentItem.word) {
      const others = pool.filter(i => i.word !== currentItem.word);
      nextItem = others[Math.floor(Math.random() * others.length)];
    }
    setCurrentItem(nextItem);
    setGuessedLetters(new Set());
  };

  const handleNextWord = () => {
    const pool = getFilteredPool(selectedCategory);
    let nextItem = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1 && nextItem.word === currentItem.word) {
      const others = pool.filter(i => i.word !== currentItem.word);
      nextItem = others[Math.floor(Math.random() * others.length)];
    }
    setCurrentItem(nextItem);
    setGuessedLetters(new Set());
  };

  const handleRestartGame = () => {
    setScore(0);
    setStreak(0);
    handleNextWord();
  };

  const handleGuess = useCallback((letter) => {
    if (isGameOver || guessedLetters.has(letter)) return;

    setGuessedLetters(prev => {
      const next = new Set(prev);
      next.add(letter);
      return next;
    });

    if (targetWord.includes(letter)) {
      playSound('correct', soundEnabled);
      const wordComplete = targetWord.split('').every(l => l === ' ' || l === letter || guessedLetters.has(l));
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
    <div className={`trex-battlefield-wrapper ${screenShaking ? 'shake-screen' : ''}`}>
      {/* ================= LEFT FLANK: CATEGORY SELECTOR & THREAT RADAR ================= */}
      <aside className="battlefield-flank battlefield-flank-left">
        {/* Category Selection Card */}
        <div className="flank-card category-selector-flank">
          <div className="flank-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Compass size={14} color="#F59E0B" />
              <span>Select Category</span>
            </div>
          </div>
          <div className="flank-category-list">
            <button 
              type="button"
              className={`flank-cat-btn ${selectedCategory === 'mix' ? 'active' : ''}`}
              onClick={() => handleSelectCategory('mix')}
            >
              <span className="cat-icon">🎲</span>
              <div className="cat-text">
                <strong>Mix (All)</strong>
                <small>Everything Prehistoric</small>
              </div>
            </button>

            <button 
              type="button"
              className={`flank-cat-btn ${selectedCategory === 'dinosaurs' ? 'active' : ''}`}
              onClick={() => handleSelectCategory('dinosaurs')}
            >
              <span className="cat-icon">🦖</span>
              <div className="cat-text">
                <strong>Dinosaurs</strong>
                <small>Fossil Apex Predators</small>
              </div>
            </button>

            <button 
              type="button"
              className={`flank-cat-btn ${selectedCategory === 'movies' ? 'active' : ''}`}
              onClick={() => handleSelectCategory('movies')}
            >
              <span className="cat-icon">🎬</span>
              <div className="cat-text">
                <strong>Movies</strong>
                <small>Cinema & Blockbusters</small>
              </div>
            </button>

            <button 
              type="button"
              className={`flank-cat-btn ${selectedCategory === 'eras' ? 'active' : ''}`}
              onClick={() => handleSelectCategory('eras')}
            >
              <span className="cat-icon">⏳</span>
              <div className="cat-text">
                <strong>Eras</strong>
                <small>Deep Time & Epochs</small>
              </div>
            </button>
          </div>
        </div>

        {/* Survival Radar Card */}
        <div className="flank-card survival-radar-card">
          <div className="flank-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Flame size={14} color="#EF4444" />
              <span>Survival Radar</span>
            </div>
          </div>
          <div className="threat-metric-row">
            <span>T-Rex Distance:</span>
            <strong style={{ color: mistakes >= 4 ? '#F87171' : '#FBBF24' }}>{currentDistance}m</strong>
          </div>
          <div className="threat-metric-row">
            <span>Lives Left:</span>
            <strong style={{ color: mistakes >= 4 ? '#EF4444' : '#34D399' }}>{MAX_MISTAKES - mistakes} / {MAX_MISTAKES}</strong>
          </div>
          <div className="threat-radar-mini-track">
            <div 
              className="threat-radar-mini-fill" 
              style={{ width: `${(mistakes / MAX_MISTAKES) * 100}%` }} 
            />
          </div>
        </div>
      </aside>

      {/* ================= CENTER COLUMN: MAIN HANGMAN SURVIVAL GAME ================= */}
      <main className="battlefield-center">
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

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button 
              className="btn-skip-word"
              onClick={handleNextWord}
              title="Skip to next word"
            >
              <SkipForward size={13} />
              <span>Skip Word</span>
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

        {/* Cinematic Widescreen T-Rex Arena */}
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
            {/* Moving Realistic T-Rex */}
            <div className={`trex-track-container pos-step-${mistakes}`}>
              <RealisticTRex stage={mistakes} isDead={isDead} />
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
                  <div className="flying-safari-hat">🤠</div>
                  <div className="chomp-splatter-burst">💥 CHOMP!</div>
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

        {/* Word Section with Secret Letters */}
        <div className="word-section-compact">
          <div className="secret-word-row">
            {targetWord.split('').map((letter, idx) => {
              if (letter === ' ') {
                return <div key={idx} className="word-space-separator" />;
              }
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
      </main>

      {/* ================= RIGHT FLANK: EXPEDITION CLUE & FIELD DOSSIER ================= */}
      <aside className="battlefield-flank battlefield-flank-right">
        {/* Expedition Clue Card */}
        <div className="flank-card clue-dossier-card">
          <div className="flank-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Sparkles size={14} color="#F59E0B" />
              <span>Expedition Clue</span>
            </div>
            <span className="clue-subgroup-pill">{currentItem.category}</span>
          </div>
          
          <p className="clue-dossier-hint">"{currentItem.hint}"</p>

          <div className="clue-dossier-footer">
            <div className="dossier-stat">
              <span>Word Length:</span>
              <strong>{targetWord.replace(/ /g, '').length} Letters</strong>
            </div>
            {targetWord.includes(' ') && (
              <div className="dossier-stat">
                <span>Structure:</span>
                <strong>{targetWord.split(' ').length} Words</strong>
              </div>
            )}
          </div>
        </div>

        {/* Field Guide Mission Card */}
        <div className="flank-card field-guide-card">
          <div className="flank-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ShieldCheck size={14} color="#34D399" />
              <span>Survival Mission</span>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '0.78rem', color: '#9CA3AF', lineHeight: '1.45' }}>
            Solve the hidden prehistoric term before the T-Rex closes the 60m gap! Use keyboard keys or tap buttons.
          </p>
        </div>
      </aside>
    </div>
  );
}
