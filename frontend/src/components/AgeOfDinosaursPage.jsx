import React, { useState } from 'react';
import { Layers, Shield, Clock, Compass, Sparkles, ArrowRight, Globe, CheckCircle2, ChevronRight, BookOpen, MapPin, Mountain } from 'lucide-react';
import DinoSkull from './DinoSkull';

const CLADES_DATA = [
  {
    id: 'theropoda',
    order: 'Saurischia (Lizard-Hipped)',
    name: 'Theropoda',
    translation: 'Beast Feet',
    accentColor: '#EF4444',
    bgGlow: 'rgba(239, 68, 68, 0.15)',
    overview: 'Primarily bipedal, hollow-boned carnivores with serrated teeth and stereoscopic hunting vision. They represent the only dinosaur lineage that survived the K-Pg extinction, living today as modern birds.',
    hipStructure: 'Forward-pointing pubis bone (ancestral) transitioning to backward-oriented pubis in advanced maniraptorans.',
    synapomorphies: [
      'Pneumatic (air-filled) hollow skeletal bones',
      'Three primary weight-bearing functional toes',
      'Furcula (wishbone) formation',
      'Proto-feather integument development'
    ],
    notableGenera: ['Tyrannosaurus', 'Spinosaurus', 'Velociraptor', 'Allosaurus', 'Carnotaurus']
  },
  {
    id: 'sauropodomorpha',
    order: 'Saurischia (Lizard-Hipped)',
    name: 'Sauropodomorpha',
    translation: 'Lizard-Foot Forms',
    accentColor: '#F59E0B',
    bgGlow: 'rgba(245, 158, 11, 0.15)',
    overview: 'The largest terrestrial animals ever to walk the Earth. Characterized by elongated cervical vertebrae necks, massive pillar-like columnar limbs, and continuous high-canopy herbivorous browsing.',
    hipStructure: 'Tri-radiate pelvic structure with massive pubic aprons supporting immense visceral weight.',
    synapomorphies: [
      'Extremely elongated necks with 10+ cervical vertebrae',
      'Graviportal columnar quadrupedal limb stance',
      'Small skulls with peg-like or spoon-shaped raking teeth',
      'Internal respiratory air-sac system reducing mass'
    ],
    notableGenera: ['Brachiosaurus', 'Diplodocus', 'Argentinosaurus', 'Patagotitan', 'Plateosaurus']
  },
  {
    id: 'thyreophora',
    order: 'Ornithischia (Bird-Hipped)',
    name: 'Thyreophora',
    translation: 'Shield Bearers',
    accentColor: '#10B981',
    bgGlow: 'rgba(168, 185, 129, 0.15)',
    overview: 'Armored quadrupedal herbivores equipped with dermal osteoderms embedded directly in the skin, ranging from alternating vascular heat-regulating plates to impenetrable bone clubs and tail spikes.',
    hipStructure: 'Broad retroverted bird-hipped pelvis with widely expanded ilia accommodating an armored torso.',
    synapomorphies: [
      'Longitudinal rows of dermal armor (osteoderms)',
      'Defensive tail weaponry (thagomizers and bone clubs)',
      'Low-slung quadrupedal posture feeding on low ferns',
      'Horny rhamphotheca beak for cropping vegetation'
    ],
    notableGenera: ['Stegosaurus', 'Ankylosaurus', 'Borealopelta', 'Kentrosaurus', 'Euoplocephalus']
  },
  {
    id: 'marginocephalia',
    order: 'Ornithischia (Bird-Hipped)',
    name: 'Marginocephalia',
    translation: 'Fringed Heads',
    accentColor: '#38BDF8',
    bgGlow: 'rgba(56, 189, 248, 0.15)',
    overview: 'Herbivores characterized by a distinct bony ridge or shelf projecting from the rear of the skull. This clade split into horned ceratopsians with massive defensive neck frills and bone-headed pachycephalosaurs.',
    hipStructure: 'Posteriorly directed pubis bone running parallel with the ischium, creating space for expanded digestive fermentation tracts.',
    synapomorphies: [
      'Posterior cranial shelf projecting over the neck',
      'Rostral bone forming a specialized parrot-like beak',
      'Shearing dental battery with continuous tooth replacement',
      'Thickened skull domes or defensive orbital horns'
    ],
    notableGenera: ['Triceratops', 'Pachycephalosaurus', 'Protoceratops', 'Styracosaurus', 'Sinoceratops']
  },
  {
    id: 'ornithopoda',
    order: 'Ornithischia (Bird-Hipped)',
    name: 'Ornithopoda',
    translation: 'Bird Feet',
    accentColor: '#A855F7',
    bgGlow: 'rgba(168, 85, 247, 0.15)',
    overview: 'Highly successful herbivorous herd animals, known as the "cattle of the Cretaceous". Possessed the most sophisticated chewing mechanisms of any reptile, culminating in the magnificent crested hadrosaurs.',
    hipStructure: 'Classic ornithischian backwards pelvis with elongated prepubic processes for locomotion.',
    synapomorphies: [
      'Complex grinding dental batteries containing hundreds of interlocking teeth',
      'Pleurokinetic skulls allowing outward flexing during chewing',
      'Hollow acoustic cranial crests for vocal resonance and communication',
      'Facultative bipedalism capable of both running and four-legged grazing'
    ],
    notableGenera: ['Parasaurolophus', 'Iguanodon', 'Edmontosaurus', 'Corythosaurus', 'Maiasaura']
  }
];

const FORMATIONS_DATA = [
  {
    id: 'hell-creek',
    name: 'Hell Creek Formation',
    era: 'Cretaceous',
    eraColor: '#EC4899',
    location: 'Montana, Wyoming & Dakotas, USA',
    timeSpan: '68 – 66 MYA (Late Cretaceous)',
    rockType: 'Fluvial Sandstone & K-Pg Impact Clay',
    environment: 'Subtropical coastal lowlands & river delta',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    significance: 'Preserves the final dinosaur ecosystem on Earth prior to the Chicxulub asteroid impact. Ground zero for the iridium-rich K-Pg boundary layer.',
    breakthrough: 'Famous for the most complete T-Rex specimens (Sue, Stan) and the definitive sedimentary proof of the asteroid-induced mass extinction.',
    keyFossils: ['Tyrannosaurus rex', 'Triceratops horridus', 'Ankylosaurus', 'Pachycephalosaurus', 'Edmontosaurus']
  },
  {
    id: 'morrison',
    name: 'Morrison Formation',
    era: 'Jurassic',
    eraColor: '#10B981',
    location: 'Western USA (Colorado, Utah, Wyoming)',
    timeSpan: '156 – 146 MYA (Late Jurassic)',
    rockType: 'Variegated Mudstone & Alluvial Sandstone',
    environment: 'Semi-arid savannah with seasonal braided rivers',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    significance: 'The premier Jurassic bonebed in North America, revealing titanic sauropods and apex allosauroid predators during the peak golden age of giants.',
    breakthrough: 'Features the Dinosaur National Monument Quarry Wall, where over 1,500 articulated dinosaur bones remain embedded directly in the exposed rock face.',
    keyFossils: ['Allosaurus fragilis', 'Brachiosaurus altithorax', 'Stegosaurus stenops', 'Diplodocus carnegii', 'Ceratosaurus']
  },
  {
    id: 'solnhofen',
    name: 'Solnhofen Limestone (Plattenkalk)',
    era: 'Jurassic',
    eraColor: '#10B981',
    location: 'Bavaria, Southern Germany',
    timeSpan: '150 – 148 MYA (Late Jurassic)',
    rockType: 'Ultra-Fine Lithographic Limestone',
    environment: 'Stagnant, hypersaline tropical lagoon basin',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    significance: 'A world-heritage Konservat-Lagerstätte with anoxic lagoon mud so fine it captured microscopic feather filaments, dragonfly wing veins, and soft tissues.',
    breakthrough: 'Discovery site of the iconic Archaeopteryx in 1861, confirming Darwin\'s theory of evolution and bridging reptiles directly to modern birds.',
    keyFossils: ['Archaeopteryx lithographica', 'Compsognathus longipes', 'Rhamphorhynchus', 'Pterodactylus antiquus']
  },
  {
    id: 'yixian',
    name: 'Yixian & Jiufotang (Jehol Biota)',
    era: 'Cretaceous',
    eraColor: '#EC4899',
    location: 'Liaoning Province, Northeastern China',
    timeSpan: '125 – 120 MYA (Early Cretaceous)',
    rockType: 'Laminated Shales & Volcanic Ash Tuff Beds',
    environment: 'Temperate coniferous forests & volcanic lakes',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    significance: 'Fine volcanic ash beds (Pompeii-style fossilization) that revolutionized paleontology by preserving feathered theropods with authentic structural colors.',
    breakthrough: 'Proved definitively that non-avian theropod raptors possessed complex pennaceous flight feathers and aerodynamic four-winged anatomy.',
    keyFossils: ['Microraptor gui', 'Sinosauropteryx prima', 'Dilong paradoxus', 'Confuciusornis', 'Psittacosaurus']
  },
  {
    id: 'kem-kem',
    name: 'Kem Kem Beds',
    era: 'Cretaceous',
    eraColor: '#EC4899',
    location: 'Southeastern Morocco, North Africa',
    timeSpan: '100 – 95 MYA (Late Cretaceous)',
    rockType: 'Red Estuarine Sandstone & Channel Deposits',
    environment: 'Immense mangrove delta & equatorial riverways',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    significance: 'Dubbed "the most dangerous place in the history of planet Earth" due to an unprecedented ecosystem where colossal aquatic predators outnumbered herbivores.',
    breakthrough: 'Yielded the complete paddle-tail skeleton of Spinosaurus, revealing the very first known swimming semi-aquatic predatory dinosaur.',
    keyFossils: ['Spinosaurus aegyptiacus', 'Carcharodontosaurus saharicus', 'Onchopristis', 'Deltadromeus', 'Alanqa']
  },
  {
    id: 'djadochta',
    name: 'Djadochta Formation (Flaming Cliffs)',
    era: 'Cretaceous',
    eraColor: '#EC4899',
    location: 'Omnogovi Province, Gobi Desert, Mongolia',
    timeSpan: '75 – 71 MYA (Late Cretaceous)',
    rockType: 'Fiery Red Aeolian Sandstone & Dune Strata',
    environment: 'Arid desert sand dunes with seasonal oases',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    significance: 'Famous for sudden sandstorm collapses that flash-buried animals in dynamic life-and-death postures in vivid orange-red cliffs.',
    breakthrough: 'Site of the world-famous "Fighting Dinosaurs" fossil (Velociraptor locked in mortal combat with Protoceratops) and the first recognized dinosaur eggs.',
    keyFossils: ['Velociraptor mongoliensis', 'Protoceratops andrewsi', 'Oviraptor philoceratops', 'Pinacosaurus']
  },
  {
    id: 'ischigualasto',
    name: 'Ischigualasto (Valley of the Moon)',
    era: 'Triassic',
    eraColor: '#F59E0B',
    location: 'San Juan Province, Northwestern Argentina',
    timeSpan: '231 – 225 MYA (Late Triassic)',
    rockType: 'Fluvial Mudstone, Siltstone & Volcanic Ash',
    environment: 'Volcanically active braided river valley',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    significance: 'The premier global window into the evolutionary dawn of true dinosaurs, showing early bipedal archosaurs coexisting with giant cynodont proto-mammals.',
    breakthrough: 'Radio-isotopically dated volcanic tuff beds accurately pinned the very first true emergence of dinosaurs to 231.4 million years ago.',
    keyFossils: ['Herrerasaurus ischigualastensis', 'Eoraptor lunensis', 'Sanjuansaurus', 'Hyperodapedon']
  }
];

export default function AgeOfDinosaursPage({ setActiveTab }) {
  const [activeView, setActiveView] = useState('clades'); // 'clades' or 'formations'
  const [selectedClade, setSelectedClade] = useState(CLADES_DATA[0]);
  const [formationEraFilter, setFormationEraFilter] = useState('all');

  return (
    <div className="home-container" style={{ padding: '3rem 1.5rem 6rem', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ margin: '0 auto' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>
              <Sparkles size={15} /> Cladistics & Stratigraphy
            </div>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', marginBottom: '0.75rem' }}>
              Age of <span className="hero-title-gradient">Dinosaurs</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
              Scientific classification of prehistoric reptiles. Explore evolutionary clades, anatomical adaptations, skeletal hip bifurcations, and famous global rock formations.
            </p>
          </div>
        </div>

        {/* View Switcher (Clades vs Geological Formations) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.06)', padding: '4px', borderRadius: '999px', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setActiveView('clades')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.6rem 1.4rem',
                borderRadius: '999px',
                border: 'none',
                background: activeView === 'clades' ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'transparent',
                color: activeView === 'clades' ? '#000' : 'var(--text-muted)',
                fontWeight: activeView === 'clades' ? '800' : '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Layers size={16} />
              <span>5 Evolutionary Clades</span>
            </button>

            <button
              onClick={() => setActiveView('formations')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.6rem 1.4rem',
                borderRadius: '999px',
                border: 'none',
                background: activeView === 'formations' ? 'linear-gradient(135deg, #10B981, #059669)' : 'transparent',
                color: activeView === 'formations' ? '#000' : 'var(--text-muted)',
                fontWeight: activeView === 'formations' ? '800' : '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Globe size={16} />
              <span>Famous Rock Formations</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: CLADES EXPLORER */}
        {activeView === 'clades' && (
          <div>
            {/* Clade Selection Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {CLADES_DATA.map((c) => {
                const isSelected = selectedClade.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedClade(c)}
                    className="glass-panel"
                    style={{
                      padding: '0.65rem 1.25rem',
                      borderRadius: '999px',
                      border: isSelected ? `2px solid ${c.accentColor}` : '1px solid rgba(255,255,255,0.08)',
                      background: isSelected ? c.bgGlow : 'rgba(255,255,255,0.03)',
                      color: isSelected ? '#fff' : 'var(--text-muted)',
                      fontWeight: isSelected ? '800' : '600',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.accentColor }} />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Clade Deep Dive Showcase */}
            <div 
              className="glass-panel"
              style={{
                padding: '2.5rem',
                borderRadius: '24px',
                border: `1px solid ${selectedClade.accentColor}50`,
                background: `linear-gradient(180deg, ${selectedClade.bgGlow} 0%, rgba(14, 20, 27, 0.95) 40%)`,
                boxShadow: `0 20px 40px -15px rgba(0,0,0,0.7), 0 0 30px -5px ${selectedClade.accentColor}25`,
                marginBottom: '2.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: selectedClade.accentColor, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                    {selectedClade.order}
                  </div>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#fff', margin: 0 }}>
                    Clade {selectedClade.name}
                  </h2>
                  <div style={{ color: 'var(--text-dim)', fontStyle: 'italic', fontSize: '0.95rem' }}>
                    Etymology: "{selectedClade.translation}"
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab && setActiveTab('compare')}
                  className="btn-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '999px'
                  }}
                >
                  <span>Compare Specimens</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <p style={{ color: '#E2E8F0', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                {selectedClade.overview}
              </p>

              {/* Pelvic Anatomy Note */}
              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1.2rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: selectedClade.accentColor, fontWeight: '700', fontSize: '0.88rem', marginBottom: '4px' }}>
                  <Shield size={16} /> Pelvic Anatomy & Skeletal Structure
                </div>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {selectedClade.hipStructure}
                </p>
              </div>

              {/* Defining Evolutionary Traits (Synapomorphies) */}
              <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
                Key Anatomical Synapomorphies
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                {selectedClade.synapomorphies.map((trait, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '10px' }}>
                    <CheckCircle2 size={16} color={selectedClade.accentColor} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: '#D1D5DB', fontSize: '0.88rem', lineHeight: '1.4' }}>{trait}</span>
                  </div>
                ))}
              </div>

              {/* Representative Genera */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dim)' }}>
                  Notable Genera:
                </span>
                {selectedClade.notableGenera.map((gen, i) => (
                  <span 
                    key={i}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: '#fff',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {gen}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: GEOLOGICAL FORMATIONS */}
        {activeView === 'formations' && (
          <div>
            {/* Formations Era Filter Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '2.5rem' }}>
              {[
                { id: 'all', label: 'All Geological Periods', count: FORMATIONS_DATA.length },
                { id: 'Triassic', label: 'Triassic Dawn', count: FORMATIONS_DATA.filter(f => f.era === 'Triassic').length, color: '#F59E0B' },
                { id: 'Jurassic', label: 'Jurassic Golden Age', count: FORMATIONS_DATA.filter(f => f.era === 'Jurassic').length, color: '#10B981' },
                { id: 'Cretaceous', label: 'Cretaceous Apex', count: FORMATIONS_DATA.filter(f => f.era === 'Cretaceous').length, color: '#EC4899' },
              ].map((tab) => {
                const isActive = formationEraFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFormationEraFilter(tab.id)}
                    style={{
                      padding: '0.55rem 1.15rem',
                      borderRadius: '999px',
                      border: isActive ? `1px solid ${tab.color || '#10B981'}` : '1px solid rgba(255,255,255,0.1)',
                      background: isActive ? (tab.color ? `${tab.color}25` : 'rgba(16, 185, 129, 0.2)') : 'rgba(255,255,255,0.03)',
                      color: isActive ? (tab.color || '#6EE7B7') : 'var(--text-muted)',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? '800' : '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{tab.label}</span>
                    <span 
                      style={{ 
                        fontSize: '0.72rem', 
                        padding: '0.1rem 0.45rem', 
                        borderRadius: '999px', 
                        background: isActive ? (tab.color || '#10B981') : 'rgba(255,255,255,0.08)',
                        color: isActive ? '#000' : 'var(--text-dim)',
                        fontWeight: '800'
                      }}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Formations Grid */}
            <div className="formations-grid">
              {FORMATIONS_DATA.filter(f => formationEraFilter === 'all' || f.era === formationEraFilter).map((form) => (
                <div 
                  key={form.id} 
                  className="formation-card"
                  style={{
                    '--formation-accent': `${form.eraColor}35`,
                    '--formation-glow': `${form.eraColor}25`,
                    '--formation-color': form.eraColor
                  }}
                >
                  {/* Geological Landscape Media Header */}
                  <div className="formation-card-media">
                    <img 
                      src={form.image} 
                      alt={form.name} 
                      loading="lazy"
                      className="formation-card-img"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="formation-media-overlay" />

                    {/* Era Pill */}
                    <div 
                      className="formation-era-badge"
                      style={{ 
                        background: `${form.eraColor}25`, 
                        color: form.eraColor,
                        border: `1px solid ${form.eraColor}60`
                      }}
                    >
                      <Clock size={12} />
                      <span>{form.era} Period</span>
                    </div>

                    {/* Stratum Rock Type Badge */}
                    <div className="formation-rock-type-badge">
                      <Mountain size={11} color="var(--amber-primary)" />
                      <span>{form.rockType}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="formation-card-body">
                    <div className="formation-time-row">
                      <span style={{ color: form.eraColor, fontWeight: '700', fontSize: '0.78rem' }}>
                        {form.timeSpan}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        Stratigraphic Member
                      </span>
                    </div>

                    <h3 className="formation-title">
                      {form.name}
                    </h3>

                    <div className="formation-location">
                      <MapPin size={13} style={{ flexShrink: 0 }} />
                      <span>{form.location}</span>
                    </div>

                    <div className="formation-env-box">
                      <strong style={{ color: '#E2E8F0' }}>Paleoenvironment:</strong> {form.environment}
                    </div>

                    <p className="formation-significance">
                      {form.significance}
                    </p>

                    {/* Scientific Breakthrough Callout */}
                    {form.breakthrough && (
                      <div className="formation-breakthrough-box">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', color: 'var(--amber-primary)', fontSize: '0.8rem', marginBottom: '3px' }}>
                          <Sparkles size={13} />
                          <span>Scientific Breakthrough</span>
                        </div>
                        <p style={{ margin: 0, color: '#FEF3C7', fontSize: '0.82rem', lineHeight: '1.45' }}>
                          {form.breakthrough}
                        </p>
                      </div>
                    )}

                    {/* Key Fossils */}
                    <div className="formation-fossils-section">
                      <div className="formation-fossils-lbl">
                        <DinoSkull size={13} style={{ color: form.eraColor }} />
                        <span>Key Index Specimen Fossils</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {form.keyFossils.map((foss, i) => (
                          <span 
                            key={i} 
                            className="formation-fossil-pill"
                            title={`Discovered in ${form.name}`}
                          >
                            {foss}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
