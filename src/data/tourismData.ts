export interface TourismCircuit {
  id: string;
  name: string;
  type: string;
  tagline: string;
  importance: string;
  route: string[];
  description: string;
  color: string;
}

export interface HeritageDestination {
  id: string;
  name: string;
  location: string;
  type: string;
  unesco: boolean;
  historicalSignificance: string;
  tourismImportance: string;
  image: string;
  culturalShadow: {
    mainstream: string;
    hiddenLayer: string;
    craftAndTradition: string;
    forgottenStory: string;
  };
}

export interface CinematicSpot {
  id: string;
  place: string;
  location: string;
  filmConnection: string;
  tourismPotential: string;
  image: string;
  quote: string;
}

export interface WildlifeSpot {
  id: string;
  name: string;
  location: string;
  wildlife: string[];
  naturalAttraction: string;
  importance: string;
  badge?: string;
  image: string;
}

export interface HiddenTreasure {
  id: string;
  place: string;
  location: string;
  type: string;
  specialty: string;
  image: string;
}

export interface FestivalSpot {
  id: string;
  name: string;
  destination: string;
  culturalMeaning: string;
  experience: string;
  seasonPeriod: string;
  image: string;
}

/* ─────────────────────────────────────────────────────────────
   1. TOURISM CIRCUITS (Extracted from official PDF data)
   ───────────────────────────────────────────────────────────── */
export const tourismCircuits: TourismCircuit[] = [
  {
    id: 'ramayana',
    name: 'Ramayana Circuit',
    type: 'Religious + Cultural',
    tagline: 'Following the sacred footsteps across ancient Bharat',
    importance: 'Connects destinations associated with the Ramayana and promotes multi-destination cultural pilgrimage.',
    route: ['Ayodhya', 'Shringverpur', 'Chitrakoot'],
    description: 'A spiritual odyssey tracing the epic narrative from Rama’s birthplace in Ayodhya to the hermitage forests of Chitrakoot and the crossing at Shringverpur.',
    color: '#F28C18',
  },
  {
    id: 'krishna-braj',
    name: 'Krishna / Braj Circuit',
    type: 'Religious + Cultural',
    tagline: 'The living theatre of devotion, folklore, and Yamuna ghats',
    importance: 'Promotes the complete Braj cultural landscape associated with Krishna, Raslila, and ancient temples.',
    route: ['Mathura', 'Vrindavan', 'Gokul', 'Govardhan', 'Barsana', 'Nandgaon'],
    description: 'Immerse into the timeless Braj landscape — from the sanctums of Mathura and twin city Vrindavan to the Lathmar traditions of Barsana.',
    color: '#0B2A4A',
  },
  {
    id: 'buddhist',
    name: 'Buddhist Circuit',
    type: 'Buddhist + Archaeological',
    tagline: 'Path of Enlightenment, Mahaparinirvana, and ancient Sanghas',
    importance: 'Connects major Buddhist sites and holds world-renowned international pilgrimage potential.',
    route: ['Sarnath', 'Kushinagar', 'Shravasti', 'Kaushambi', 'Sankisa', 'Kapilvastu'],
    description: 'Walk the ground of Buddha’s First Sermon at Sarnath Dhamek Stupa, the Mahaparinirvana at Kushinagar, and the monasteries of Jetavana.',
    color: '#C9A45C',
  },
  {
    id: 'bundelkhand',
    name: 'Bundelkhand Circuit',
    type: 'Heritage + Adventure',
    tagline: 'Impregnable hill forts, warrior legends, and ancient rock temples',
    importance: 'Promotes forts, temples, history, archaeology and rugged landscapes of Bundelkhand.',
    route: ['Jhansi', 'Chitrakoot', 'Kalinjar', 'Deogarh', 'Mahoba'],
    description: 'Discover the valor of Rani Lakshmibai at Jhansi Fort, the sheer cliffs of Kalinjar, and Gupta-era temple carvings at Deogarh.',
    color: '#C4724E',
  },
  {
    id: 'wildlife-eco',
    name: 'Wildlife & Eco-Tourism Circuit',
    type: 'Nature + Wildlife',
    tagline: 'Terai forests, tiger corridors, and pristine river ecosystems',
    importance: 'Connects forests, wetlands and award-winning wildlife sanctuaries across Uttar Pradesh.',
    route: ['Dudhwa', 'Pilibhit', 'Katarniaghat', 'Chambal', 'Chandra Prabha', 'Suhelwa'],
    description: 'Experience international award-winning tiger conservation at Pilibhit, Gharial safaris on the Chambal, and Terai grasslands in Dudhwa.',
    color: '#248B45',
  },
  {
    id: 'sufi',
    name: 'Sufi Circuit',
    type: 'Spiritual + Cultural',
    tagline: 'Syncretic poetry, qawwali traditions, and sacred shrines',
    importance: 'Promotes Sufi heritage, syncretic cultural harmony, and historical Urs gatherings.',
    route: ['Dewa Sharif', 'Bareilly', 'Bahraich', 'Kichhauchha', 'Fatehpur Sikri'],
    description: 'Explore the legacy of Haji Waris Ali Shah at Dewa Sharif, the monumental tomb of Salim Chishti, and centuries of musical devotion.',
    color: '#163A63',
  },
];

/* ─────────────────────────────────────────────────────────────
   2. HERITAGE DESTINATIONS & CULTURAL SHADOWS
   ───────────────────────────────────────────────────────────── */
export const heritageDestinations: HeritageDestination[] = [
  {
    id: 'taj-mahal-agra',
    name: 'Taj Mahal & Agra Complex',
    location: 'Agra',
    type: 'Mughal Monument / UNESCO World Heritage',
    unesco: true,
    historicalSignificance: 'Commissioned by Shah Jahan in the 17th century as a mausoleum for Mumtaz Mahal; peerless synthesis of Mughal architecture.',
    tourismImportance: 'India’s most internationally recognized monument attracting over 7 million visitors annually.',
    image: '/images/taj-mahal.jpg',
    culturalShadow: {
      mainstream: 'The marble mausoleum, reflection pools, and romantic tourist photos.',
      hiddenLayer: 'Behind the monument, descendants of royal stone-cutters still practice the rare Pietra Dura (parchin kari) marble inlay technique.',
      craftAndTradition: 'Mughal petha craft, traditional leather guild quarters, and sunset viewpoints from Mehtab Bagh.',
      forgottenStory: 'The forgotten artisan quarters who engineered the acoustic domes and subterranean foundations along the Yamuna.'
    }
  },
  {
    id: 'varanasi-ghats',
    name: 'Sacred Ghats & Kashi Vishwanath',
    location: 'Varanasi (Kashi / Benares)',
    type: 'Ancient Living Heritage & Jyotirlinga',
    unesco: false,
    historicalSignificance: 'Widely considered the oldest living city in the world; home to Vishwanath Jyotirlinga and sacred Ganga riverfront.',
    tourismImportance: 'Major global spiritual capital, evening Ganga Aarti, and classical learning hub.',
    image: '/images/varanasi.jpg',
    culturalShadow: {
      mainstream: 'Boat rides at sunrise, Dashashwamedh Aarti, and temple visits.',
      hiddenLayer: 'The labyrinthine galis of weaver colonies where Banarasi silk sarees are hand-woven on heirloom jacquard pit looms with pure zari.',
      craftAndTradition: 'Morning classical raagas by Dhrupad exponents, thandai and Malaiyo culinary secrets, and Sanskrit manuscript restorers.',
      forgottenStory: 'The sacred Panchakroshi pilgrimage path connecting ancient hermitages and shrines outside the tourist core.'
    }
  },
  {
    id: 'lucknow-nawabi',
    name: 'Bara Imambara & Rumi Darwaza',
    location: 'Lucknow',
    type: 'Awadhi Architectural Heritage',
    unesco: false,
    historicalSignificance: 'Built during the reign of Nawab Asaf-ud-Daula (1784); iconic symbol of Awadhi synthesis and unsupported vault engineering.',
    tourismImportance: 'Center of Awadhi heritage, Tehzeeb (culture), literature, and world-famous cuisine.',
    image: '/images/lucknow.jpg',
    culturalShadow: {
      mainstream: 'Bhulbhulaiya labyrinth tours and photographs before the Rumi Darwaza gateway.',
      hiddenLayer: 'The master artisans of delicate Chikankari white-on-white hand embroidery and Zardozi metal thread craft in Old Chowk.',
      craftAndTradition: 'Dum Pukht slow-fire culinary tradition, Ittar (natural fragrance) distillation in copper degs, and classical Kathak gharana.',
      forgottenStory: 'The 1857 resistance stories carved into the bullet-marked brickwork of the British Residency ruins.'
    }
  },
  {
    id: 'ayodhya-saryu',
    name: 'Ram Janmabhoomi & Saryu Ghats',
    location: 'Ayodhya',
    type: 'Spiritual Landscape & Ancient Capital',
    unesco: false,
    historicalSignificance: 'Birthplace of Lord Rama, Kanak Bhawan, Hanuman Garhi, and historic composing site of Tulsidas’s Ramacharitamanas.',
    tourismImportance: 'Major national and global pilgrimage hub on the sacred banks of the Saryu River.',
    image: '/images/ayodhya.jpg',
    culturalShadow: {
      mainstream: 'Grand temple sanctum visits and festival congregations.',
      hiddenLayer: 'Ancient Jain Tirthankar heritage (birthplace of 5 Tirthankars including Rishabh Dev) and Mauryan Buddhist monastic foundations.',
      craftAndTradition: 'Saryu evening deepotsav lantern rituals, Awadhi bhajan traditions, and sacred woodcarving workshops.',
      forgottenStory: 'Soron Shukar Kshetra and the ancient oral storytellers reciting forgotten cantos of Valmiki Ramayana.'
    }
  }
];

/* ─────────────────────────────────────────────────────────────
   3. CINEMATIC DESTINATIONS ("India, Through the Lens")
   ───────────────────────────────────────────────────────────── */
export const cinematicDestinations: CinematicSpot[] = [
  {
    id: 'cine-varanasi',
    place: 'Sacred Riverfront & Ghats',
    location: 'Varanasi',
    filmConnection: 'Featured in Satyajit Ray’s Apu Trilogy, Deepa Mehta’s Water, Raanjhanaa, and international documentaries.',
    tourismPotential: 'Cinema + riverfront dawn walks + spiritual heritage storytelling.',
    image: '/images/varanasi.jpg',
    quote: 'Where cinematic light meets three thousand years of uninterrupted ritual.'
  },
  {
    id: 'cine-lucknow',
    place: 'Old Chowk & Nawabi Palaces',
    location: 'Lucknow',
    filmConnection: 'Setting for Umrao Jaan, Shatranj Ke Khilari, Dedh Ishqiya, and period dramas depicting Awadh elegance.',
    tourismPotential: 'Film-location architectural walks and culinary trail expeditions.',
    image: '/images/lucknow.jpg',
    quote: 'The golden hour glow on Awadhi archways tells of poetry, courts, and living memory.'
  },
  {
    id: 'cine-agra',
    place: 'Taj Mahal & Agra Fort Courtyards',
    location: 'Agra',
    filmConnection: 'Frequently framed in global cinema, historical epics, and National Geographic documentaries.',
    tourismPotential: 'Architectural photography masterclasses and sunrise cinema trails.',
    image: '/images/taj-mahal.jpg',
    quote: 'Symmetry, red sandstone, and translucent marble that defined the world’s vision of India.'
  },
  {
    id: 'cine-braj',
    place: 'Ghats of Mathura & Barsana',
    location: 'Mathura – Vrindavan',
    filmConnection: 'Setting for devotional epics, Holi documentary features, and cultural retrospectives.',
    tourismPotential: 'Krishna-themed cultural and seasonal photographic expeditions.',
    image: '/images/festival.jpg',
    quote: 'Clouds of saffron and gulal powders dancing across stone temple rooftops.'
  }
];

/* ─────────────────────────────────────────────────────────────
   4. WILD BHARAT (Wildlife Sanctuaries & Tiger Reserves)
   ───────────────────────────────────────────────────────────── */
export const wildlifeSpots: WildlifeSpot[] = [
  {
    id: 'pilibhit',
    name: 'Pilibhit Tiger Reserve',
    location: 'Pilibhit District (Terai Arc)',
    wildlife: ['Royal Bengal Tiger', 'Leopard', 'Swamp Deer', 'Over 300 Bird Species'],
    naturalAttraction: 'Sal forests, tall grasslands and Sharda Sagar Dam expanse.',
    importance: 'Awarded the prestigious TX2 International Award for doubling its wild tiger population ahead of target.',
    badge: 'TX2 Global Winner',
    image: '/images/kerala.jpg'
  },
  {
    id: 'dudhwa',
    name: 'Dudhwa National Park & Reserve',
    location: 'Lakhimpur Kheri & Bahraich',
    wildlife: ['Tiger', 'Indian Rhinoceros', 'Asian Elephant', 'Swamp Deer'],
    naturalAttraction: 'Dense Terai marshy grasslands and Mohana river floodplain.',
    importance: 'Major Terai safari haven preserving critically endangered swamp deer and rhino breeding populations.',
    badge: 'Terai Sanctuary',
    image: '/images/hero-bg.jpg'
  },
  {
    id: 'chambal',
    name: 'National Chambal Sanctuary',
    location: 'Chambal River Basin (Agra Region)',
    wildlife: ['Gharial', 'Gangetic River Dolphin', 'Marsh Crocodile', 'Indian Skimmer'],
    naturalAttraction: 'Pristine, unpolluted river canyons and sandbars.',
    importance: 'World’s most vital stronghold for the critically endangered Fish-Eating Gharial and freshwater dolphins.',
    badge: 'Riverine Ecosystem',
    image: '/images/kashmir.jpg'
  }
];

/* ─────────────────────────────────────────────────────────────
   5. BEYOND THE POSTCARD (Hidden Treasures & Nature)
   ───────────────────────────────────────────────────────────── */
export const hiddenTreasures: HiddenTreasure[] = [
  {
    id: 'lakhaniya-dari',
    place: 'Lakhaniya Dari Waterfall',
    location: 'Sonbhadra / Mirzapur',
    type: 'Cascading Waterfall & Rocky Canyon',
    specialty: 'Scenic natural canyon waterfall nestled in the Vindhya ranges with untouched eco-trails.',
    image: '/images/kerala.jpg'
  },
  {
    id: 'kalinjar-fort',
    place: 'Kalinjar Hill Fort',
    location: 'Banda (Bundelkhand)',
    type: 'Ancient Impregnable Fortress',
    specialty: 'Monumental rock-cut sculptures, Nilkanth Temple, and panoramic Bundelkhand wilderness views.',
    image: '/images/rajasthan.jpg'
  },
  {
    id: 'gupt-godavari',
    place: 'Gupt Godavari Caves',
    location: 'Chitrakoot',
    type: 'Subterranean River Cave System',
    specialty: 'Natural limestone twin caves with sacred knee-deep streams flowing underground.',
    image: '/images/tamil-nadu.jpg'
  },
  {
    id: 'deogarh',
    place: 'Deogarh Archaeological Complex',
    location: 'Lalitpur',
    type: 'Gupta-era Temple & Sculptures',
    specialty: '5th-century Dashavatara temple showcasing the pinnacle of classical Indian stone carving.',
    image: '/images/varanasi.jpg'
  }
];

/* ─────────────────────────────────────────────────────────────
   6. INDIA, IN SEASON (Authentic Festivals)
   ───────────────────────────────────────────────────────────── */
export const seasonalFestivals: FestivalSpot[] = [
  {
    id: 'lathmar-holi',
    name: 'Lathmar Holi',
    destination: 'Barsana & Nandgaon (Braj)',
    culturalMeaning: 'A living reenactment of Krishna and Radha’s playful lore where women playfully ward off men with wooden staffs amidst herbal gulal.',
    experience: 'Explosive clouds of yellow, saffron, and green herbal pigments against 500-year-old temple facades.',
    seasonPeriod: 'Phalguna (Spring / Feb–March)',
    image: '/images/festival.jpg'
  },
  {
    id: 'maha-kumbh',
    name: 'Maha Kumbh & Magh Mela',
    destination: 'Triveni Sangam (Prayagraj)',
    culturalMeaning: 'The world’s largest peaceful gathering of humanity at the confluence of Ganga, Yamuna, and mystical Saraswati.',
    experience: 'Sacred dawn snan (holy dips), akhada processions of sadhus, and vast tent cities of philosophical discourse.',
    seasonPeriod: 'Magh (Winter / Jan–Feb)',
    image: '/images/varanasi.jpg'
  },
  {
    id: 'janmashtami',
    name: 'Braj Janmashtami',
    destination: 'Mathura & Vrindavan',
    culturalMeaning: 'Midnight celebration of Lord Krishna’s birth with temple illuminations, Chhappan Bhog culinary offerings, and classical Raslila.',
    experience: '24-hour devotional raagas, butter-pot festivities, and fragrance of sacred tulsi and lotus.',
    seasonPeriod: 'Bhadrapada (Monsoon / August–Sept)',
    image: '/images/ayodhya.jpg'
  },
  {
    id: 'kajari-utsav',
    name: 'Kajari Folk Music Festival',
    destination: 'Mirzapur & Varanasi',
    culturalMeaning: 'Classical semi-classical folk songs celebrating the arrival of the life-giving monsoon rains and romantic longing.',
    experience: 'Mesmerizing open-air vocal performances by traditional gharana singers along Vindhya hills.',
    seasonPeriod: 'Shravana (Monsoon / July–August)',
    image: '/images/food.jpg'
  }
];
