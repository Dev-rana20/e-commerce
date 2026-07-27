export const ingredientsData = [
  {
    id: 'oud',
    number: '01',
    name: 'Assam Oud',
    scientificName: 'Aquilaria malaccensis',
    noteType: 'Base Note',
    origin: 'Assam, Northeast India',
    vibe: 'Mysterious, smoky, woody',
    description: 'Extracted from the resinous heartwood of infected Aquilaria trees. A dark, animalic oil that yields a profound, complex woodiness with notes of leather, smoke, and sweet balsam. For centuries, it has been prized as "liquid gold" in Eastern royal courts.',
    extraction: 'Traditional hydro-distillation of aged heartwood chips, followed by a multi-year clay-jar curing process to mellow the animalic top notes.',
    olfactoryMatrix: [
      { label: 'Smoky', value: 90 },
      { label: 'Woody', value: 95 },
      { label: 'Earthy', value: 75 },
      { label: 'Spicy', value: 60 },
      { label: 'Balsamic', value: 80 },
      { label: 'Floral', value: 10 }
    ],
    pairings: ['Damask Rose', 'Amber Resin', 'Sandalwood'],
    featuredIn: 'Santal Noir',
    image: '/ingredients/oud.png'
  },
  {
    id: 'rose',
    number: '02',
    name: 'Rose Absolute',
    scientificName: 'Rosa damascena',
    noteType: 'Heart Note',
    origin: 'Grasse, France / Kannauj, India',
    vibe: 'Floral, honeyed, velvety',
    description: 'Harvested by hand at sunrise when the blooms are saturated with morning dew and volatile oils. Over four hundred thousand petals are required to extract a single ounce of this rich, intoxicating floral nectar that balances sweetness with a soft green stem aspect.',
    extraction: 'Gentle solvent extraction followed by alcohol purification (absolute) to preserve the delicate, volatile, and highly complex natural organic molecules.',
    olfactoryMatrix: [
      { label: 'Smoky', value: 10 },
      { label: 'Woody', value: 20 },
      { label: 'Earthy', value: 30 },
      { label: 'Spicy', value: 45 },
      { label: 'Balsamic', value: 50 },
      { label: 'Floral', value: 98 }
    ],
    pairings: ['Assam Oud', 'Calabrian Bergamot', 'Bourbon Vanilla'],
    featuredIn: 'Éclat de Rose',
    image: '/ingredients/rose.png'
  },
  {
    id: 'bergamot',
    number: '03',
    name: 'Calabrian Bergamot',
    scientificName: 'Citrus bergamia',
    noteType: 'Top Note',
    origin: 'Calabria, Southern Italy',
    vibe: 'Zesty, bright, peppery',
    description: 'Cold-pressed from the rind of Calabrian bergamot oranges grown in nutrient-dense volcanic coastal soils. It delivers a sparkling, sophisticated top note that is clean, sharp, and aromatic with a delicate peppery facet that lifts the entire fragrance structure.',
    extraction: 'Mechanical cold-pressing (sfumatrice method) of the fresh fruit peels, preserving the volatile citrus oils and bright monoterpenes without heat damage.',
    olfactoryMatrix: [
      { label: 'Smoky', value: 5 },
      { label: 'Woody', value: 15 },
      { label: 'Earthy', value: 10 },
      { label: 'Spicy', value: 55 },
      { label: 'Balsamic', value: 25 },
      { label: 'Floral', value: 40 }
    ],
    pairings: ['Australian Sandalwood', 'Rose Absolute', 'Indonesian Patchouli'],
    featuredIn: 'Luminescence',
    image: '/ingredients/bergamot.png'
  },
  {
    id: 'amber',
    number: '04',
    name: 'Amber Resin',
    scientificName: 'Pinus succinifera (Accord)',
    noteType: 'Base Note',
    origin: 'Baltic Coast / India',
    vibe: 'Warm, powdery, balsamic',
    description: 'A custom, slow-curing blend of fossilized tree resins, labdanum, and natural benzoin. It yields a comforting base note that is warm, sweet, powdery, and reminiscent of ancient libraries, vanilla beans, and golden afternoon sunlight.',
    extraction: 'Hand-blended warm resinous maceration, dissolving dry balsamic crystals into a stable, long-lasting absolute that acts as a natural fixative.',
    olfactoryMatrix: [
      { label: 'Smoky', value: 35 },
      { label: 'Woody', value: 40 },
      { label: 'Earthy', value: 50 },
      { label: 'Spicy', value: 60 },
      { label: 'Balsamic', value: 95 },
      { label: 'Floral', value: 20 }
    ],
    pairings: ['Assam Oud', 'Bourbon Vanilla', 'Calabrian Bergamot'],
    featuredIn: 'Nocturne',
    image: '/ingredients/amber.png'
  },
  {
    id: 'sandalwood',
    number: '05',
    name: 'Australian Sandalwood',
    scientificName: 'Santalum spicatum',
    noteType: 'Base Note',
    origin: 'Western Australia',
    vibe: 'Creamy, soft, grounding',
    description: 'Steam-distilled from the heartwood of ethically managed mature sandalwood trees. Offers a rich, milky-creamy woody texture that links volatile top notes together and acts as an exceptional scent fixative with a soothing, meditative trail.',
    extraction: 'Superheated steam distillation of finely pulverized heartwood, extracting the heavy, high-boiling santalol compounds responsible for the creamy profile.',
    olfactoryMatrix: [
      { label: 'Smoky', value: 20 },
      { label: 'Woody', value: 98 },
      { label: 'Earthy', value: 60 },
      { label: 'Spicy', value: 30 },
      { label: 'Balsamic', value: 70 },
      { label: 'Floral', value: 15 }
    ],
    pairings: ['Calabrian Bergamot', 'Rose Absolute', 'Amber Resin'],
    featuredIn: 'Santal Noir',
    image: '/ingredients/sandalwood.png'
  },
  {
    id: 'vanilla',
    number: '06',
    name: 'Bourbon Vanilla',
    scientificName: 'Vanilla planifolia',
    noteType: 'Heart Note',
    origin: 'Madagascar',
    vibe: 'Rich, balsamic, sweet',
    description: 'Sourced from the hand-pollinated orchids of Madagascar. These green pods are cured over several months, developing fine white vanillin crystals that impart a deep, dark, leathery sweetness far removed from synthetic equivalents.',
    extraction: 'CO2 extraction at low temperatures to obtain a pure, concentrated vanilla extract that retains its delicate balsamic and spicy complexity.',
    olfactoryMatrix: [
      { label: 'Smoky', value: 30 },
      { label: 'Woody', value: 25 },
      { label: 'Earthy', value: 15 },
      { label: 'Spicy', value: 40 },
      { label: 'Balsamic', value: 90 },
      { label: 'Floral', value: 35 }
    ],
    pairings: ['Rose Absolute', 'Amber Resin', 'Assam Oud'],
    featuredIn: 'Nocturne',
    image: '/ingredients/vanilla.png'
  },
  {
    id: 'patchouli',
    number: '07',
    name: 'Indonesian Patchouli',
    scientificName: 'Pogostemon cablin',
    noteType: 'Heart Note',
    origin: 'Sumatra, Indonesia',
    vibe: 'Earthy, camphorous, rich',
    description: 'Steam-distilled from fermented patchouli leaves. It yields a heavy, complex oil that is earthy, woody, and slightly sweet-spicy. Often used to provide depth, dark mystique, and longevity to luxury oriental and chypre fragrances.',
    extraction: 'Sun-curing and light fermentation of leaves, followed by high-pressure steam distillation to extract the heavy patchoulol alcohol molecules.',
    olfactoryMatrix: [
      { label: 'Smoky', value: 40 },
      { label: 'Woody', value: 85 },
      { label: 'Earthy', value: 95 },
      { label: 'Spicy', value: 50 },
      { label: 'Balsamic', value: 65 },
      { label: 'Floral', value: 10 }
    ],
    pairings: ['Calabrian Bergamot', 'Rose Absolute', 'Sandalwood'],
    featuredIn: 'Santal Noir',
    image: '/ingredients/patchouli.png'
  }
];
