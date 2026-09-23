import React, { useState } from 'react';
import { MOVIES, ENTERTAINMENT_CATEGORIES } from '../data/entertainment';
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

      {/* Category Filter Tabs: Movies, Games, Books */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <button
          className={`filter-pill-btn ${activeCategory === 'movies' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.4rem', fontSize: '0.95rem' }}
          onClick={() => handleCategoryChange('movies')}
        >
          <Film size={17} />
          <span>Movies ({MOVIES.length})</span>
        </button>

        <button
          className={`filter-pill-btn ${activeCategory === 'games' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.4rem', fontSize: '0.95rem' }}
          onClick={() => handleCategoryChange('games')}
        >
          <Gamepad2 size={17} />
          <span>Games</span>
        </button>

        <button
          className={`filter-pill-btn ${activeCategory === 'books' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.4rem', fontSize: '0.95rem' }}
          onClick={() => handleCategoryChange('books')}
        >
          <BookOpen size={17} />
          <span>Books</span>
        </button>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem', marginBottom: '3rem' }}>
            {currentMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="glass-panel" 
                style={{ 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {/* Poster Frame */}
                <div style={{ position: 'relative', height: '360px', overflow: 'hidden', background: '#0E141B' }}>
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to high quality dinosaur art if poster fails
                      e.target.src = 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=600&q=80';
                    }}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.35s ease'
                    }} 
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,20,27,0.92) 0%, rgba(14,20,27,0.2) 60%, transparent 100%)' }} />

                  {/* IMDb Rating Chip */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '1rem', 
                    right: '1rem', 
                    background: '#F5C518', 
                    color: '#000', 
                    padding: '0.3rem 0.65rem', 
                    borderRadius: '8px', 
                    fontWeight: '800', 
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}>
                    <Star size={13} fill="#000" />
                    <span>{movie.rating}</span>
                  </div>

                  {/* Release Year Badge */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '1rem', 
                    left: '1rem', 
                    background: 'rgba(0,0,0,0.65)', 
                    color: '#fff', 
                    padding: '0.3rem 0.65rem', 
                    borderRadius: '8px', 
                    fontWeight: '700', 
                    fontSize: '0.78rem',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {movie.year}
                  </div>

                  {/* Runtime & Genre overlay */}
                  <div style={{ position: 'absolute', bottom: '0.85rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--amber-light)', fontSize: '0.78rem', fontWeight: '700' }}>
                      {movie.genre}
                    </span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={11} /> {movie.runtime}
                    </span>
                  </div>
                </div>

                {/* Movie Details */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff', marginBottom: '0.3rem', lineHeight: '1.3' }}>
                      {movie.title}
                    </h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                      Directed by <strong>{movie.director}</strong>
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.55', marginBottom: '1.25rem' }}>
                      {movie.desc}
                    </p>
                  </div>

                  <a 
                    href={movie.imdbUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ 
                      width: '100%', 
                      justifyContent: 'center', 
                      fontSize: '0.85rem', 
                      padding: '0.6rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>View on IMDb</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls (Max 10 per page) */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                className="filter-pill-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ 
                  opacity: currentPage === 1 ? 0.4 : 1, 
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '0.5rem 1rem'
                }}
              >
                <ChevronLeft size={16} />
                <span>Prev</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  className={`filter-pill-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                  style={{ minWidth: '40px', padding: '0.5rem 0.85rem' }}
                >
                  {pageNum}
                </button>
              ))}

              <button
                className="filter-pill-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ 
                  opacity: currentPage === totalPages ? 0.4 : 1, 
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '0.5rem 1rem'
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
