import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Star, 
  Film, 
  User, 
  Calendar, 
  Clock, 
  Quote, 
  ArrowRight,
  Sparkles,
  Play
} from 'lucide-react';
import { DINOSAURS } from '../data/dinosaurs';
import DinoSkull from './DinoSkull';

export default function MovieModal({ movie, onClose, onSelectDino, onOpenDinoModal }) {
  if (!movie) return null;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Find linked dinosaurs
  const featuredDinos = (movie.featuredSpecimenIds || [])
    .map(id => DINOSAURS.find(d => d.id === id))
    .filter(Boolean);

  const handleDinoClick = (dino) => {
    onClose();
    if (onOpenDinoModal) {
      onOpenDinoModal(dino);
    } else if (onSelectDino) {
      onSelectDino(dino);
    }
  };

  return (
    <div className="movie-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="movie-modal-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ '--movie-accent': '#F59E0B' }}
      >
        {/* Close Button */}
        <button 
          className="movie-modal-close-btn" 
          onClick={onClose} 
          aria-label="Close Movie Dossier"
        >
          <X size={20} />
        </button>

        {/* Modal Content Grid */}
        <div className="movie-modal-grid">
          {/* Left Column: Film Poster & Key Stats */}
          <div className="movie-modal-left">
            <div className="movie-modal-poster-wrap">
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="movie-modal-poster-img"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80";
                }}
              />
              {/* IMDb Rating Badge */}
              <div className="movie-modal-rating-tag">
                <Star size={13} fill="#000" color="#000" />
                <span><strong>{movie.rating}</strong> / 10</span>
                <span className="movie-modal-votes">({movie.votes || 'IMDb'})</span>
              </div>
            </div>

            {/* Quick Metadata List */}
            <div className="movie-meta-strip">
              <div className="movie-meta-pill">
                <Calendar size={13} color="var(--amber-primary)" />
                <span>Released: <strong>{movie.year}</strong></span>
              </div>
              <div className="movie-meta-pill">
                <Clock size={13} color="var(--amber-primary)" />
                <span>Runtime: <strong>{movie.runtime}</strong></span>
              </div>
              <div className="movie-meta-pill">
                <User size={13} color="var(--amber-primary)" />
                <span>Director: <strong>{movie.director}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: In-depth Film Dossier */}
          <div className="movie-modal-right">
            {/* Genre Badges */}
            <div className="movie-badges-row">
              {movie.genre && movie.genre.split(',').map((g, idx) => (
                <span key={idx} className="movie-genre-chip">
                  {g.trim()}
                </span>
              ))}
              <span className="movie-scope-chip">
                {movie.year} Theatrical Release
              </span>
            </div>

            {/* Movie Title */}
            <h2 className="movie-modal-title">
              {movie.title}
            </h2>

            {/* Director & Year row */}
            <div className="movie-director-strip">
              <div className="movie-director-icon">
                <Film size={18} color="var(--amber-primary)" />
              </div>
              <div>
                <div className="movie-director-name">Directed by <strong>{movie.director}</strong></div>
                <div className="movie-runtime-text">{movie.runtime} • IMDb Rated {movie.rating} ({movie.votes} votes)</div>
              </div>
            </div>

            {/* Tagline / Famous Quote Banner */}
            {movie.tagline && (
              <div className="movie-quote-banner">
                <Quote size={20} className="movie-quote-icon" />
                <p className="movie-quote-text">
                  "{movie.tagline}"
                </p>
              </div>
            )}

            {/* Plot Synopsis */}
            <div className="movie-synopsis-section">
              <h4 className="movie-section-label">
                <Film size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Plot Synopsis & Narrative
              </h4>
              <p className="movie-synopsis-text">
                {movie.desc}
              </p>
            </div>

            {/* Featured Dinosaurs Specimen Links */}
            {featuredDinos.length > 0 && (
              <div className="movie-dinos-section">
                <h4 className="movie-section-label">
                  <DinoSkull size={15} style={{ display: 'inline', marginRight: '6px' }} />
                  Featured Dinosaurs & Prehistoric Cast
                </h4>
                <div className="movie-dinos-grid">
                  {featuredDinos.map((dino) => (
                    <button
                      key={dino.id}
                      type="button"
                      className="movie-dino-card-btn"
                      onClick={() => handleDinoClick(dino)}
                      title={`Inspect full fossil bio of ${dino.name}`}
                    >
                      <img 
                        src={dino.image} 
                        alt={dino.name} 
                        className="movie-dino-thumb" 
                      />
                      <div className="movie-dino-info">
                        <span className="movie-dino-name">{dino.name}</span>
                        <span className="movie-dino-period">{dino.period}</span>
                      </div>
                      <ArrowRight size={13} className="movie-dino-arrow" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="movie-modal-actions">
              <a 
                href={movie.imdbUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="movie-primary-action-btn"
              >
                <span>View Full Credits & Trivia on IMDb</span>
                <ExternalLink size={15} />
              </a>
              <button 
                type="button" 
                className="movie-secondary-action-btn" 
                onClick={onClose}
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
