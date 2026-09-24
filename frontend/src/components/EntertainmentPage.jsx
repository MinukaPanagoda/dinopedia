import React, { useState } from 'react';
import { MOVIES } from '../data/entertainment';
import { Film, Gamepad2, BookOpen, Star, ExternalLink, ChevronLeft, ChevronRight, Sparkles, Clock } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

export default function EntertainmentPage() {
  const [activeCategory, setActiveCategory] = useState('movies');
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination for movies
  const totalItems = MOVIES.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentMovies = MOVIES.slice(startIndex, endIndex);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container" style={{ padding: '3rem 1.5rem 6rem' }}>
      {/* Header */}
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ margin: '0 auto' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={15} /> Prehistoric Media Hub
          </div>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Dinosaur <span className="hero-title-gradient">Entertainment</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '620px', margin: '0 auto' }}>
            Explore dinosaur-related movies, games, and literature. Filter by media category below.
          </p>
        </div>
      </div>

      {/* Sticky Floating Category Filter Bar (Movies, Games, Books) */}
      <div className="sticky-category-wrapper">
        <div className="sticky-category-bar">
          <button
            className={`category-tab-btn ${activeCategory === 'movies' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('movies')}
          >
            <Film size={18} />
            <span>Movies</span>
            <span className="category-tab-badge">{MOVIES.length}</span>
          </button>

          <button
            className={`category-tab-btn ${activeCategory === 'games' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('games')}
          >
            <Gamepad2 size={18} />
            <span>Games</span>
          </button>

          <button
            className={`category-tab-btn ${activeCategory === 'books' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('books')}
          >
            <BookOpen size={18} />
            <span>Books</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeCategory === 'movies' && (
        <div>
          {/* Pagination Counter Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-dim)', fontSize: '0.88rem' }}>
            <span>
              Showing <strong style={{ color: '#fff' }}>{startIndex + 1}–{endIndex}</strong> of <strong style={{ color: '#fff' }}>{totalItems}</strong> IMDb dinosaur movies
            </span>
            <span>Page {currentPage} of {totalPages}</span>
          </div>

          {/* Movies Grid */}
          <div className="movie-grid">
            {currentMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="movie-card"
              >
                {/* Poster Image */}
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  loading="lazy"
                  className="movie-card-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=600&q=80';
                  }}
                />

                {/* Rating Badge (Always visible at top-right) */}
                <div className="movie-card-rating">
                  <Star size={12} fill="#000" />
                  <span>{movie.rating}</span>
                </div>

                {/* Normal State: Photo + Name + Rating */}
                <div className="movie-card-normal-info">
                  <h3 className="movie-card-normal-title">{movie.title}</h3>
                </div>

                {/* Hover-Reveal Overlay with Complete Details */}
                <div className="movie-card-hover-overlay">
                  <div>
                    <div className="movie-hover-header">
                      <span className="movie-hover-tag">{movie.year}</span>
                      <span className="movie-hover-tag genre">{movie.genre}</span>
                    </div>

                    <h3 className="movie-hover-title">{movie.title}</h3>

                    <div className="movie-hover-meta">
                      <span>Dir. <strong style={{ color: '#F3F4F6' }}>{movie.director}</strong></span>
                      <span>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <Clock size={11} /> {movie.runtime}
                      </span>
                    </div>

                    <p className="movie-hover-desc">
                      {movie.desc}
                    </p>
                  </div>

                  <a 
                    href={movie.imdbUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="movie-hover-btn"
                  >
                    <span>View on IMDb</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ 
                  opacity: currentPage === 1 ? 0.35 : 1, 
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                <ChevronLeft size={16} />
                <span>Prev</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                  style={{ minWidth: '40px' }}
                >
                  {pageNum}
                </button>
              ))}

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ 
                  opacity: currentPage === totalPages ? 0.35 : 1, 
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                }}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Games Placeholder Tab */}
      {activeCategory === 'games' && (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Gamepad2 size={32} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', marginBottom: '0.75rem' }}>
            Dinosaur Games Collection
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Prehistoric gaming catalog coming up next! (Jurassic World Evolution, ARK: Survival Evolved, Dino Crisis, and more).
          </p>
          <span style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--amber-primary)', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '700' }}>
            Pending User Submission
          </span>
        </div>
      )}

      {/* Books Placeholder Tab */}
      {activeCategory === 'books' && (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <BookOpen size={32} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', marginBottom: '0.75rem' }}>
            Dinosaur Books & Literature
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Paleontological literature and classic novels catalog coming soon (Michael Crichton's Jurassic Park, The Rise and Fall of the Dinosaurs, etc.).
          </p>
          <span style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--emerald-primary)', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '700' }}>
            Pending User Submission
          </span>
        </div>
      )}
    </div>
  );
}
