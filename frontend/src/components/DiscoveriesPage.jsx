import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, Search, X, Filter, Compass, Globe, Layers } from 'lucide-react';
import FossilDigMap from './FossilDigMap';
import DinoModal from './DinoModal';

const DISCOVERIES = [
  {
    title: "Complete Aquatic Swimming Tail of Spinosaurus",
    year: "Recent Breakthrough",
    location: "Kem Kem Beds, Morocco",
    desc: "Paleontologists unearthed the first complete fossil tail of Spinosaurus aegyptiacus, confirming a flexible paddle-shaped fin that proved predatory dinosaurs actively swam and dominated river systems.",
    tag: "Biomechanics"
  },
  {
    title: "Direct Evidence of Feathers in Amber",
    year: "Paleontology Milestone",
    location: "Hukawng Valley, Myanmar",
    desc: "A 99-million-year-old dinosaur tail preserved in mid-Cretaceous Burmese amber complete with delicate pennaceous plumage, verifying structural feathers in coelurosaurian theropods.",
    tag: "Soft Tissue"
  },
  {
    title: "Gargantuan Titanosaur: Patagotitan mayorum",
    year: "Field Expedition",
    location: "Chubut Province, Patagonia, Argentina",
    desc: "Excavation of seven colossal individuals revealed a titanosaur stretching 37 meters (121 ft) and weighing nearly 70 metric tons, rewriting the biological upper limits of terrestrial animal mass.",
    tag: "Gigantism"
  },
  {
    title: "Fossilized Embryo 'Baby Yingliang'",
    year: "Developmental Biology",
    location: "Ganzhou, Southern China",
    desc: "An exquisitely preserved oviraptorosaur embryo curled in its egg in a pre-hatching posture identical to modern bird chicks, demonstrating that avian tucking behavior originated in theropods.",
    tag: "Embryology"
  },
  {
    title: "Pristine 3D Armored Nodosaur Mummy: Borealopelta",
    year: "Exceptional Preservation",
    location: "Millennium Mine, Alberta, Canada",
    desc: "A 110-million-year-old armored dinosaur so impeccably petrified in marine sediment that its keratinous armor sheaths, skin texture, and reddish-brown countershading camouflage remained intact.",
    tag: "Soft Tissue"
  },
  {
    title: "First Direct Color Pigments in Sinosauropteryx",
    year: "Microscopic Breakthrough",
    location: "Jehol Biota, Liaoning, China",
    desc: "Scanning electron microscopy detected fossilized melanosome organelle structures in Sinosauropteryx feathers, revealing orange-and-white banded tail rings and a raccoon-like facial bandit mask.",
    tag: "Pigmentation"
  },
  {
    title: "Tanis: Ground Zero of Asteroid Impact Day",
    year: "Extinction Event Bed",
    location: "Hell Creek Formation, North Dakota, USA",
    desc: "A seismically driven surge deposit capturing the immediate minutes to hours after the Chicxulub bolide impact, preserving impact glass spherules embedded directly in fossil fish gills.",
    tag: "Extinction Event"
  },
  {
    title: "Fossilized Vocal Larynx of Pinacosaurus",
    year: "Paleoacoustics",
    location: "Djadokhta Formation, Gobi Desert, Mongolia",
    desc: "Discovery of a kinetic, bird-like larynx in an ankylosaur demonstrating that dinosaurs possessed vocal modifications capable of producing complex calls, coos, and loud acoustic displays.",
    tag: "Biomechanics"
  }
];

const DISCOVERY_TAGS = ["All", "Biomechanics", "Soft Tissue", "Gigantism", "Embryology", "Pigmentation", "Extinction Event"];

export default function DiscoveriesPage({ setActiveTab }) {
  const [activeView, setActiveView] = useState('map'); // 'map' or 'bulletins'
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDinoModal, setSelectedDinoModal] = useState(null);

  const filteredDiscoveries = DISCOVERIES.filter(item => {
    const matchesTag = selectedTag === "All" || item.tag === selectedTag;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="home-container" style={{ padding: '3rem 1.5rem 6rem' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ margin: '0 auto' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={15} /> Field Expeditions & Global Digs
          </div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.85rem)', marginBottom: '0.5rem' }}>
            Fossil Discoveries & <span className="hero-title-gradient">Excavation Sites</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '720px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
            Explore documented fossil formations across 6 continents on our interactive geological world map, or read scientific breakthrough field reports from leading paleontologists.
          </p>
        </div>

        {/* View Mode Switcher: Interactive Map vs Field Reports */}
        <div className="discoveries-view-nav">
          <div className="discoveries-view-nav-inner">
            <button
              type="button"
              className={`discoveries-view-tab ${activeView === 'map' ? 'active' : ''}`}
              onClick={() => setActiveView('map')}
            >
              <Globe size={16} />
              <span>Interactive World Dig Map</span>
            </button>

            <button
              type="button"
              className={`discoveries-view-tab ${activeView === 'bulletins' ? 'active' : ''}`}
              onClick={() => setActiveView('bulletins')}
            >
              <Layers size={16} />
              <span>Breakthrough Field Reports ({DISCOVERIES.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE GLOBAL FOSSIL DIG MAP */}
      {activeView === 'map' && (
        <FossilDigMap 
          onOpenDinoModal={(dino) => setSelectedDinoModal(dino)}
          onSelectDino={(dino) => {
            if (setActiveTab) setActiveTab('home');
          }}
        />
      )}

      {/* VIEW 2: BREAKTHROUGH FIELD BULLETINS & REPORTS */}
      {activeView === 'bulletins' && (
        <div>
          {/* Filter and Search Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              {/* Discipline Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dim)', fontSize: '0.82rem', marginRight: '4px', fontWeight: '600' }}>
                  <Filter size={14} color="var(--amber-primary)" /> Discipline:
                </span>
                {DISCOVERY_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '999px',
                      border: selectedTag === tag ? '1px solid var(--amber-primary)' : '1px solid rgba(255,255,255,0.08)',
                      background: selectedTag === tag ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.04)',
                      color: selectedTag === tag ? '#FDE68A' : 'var(--text-muted)',
                      fontSize: '0.82rem',
                      fontWeight: selectedTag === tag ? '700' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div style={{ position: 'relative', width: '260px' }}>
                <Search size={14} style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Search discoveries, sites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 2rem 0.5rem 2.1rem',
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
                    onClick={() => setSearchQuery('')}
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

            {/* Counter Info */}
            <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
              Displaying <strong style={{ color: '#fff' }}>{filteredDiscoveries.length}</strong> of <strong style={{ color: '#fff' }}>{DISCOVERIES.length}</strong> documented field excavations
              {selectedTag !== "All" && <span> in <strong style={{ color: 'var(--amber-light)' }}>{selectedTag}</strong></span>}
            </div>
          </div>

          {/* Grid of Discoveries */}
          {filteredDiscoveries.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center', maxWidth: '500px', margin: '2rem auto' }}>
              <Compass size={40} style={{ color: 'var(--amber-primary)', margin: '0 auto 1rem', opacity: 0.8 }} />
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Excavations Found</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                No fossil discoveries matched your current search filters.
              </p>
              <button
                onClick={() => {
                  setSelectedTag("All");
                  setSearchQuery("");
                }}
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.45rem 1.25rem', borderRadius: '999px' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {filteredDiscoveries.map((item, index) => (
                <div 
                  key={index} 
                  className="glass-panel" 
                  style={{ 
                    padding: '2rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between', 
                    borderRadius: '20px', 
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <button
                        onClick={() => setSelectedTag(item.tag)}
                        style={{ 
                          background: 'rgba(245, 158, 11, 0.15)', 
                          color: 'var(--amber-primary)', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '999px', 
                          fontSize: '0.75rem', 
                          fontWeight: '700', 
                          border: 'none', 
                          cursor: 'pointer' 
                        }}
                      >
                        {item.tag}
                      </button>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} /> {item.year}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#fff', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                      {item.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '0.82rem', fontWeight: '600', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                    <MapPin size={14} style={{ flexShrink: 0 }} />
                    <span>{item.location}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Global Dinosaur Bio Sheet Modal */}
      {selectedDinoModal && (
        <DinoModal
          dino={selectedDinoModal}
          onClose={() => setSelectedDinoModal(null)}
          onCompare={() => {
            setSelectedDinoModal(null);
            if (setActiveTab) setActiveTab('compare');
          }}
        />
      )}
    </div>
  );
}
