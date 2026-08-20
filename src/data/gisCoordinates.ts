export interface GeoNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  svgX: number;
  svgY: number;
  region: string;
  category: 'UNESCO' | 'Heritage' | 'Spiritual' | 'Wildlife' | 'Hidden';
  tagline: string;
}

export interface RouteWaypoint {
  day: number;
  nodeId: string;
  name: string;
  highlight: string;
  shadowNote: string;
  foodSuggestion: string;
  stayDuration: string;
}

export interface ItineraryPlan {
  id: string;
  title: string;
  destinationSummary: string;
  durationDays: number;
  theme: string;
  whyThisRoute: string;
  waypoints: RouteWaypoint[];
  culturalShadows: string[];
  mementosSuggested: string[];
  festivalAlert?: string;
}

export const geoNodes: Record<string, GeoNode> = {
  lucknow: {
    id: 'lucknow',
    name: 'Lucknow',
    lat: 26.8467,
    lng: 80.9462,
    svgX: 310,
    svgY: 220,
    region: 'Awadh / Central UP',
    category: 'Heritage',
    tagline: 'City of Tehzeeb, Imambaras & Culinary Masters'
  },
  varanasi: {
    id: 'varanasi',
    name: 'Varanasi',
    lat: 25.3176,
    lng: 82.9739,
    svgX: 350,
    svgY: 245,
    region: 'Eastern UP / Ganga Basin',
    category: 'Spiritual',
    tagline: 'Ancient living ghats & Vishwanath Jyotirlinga'
  },
  agra: {
    id: 'agra',
    name: 'Agra',
    lat: 27.1767,
    lng: 78.0081,
    svgX: 255,
    svgY: 205,
    region: 'Western UP / Braj Gateway',
    category: 'UNESCO',
    tagline: 'Mughal architectural synthesis & marble artisans'
  },
  ayodhya: {
    id: 'ayodhya',
    name: 'Ayodhya',
    lat: 26.7922,
    lng: 82.1998,
    svgX: 335,
    svgY: 225,
    region: 'Awadh / Saryu Basin',
    category: 'Spiritual',
    tagline: 'Birthplace of Rama & ancient Jain Tirthankar heritage'
  },
  mathura: {
    id: 'mathura',
    name: 'Mathura & Vrindavan',
    lat: 27.4924,
    lng: 77.6737,
    svgX: 245,
    svgY: 195,
    region: 'Braj Region',
    category: 'Spiritual',
    tagline: 'Living landscape of Krishna bhakti & Yamuna ghats'
  },
  prayagraj: {
    id: 'prayagraj',
    name: 'Prayagraj (Allahabad)',
    lat: 25.4358,
    lng: 81.8463,
    svgX: 330,
    svgY: 250,
    region: 'Triveni Confluence',
    category: 'Spiritual',
    tagline: 'Sacred Sangam confluence & historic Allahabad Museum'
  },
  sarnath: {
    id: 'sarnath',
    name: 'Sarnath',
    lat: 25.3811,
    lng: 83.0214,
    svgX: 355,
    svgY: 242,
    region: 'Varanasi Buddhist Enclave',
    category: 'Heritage',
    tagline: 'Dhamek Stupa & Buddha’s First Sermon ground'
  },
  jhansi: {
    id: 'jhansi',
    name: 'Jhansi',
    lat: 25.4484,
    lng: 78.5685,
    svgX: 265,
    svgY: 255,
    region: 'Bundelkhand',
    category: 'Heritage',
    tagline: 'Rani Lakshmibai’s fort & 1857 freedom struggle'
  },
  pilibhit: {
    id: 'pilibhit',
    name: 'Pilibhit Tiger Reserve',
    lat: 28.6312,
    lng: 79.8037,
    svgX: 290,
    svgY: 175,
    region: 'Terai Arc Ecosystem',
    category: 'Wildlife',
    tagline: 'TX2 global award-winning wild tiger sanctuary'
  },
  dudhwa: {
    id: 'dudhwa',
    name: 'Dudhwa National Park',
    lat: 28.5133,
    lng: 80.6486,
    svgX: 315,
    svgY: 170,
    region: 'Terai Foothills',
    category: 'Wildlife',
    tagline: 'Grassland wilderness, swamp deer & rhino haven'
  },
  chitrakoot: {
    id: 'chitrakoot',
    name: 'Chitrakoot',
    lat: 25.1834,
    lng: 80.8679,
    svgX: 310,
    svgY: 265,
    region: 'Bundelkhand Forests',
    category: 'Heritage',
    tagline: 'Kamadgiri hill, Gupt Godavari caves & Ramghat'
  },
  sonbhadra: {
    id: 'sonbhadra',
    name: 'Sonbhadra & Lakhaniya Dari',
    lat: 24.6852,
    lng: 83.0645,
    svgX: 360,
    svgY: 275,
    region: 'Vindhya Hills',
    category: 'Hidden',
    tagline: 'Untamed waterfalls, rock canyons & Vijaygarh Fort'
  }
};

/**
 * Pre-compiled authentic curated journey itineraries
 */
export const defaultItineraries: Record<string, ItineraryPlan> = {
  'lucknow-3day': {
    id: 'lucknow-3day',
    title: '3-Day Awadh Heritage, Cuisine & Artisan Trail',
    destinationSummary: 'Lucknow • Kakori • Old Chowk',
    durationDays: 3,
    theme: 'Heritage Architecture × Living Crafts × Awadhi Gastronomy',
    whyThisRoute: 'Designed to experience royal Awadhi architectural synthesis, direct artisan home workshops, and authentic slow-fire culinary traditions without rushed transit.',
    waypoints: [
      {
        day: 1,
        nodeId: 'lucknow',
        name: 'Grand Nawabi Monuments & Unsupported Vaults',
        highlight: 'Explore Bara Imambara’s acoustic Bhulbhulaiya labyrinth, the monumental 18th-century Rumi Darwaza gateway, and Asafi Mosque.',
        shadowNote: 'Descend to the subterranean baoli well to understand medieval hydraulic cooling techniques.',
        foodSuggestion: 'Traditional Gilawat kebabs with Roomali roti at century-old stalls in Chowk.',
        stayDuration: 'Full Day'
      },
      {
        day: 2,
        nodeId: 'lucknow',
        name: 'Living Artisan Guilds of Chowk & Zardozi Masters',
        highlight: 'Visit master needlework artisans in Kakori and Old Chowk practicing authentic 32-stitch Chikankari and pure metal Zardozi.',
        shadowNote: 'Meet generational ittar (natural perfume) distillers brewing pure mitti and khus attar in copper degs.',
        foodSuggestion: 'Slow-cooked Awadhi Gosht Biryani and traditional Shahi Tukda sweet.',
        stayDuration: 'Full Day'
      },
      {
        day: 3,
        nodeId: 'lucknow',
        name: 'Resistance Heritage & Modern Cultural Sabhas',
        highlight: 'Walk the bullet-marked ruins of the 1857 British Residency and experience classical Kathak music recitals.',
        shadowNote: 'Discover the forgotten Awadhi calligraphers restoring historical Persian-Urdu manuscripts.',
        foodSuggestion: 'Winter morning Malaiyo (whipped dew milk froth) and Kashmiri chai in old alleys.',
        stayDuration: 'Full Day'
      }
    ],
    culturalShadows: [
      'Chikankari shadow-work artisan cooperatives in Kakori',
      'Generational natural Ittar distillers of Old Chowk',
      'The 1857 resistance stories engraved in the Residency ruins'
    ],
    mementosSuggested: [
      'rumi-darwaza-miniature',
      'chikankari-embroidered-keepsake'
    ],
    festivalAlert: 'Kajari Utsav and Awadh Mahotsav seasonal cultural performances.'
  },
  'up-5day-heritage': {
    id: 'up-5day-heritage',
    title: '5-Day Imperial & Spiritual Odyssey Across UP',
    destinationSummary: 'Agra • Lucknow • Ayodhya • Varanasi',
    durationDays: 5,
    theme: 'UNESCO Wonders × Awadh Royalty × Sacred Ganga Living Heritage',
    whyThisRoute: 'Connects the three major cultural civilizations of northern India along the sacred Yamuna, Gomti, and Ganga rivers.',
    waypoints: [
      {
        day: 1,
        nodeId: 'agra',
        name: 'Agra: Beyond the Ivory Mausoleum',
        highlight: 'Sunrise at the Taj Mahal, followed by Akbar’s Agra Fort and sunset view from Mehtab Bagh.',
        shadowNote: 'Parchin Kari marble inlay workshops in Taj Ganj.',
        foodSuggestion: 'Mughal Bedmi Puri with spicy pumpkin sabzi.',
        stayDuration: '1 Day'
      },
      {
        day: 2,
        nodeId: 'lucknow',
        name: 'Lucknow: The Royal Court of Awadh',
        highlight: 'Bara Imambara, Rumi Darwaza, and evening heritage walk through the Chowk bazaar.',
        shadowNote: 'Zardozi metal embroidery workshops and ittar making.',
        foodSuggestion: 'Dum Pukht biryani and Kakori kebabs.',
        stayDuration: '1 Day'
      },
      {
        day: 3,
        nodeId: 'ayodhya',
        name: 'Ayodhya: Sacred Saryu & Ancient Capitals',
        highlight: 'Ram Janmabhoomi, Hanuman Garhi, Kanak Bhawan, and evening Saryu Deepotsav Aarti.',
        shadowNote: 'Ancient Jain Tirthankar shrines and Buddhist archaeological foundations.',
        foodSuggestion: 'Ayodhya peda and saffron rabdi.',
        stayDuration: '1 Day'
      },
      {
        day: 4,
        nodeId: 'varanasi',
        name: 'Varanasi: Sacred Living Ghats & Handloom Weavers',
        highlight: 'Dawn boat ride along the 84 ghats, Kashi Vishwanath temple, and Dashashwamedh Ganga Aarti.',
        shadowNote: 'Jacquard handloom weavers of Madanpura crafting pure silver zari Banarasi sarees.',
        foodSuggestion: 'Banarasi Tamatar Chaat and Kesariya Lassi.',
        stayDuration: '1 Day'
      },
      {
        day: 5,
        nodeId: 'sarnath',
        name: 'Sarnath: The Path of Enlightenment',
        highlight: 'Dhamek Stupa, Chaukhandi Stupa, and the world-famous Ashoka Lion Capital at Sarnath Museum.',
        shadowNote: 'Monastic meditation gardens and ancient Deer Park archaeological ruins.',
        foodSuggestion: 'Traditional sattvic meal near the archaeological enclave.',
        stayDuration: '1 Day'
      }
    ],
    culturalShadows: [
      'Agra Pietra Dura artisan families',
      'Lucknow Chowk ittar perfume distillers',
      'Varanasi Madanpura handloom silk weavers'
    ],
    mementosSuggested: [
      'pietra-dura-inlay-plaque',
      'banarasi-zari-keepsake',
      'saryu-brass-diya'
    ],
    festivalAlert: 'Maha Kumbh at Prayagraj & Dev Deepavali along Varanasi Ghats.'
  }
};
