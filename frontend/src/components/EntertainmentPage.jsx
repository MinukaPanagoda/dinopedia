import React, { useState } from 'react';
import { 
  Film, 
  Gamepad2, 
  BookOpen, 
  Star, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  Search, 
  X, 
  Monitor, 
  User, 
  Bookmark,
  Layers,
  Flame,
  Compass,
  Globe,
  ArrowUpDown,
  Quote,
  Eye,
  CheckCircle2,
  BookMarked
} from 'lucide-react';
import { MOVIES, GAMES, BOOKS, BOOK_SUB_CATEGORIES } from '../data/entertainment';
import BookModal from './BookModal';
import DinoModal from './DinoModal';
import DinoSkull from './DinoSkull';

const ITEMS_PER_PAGE = 8;

export default function EntertainmentPage() {
  const [activeCategory, setActiveCategory] = useState('movies');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Books specialized state
  const [bookSubCategory, setBookSubCategory] = useState('all');
  const [bookSortBy, setBookSortBy] = useState('featured');
  const [selectedBookModal, setSelectedBookModal] = useState(null);
  const [selectedDinoModal, setSelectedDinoModal] = useState(null);

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

  const filteredBooks = BOOKS.filter(b => {
    const matchesSearch = 
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.keyTheme && b.keyTheme.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.year.toString().includes(searchQuery);

    const matchesSub = bookSubCategory === 'all' || b.subCategory === bookSubCategory;
    return matchesSearch && matchesSub;
  }).sort((a, b) => {
    if (bookSortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
    if (bookSortBy === 'year') return b.year - a.year;
    if (bookSortBy === 'pages') return b.pages - a.pages;
    return 0;
  });

  const spotlightBook = filteredBooks.find(b => b.id === 'rise-and-fall-of-the-dinosaurs') || filteredBooks[0] || BOOKS[0];

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
                  className="glass-panel game-card-item"
                  style={{
                    borderRadius: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease'
                  }}
                >
                  {/* Game Photo / Banner Header */}
                  {game.image && (
                    <div style={{ position: 'relative', width: '100%', height: '175px', overflow: 'hidden' }}>
                      <img 
                        src={game.image} 
                        alt={game.title} 
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.4s ease'
                        }}
                        className="game-cover-img"
                      />
                      <div 
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to bottom, rgba(14, 20, 27, 0.1) 0%, rgba(14, 20, 27, 0.85) 85%, var(--bg-surface) 100%)'
                        }}
                      />
                      <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                        <span style={{ background: 'rgba(14, 20, 27, 0.75)', backdropFilter: 'blur(8px)', color: '#38BDF8', padding: '0.25rem 0.65rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: '700', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                          {game.genre}
                        </span>
                      </div>
                      <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(14, 20, 27, 0.75)', backdropFilter: 'blur(8px)', padding: '0.2rem 0.55rem', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '700', color: 'var(--amber-light)' }}>
                        <Star size={11} fill="#F59E0B" color="#F59E0B" />
                        <span>{game.rating}</span>
                      </div>
                    </div>
                  )}

                  <div style={{ padding: '1.25rem 1.5rem 1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff' }}>
                        {game.title}
                      </h3>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: '700' }}>
                        {game.year}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                      Dev: <strong style={{ color: '#E2E8F0' }}>{game.developer}</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#BAE6FD', marginBottom: '0.85rem', background: 'rgba(56, 189, 248, 0.08)', padding: '0.35rem 0.7rem', borderRadius: '8px' }}>
                      <Monitor size={14} />
                      <span>{game.platform}</span>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.55', marginBottom: '1.25rem', flex: 1 }}>
                      {game.desc}
                    </p>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.9rem', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--amber-light)', fontWeight: '600' }}>
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
                          padding: '0.35rem 0.85rem',
                          borderRadius: '999px',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          textDecoration: 'none',
                          border: '1px solid rgba(56, 189, 248, 0.35)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span>Play / Explore</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BOOKS CATEGORY */}
      {activeCategory === 'books' && (
        <div className="books-hub-root">
          {/* Sub-Category Filter Pills & Sort Selector */}
          <div className="books-controls-row">
            <div className="books-subcategories-bar">
              {BOOK_SUB_CATEGORIES.map((sub) => {
                const subCount = sub.id === 'all' 
                  ? BOOKS.length 
                  : BOOKS.filter(b => b.subCategory === sub.id).length;

                return (
                  <button
                    key={sub.id}
                    type="button"
                    className={`books-sub-pill ${bookSubCategory === sub.id ? 'active' : ''}`}
                    onClick={() => setBookSubCategory(sub.id)}
                  >
                    <span>{sub.label}</span>
                    <span className="books-sub-pill-count">{subCount}</span>
                  </button>
                );
              })}
            </div>

            {/* Sort Selector */}
            <div className="books-sort-wrap">
              <ArrowUpDown size={14} color="var(--text-dim)" />
              <label htmlFor="book-sort-select" className="sr-only">Sort Books</label>
              <select
                id="book-sort-select"
                value={bookSortBy}
                onChange={(e) => setBookSortBy(e.target.value)}
                className="books-sort-dropdown"
              >
                <option value="featured">Featured Curated</option>
                <option value="rating">Highest Rated ⭐</option>
                <option value="year">Publication Year</option>
                <option value="pages">Book Length (Pages)</option>
              </select>
            </div>
          </div>

          {/* Featured Spotlight Hero (Visible when no search or when searching matches spotlight) */}
          {!searchQuery && spotlightBook && bookSubCategory === 'all' && (
            <div className="book-spotlight-hero">
              <div className="book-spotlight-inner">
                {/* Left: 3D Tilting Book Presentation */}
                <div 
                  className="book-spotlight-cover-side"
                  onClick={() => setSelectedBookModal(spotlightBook)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedBookModal(spotlightBook)}
                  title="Click to view complete literature dossier"
                >
                  <div className="book-card-3d-wrap spotlight">
                    <div className="book-card-3d-spine" />
                    <div className="book-card-3d-cover">
                      <img 
                        src={spotlightBook.image} 
                        alt={spotlightBook.title}
                        className="book-cover-img"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <div className="book-cover-glare" />
                    </div>
                    <div className="book-card-3d-pages" />
                  </div>
                  <div className="book-spotlight-click-hint">
                    <Eye size={13} /> Click to Inspect 3D Dossier
                  </div>
                </div>

                {/* Right: Editorial Showcase Info */}
                <div className="book-spotlight-info">
                  <div className="book-spotlight-badge-row">
                    <span className="book-spotlight-curator-tag">
                      <Sparkles size={12} /> Curator's Masterpiece of the Month
                    </span>
                    <span className="book-rating-badge">
                      <Star size={13} fill="#F59E0B" color="#F59E0B" />
                      <strong>{spotlightBook.rating}</strong> / 5.0
                    </span>
                  </div>

                  <h2 
                    className="book-spotlight-title"
                    onClick={() => setSelectedBookModal(spotlightBook)}
                  >
                    {spotlightBook.title}
                  </h2>

                  <div className="book-spotlight-author-row">
                    <User size={15} color="var(--amber-primary)" />
                    <span>
                      By <strong style={{ color: '#fff' }}>{spotlightBook.author}</strong>
                      {spotlightBook.authorTitle && ` — ${spotlightBook.authorTitle}`}
                    </span>
                  </div>

                  {spotlightBook.quote && (
                    <div className="book-spotlight-quote">
                      <Quote size={20} className="book-quote-icon" />
                      <p>"{spotlightBook.quote}"</p>
                    </div>
                  )}

                  <p className="book-spotlight-synopsis">
                    {spotlightBook.synopsis || spotlightBook.desc}
                  </p>

                  <div className="book-spotlight-footer">
                    <div className="book-spotlight-meta-items">
                      <span><strong>{spotlightBook.pages}</strong> Pages</span>
                      <span>•</span>
                      <span>Published <strong>{spotlightBook.year}</strong></span>
                      <span>•</span>
                      <span style={{ color: 'var(--amber-light)' }}>{spotlightBook.genre}</span>
                    </div>

                    <div className="book-spotlight-buttons">
                      <button 
                        type="button" 
                        className="btn-primary"
                        onClick={() => setSelectedBookModal(spotlightBook)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                      >
                        <BookOpen size={16} />
                        <span>Inspect Full Dossier</span>
                      </button>

                      <a 
                        href={spotlightBook.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <span>Goodreads / Publisher</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filtered Books Grid */}
          {filteredBooks.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center', maxWidth: '540px', margin: '2rem auto' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '1.05rem' }}>
                No dinosaur books found matching "<span style={{ color: 'var(--amber-primary)' }}>{searchQuery}</span>"
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setBookSubCategory('all');
                }}
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem', borderRadius: '999px' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="books-shelf-grid">
              {filteredBooks.map((book) => {
                return (
                  <div 
                    key={book.id} 
                    className="book-shelf-card"
                    style={{ '--book-accent': book.accentColor || '#F59E0B' }}
                  >
                    {/* Top: 3D Book Cover Viewport */}
                    <div 
                      className="book-card-stage"
                      onClick={() => setSelectedBookModal(book)}
                    >
                      <div className="book-card-3d-wrap">
                        <div className="book-card-3d-spine" />
                        <div className="book-card-3d-cover">
                          <img 
                            src={book.image} 
                            alt={book.title} 
                            className="book-cover-img"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
                            }}
                          />
                          <div className="book-cover-glare" />
                        </div>
                        <div className="book-card-3d-pages" />
                      </div>

                      {/* Quick Hover Inspect Badge */}
                      <div className="book-card-hover-overlay">
                        <span className="book-card-hover-chip">
                          <Eye size={14} /> Quick Dossier
                        </span>
                      </div>
                    </div>

                    {/* Book Metadata & Text Area */}
                    <div className="book-card-body">
                      {/* Rating & Scope Pill */}
                      <div className="book-card-top-row">
                        <span className="book-rating-pill">
                          <Star size={12} fill="#F59E0B" color="#F59E0B" />
                          <span>{book.rating}</span>
                        </span>
                        <span className="book-pages-pill">
                          {book.pages}p • {book.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 
                        className="book-card-title"
                        onClick={() => setSelectedBookModal(book)}
                      >
                        {book.title}
                      </h3>

                      {/* Author */}
                      <div className="book-card-author">
                        <User size={13} color="var(--book-accent)" />
                        <span>By <strong>{book.author}</strong></span>
                      </div>

                      {/* Synopsis Snippet */}
                      <p className="book-card-desc">
                        {book.desc}
                      </p>

                      {/* Thematic Chip */}
                      {book.keyTheme && (
                        <div className="book-card-theme-tag">
                          <Bookmark size={11} /> {book.keyTheme}
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="book-card-action-bar">
                        <button
                          type="button"
                          className="book-card-dossier-btn"
                          onClick={() => setSelectedBookModal(book)}
                        >
                          <BookOpen size={13} />
                          <span>Dossier</span>
                        </button>

                        <a
                          href={book.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="book-card-read-btn"
                          title="View on Goodreads / Publisher"
                        >
                          <span>Explore</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Book Dossier Modal */}
      {selectedBookModal && (
        <BookModal
          book={selectedBookModal}
          onClose={() => setSelectedBookModal(null)}
          onOpenDinoModal={(dino) => setSelectedDinoModal(dino)}
        />
      )}

      {/* Dino Bio Sheet Modal (opened from Book Modal specimen links) */}
      {selectedDinoModal && (
        <DinoModal
          dino={selectedDinoModal}
          onClose={() => setSelectedDinoModal(null)}
        />
      )}
    </div>
  );
}
