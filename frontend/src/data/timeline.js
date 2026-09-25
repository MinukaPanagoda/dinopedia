/**
 * Chronological Geological Timeline Data
 * Features comprehensive coverage of:
 * 1. The Pre-Dinosaur Epoch (Paleozoic, Carboniferous, Permian, & The Great Dying)
 * 2. The Triassic Period (Dawn of Dinosaurs)
 * 3. The Jurassic Period (Golden Age of Giants)
 * 4. The Cretaceous Period (Apex Diversity & Continental Drift)
 * 5. The K-Pg Extinction Event & Modern Avian Legacy
 */

export const PRE_DINOSAUR_ERA = {
  id: "pre-dinosaur",
  title: "Before the Dinosaurs: The Paleozoic World",
  subtitle: "541 – 252 Million Years Ago (The Crucible of Life)",
  timeSpan: "541 – 252 MYA",
  era: "Paleozoic Era",
  atmosphere: "O2: 15% – 35% | CO2: 400 – 4000 ppm",
  climate: "Vast icecaps evolving into humid mega-swamps, ending in blistering global desertification.",
  supercontinent: "Pangaea formation from Gondwana & Euramerica",
  overview: "Hundreds of millions of years before the first dinosaur took its first breath, Earth was already teeming with exotic, bizarre lifeforms. The Paleozoic Era saw life crawl out of primordial seas, conquer dry land, construct the planet's first giant rainforests, and evolve terrifying apex predators that were the ancient cousins of modern mammals—not dinosaurs.",
  
  keyMilestones: [
    {
      period: "Cambrian Explosion",
      mya: "541 – 485 MYA",
      tagline: "The Big Bang of Complex Animal Life",
      desc: "In warm shallow oceans, virtually all modern animal body plans suddenly evolved. Creatures with hard shells, compound eyes, and grasping appendages like Anomalocaris and trilobites dominated the seas."
    },
    {
      period: "Devonian Age of Fishes",
      mya: "419 – 359 MYA",
      tagline: "The First Steps onto Land",
      desc: "Armored placoderm fish like Dunkleosteus dominated the oceans with bone-shearing bite forces. Towards the late Devonian, lobe-finned fish like Tiktaalik developed wrist bones, crawling onto muddy riverbanks to become the first tetrapods."
    },
    {
      period: "Carboniferous Giant Swamps",
      mya: "359 – 299 MYA",
      tagline: "Hyper-Oxygenated Forests of Colossal Arthropods",
      desc: "Atmospheric oxygen soared to a record 35% (compared to 21% today). Boundless swamp forests of giant club mosses and scale trees gave rise to 2.5-meter giant millipedes (Arthropleura) and eagle-sized predatory dragonflies (Meganeura)."
    },
    {
      period: "Permian Era of Synapsids",
      mya: "299 – 252 MYA",
      tagline: "The Age of Proto-Mammals & Sail-Backed Beasts",
      desc: "Continents collided into the supercontinent Pangaea. The land was not ruled by reptiles, but by Synapsids ('stem-mammals'). Creatures like the sail-backed Dimetrodon and saber-toothed Gorgonopsians were the undisputed lords of the planet."
    }
  ],

  prehistoricCreatures: [
    {
      name: "Dimetrodon",
      type: "Sphenacodontid Synapsid (Stem-Mammal)",
      period: "Early Permian (295 – 272 MYA)",
      diet: "Apex Carnivore",
      length: "3.5 – 4.6 m",
      discovered: "Texas & Oklahoma Red Beds",
      notADinosaurNote: "Often mistaken for a dinosaur, Dimetrodon is actually more closely related to you and modern mammals than to any dinosaur!",
      desc: "Sporting an enormous neural-spine dorsal sail used for thermoregulation and territorial display, Dimetrodon had two distinct types of teeth ('two-measure teeth') that allowed it to slice through armored prey."
    },
    {
      name: "Inostrancevia (Gorgonopsian)",
      type: "Gorgonopsian Synapsid",
      period: "Late Permian (259 – 252 MYA)",
      diet: "Apex Hyper-Carnivore",
      length: "3.5 m",
      discovered: "Northern Dvina River, Russia & South Africa",
      notADinosaurNote: "The apex land predator of Pangaea right before the Great Dying.",
      desc: "Possessed massive 15-centimeter saber canine teeth embedded in a heavily reinforced skull, capable of ripping open the thick hide of massive herbivorous pareiasaurs."
    },
    {
      name: "Arthropleura",
      type: "Giant Arthropod (Myriapod)",
      period: "Late Carboniferous (323 – 299 MYA)",
      diet: "Herbivore / Detritivore",
      length: "Up to 2.6 m",
      discovered: "Scotland, England, & Germany coal beds",
      notADinosaurNote: "The largest land invertebrate in Earth's entire 4.5-billion-year history.",
      desc: "Fueled by dense 35% oxygen air and endless decaying lycophyte forests, Arthropleura grew longer than an adult human and weighed over 50 kilograms."
    },
    {
      name: "Dunkleosteus",
      type: "Arthrodire Placoderm (Armored Fish)",
      period: "Late Devonian (382 – 358 MYA)",
      diet: "Apex Marine Predator",
      length: "8 – 10 m",
      discovered: "North America, Poland, Belgium, Morocco",
      notADinosaurNote: "Ruled ocean reefs over 130 million years before the earliest marine reptiles.",
      desc: "Encased in heavy bony cranial armor, Dunkleosteus had self-sharpening dental shear blades with a bite force rivaling modern great whites and T-Rex."
    }
  ],

  theGreatDying: {
    title: "The Great Dying: The Permian-Triassic Cataclysm (251.9 MYA)",
    tag: "The Most Lethal Mass Extinction in Earth's History",
    casualties: "96% of Marine Species • 70% of Terrestrial Vertebrates • 83% of Insect Genera",
    cause: "Massive volcanic eruptions in the Siberian Traps flooded thousands of cubic kilometers of flood basalt lava, burning subterranean coal deposits, unleashing trillions of tons of carbon dioxide and methane, triggering extreme global warming, acid rain, and fatal ocean anoxia.",
    significance: "The cataclysm obliterated the ruling synapsid dynasties and leveled the ecological playing field. In the desolate aftermath of Pangaea's scorching deserts, tiny agile archosaurs survived—setting the evolutionary stage for the birth of DINOSAURS."
  }
};

export const TIMELINE_PERIODS = [
  {
    id: "triassic",
    title: "Triassic Period",
    badge: "Dawn of the Ruling Reptiles",
    spanMYA: "252 – 201 MYA",
    duration: "51 Million Years",
    climate: "Arid, scorching super-continental interior with monsoonal margins; sparse polar ice.",
    geography: "Supercontinent Pangaea intact, surrounded by the Panthalassa global ocean.",
    highlightColor: "#F59E0B",
    keyEvent: "Carnian Pluvial Episode & Triassic-Jurassic Extinction Event",
    description: "Rising from the ashes of the Great Dying, early archosaurs split into pseudosuchians (crocodilian line) and avemetatarsalians (bird/dinosaur line). Around 233 million years ago, the first true dinosaurs emerged in southern Pangaea—agile, bipedal sprinters like Herrerasaurus and Eoraptor. By the late Triassic, primitive high-browsing prosauropods (Plateosaurus) appeared.",
    dinosaurs: [
      { name: "Herrerasaurus", role: "Basal Carnivore", size: "6m / 350kg", fact: "Flexible lower jaw to swallow large flesh chunks." },
      { name: "Coelophysis", role: "Pack Hunter", size: "3m / 25kg", fact: "Hollow pneumatic bones evolved for rapid sprinting." },
      { name: "Plateosaurus", role: "High-Browsing Herbivore", size: "8.5m / 4,000kg", fact: "First vertebrate capable of rearing onto two legs to browse tall conifers." }
    ]
  },
  {
    id: "jurassic",
    title: "Jurassic Period",
    badge: "The Golden Age of Giants",
    spanMYA: "201 – 145 MYA",
    duration: "56 Million Years",
    climate: "Warm, tropical, greenhouse climate with high humidity; lush cycad and fern rainforests.",
    geography: "Pangaea breaks apart into Laurasia (North) and Gondwana (South), forming the early Atlantic Ocean.",
    highlightColor: "#10B981",
    keyEvent: "Continental breakup and explosion of colossal Sauropod diversity",
    description: "Following the extinction of pseudosuchian rivals, dinosaurs underwent explosive diversification. High humidity and carbon dioxide fueled boundless conifer and fern jungles. Long-necked Sauropods reached titanic proportions (Brachiosaurus, Diplodocus), plated Stegosaurs guarded the lowlands, and formidable Theropods like Allosaurus ruled as apex predators. The first feathered birds (Archaeopteryx) took flight.",
    dinosaurs: [
      { name: "Brachiosaurus", role: "Titan Herbivore", size: "26m / 45,000kg", fact: "Front legs longer than rear legs, browsing 13 meters above the forest floor." },
      { name: "Allosaurus", role: "Apex Carnivore", size: "9.5m / 2,200kg", fact: "Used its skull like a hatchet to deliver devastating chopping bites." },
      { name: "Stegosaurus", role: "Armored Herbivore", size: "9m / 4,500kg", fact: "Vascularized defensive plates used for thermal regulation and intimidation." },
      { name: "Archaeopteryx", role: "First Avian Transition", size: "0.5m / 0.8kg", fact: "Direct transitional fossil bridging feathered theropods to modern birds." }
    ]
  },
  {
    id: "cretaceous",
    title: "Cretaceous Period",
    badge: "Apex Diversity & Evolutionary Wonders",
    spanMYA: "145 – 66 MYA",
    duration: "79 Million Years",
    climate: "Super-greenhouse Earth; shallow inland seaways submerged continents; pole-to-pole vegetation.",
    geography: "Modern continents drifted toward modern positions; South Atlantic Ocean opened fully.",
    highlightColor: "#EF4444",
    keyEvent: "Radiation of Flowering Plants (Angiosperms) & Chicxulub Asteroid Impact",
    description: "The longest, most biodiverse chapter in dinosaur history. Flowering plants appeared, transforming planetary food chains. Dinosaurs reached their evolutionary zenith: horned Ceratopsians (Triceratops), club-tailed Ankylosaurs, hadrosaur duck-billed herds, aquatic predators (Spinosaurus), and the bone-crushing supreme apex predator Tyrannosaurus Rex.",
    dinosaurs: [
      { name: "Tyrannosaurus Rex", role: "Supreme Apex Predator", size: "12.8m / 8,800kg", fact: "Possessed the strongest terrestrial bite force in history (up to 57,000 N)." },
      { name: "Triceratops", role: "Heavy Frontline Herbivore", size: "9m / 9,000kg", fact: "Solid bone frill and 1-meter brow horns withstood head-on charges from T-Rex." },
      { name: "Spinosaurus", role: "Semiaquatic Titan", size: "15m / 8,500kg", fact: "Paddle-shaped tail and conical teeth designed to hunt prehistoric giant fish." },
      { name: "Velociraptor", role: "Dromaeosaurid Hunter", size: "2m / 15kg", fact: "Possessed full coats of bird-like feathers and retractable sickle killing claws." }
    ]
  },
  {
    id: "extinction-legacy",
    title: "The K-Pg Impact & Modern Legacy",
    badge: "66 MYA – Present Day",
    spanMYA: "66 MYA – Today",
    duration: "Continuous Living Lineage",
    climate: "Decades of global impact winter followed by slow Cenozoic cooling.",
    geography: "Chicxulub Crater in Yucatán Peninsula, Mexico; modern continental layout.",
    highlightColor: "#38BDF8",
    keyEvent: "Chicxulub Asteroid Impact & Rise of Modern Avian Dinosaurs",
    description: "66 million years ago, a 10-kilometer asteroid slammed into Earth at 70,000 km/h, releasing energy equal to 10 billion atomic bombs. Massive tsunamis, worldwide wildfires, and atmospheric sulfur dust plunged the planet into a multi-year global winter. While non-avian dinosaurs perished, small beaked avian dinosaurs survived—evolving into the 11,000+ species of birds flying above us today!",
    dinosaurs: [
      { name: "Chicxulub Impactor", role: "Extinction Catalyst", size: "10 – 14 km diameter", fact: "Carved a crater 180 km wide and 20 km deep into the Gulf of Mexico." },
      { name: "Avian Dinosaurs (Birds)", role: "Living Survivors", size: "Hummingbird to Ostrich", fact: "Birds are cladistically theropod dinosaurs—dinosaurs never truly went extinct!" }
    ]
  }
];
