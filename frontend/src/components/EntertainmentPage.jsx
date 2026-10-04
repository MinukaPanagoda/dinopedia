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
import { MOVIES, GAMES, BOOKS, BOOK_SUB_CATEGORIES, MOVIE_SUB_CATEGORIES } from '../data/entertainment';
import BookModal from './BookModal';
import MovieModal from './MovieModal';
import DinoModal from './DinoModal';
import DinoSkull from './DinoSkull';

const ITEMS_PER_PAGE = 8;

export default function EntertainmentPage() {
  const [activeCategory, setActiveCategory] = useState('movies');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Movies specialized state
  const [movieSubCategory, setMovieSubCategory] = useState('all');
  const [movieSortBy, setMovieSortBy] = useState('rating'); // 'rating', 'newest', 'oldest', 'votes'
  const [selectedMovieModal, setSelectedMovieModal] = useState(null);

  // Books specialized state
  const [bookSubCategory, setBookSubCategory] = useState('all');
  const [bookSortBy, setBookSortBy] = useState('featured');
  const [selectedBookModal, setSelectedBookModal] = useState(null);
  const [selectedDinoModal, setSelectedDinoModal] = useState(null);

  // Filter items based on active category and search
  const filteredMovies = MOVIES.filter(m => {
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.year.toString().includes(searchQuery);

    const matchesSub = movieSubCategory === 'all' || m.subCategory === movieSubCategory;
    return matchesSearch && matchesSub;
  }).sort((a, b) => {
    if (movieSortBy === 'rating') return b.rating - a.rating;
    if (movieSortBy === 'newest') return b.year - a.year;
    if (movieSortBy === 'oldest') return a.year - b.year;
    if (movieSortBy === 'votes') {
      const parseVotes = (v) => v.includes('M') ? parseFloat(v) * 1000 : parseFloat(v);
      return parseVotes(b.votes) - parseVotes(a.votes);
    }
    return 0;
  });

  const spotlightMovie = filteredMovies.find(m => m.id === 'jurassic-park-1993') || filteredMovies[0] || MOVIES[0];

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
        <div style={{ color: '#CBD5E1', fontSize: '0.9rem', fontWeight: '500' }}>
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
        <div className="movies-hub-root">
          {/* Sub-Category Filter Pills & Sort Selector */}
          <div className="books-controls-row">
            <div className="books-subcategories-bar">
              {MOVIE_SUB_CATEGORIES.map((sub) => {
                const subCount = sub.id === 'all' 
                  ? MOVIES.length 
                  : MOVIES.filter(m => m.subCategory === sub.id).length;

                return (
                  <button
                    key={sub.id}
                    type="button"
                    className={`books-sub-pill ${movieSubCategory === sub.id ? 'active' : ''}`}
                    onClick={() => {
                      setMovieSubCategory(sub.id);
                      setCurrentPage(1);
                    }}
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
              <label htmlFor="movie-sort-select" className="sr-only">Sort Movies</label>
              <select
                id="movie-sort-select"
                value={movieSortBy}
                onChange={(e) => {
                  setMovieSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="books-sort-dropdown"
              >
                <option value="rating">Highest Rated ⭐</option>
                <option value="votes">Most IMDb Votes</option>
                <option value="newest">Newest Release</option>
                <option value="oldest">Classic Vintage</option>
              </select>
            </div>
          </div>

          {/* Curator's Cinema Spotlight Hero */}
          {!searchQuery && spotlightMovie && movieSubCategory === 'all' && currentPage === 1 && (
            <div className="book-spotlight-hero" style={{ borderColor: 'rgba(245, 197, 24, 0.4)' }}>
              <div className="book-spotlight-inner" style={{ gridTemplateColumns: '200px 1fr' }}>
                {/* Left: Poster */}
                <div 
                  className="book-spotlight-cover-side"
                  onClick={() => setSelectedMovieModal(spotlightMovie)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedMovieModal(spotlightMovie)}
                  title="Click to view complete movie dossier"
                >
                  <div style={{ position: 'relative', width: '180px', height: '265px', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 16px 36px rgba(0,0,0,0.85), 0 0 25px rgba(245, 197, 24, 0.25)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <img 
                      src={spotlightMovie.poster} 
                      alt={spotlightMovie.title}
                      referrerPolicy="no-referrer"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#F5C518', color: '#000', fontWeight: '800', fontSize: '0.8rem', padding: '0.2rem 0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={11} fill="#000" color="#000" />
                      <span>{spotlightMovie.rating}</span>
                    </div>
                  </div>
                  <div className="book-spotlight-click-hint">
                    <Eye size={13} /> Click to Inspect Cinema Dossier
                  </div>
                </div>

                {/* Right: Info */}
                <div className="book-spotlight-info">
                  <div className="book-spotlight-badge-row">
                    <span className="book-spotlight-curator-tag" style={{ color: '#FDE68A', borderColor: 'rgba(245, 197, 24, 0.4)' }}>
                      <Sparkles size={12} /> Spotlight Masterpiece • IMDb Essential
                    </span>
                    <span className="book-rating-badge">
                      <Star size={13} fill="#F5C518" color="#F5C518" />
                      <strong>{spotlightMovie.rating}</strong> / 10 ({spotlightMovie.votes} votes)
                    </span>
                  </div>

                  <h2 
                    className="book-spotlight-title"
                    onClick={() => setSelectedMovieModal(spotlightMovie)}
                  >
                    {spotlightMovie.title}
                  </h2>

                  <div className="book-spotlight-author-row">
                    <Film size={15} color="var(--amber-primary)" />
                    <span>
                      Directed by <strong style={{ color: '#fff' }}>{spotlightMovie.director}</strong> • {spotlightMovie.runtime} ({spotlightMovie.year})
                    </span>
                  </div>

                  {spotlightMovie.tagline && (
                    <div className="book-spotlight-quote">
                      <Quote size={20} className="book-quote-icon" />
                      <p>"{spotlightMovie.tagline}"</p>
                    </div>
                  )}

                  <p className="book-spotlight-synopsis">
                    {spotlightMovie.desc}
                  </p>

                  <div className="book-spotlight-footer">
                    <div className="book-spotlight-meta-items">
                      <span>Genre: <strong style={{ color: '#fff' }}>{spotlightMovie.genre}</strong></span>
                      <span>•</span>
                      <span>Theatrical: <strong>{spotlightMovie.year}</strong></span>
                    </div>

                    <div className="book-spotlight-buttons">
                      <button 
                        type="button" 
                        className="btn-primary"
                        onClick={() => setSelectedMovieModal(spotlightMovie)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                      >
                        <Film size={16} />
                        <span>Inspect Cinema Dossier</span>
                      </button>

                      <a 
                        href={spotlightMovie.imdbUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <span>View on IMDb</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Movies Grid */}
          {filteredMovies.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center', maxWidth: '540px', margin: '2rem auto' }}>
              <p style={{ color: '#CBD5E1', marginBottom: '1.25rem', fontSize: '1.05rem' }}>
                No dinosaur movies found matching "<span style={{ color: 'var(--amber-primary)' }}>{searchQuery}</span>"
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setMovieSubCategory('all');
                  setCurrentPage(1);
                }}
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem', borderRadius: '999px' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="movie-grid">
              {currentMovies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="movie-card"
                  onClick={() => setSelectedMovieModal(movie)}
                >
                  {/* Poster Image */}
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="movie-card-img"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80";
                    }}
                  />

                  {/* Gold IMDb Rating Badge at top-right */}
                  <div className="movie-card-rating">
                    <Star size={11} fill="#000" color="#000" />
                    <span>{movie.rating}</span>
                  </div>

                  {/* Normal Bottom Info Overlay */}
                  <div className="movie-card-normal-info">
                    <div className="movie-card-normal-title">{movie.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--amber-light)', marginTop: '3px', fontWeight: '600' }}>
                      {movie.year} • {movie.runtime}
                    </div>
                  </div>

                  {/* Hover Details Overlay */}
                  <div className="movie-card-hover-overlay">
                    <div>
                      <div className="movie-hover-header">
                        <span className="movie-hover-tag">{movie.year}</span>
                        <span className="movie-hover-tag genre">{movie.genre.split(',')[0]}</span>
                      </div>

                      <div className="movie-hover-body">
                        <h3 className="movie-hover-title">{movie.title}</h3>
                        <div className="movie-hover-meta">
                          <User size={12} color="var(--amber-primary)" />
                          <span>Dir: {movie.director}</span>
                        </div>
                        <div className="movie-hover-meta">
                          <Clock size={11} />
                          <span>{movie.runtime} • {movie.votes} votes</span>
                        </div>
                        <p className="movie-hover-desc">
                          {movie.desc}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', marginTop: 'auto' }}>
                      <button
                        type="button"
                        className="movie-hover-btn"
                        style={{ flex: 1, cursor: 'pointer' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMovieModal(movie);
                        }}
                      >
                        <Eye size={13} />
                        <span>Quick Dossier</span>
                      </button>

                      <a 
                        href={movie.imdbUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="movie-hover-btn"
                        style={{ 
                          width: 'auto', 
                          padding: '0.55rem', 
                          background: 'rgba(255, 255, 255, 0.1)', 
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: '#fff' 
                        }}
                        title="View on IMDb"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalMoviePages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
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
              <p style={{ color: '#CBD5E1', marginBottom: '1rem', fontSize: '1.05rem' }}>
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
            <div className="games-grid">
              {filteredGames.map((game) => (
                <div 
                  key={game.id} 
                  className="game-card"
                >
                  {/* Game Photo / Banner Header (16:9) */}
                  <div className="game-card-media">
                    <img 
                      src={game.image} 
                      alt={game.title} 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="game-card-img"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="game-media-overlay" />
                    
                    {/* Genre Tag */}
                    <div className="game-genre-badge">
                      {game.genre}
                    </div>

                    {/* Rating Tag */}
                    <div className="game-rating-badge">
                      <Star size={11} fill="#F59E0B" color="#F59E0B" />
                      <span>{game.rating}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="game-card-body">
                    <div className="game-card-title-row">
                      <h3 className="game-card-title">
                        {game.title}
                      </h3>
                      <span className="game-card-year">
                        {game.year}
                      </span>
                    </div>

                    <div className="game-card-dev">
                      Dev: <strong style={{ color: '#E2E8F0' }}>{game.developer}</strong>
                    </div>

                    <div className="game-card-platform">
                      <Monitor size={13} />
                      <span>{game.platform}</span>
                    </div>

                    <p className="game-card-desc">
                      {game.desc}
                    </p>

                    <div className="game-card-footer">
                      <span className="game-highlight-tag" title={game.highlight}>
                        <Sparkles size={12} color="#F59E0B" style={{ flexShrink: 0 }} />
                        <span>{game.highlight}</span>
                      </span>

                      <a
                        href={game.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="game-action-btn"
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
              <p style={{ color: '#CBD5E1', marginBottom: '1.25rem', fontSize: '1.05rem' }}>
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

      {/* Movie Dossier Modal */}
      {selectedMovieModal && (
        <MovieModal
          movie={selectedMovieModal}
          onClose={() => setSelectedMovieModal(null)}
          onOpenDinoModal={(dino) => setSelectedDinoModal(dino)}
        />
      )}

      {/* Book Dossier Modal */}
      {selectedBookModal && (
        <BookModal
          book={selectedBookModal}
          onClose={() => setSelectedBookModal(null)}
          onOpenDinoModal={(dino) => setSelectedDinoModal(dino)}
        />
      )}

      {/* Dino Bio Sheet Modal (opened from Book/Movie Modal specimen links) */}
      {selectedDinoModal && (
        <DinoModal
          dino={selectedDinoModal}
          onClose={() => setSelectedDinoModal(null)}
        />
      )}
    </div>
  );
}
