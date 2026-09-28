import React, { useState } from 'react';
import { MOVIES, GAMES, BOOKS } from '../data/entertainment';
import { Film, Gamepad2, BookOpen, Star, ExternalLink, ChevronLeft, ChevronRight, Sparkles, Clock, Search, X, Monitor, User, Bookmark } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

export default function EntertainmentPage() {
  const [activeCategory, setActiveCategory] = useState('movies');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on active category and search
  const filteredMovies = MOVIES.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.year.toString().includes(searchQuery)
  );

  const filteredGames = GAMES.filter(g =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.year.toString().includes(searchQuery)
  );

  const filteredBooks = BOOKS.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.year.toString().includes(searchQuery)
  );

  // Pagination for movies
  const totalMovieItems = filteredMovies.length;
  const totalMoviePages = Math.max(1, Math.ceil(totalMovieItems / ITEMS_PER_PAGE));
  const movieStartIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const movieEndIndex = Math.min(movieStartIndex + ITEMS_PER_PAGE, totalMovieItems);
  const currentMovies = filteredMovies.slice(movieStartIndex, movieEndIndex);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalMoviePages) {
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
            Explore prehistoric culture across cinema, video games, and scientific literature.
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
            <span className="category-tab-badge">{GAMES.length}</span>
          </button>

          <button
            className={`category-tab-btn ${activeCategory === 'books' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('books')}
          >
            <BookOpen size={18} />
            <span>Books</span>
            <span className="category-tab-badge">{BOOKS.length}</span>
          </button>
        </div>
      </div>

      {/* Common Search Box */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ color: 'var(--text-dim)', fontSize: '0.88rem' }}>
          {activeCategory === 'movies' && (
            <span>Showing <strong style={{ color: '#fff' }}>{totalMovieItems > 0 ? movieStartIndex + 1 : 0}–{movieEndIndex}</strong> of <strong style={{ color: '#fff' }}>{totalMovieItems}</strong> IMDb dinosaur movies</span>
          )}
          {activeCategory === 'games' && (
            <span>Showing <strong style={{ color: '#fff' }}>{filteredGames.length}</strong> prehistoric video games</span>
          )}
          {activeCategory === 'books' && (
            <span>Showing <strong style={{ color: '#fff' }}>{filteredBooks.length}</strong> paleontology & fiction books</span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '250px' }}>
            <Search size={14} style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder={`Search ${activeCategory}...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                padding: '0.55rem 2rem 0.55rem 2.1rem',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.82rem',
                outline: 'none',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                style={{
                  position: 'absolute',
                  right: '9px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOVIES CATEGORY */}
      {activeCategory === 'movies' && (
        <div>
          {filteredMovies.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '500px', margin: '2rem auto' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                No dinosaur movies found matching "<span style={{ color: 'var(--amber-primary)' }}>{searchQuery}</span>"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.4rem 1rem', borderRadius: '999px' }}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="movie-grid">
              {currentMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <div className="movie-poster-wrap">
                    <img 
                      src={movie.poster} 
                      alt={movie.title} 
                      className="movie-poster"
                      loading="lazy"
                    />
                    <div className="movie-overlay-gradient" />
                    
                    <div className="movie-badge-top">
                      <span className="movie-year-tag">{movie.year}</span>
                      <span className="movie-rating-tag">
                        <Star size={11} fill="#F59E0B" color="#F59E0B" />
                        <span>{movie.rating}</span>
                      </span>
                    </div>

                    <div className="movie-footer-info">
                      <h3 className="movie-title">{movie.title}</h3>
                      <div className="movie-director">{movie.director}</div>
                    </div>
                  </div>

                  <div className="movie-hover-panel">
                    <div className="movie-hover-content">
                      <span className="movie-hover-genre">{movie.genre}</span>
                      
                      <div className="movie-hover-meta">
                        <span className="movie-meta-item">
                          <Star size={12} fill="#F59E0B" color="#F59E0B" /> {movie.rating}/10 ({movie.votes})
                        </span>
                        <span className="movie-meta-item">
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
          )}

          {/* Pagination Controls */}
          {totalMoviePages > 1 && (
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

              {Array.from({ length: totalMoviePages }, (_, i) => i + 1).map((pageNum) => (
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
                disabled={currentPage === totalMoviePages}
                style={{ 
                  opacity: currentPage === totalMoviePages ? 0.35 : 1, 
                  cursor: currentPage === totalMoviePages ? 'not-allowed' : 'pointer',
                }}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAMES CATEGORY */}
      {activeCategory === 'games' && (
        <div>
          {filteredGames.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '500px', margin: '2rem auto' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                No dinosaur games found matching "<span style={{ color: 'var(--amber-primary)' }}>{searchQuery}</span>"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.4rem 1rem', borderRadius: '999px' }}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {filteredGames.map((game) => (
                <div 
                  key={game.id} 
                  className="glass-panel"
                  style={{
                    padding: '1.75rem',
                    borderRadius: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '0.25rem 0.65rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700' }}>
                        {game.genre}
                      </span>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: '600' }}>
                        {game.year}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '0.25rem' }}>
                      {game.title}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      Dev: <strong style={{ color: '#E2E8F0' }}>{game.developer}</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#BAE6FD', marginBottom: '1rem', background: 'rgba(56, 189, 248, 0.08)', padding: '0.4rem 0.75rem', borderRadius: '8px' }}>
                      <Monitor size={14} />
                      <span>{game.platform}</span>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                      {game.desc}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--amber-light)', fontWeight: '600' }}>
                      ⚡ {game.highlight}
                    </span>
                    <a
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(56, 189, 248, 0.15)',
                        color: '#38BDF8',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>Explore</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BOOKS CATEGORY */}
      {activeCategory === 'books' && (
        <div>
          {filteredBooks.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '500px', margin: '2rem auto' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                No dinosaur books found matching "<span style={{ color: 'var(--amber-primary)' }}>{searchQuery}</span>"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.4rem 1rem', borderRadius: '999px' }}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {filteredBooks.map((book) => (
                <div 
                  key={book.id} 
                  className="glass-panel"
                  style={{
                    padding: '1.75rem',
                    borderRadius: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', padding: '0.25rem 0.65rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700' }}>
                        {book.genre}
                      </span>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: '600' }}>
                        {book.year}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '0.25rem' }}>
                      {book.title}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} color="#10B981" />
                      <span>By <strong style={{ color: '#E2E8F0' }}>{book.author}</strong> • {book.scope}</span>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                      {book.desc}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#A7F3D0', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Bookmark size={13} /> {book.keyTheme}
                    </span>
                    <a
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#10B981',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>Read More</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
