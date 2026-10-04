import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Star, 
  BookOpen, 
  User, 
  Calendar, 
  Bookmark, 
  Quote, 
  Layers, 
  Compass, 
  ArrowRight,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';
import { DINOSAURS } from '../data/dinosaurs';
import DinoSkull from './DinoSkull';

export default function BookModal({ book, onClose, onSelectDino, onOpenDinoModal }) {
  const [copied, setCopied] = useState(false);
  if (!book) return null;

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
  const featuredDinos = (book.featuredSpecimenIds || [])
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

  const handleCopyCitation = () => {
    const citation = `${book.author} (${book.year || 'n.d.'}). ${book.title}. ${book.publisher || 'Paleontology Reference Library'}.`;
    navigator.clipboard?.writeText(citation).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div className="book-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="book-modal-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ '--book-accent': book.accentColor || '#F59E0B' }}
      >
        {/* Close Button */}
        <button 
          className="book-modal-close-btn" 
          onClick={onClose} 
          aria-label="Close Book Dossier"
        >
          <X size={20} />
        </button>

        {/* Modal Content Grid */}
        <div className="book-modal-grid">
          {/* Left Column: 3D Realistic Book Jacket Display */}
          <div className="book-modal-left">
            <div className="book-3d-wrapper">
              <div className="book-3d-spine-shadow" />
              <div className="book-3d-cover-card">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="book-3d-cover-img"
                  onError={(e) => {
                    // Fallback to high quality prehistoric cover graphic if external CDN is blocked
                    e.currentTarget.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="book-3d-shine-overlay" />
              </div>
              <div className="book-3d-pages-edge" />
            </div>

            {/* Quick Metadata Card */}
            <div className="book-meta-strip">
              <div className="book-meta-pill">
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                <span><strong>{book.rating}</strong> / 5.0</span>
                <span className="book-meta-sub">({book.ratingCount || 'Goodreads'})</span>
              </div>
              <div className="book-meta-pill">
                <BookOpen size={13} color="var(--book-accent)" />
                <span>{book.pages} Pages</span>
              </div>
              <div className="book-meta-pill">
                <Calendar size={13} />
                <span>First Published {book.year}</span>
              </div>
            </div>

            {book.isbn && (
              <div className="book-isbn-tag">
                <span>ISBN: <strong>{book.isbn}</strong></span>
              </div>
            )}
          </div>

          {/* Right Column: In-depth Literature Dossier */}
          <div className="book-modal-right">
            {/* Genre & Subcategory Badges */}
            <div className="book-badges-row">
              <span className="book-genre-chip" style={{ borderColor: 'var(--book-accent)', color: 'var(--book-accent)' }}>
                {book.genre}
              </span>
              <span className="book-scope-chip">
                {book.scope}
              </span>
            </div>

            {/* Book Title */}
            <h2 className="book-modal-title">
              {book.title}
            </h2>

            {/* Author & Academic Title */}
            <div className="book-author-strip">
              <div className="book-author-avatar-wrap">
                <User size={18} color="var(--book-accent)" />
              </div>
              <div className="book-author-text">
                <div className="book-author-name">{book.author}</div>
                {book.authorTitle && (
                  <div className="book-author-creds">{book.authorTitle}</div>
                )}
              </div>
            </div>

            {/* Curated Famous Quote / Excerpt Block */}
            {book.quote && (
              <div className="book-quote-banner">
                <Quote size={22} className="book-quote-icon" />
                <p className="book-quote-text">
                  "{book.quote}"
                </p>
              </div>
            )}

            {/* In-Depth Synopsis */}
            <div className="book-synopsis-section">
              <h4 className="book-section-label">
                <BookOpen size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Literary Synopsis & Scientific Context
              </h4>
              <p className="book-synopsis-text">
                {book.synopsis || book.desc}
              </p>
            </div>

            {/* Core Thematic Pillar */}
            {book.keyTheme && (
              <div className="book-theme-box">
                <span className="book-theme-lbl">
                  <Bookmark size={13} style={{ display: 'inline', marginRight: '5px' }} />
                  Key Theme:
                </span>
                <span className="book-theme-val">{book.keyTheme}</span>
              </div>
            )}

            {/* Featured Dinosaurs Linked Specimen Section */}
            {featuredDinos.length > 0 && (
              <div className="book-dinos-section">
                <h4 className="book-section-label">
                  <DinoSkull size={15} style={{ display: 'inline', marginRight: '6px' }} />
                  Featured Mesozoic Dinosaurs in this Book
                </h4>
                <div className="book-dinos-grid">
                  {featuredDinos.map((dino) => (
                    <button
                      key={dino.id}
                      type="button"
                      className="book-dino-card-btn"
                      onClick={() => handleDinoClick(dino)}
                      title={`Inspect full fossil bio of ${dino.name}`}
                    >
                      <img 
                        src={dino.image} 
                        alt={dino.name} 
                        className="book-dino-thumb" 
                      />
                      <div className="book-dino-info">
                        <span className="book-dino-name">{dino.name}</span>
                        <span className="book-dino-period">{dino.period}</span>
                      </div>
                      <ArrowRight size={13} className="book-dino-arrow" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* External Read & Discover Actions */}
            <div className="book-modal-actions">
              <a 
                href={book.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="book-primary-action-btn"
              >
                <span>Read & Explore on Goodreads / Publisher</span>
                <ExternalLink size={15} />
              </a>
              <button 
                type="button" 
                className="book-secondary-action-btn" 
                onClick={handleCopyCitation}
                title="Copy academic reference citation"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                {copied ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                <span>{copied ? 'Citation Copied!' : 'Copy Citation'}</span>
              </button>
              <button 
                type="button" 
                className="book-secondary-action-btn" 
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
