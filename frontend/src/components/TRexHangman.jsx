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
import DinoSkull from './DinoSkull';

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
      // Pleasant high-pitched crystal ding
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.08); // A5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'stomp') {
      // Heavy T-Rex footstep sub-thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'chomp') {
      // Game Over: Snapping jaws crunch + roar
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.7);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.85);
    } else if (type === 'win') {
      // Victory fanfare
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const noteTime = now + (i * 0.12);
        gain.gain.setValueAtTime(0.2, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteTime);
        osc.stop(noteTime + 0.4);
      });
    }
  } catch {
    // Audio context may be blocked by autoplay policies
  }
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

  // Calculate mistake count
  const mistakes = Array.from(guessedLetters).filter(letter => !targetWord.includes(letter)).length;
  const isDead = mistakes >= MAX_MISTAKES;
  const isWon = targetWord.split('').every(letter => guessedLetters.has(letter));
  const isGameOver = isDead || isWon;

  // Trigger sound and screen shake on events
  const handleGuess = useCallback((letter) => {
    if (isGameOver || guessedLetters.has(letter)) return;

    setGuessedLetters(prev => {
      const next = new Set(prev);
      next.add(letter);
      return next;
    });

    if (targetWord.includes(letter)) {
      playSound('correct', soundEnabled);
      // Check if this guess completes the word
      const wordComplete = targetWord.split('').every(l => l === letter || guessedLetters.has(l));
      if (wordComplete) {
        setScore(s => s + 100 + (MAX_MISTAKES - mistakes) * 20);
        setStreak(st => st + 1);
        playSound('win', soundEnabled);
      }
    } else {
      // Wrong guess
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

  // Physical Keyboard Listener
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

  // Distance to T-Rex calculation
  const distanceSteps = [60, 45, 30, 18, 8, 2, 0];
  const currentDistance = distanceSteps[Math.min(mistakes, MAX_MISTAKES)];

  // Descriptive urgency messages
  const threatMessages = [
    "Distance: 60m • The jungle is quiet... T-Rex is stalking in the shadows.",
    "Distance: 45m • Heavy footsteps shake the mud! It caught your scent.",
    "Distance: 30m • Ground tremors intensify! T-Rex emerges from the ferns.",
    "Distance: 18m • Danger! The beast lets out a bloodcurdling roar!",
    "Distance: 8m • IT'S RIGHT BEHIND YOU! Massive jaws snap at the air!",
    "Distance: 2m • LUNGE! Jaws wide open! One mistake and you are CHOMPED!",
    "CHOMP! 0m • Game Over! You became a snack for the Tyrannosaurus Rex!"
  ];

  return (
    <div className={`trex-game-container ${screenShaking ? 'shake-screen' : ''}`}>
      {/* Top Header & Stats */}
      <div className="game-top-bar">
        <div className="game-stat-pill">
          <Trophy size={16} color="#F59E0B" />
          <span>Score: <strong>{score}</strong></span>
        </div>

        <div className="game-stat-pill">
          <Flame size={16} color="#EF4444" />
          <span>Survival Streak: <strong>{streak}</strong></span>
        </div>

        <button 
          className="game-audio-toggle"
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? "Mute Game Sounds" : "Unmute Game Sounds"}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      {/* Cinematic T-Rex Encounter Arena */}
      <div className="trex-arena">
        {/* Sky / Moon / Volcanic Aura Backdrop */}
        <div className="arena-backdrop">
          <div className="arena-moon" />
          <div className="arena-mist" />
        </div>

        {/* T-Rex Threat Alert Banner */}
        <div className={`threat-banner mistake-${mistakes}`}>
          <div className="threat-distance">
            <span className="threat-radar-dot" />
            <span><strong>{currentDistance}m</strong> — {threatMessages[mistakes]}</span>
          </div>
          <div className="threat-meter">
            <div 
              className="threat-meter-fill" 
              style={{ width: `${(mistakes / MAX_MISTAKES) * 100}%` }} 
            />
          </div>
        </div>

        {/* Visual Scene: T-Rex stalks Explorer */}
        <div className="scene-viewport">
          {/* T-Rex Entity */}
          <div className={`entity-trex stage-${mistakes} ${isDead ? 'chomp-anim' : ''}`}>
            {/* Dinosaur Visual Artwork */}
            <div className="trex-graphic-wrap">
              <DinoSkull size={isDead ? 110 : 85 + mistakes * 5} className="scene-dino-skull" />
              {/* Jaw Teeth Accent */}
              <div className="trex-teeth-glow" />
              {isDead && (
                <div className="chomp-effect-burst">
                  <span>*CHOMP!!*</span>
                </div>
              )}
            </div>
            <div className="entity-label">
              {isDead ? "Hungry T-Rex (Full!)" : "T-Rex Predator"}
            </div>
          </div>

          {/* Explorer / Paleontologist Entity */}
          <div className={`entity-explorer ${isDead ? 'explorer-eaten' : isWon ? 'explorer-escaped' : ''}`}>
            <div className="explorer-avatar">
              {isWon ? (
                <div className="explorer-flare">🔥 Jeep Escaped! 💨</div>
              ) : isDead ? (
                <div className="explorer-skull">
                  <Skull size={34} color="#EF4444" />
                  <span style={{ fontSize: '0.75rem', color: '#F87171' }}>RIP</span>
                </div>
              ) : (
                <div className="explorer-figure">
                  <span className="explorer-hat">🤠</span>
                  <span className="explorer-torch">🔦</span>
                </div>
              )}
            </div>
            <div className="entity-label">
              {isWon ? "You Escaped!" : isDead ? "Explorer (Eaten)" : "You (Paleontologist)"}
            </div>
          </div>
        </div>
      </div>

      {/* Word Category & Hint Box */}
      <div className="word-meta-section">
        <div className="word-category-pill">
          <Compass size={14} />
          <span>Category: <strong>{currentItem.category}</strong></span>
        </div>

        <button 
          className={`btn-hint ${showHint ? 'active' : ''}`}
          onClick={() => setShowHint(!showHint)}
        >
          <Lightbulb size={14} />
          <span>{showHint ? "Hide Clue" : "Need a Clue?"}</span>
        </button>
      </div>

      {showHint && (
        <div className="hint-card">
          <Sparkles size={14} color="#F59E0B" />
          <p>{currentItem.hint}</p>
        </div>
      )}

      {/* Secret Word Letters Display */}
      <div className="secret-word-display">
        {targetWord.split('').map((letter, idx) => {
          const revealed = isGameOver || guessedLetters.has(letter);
          const isMissingAtEnd = isDead && !guessedLetters.has(letter);
          return (
            <div 
              key={idx} 
              className={`letter-slot ${revealed ? 'revealed' : ''} ${isMissingAtEnd ? 'missing-reveal' : ''}`}
            >
              <span>{revealed ? letter : ''}</span>
              <div className="slot-underline" />
            </div>
          );
        })}
      </div>

      {/* Outcome Overlays (Win / Lose) */}
      {isWon && (
        <div className="game-banner win-banner">
          <div className="banner-icon-circle win">
            <ShieldCheck size={36} color="#10B981" />
          </div>
          <h3>YOU SURVIVED!</h3>
          <p>
            You solved <strong>{targetWord}</strong> in time and fled to safety before the T-Rex could reach you!
          </p>
          <div className="banner-actions">
            <button className="btn-primary" onClick={handleNextWord}>
              <span>Next Dinosaur Word</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {isDead && (
        <div className="game-banner lose-banner">
          <div className="banner-icon-circle lose">
            <Skull size={36} color="#EF4444" />
          </div>
          <h3>CHOMPED! YOU BECAME T-REX LUNCH!</h3>
          <p>
            The secret dinosaur word was <strong style={{ color: '#FBBF24' }}>{targetWord}</strong>.
          </p>
          <div className="banner-actions">
            <button className="btn-primary" onClick={handleNextWord}>
              <RotateCcw size={16} />
              <span>Try Again</span>
            </button>
            <button className="btn-secondary" onClick={handleRestartGame}>
              <span>Reset Game</span>
            </button>
          </div>
        </div>
      )}

      {/* Virtual Keyboard */}
      <div className="virtual-keyboard">
        {"QWERTYUIOPASDFGHJKLZXCVBNM".split('').map((char) => {
          const isGuessed = guessedLetters.has(char);
          const isCorrect = isGuessed && targetWord.includes(char);
          const isWrong = isGuessed && !targetWord.includes(char);

          return (
            <button
              key={char}
              className={`key-btn ${isCorrect ? 'key-correct' : ''} ${isWrong ? 'key-wrong' : ''}`}
              onClick={() => handleGuess(char)}
              disabled={isGuessed || isGameOver}
            >
              {char}
            </button>
          );
        })}
      </div>

      {/* Keyboard Helper Footer */}
      <div className="game-footer-note">
        <span>💡 Tip: You can also use your physical computer keyboard to guess letters!</span>
      </div>
    </div>
  );
}
