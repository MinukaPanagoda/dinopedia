import React from 'react';
import { Sparkles, Calendar, MapPin, ExternalLink, Bookmark } from 'lucide-react';

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
    tag: "Soft Tissue Preservation"
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
  }
];

export default function DiscoveriesPage() {
  return (
    <div className="home-container" style={{ padding: '3rem 1.5rem 6rem' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ margin: '0 auto' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={15} /> Recent Breakthroughs
          </div>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            New <span className="hero-title-gradient">Discoveries</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '620px', margin: '0 auto' }}>
            Cutting-edge fossil excavations, molecular paleontology findings, and evolutionary insights shaping our understanding of the prehistoric world.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {DISCOVERIES.map((item, index) => (
          <div key={index} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--amber-primary)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700' }}>
                  {item.tag}
                </span>
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
              <MapPin size={14} />
              <span>{item.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
