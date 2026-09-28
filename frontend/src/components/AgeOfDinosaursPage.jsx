import React, { useState } from 'react';
import { Layers, Shield, Clock, Compass, Sparkles, ArrowRight, Globe, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
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
    bgGlow: 'rgba(16, 185, 129, 0.15)',
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
    location: 'Montana, Wyoming, North Dakota & South Dakota, USA',
    timeSpan: '68 – 66 MYA (Late Cretaceous)',
    environment: 'Subtropical floodplain & river delta',
    significance: 'Preserves the final dinosaur ecosystem on Earth prior to the Chicxulub asteroid impact. Ground zero for the K-Pg boundary layer.',
    keyFossils: ['Tyrannosaurus rex', 'Triceratops', 'Ankylosaurus', 'Pachycephalosaurus', 'Edmontosaurus']
  },
  {
    id: 'morrison',
    name: 'Morrison Formation',
    location: 'Western United States (Colorado, Utah, Wyoming)',
    timeSpan: '156 – 146 MYA (Late Jurassic)',
    environment: 'Semi-arid savannah with seasonal flood basins',
    significance: 'The premier Jurassic bonebed in North America, revealing titanic sauropods and apex allosauroid predators during the peak golden age of giants.',
    keyFossils: ['Allosaurus', 'Brachiosaurus', 'Stegosaurus', 'Diplodocus', 'Ceratosaurus']
  },
  {
    id: 'yixian',
    name: 'Yixian & Jiufotang (Jehol Biota)',
    location: 'Liaoning Province, Northeastern China',
    timeSpan: '125 – 120 MYA (Early Cretaceous)',
    environment: 'Temperate forests surrounded by active volcanic lakes',
    significance: 'Fine volcanic ash beds (Lagerstätte) that preserved microscopic feathers, stomach contents, pigments, and soft skin tissues in immaculate detail.',
    keyFossils: ['Sinosauropteryx', 'Microraptor', 'Dilong', 'Confuciusornis', 'Psittacosaurus']
  },
  {
    id: 'kem-kem',
    name: 'Kem Kem Beds',
    location: 'Southeastern Morocco & Algeria, North Africa',
    timeSpan: '100 – 95 MYA (Late Cretaceous)',
    environment: 'Immense mangrove delta and sprawling river systems',
    significance: 'Often called "the most dangerous place in the history of planet Earth" due to an unusual excess of giant river predators and fish-eating carnivores.',
    keyFossils: ['Spinosaurus', 'Carcharodontosaurus', 'Onchopristis', 'Deltadromeus', 'Alanqa']
  }
];

export default function AgeOfDinosaursPage({ setActiveTab }) {
  const [activeView, setActiveView] = useState('clades'); // 'clades' or 'formations'
  const [selectedClade, setSelectedClade] = useState(CLADES_DATA[0]);

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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {FORMATIONS_DATA.map((form) => (
              <div 
                key={form.id} 
                className="glass-panel"
                style={{
                  padding: '2rem',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(14, 20, 27, 0.95) 100%)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800' }}>
                      Stratigraphic Bed
                    </span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {form.timeSpan}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#fff', marginBottom: '0.35rem' }}>
                    {form.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38BDF8', fontSize: '0.82rem', marginBottom: '1rem', fontWeight: '600' }}>
                    <Globe size={14} />
                    <span>{form.location}</span>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <strong style={{ color: '#E2E8F0' }}>Paleoenvironment:</strong> {form.environment}
                  </div>

                  <p style={{ color: '#D1D5DB', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {form.significance}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: '700' }}>
                    Key Index Fossils
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {form.keyFossils.map((foss, i) => (
                      <span key={i} style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#6EE7B7', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>
                        {foss}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
