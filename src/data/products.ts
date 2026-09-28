import { Product, LookbookLook, ReviewItem } from '../types/clothing';

import overcoatImg from '../assets/images/product_tailored_overcoat_1790580787376.jpg';
import cashmereImg from '../assets/images/product_cashmere_knit_1790580769102.jpg';
import heroImg from '../assets/images/hero_fashion_editorial_1790580742940.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-melton-overcoat',
    name: 'The Structured Melton Overcoat',
    subtitle: 'Double-breasted architectural silhouette with natural horn buttons',
    category: 'Outerwear',
    collection: 'Capsule 04: Monolith',
    price: 495,
    originalPrice: 550,
    image: overcoatImg,
    additionalImages: [
      overcoatImg,
      heroImg
    ],
    fallbackTone: 'from-stone-900 to-zinc-900',
    colors: [
      { name: 'Obsidian Black', hex: '#171717' },
      { name: 'Raw Camel', hex: '#A88358' },
      { name: 'Deep Umber', hex: '#3B332E' }
    ],
    sizes: [
      { size: 'XS', inStock: true, stockCount: 4 },
      { size: 'S', inStock: true, stockCount: 6 },
      { size: 'M', inStock: true, stockCount: 3 },
      { size: 'L', inStock: true, stockCount: 2 },
      { size: 'XL', inStock: true, stockCount: 5 }
    ],
    badge: 'Limited Archive',
    description: 'Constructed from heavy 640 GSM Portuguese melton wool, this overcoat balances an imposing drop-shoulder silhouette with immaculate bespoke canvas tailoring. Features interior cupro lining, hand-finished lapels, and deep storm welt pockets.',
    details: [
      '640 GSM pure virgin melton wool woven in Serra da Estrela, Portugal',
      'Full Bemberg cupro lining for smooth glide over heavy knitwear',
      'Real Italian buffalo horn buttons with engraved crest',
      'Dual interior passport/pocket compartments',
      'Unstructured shoulder with subtle architectural drape'
    ],
    composition: '100% Virgin Portuguese Wool · 100% Cupro Lining',
    weightGsm: 640,
    origin: 'Hand-tailored in Porto, Portugal',
    sustainabilityCertifications: ['OEKO-TEX Standard 100', 'Mulesing-Free Wool', 'Zero Plastic Packaging'],
    fitRecommendation: 'Intentionally oversized relaxed drape. Choose your standard size for the runway silhouette, or size down for tailored fit.',
    careInstructions: 'Specialist dry clean only. Brush lightly with natural bristle brush after wear.',
    rating: 4.95,
    reviewCount: 38
  },
  {
    id: 'prod-cashmere-crew',
    name: 'Ribbed Heavy-Gauge Cashmere Crew',
    subtitle: '7-gauge pure Mongolian cashmere in seamless 3D knit',
    category: 'Knitwear',
    collection: 'Capsule 04: Monolith',
    price: 360,
    image: cashmereImg,
    additionalImages: [
      cashmereImg
    ],
    fallbackTone: 'from-stone-200 to-amber-100',
    colors: [
      { name: 'Warm Oatmeal', hex: '#D6CDBF' },
      { name: 'Alabaster Chalk', hex: '#EBE7DF' },
      { name: 'Charcoal Slag', hex: '#262626' }
    ],
    sizes: [
      { size: 'XS', inStock: true, stockCount: 3 },
      { size: 'S', inStock: true, stockCount: 7 },
      { size: 'M', inStock: true, stockCount: 5 },
      { size: 'L', inStock: true, stockCount: 2 },
      { size: 'XL', inStock: true, stockCount: 4 }
    ],
    badge: 'Signature Essential',
    description: 'Sourced from ethically raised nomadic herds in the Alashan plateau of Inner Mongolia. Spun into a substantial 7-gauge two-ply yarn, producing an exceptionally dense, cloud-weight knit that resists pilling and gains softness over decades.',
    details: [
      '7-gauge heavy knit construction using 100% Grade-A Mongolian cashmere',
      'Seamless whole-garment 3D knitting technology eliminates side chafe',
      'Substantial 4cm ribbed collar, cuffs, and hem with resilient elastic recovery',
      'Pre-washed in Italian mountain spring water for immediate loft'
    ],
    composition: '100% Pure Grade-A Mongolian Cashmere (15.5 micron fiber)',
    weightGsm: 480,
    origin: 'Spun & knitted in Reggio Emilia, Italy',
    sustainabilityCertifications: ['Sustainable Cashmere Standard (SCS)', 'Traceable Herds'],
    fitRecommendation: 'True to size with modern relaxed chest and clean shoulder line.',
    careInstructions: 'Hand wash cold with wool detergent, lay flat on towel to dry. Never hang.',
    rating: 4.98,
    reviewCount: 64
  },
  {
    id: 'prod-pleated-trouser',
    name: 'The Pleated Drape Flannel Trouser',
    subtitle: 'High-waisted double-pleat silhouette in fluid tropical wool',
    category: 'Trousers',
    collection: 'Permanent Collection',
    price: 260,
    image: heroImg, // Will render with clean visual frame & tone
    fallbackTone: 'from-stone-800 to-zinc-900',
    colors: [
      { name: 'Deep Slate', hex: '#2C3036' },
      { name: 'Heather Charcoal', hex: '#403F3E' },
      { name: 'Espresso', hex: '#312A26' }
    ],
    sizes: [
      { size: 'XS', inStock: true, stockCount: 2 },
      { size: 'S', inStock: true, stockCount: 8 },
      { size: 'M', inStock: true, stockCount: 6 },
      { size: 'L', inStock: true, stockCount: 4 },
      { size: 'XL', inStock: true, stockCount: 2 }
    ],
    description: 'Cut from high-twist 320 GSM tropical wool woven in Biella, Italy. Deep double forward pleats create an elegant, liquid drape from hip to ankle. Features internal curtain waistband and side tab adjusters.',
    details: [
      '320 GSM high-twist crease-resistant Italian tropical wool',
      'Extended tab waistband with horn buttons and hidden side adjusters',
      'Deep double front pleats with generous leg break',
      'Reinforced crotch gusset and pick-stitched fly'
    ],
    composition: '98% Virgin Wool, 2% Elastane for natural movement',
    weightGsm: 320,
    origin: 'Tailored in Brescia, Italy',
    sustainabilityCertifications: ['ZQ Merino Certified', 'GOTS Approved Dyes'],
    fitRecommendation: 'True to size. Sits naturally at the natural waistline.',
    careInstructions: 'Dry clean only. Steam gently between wears.',
    rating: 4.88,
    reviewCount: 29
  },
  {
    id: 'prod-selvedge-denim',
    name: '14oz Kurabo Selvedge Raw Denim',
    subtitle: 'Narrow-loom shuttle woven denim with red selvedge ID line',
    category: 'Denim',
    collection: 'Craft Heritage',
    price: 240,
    image: cashmereImg,
    fallbackTone: 'from-indigo-950 to-slate-900',
    colors: [
      { name: 'Raw Indigo', hex: '#1C2541' },
      { name: 'Obsidian Black Warp', hex: '#111318' }
    ],
    sizes: [
      { size: 'XS', inStock: true, stockCount: 5 },
      { size: 'S', inStock: true, stockCount: 9 },
      { size: 'M', inStock: true, stockCount: 11 },
      { size: 'L', inStock: true, stockCount: 7 },
      { size: 'XL', inStock: true, stockCount: 3 }
    ],
    badge: 'Artisanal Selvedge',
    description: 'Woven on vintage 1950s Toyoda shuttle looms at the famed Kurabo Mills in Okayama, Japan. Stiff raw indigo warp yields personalized patina creases and high-contrast fading unique to the wearer.',
    details: [
      '14oz unsanforized right-hand twill selvedge denim from Okayama, Japan',
      'Continuous red-line selvedge visible along cuff and coin pocket',
      'Solid solid copper doughnut buttons and hand-hammered rivets',
      'Thick natural veg-tan cowhide leather waistband patch'
    ],
    composition: '100% Long-Staple Zimbabwe Cotton',
    weightGsm: 475,
    origin: 'Woven & sewn in Kojima, Japan',
    sustainabilityCertifications: ['Zero-Water Closed-Loop Indigo Bath', 'GOTS Cotton'],
    fitRecommendation: 'Classic straight leg with medium-high rise. Rigid at first, conforms to your anatomy within 3 weeks.',
    careInstructions: 'Wear for 6 months before first soak. Hand wash inside-out in cold water with sea salt.',
    rating: 4.93,
    reviewCount: 52
  },
  {
    id: 'prod-oxford-overshirt',
    name: 'Heavyweight Oxford Studio Overshirt',
    subtitle: 'Structured 380 GSM garment-dyed cotton canvas with boxy drop',
    category: 'Shirting',
    collection: 'Capsule 04: Monolith',
    price: 195,
    image: overcoatImg,
    fallbackTone: 'from-stone-300 to-stone-400',
    colors: [
      { name: 'Bone Alabaster', hex: '#EDECE6' },
      { name: 'Faded Olive Drab', hex: '#4B4E43' },
      { name: 'Midnight Navy', hex: '#1B2230' }
    ],
    sizes: [
      { size: 'XS', inStock: true, stockCount: 4 },
      { size: 'S', inStock: true, stockCount: 12 },
      { size: 'M', inStock: true, stockCount: 14 },
      { size: 'L', inStock: true, stockCount: 8 },
      { size: 'XL', inStock: true, stockCount: 5 }
    ],
    description: 'A versatile layering piece crafted from dense two-ply combed cotton oxford cloth. Designed with relaxed architectural shoulders, twin oversized chest patch pockets, and reinforced flat-felled seam construction.',
    details: [
      '380 GSM heavyweight long-staple organic cotton oxford weave',
      'Dual chest utility pockets sized for notebooks and everyday essentials',
      'Natural corozo nut buttons sourced from Ecuador',
      'Straight hem with side vents for seamless layering over knitwear'
    ],
    composition: '100% Organic Cotton',
    weightGsm: 380,
    origin: 'Crafted in Guimarães, Portugal',
    sustainabilityCertifications: ['Global Organic Textile Standard (GOTS)', 'Fair Trade Certified'],
    fitRecommendation: 'Generous boxy cut. Fits comfortably over t-shirts and light sweaters.',
    careInstructions: 'Machine wash cool (30°C). Hang dry in shade. Warm iron if needed.',
    rating: 4.91,
    reviewCount: 43
  },
  {
    id: 'prod-heavy-tee',
    name: 'Architectural 280 GSM Mercerized Tee',
    subtitle: 'Substantial high-twist compact jersey with crisp ribbed neck',
    category: 'Shirting',
    collection: 'Permanent Collection',
    price: 95,
    image: heroImg,
    fallbackTone: 'from-stone-100 to-zinc-200',
    colors: [
      { name: 'Pure Chalk', hex: '#F7F7F5' },
      { name: 'Pitch Black', hex: '#141416' },
      { name: 'Washed Clay', hex: '#8C7A70' }
    ],
    sizes: [
      { size: 'XS', inStock: true, stockCount: 6 },
      { size: 'S', inStock: true, stockCount: 15 },
      { size: 'M', inStock: true, stockCount: 20 },
      { size: 'L', inStock: true, stockCount: 18 },
      { size: 'XL', inStock: true, stockCount: 9 },
      { size: 'XXL', inStock: true, stockCount: 4 }
    ],
    badge: '3-Pack Available',
    description: 'The definitive foundation layer. Spun from 280 GSM double-mercerized organic cotton that delivers silky cool handfeel, deep color saturation, and a neckline that never sags even after 100+ washes.',
    details: [
      '280 GSM compact spun Egyptian Giza cotton',
      'Double-mercerized for structural sheen and anti-shrink stability',
      'High 2.8cm ribbed bound crewneck collar',
      'Blind-stitched hems for clean minimalist appearance'
    ],
    composition: '100% Long-Staple Egyptian Giza 87 Cotton',
    weightGsm: 280,
    origin: 'Knitted & assembled in Cairo & Guimarães',
    sustainabilityCertifications: ['GOTS Organic', 'OEKO-TEX 100 Class I'],
    fitRecommendation: 'Structured contemporary cut with slight drop shoulder.',
    careInstructions: 'Cold gentle wash. Dry flat. Iron on reverse.',
    rating: 4.97,
    reviewCount: 112
  },
  {
    id: 'prod-leather-tote',
    name: 'Minimalist Bridle Leather Atelier Tote',
    subtitle: 'Unlined vegetable-tanned Tuscan leather with hand-burnished edges',
    category: 'Accessories',
    collection: 'Artisanal Leather',
    price: 340,
    image: cashmereImg,
    fallbackTone: 'from-amber-950 to-stone-900',
    colors: [
      { name: 'Saddle Tan', hex: '#734B28' },
      { name: 'Nero Black', hex: '#1A1A1A' }
    ],
    sizes: [
      { size: 'M', inStock: true, stockCount: 6 }
    ],
    badge: 'Hand-numbered',
    description: 'Cut from full-grain 3.5mm thick Tuscan bridle leather that develops an enviable amber glow with each journey. Large enough to carry a 16\" laptop, wool sweater, and reading material.',
    details: [
      '3.5mm thick vegetable-tanned cowhide from Santa Croce sull’Arno, Tuscany',
      'Solid brass hardware with hand-hammered copper rivets',
      'Includes removable leather key clip and zip pouch',
      'Reinforced double-layered base panel with protective brass studs'
    ],
    composition: '100% Full-Grain Vegetable-Tanned Italian Leather',
    weightGsm: 950,
    origin: 'Crafted in Florence, Italy',
    sustainabilityCertifications: ['Consorzio Vera Pelle Italiana Conciata al Vegetale'],
    fitRecommendation: 'One size: 42cm width × 38cm height × 14cm depth. Shoulder strap drop: 28cm.',
    careInstructions: 'Condition annually with natural beeswax leather balm.',
    rating: 4.96,
    reviewCount: 31
  },
  {
    id: 'prod-merino-scarf',
    name: 'Architectural Ribbed Merino Wool Scarf',
    subtitle: 'Extra-long 220cm chunky knit scarf in Australian extrafine merino',
    category: 'Accessories',
    collection: 'Capsule 04: Monolith',
    price: 145,
    image: overcoatImg,
    fallbackTone: 'from-stone-300 to-zinc-400',
    colors: [
      { name: 'Oatmeal Melange', hex: '#CDC6BA' },
      { name: 'Obsidian Black', hex: '#1C1C1E' },
      { name: 'Forest Lichen', hex: '#3E473A' }
    ],
    sizes: [
      { size: 'M', inStock: true, stockCount: 15 }
    ],
    description: 'An enveloping cold-weather statement piece. Spun from 19.5 micron extrafine merino wool in a dense English rib knit that locks in warmth while maintaining lightweight breathability.',
    details: [
      '100% Extrafine Australian Merino Wool',
      '220cm length × 45cm width for double-wrap styling',
      'Dense English fisherman rib structure',
      'Natural lanolin wash for water-repellent performance'
    ],
    composition: '100% Extrafine Merino Wool (19.5 micron)',
    weightGsm: 520,
    origin: 'Knitted in Hawick, Scotland',
    sustainabilityCertifications: ['Responsible Wool Standard (RWS)', 'OEKO-TEX 100'],
    fitRecommendation: 'Unisex oversized scale. One size fits all.',
    careInstructions: 'Gentle hand wash cold. Lay flat to dry.',
    rating: 4.90,
    reviewCount: 24
  }
];

export const LOOKBOOK_CAPSULES: LookbookLook[] = [
  {
    id: 'look-01',
    title: 'Look 01: The Monolith Trench Ensemble',
    subtitle: 'Architectural volume balanced by razor-sharp tailoring and raw textures',
    image: heroImg,
    fallbackTone: 'from-stone-900 to-stone-800',
    hotspots: [
      {
        productId: 'prod-melton-overcoat',
        productName: 'The Structured Melton Overcoat',
        price: 495,
        top: 36,
        left: 48
      },
      {
        productId: 'prod-cashmere-crew',
        productName: 'Ribbed Heavy Cashmere Crew',
        price: 360,
        top: 52,
        left: 54
      },
      {
        productId: 'prod-pleated-trouser',
        productName: 'Pleated Drape Flannel Trouser',
        price: 260,
        top: 76,
        left: 45
      }
    ]
  },
  {
    id: 'look-02',
    title: 'Look 02: Studio Atelier Layering',
    subtitle: 'Heavyweight organic cotton overshirt paired with artisanal 14oz raw selvedge',
    image: heroImg,
    fallbackTone: 'from-stone-800 to-zinc-900',
    hotspots: [
      {
        productId: 'prod-oxford-overshirt',
        productName: 'Heavyweight Oxford Overshirt',
        price: 195,
        top: 42,
        left: 50
      },
      {
        productId: 'prod-selvedge-denim',
        productName: '14oz Kurabo Selvedge Raw Denim',
        price: 240,
        top: 72,
        left: 52
      }
    ]
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-01',
    author: 'Julian Vandeberg',
    location: 'Zurich, Switzerland',
    rating: 5,
    date: 'September 14, 2026',
    productName: 'The Structured Melton Overcoat (Size L · Obsidian)',
    verified: true,
    fitFeedback: 'True to Size',
    comment: 'The weight and drape of this coat are unlike anything in this price bracket. You can feel the 640 GSM Portuguese wool immediately. It commands presence in a quiet, architectural way. The horn buttons and cupro lining are immaculate.'
  },
  {
    id: 'rev-02',
    author: 'Elena R.',
    location: 'Paris, France',
    rating: 5,
    date: 'September 08, 2026',
    productName: 'Ribbed Heavy-Gauge Cashmere Crew (Size S · Warm Oatmeal)',
    verified: true,
    fitFeedback: 'True to Size',
    comment: 'I usually find modern cashmere thin and disappointing. This piece is thick, substantial, and the ribbed collar holds its shape beautifully over a t-shirt. The color is the exact warm neutral I had been searching for.'
  },
  {
    id: 'rev-03',
    author: 'Marcus Chen',
    location: 'Tokyo, Japan',
    rating: 5,
    date: 'August 29, 2026',
    productName: '14oz Kurabo Selvedge Raw Denim (Size M · Raw Indigo)',
    verified: true,
    fitFeedback: 'True to Size',
    comment: 'As someone who has worn Japanese denim for 15 years, the weave on this pair is top notch. The selvedge ticker along the outseam is neat and the rise is just high enough to pair with tailored overshirts.'
  },
  {
    id: 'rev-04',
    author: 'Sofia Lindqvist',
    location: 'Stockholm, Sweden',
    rating: 5,
    date: 'August 18, 2026',
    productName: 'The Pleated Drape Flannel Trouser (Size S · Deep Slate)',
    verified: true,
    fitFeedback: 'True to Size',
    comment: 'The double pleats break with incredible fluid movement when walking. The Italian tropical wool has high twist resilience—no wrinkling even after a 6-hour train ride. Ordered a second pair in Espresso.'
  }
];

export const ATELIERS = [
  {
    city: 'Paris',
    name: 'Atelier Vèrse Le Marais',
    address: '28 Rue de Poitou, 75003 Paris, France',
    hours: 'Tue–Sat: 11:00 – 19:30 · Sun: 13:00 – 18:00',
    phone: '+33 1 42 68 90 12',
    email: 'paris@ateliverse.com',
    services: ['Private Styling Appointments', 'Bespoke Hemming & Alterations', 'Archive Previews']
  },
  {
    city: 'New York',
    name: 'Atelier Vèrse SoHo',
    address: '94 Mercer Street, New York, NY 10012, USA',
    hours: 'Mon–Sat: 11:00 – 19:00 · Sun: 12:00 – 18:00',
    phone: '+1 212 941 7380',
    email: 'soho@ateliverse.com',
    services: ['Walk-in Fitting', 'Same-Day Courier Delivery', 'Personal Garment Care Workshop']
  },
  {
    city: 'Tokyo',
    name: 'Atelier Vèrse Omotesando',
    address: '4-12-10 Jingumae, Shibuya-ku, Tokyo 150-0001, Japan',
    hours: 'Wed–Mon: 12:00 – 20:00 (Tue Closed)',
    phone: '+81 3 6434 5190',
    email: 'tokyo@ateliverse.com',
    services: ['Kurabo Denim Sizing Specialist', 'Tea & Coffee Lounge', 'Made-to-Measure Ordering']
  }
];
