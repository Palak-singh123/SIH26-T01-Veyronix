export interface FamousPlaceItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  image: string;
  description: string;
  architecturalStyle: string;
  builtYearOrEra: string;
  mustExperience: string;
  bestVisitingTime: string;
  culturalShadowPreview: string;
}

export interface CityPlacesCollection {
  cityId: string;
  cityName: string;
  state: string;
  tagline: string;
  heroImage: string;
  places: FamousPlaceItem[];
}

export const cityFamousPlacesData: Record<string, CityPlacesCollection> = {
  // ── LUCKNOW ──────────────────────────────────────────────────
  lucknow: {
    cityId: 'lucknow',
    cityName: 'Lucknow',
    state: 'Uttar Pradesh',
    tagline: 'The City of Nawabs, Tehzeeb, Awadhi Architecture & Living Gastronomy',
    heroImage: '/images/lucknow.jpg',
    places: [
      {
        id: 'bara-imambara',
        name: 'Bara Imambara & Bhool Bhulaiya',
        tagline: 'World’s Largest Unsupported Arched Vault & Labyrinth',
        category: 'Awadhi Marvel / 1784 Heritage',
        image: '/images/lucknow.jpg',
        description:
          'Commissioned in 1784 by Nawab Asaf-ud-Daula as a grand famine-relief project to provide noble employment. The colossal central hall stands 50 meters long without a single iron pillar or wooden beam supporting its arched ceiling. Above lies the legendary Bhool Bhulaiya—a three-dimensional maze of 1,024 interconnected passages and 489 identical doorways.',
        architecturalStyle: 'Mughal-Awadhi Synthesis (Badshahi Brick & Stucco)',
        builtYearOrEra: '1784 CE (Nawab Asaf-ud-Daula)',
        mustExperience: 'Guided exploration through the Bhool Bhulaiya acoustic balconies & rooftop panorama of old minarets.',
        bestVisitingTime: '09:00 AM – 05:00 PM',
        culturalShadowPreview: 'The famine-relief wage system where noblemen and laborers built together with equal dignity.',
      },
      {
        id: 'rumi-darwaza',
        name: 'Rumi Darwaza (Sublime Gateway)',
        tagline: 'Iconic 60-Foot Awadhi Portal to the Historic City',
        category: 'Monumental Gateway',
        image: '/images/lucknow.jpg',
        description:
          'Standing 60 feet tall between Bara Imambara and Chota Imambara, the Rumi Darwaza was modeled after the historic Sublime Porte of Constantinople (Istanbul). Decorated with carved floral motifs and crowned by a lantern cupola that was once illuminated with hundreds of lamps at night, it remains the defining silhouette of Lucknow.',
        architecturalStyle: 'Awadhi Baroque Architecture',
        builtYearOrEra: '1784 CE',
        mustExperience: 'Golden-hour photography and viewing the evening street illumination with traditional tonga carriages.',
        bestVisitingTime: '05:00 PM – 07:30 PM (Sunset & Night Lights)',
        culturalShadowPreview: 'The master mason guilds of Husainabad who sculpted lime-surkhi plaster without stone quarried from outside.',
      },
      {
        id: 'chota-imambara',
        name: 'Chota Imambara & Husainabad Clock Tower',
        tagline: 'The Palace of Lights & Gilded Calligraphic Domes',
        category: 'Royal Mausoleum & Clock Tower',
        image: '/images/lucknow.jpg',
        description:
          'Built in 1838 by Nawab Muhammad Ali Shah, the Chota Imambara (Husainabad Imambara) is celebrated worldwide for its Belgian crystal chandeliers, azulejo-tiled courtyard, and golden calligraphic verses. Across the square rises the 221-foot Victorian-Gothic Husainabad Clock Tower, India’s tallest historical clock tower.',
        architecturalStyle: 'Indo-Islamic with Victorian Gothic accents',
        builtYearOrEra: '1838 CE (Nawab Muhammad Ali Shah)',
        mustExperience: 'Viewing the illuminated Belgian glass chandeliers and ancient Quranic calligraphic folios.',
        bestVisitingTime: '10:00 AM – 06:00 PM',
        culturalShadowPreview: 'The royal calligraphers and glass-cutters who preserved Persian manuscript arts in Awadh.',
      },
      {
        id: 'the-residency',
        name: 'The British Residency & 1857 Ruins',
        tagline: 'Epic Siege of 1857 & Peaceful Memorial Gardens',
        category: 'Historic Battle Site & Museum',
        image: '/images/varanasi.jpg',
        description:
          'A sprawling complex of gardens, banquet halls, and banquet ruins that became the focal point of the dramatic 147-day Siege of Lucknow during the First War of Indian Independence in 1857. The cannon-scarred brickwork has been preserved in its authentic post-battle state, surrounded by banyan trees and the 1857 Memorial Museum.',
        architecturalStyle: 'Colonial Palladian & Brickwork Ruins',
        builtYearOrEra: '1780–1800 CE (British Resident Compound)',
        mustExperience: 'Walking the cannon-pierced Banquet Hall and visiting the subterranean Begum Kothi cellars.',
        bestVisitingTime: '08:30 AM – 04:30 PM (Winter mornings)',
        culturalShadowPreview: 'Begum Hazrat Mahal’s fierce resistance and the forgotten freedom fighters who defended Awadh.',
      },
      {
        id: 'hazratganj',
        name: 'Hazratganj & Victorian Heritage Corridor',
        tagline: 'The Historic Promenade for "Ganjing" & Handcrafts',
        category: 'Heritage Promenade & Shopping Quarter',
        image: '/images/rajasthan.jpg',
        description:
          'Established in 1810 by Nawab Saadat Ali Khan, Hazratganj transformed into Lucknow’s premier royal avenue and later a British promenade. Today, the entire avenue features uniform cream-and-black colonial stone facades, vintage bookshops, artisanal Chikankari flagship emporiums, and iconic cafes that coined the local pastime "Ganjing".',
        architecturalStyle: 'Edwardian & Colonial Heritage Facade',
        builtYearOrEra: '1810 CE (Modernized 2010)',
        mustExperience: 'Sampling Royal Cafe’s famous basket chaat and visiting generational Chikankari artisan boutiques.',
        bestVisitingTime: '04:00 PM – 10:00 PM (Vibrant Evening Culture)',
        culturalShadowPreview: 'Generational women embroiderers who sell direct hand-embroidered shadow-work Chikankari fabrics.',
      },
      {
        id: 'chowk-culinary-trail',
        name: 'Old Chowk & Tunday Kababi Heritage Trail',
        tagline: '6-Generation Culinary Legacy & Perfumers Alley',
        category: 'Living Gastronomy & Ittar Bazaar',
        image: '/images/food.jpg',
        description:
          'Old Chowk is the heartbeat of 18th-century Lucknow. Down its narrow labyrinthine alleys, master chefs prepare 160-spice Galouti Kababs on iron tawas, slow-simmered Nihari with fermented Kulcha, and saffron-laced Makhan Malai. Steps away lie the ancient Ittar (fragrance) distilleries and Zardozi silver-thread embroidery workshops.',
        architecturalStyle: 'Medieval Awadhi Bazaar Labyrinth',
        builtYearOrEra: '1700s–Present (Living Tradition)',
        mustExperience: 'Tasting melt-in-mouth Galouti Kababs and sampling pure Ruh Gulab (Rose) Ittar in copper degs.',
        bestVisitingTime: '06:00 PM – 11:30 PM',
        culturalShadowPreview: 'The secret spice blends passed down only by oral poetry in master Bawarchi (chef) families.',
      },
      {
        id: 'ambedkar-memorial-park',
        name: 'Dr. Ambedkar Memorial Park & Gomti Riverfront',
        tagline: 'Monumental Pink Sandstone Architecture by the River',
        category: 'Contemporary Monumental Park',
        image: '/images/kerala.jpg',
        description:
          'Spanning over 107 acres along the Gomti River, this monumental park is constructed entirely from pink sandstone hand-carved in Rajasthan. Featuring 62 carved stone elephant monoliths, a central 112-foot dome with bronze murals, and tranquil reflecting canals, it offers one of India’s most awe-inspiring contemporary public spaces.',
        architecturalStyle: 'Modern Monumental Dravidian-Buddhist Sandstone',
        builtYearOrEra: '2008 CE',
        mustExperience: 'Walking the grand stone colonnade during evening sunset illumination when all fountains glow.',
        bestVisitingTime: '04:30 PM – 08:30 PM',
        culturalShadowPreview: 'The modern artisan stone-carvers from Dholpur who chiseled millions of square feet of pink sandstone.',
      }
    ]
  },

  // ── AGRA ─────────────────────────────────────────────────────
  agra: {
    cityId: 'agra',
    cityName: 'Agra',
    state: 'Uttar Pradesh',
    tagline: 'Capital of Mughal Grandeur, Marble Inlay Masters & Yamuna Riverfront',
    heroImage: '/images/taj-mahal.jpg',
    places: [
      {
        id: 'taj-mahal',
        name: 'Taj Mahal & Mehtab Bagh',
        tagline: 'The Pinnacle of Mughal Architectural Harmony',
        category: 'UNESCO World Heritage',
        image: '/images/taj-mahal.jpg',
        description:
          'Commissioned by Emperor Shah Jahan in 1631 in memory of Mumtaz Mahal. Made of translucent white Makrana marble inlaid with lapis lazuli, jade, and carnelian using the delicate Parchin Kari technique.',
        architecturalStyle: 'Mughal Architectural Synthesis',
        builtYearOrEra: '1631–1648 CE',
        mustExperience: 'Sunrise viewpoint across the Yamuna River from Mehtab Bagh gardens.',
        bestVisitingTime: '06:00 AM (Sunrise)',
        culturalShadowPreview: 'Pietra Dura marble inlay artisans in Taj Ganj whose ancestors cut stones for the emperor.',
      },
      {
        id: 'agra-fort',
        name: 'Agra Fort (Lal Qila)',
        tagline: 'Seat of Mughal Emperors & Red Sandstone Palaces',
        category: 'UNESCO World Heritage Fortress',
        image: '/images/taj-mahal.jpg',
        description:
          'The walled imperial fortress of Emperor Akbar and Shah Jahan. Houses the Jahangiri Mahal, Diwan-i-Khas, and the marble balcony of Musamman Burj where Shah Jahan gazed upon the Taj Mahal in his final years.',
        architecturalStyle: 'Imperial Mughal Fortification',
        builtYearOrEra: '1565–1573 CE',
        mustExperience: 'Exploring the Sheesh Mahal (Mirror Palace) and Musamman Burj balcony.',
        bestVisitingTime: '08:00 AM – 11:30 AM',
        culturalShadowPreview: 'The acoustic engineering in the Diwan-i-Aam where whisperings traveled through double vaulted stone.',
      },
      {
        id: 'fatehpur-sikri',
        name: 'Fatehpur Sikri & Buland Darwaza',
        tagline: 'The Enigmatic Red Sandstone City of Akbar',
        category: 'UNESCO World Heritage Ghost City',
        image: '/images/taj-mahal.jpg',
        description:
          'Founded in 1571 by Emperor Akbar to honor Sufi saint Salim Chishti. Features the 176-foot Buland Darwaza (Gate of Magnificence), Panch Mahal pavilion, and the white marble Dargah of Salim Chishti.',
        architecturalStyle: 'Akbari Mughal Architecture',
        builtYearOrEra: '1571 CE',
        mustExperience: 'Tying a sacred thread at Salim Chishti Dargah and looking up at Buland Darwaza.',
        bestVisitingTime: '02:00 PM – 05:30 PM',
        culturalShadowPreview: 'Qawwali singers who have performed in the courtyard for over 450 continuous years.',
      }
    ]
  },

  // ── VARANASI ─────────────────────────────────────────────────
  varanasi: {
    cityId: 'varanasi',
    cityName: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'The Spiritual Capital of India & World’s Oldest Living City',
    heroImage: '/images/varanasi.jpg',
    places: [
      {
        id: 'kashi-vishwanath',
        name: 'Kashi Vishwanath Temple & Corridor',
        tagline: 'The Supreme Jyotirlinga of Lord Shiva',
        category: 'Spiritual Epicenter',
        image: '/images/varanasi.jpg',
        description:
          'One of the twelve revered Jyotirlingas, reconstructed with a monumental modern heritage corridor connecting the sacred sanctum directly to the holy Ganga riverfront.',
        architecturalStyle: 'Classical Nagara & Golden Spire',
        builtYearOrEra: 'Ancient (Rebuilt 1780 by Ahilyabai Holkar)',
        mustExperience: 'Mangala Aarti at dawn and walking through the newly restored heritage corridor.',
        bestVisitingTime: '04:30 AM – 09:00 AM',
        culturalShadowPreview: 'Vedic scholars in the adjacent alleyways chanting uninterrupted oral texts from memory.',
      },
      {
        id: 'dashashwamedh-ghat',
        name: 'Dashashwamedh Ghat & Evening Ganga Aarti',
        tagline: 'The Grand Symphony of Fire, Bells & Sacred Chants',
        category: 'Sacred Riverfront',
        image: '/images/varanasi.jpg',
        description:
          'The most prominent and vibrant ghat on the sacred Ganges where priests perform the synchronized multi-tiered brass lamp Maha Aarti every evening at twilight.',
        architecturalStyle: 'Stone Ghat Tiered Riverfront',
        builtYearOrEra: '1748 CE (Peshwa Balaji Baji Rao)',
        mustExperience: 'Watching the Aarti from a traditional wooden boat anchored on the river.',
        bestVisitingTime: '05:30 PM – 07:30 PM',
        culturalShadowPreview: 'The generational boatmen (mallahs) whose families have navigated the sacred currents for centuries.',
      },
      {
        id: 'sarnath',
        name: 'Sarnath & Dhamek Stupa',
        tagline: 'The Cradle of Buddhism & Ashoka Pillar',
        category: 'UNESCO Tentative Heritage',
        image: '/images/varanasi.jpg',
        description:
          'Located 10 km from Varanasi, this is the deer park where Gautama Buddha delivered his first sermon (Dharmachakra Pravartana). The 143-foot Dhamek Stupa and the original 4-Lion Ashoka Capital reside here.',
        architecturalStyle: 'Mauryan & Gupta Buddhist Stupa',
        builtYearOrEra: '500 BCE – 500 CE',
        mustExperience: 'Circumambulating the Dhamek Stupa and visiting the Sarnath Archaeological Museum.',
        bestVisitingTime: '09:00 AM – 04:00 PM',
        culturalShadowPreview: 'The stone-cutters who preserved the Ashokan mirror-polish technique for millenniums.',
      }
    ]
  }
};
