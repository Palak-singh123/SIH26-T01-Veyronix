/**
 * Official Practical Travel & Emergency Information for Bharat Bharman
 * Source: Ministry of Tourism, Govt of India / National Disaster Management Authority
 */

export interface EmergencyContact {
  service: string;
  number: string;
  description: string;
  languagesSupported: string;
}

export const officialHelplines: EmergencyContact[] = [
  {
    service: 'National 24x7 Multi-Lingual Tourist Helpline',
    number: '1363 / 1800-11-1363',
    description: 'Toll-free information and emergency assistance for domestic and international tourists.',
    languagesSupported: 'English, Hindi, French, German, Spanish, Japanese, Korean, Russian, Italian, Arabic, Portuguese, Mandarin',
  },
  {
    service: 'National Emergency Response System (Pan-India)',
    number: '112',
    description: 'Unified single number for Police, Fire, and Medical emergencies across all Indian States & UTs.',
    languagesSupported: 'Regional Indian Languages & English',
  },
  {
    service: 'Indian Railways Tourist & Security Helpline',
    number: '139',
    description: 'Train booking enquiry, PNR status, security assistance, and luggage help.',
    languagesSupported: 'Hindi, English, Bengali, Tamil, Telugu, Marathi',
  },
  {
    service: 'Women Safety Helpline',
    number: '1091 / 181',
    description: 'Dedicated national 24-hour response service for female travellers and residents.',
    languagesSupported: 'All Indian Languages',
  },
  {
    service: 'National Medical Ambulance Service',
    number: '108 / 102',
    description: 'Immediate medical ambulance dispatch and first-aid response.',
    languagesSupported: 'State & Regional Languages',
  },
];

export interface ClimateGuide {
  region: string;
  winter: string;
  summer: string;
  monsoon: string;
  bestTimeToVisit: string;
}

export const regionalClimateGuides: ClimateGuide[] = [
  {
    region: 'Northern Plains (UP, Delhi, Punjab, Haryana)',
    winter: '5°C to 20°C (Pleasant sunny days, foggy mornings in Jan)',
    summer: '30°C to 42°C (Dry heat, ideal for hill excursions)',
    monsoon: '25°C to 34°C (Lush green landscapes, river vitality)',
    bestTimeToVisit: 'October to March (Peak Cultural Season)',
  },
  {
    region: 'Himalayan Belt (Uttarakhand, Himachal, Ladakh, Kashmir)',
    winter: '-15°C to 8°C (Snowfall, ski resorts in Gulmarg & Auli)',
    summer: '12°C to 26°C (Pleasant alpine weather, trekking)',
    monsoon: 'Caution advised for landslides; valley flowers in bloom',
    bestTimeToVisit: 'April to June (Spring/Summer) & Oct to Feb (Snow Sports)',
  },
  {
    region: 'Western & Coastal India (Goa, Maharashtra, Gujarat)',
    winter: '18°C to 30°C (Warm sunshine, pleasant sea breeze)',
    summer: '28°C to 38°C (Humid coastal warmth)',
    monsoon: 'Heavy romantic rains, dramatic Western Ghats waterfalls',
    bestTimeToVisit: 'November to March & Monsoon (June–Aug for Waterfalls)',
  },
  {
    region: 'Southern Peninsula (Kerala, Tamil Nadu, Karnataka)',
    winter: '20°C to 30°C (Mild tropical climate, temple festivals)',
    summer: '25°C to 36°C (Hill stations like Munnar/Ooty offer refuge)',
    monsoon: 'June to August (Ideal for authentic Ayurveda rejuvenation)',
    bestTimeToVisit: 'September to March & Monsoon for Ayurveda',
  },
];

export interface TravelPartner {
  id: string;
  name: string;
  category: 'Heritage Tour Operator' | 'Eco & Wildlife Guide' | 'Craft & Textile Guild' | 'Adventure Specialist' | 'Official Transit';
  state: string;
  specialty: string;
  languages: string[];
  contactNote: string;
}

export const verifiedTravelPartners: TravelPartner[] = [
  {
    id: 'awadh-heritage-walks',
    name: 'Awadh Living Heritage Guides Cooperative',
    category: 'Heritage Tour Operator',
    state: 'Uttar Pradesh (Lucknow & Varanasi)',
    specialty: 'Architectural acoustic walks, Old Chowk culinary tours & Zardozi weaver guilds',
    languages: ['English', 'Hindi', 'Urdu', 'French'],
    contactNote: 'Official UPSTDC Registered Heritage Guides',
  },
  {
    id: 'kutch-artisan-trail',
    name: 'Kutch Artisans Collective & Craft Trail',
    category: 'Craft & Textile Guild',
    state: 'Gujarat (Bhuj & Kutch)',
    specialty: 'Direct interaction with Ajrakh block printers, Rogan artists & Kutchi weavers',
    languages: ['Gujarati', 'Hindi', 'English'],
    contactNote: 'Recognized by Gujarat Tourism Craft Guild',
  },
  {
    id: 'terai-wildlife-trackers',
    name: 'Terai Naturalists & Tribal Eco-Guides',
    category: 'Eco & Wildlife Guide',
    state: 'Uttar Pradesh (Dudhwa & Pilibhit)',
    specialty: 'Tharu indigenous tracking, bird identification and tiger corridor ecology',
    languages: ['Hindi', 'Tharu', 'English'],
    contactNote: 'Trained by Wildlife Trust of India & UP Forest Dept',
  },
  {
    id: 'kerala-ayurveda-network',
    name: 'Malabar Traditional Ayurveda & Houseboat Guild',
    category: 'Heritage Tour Operator',
    state: 'Kerala (Alleppey & Fort Kochi)',
    specialty: 'Licensed solar-powered Kettuvallam backwater cruises & authentic Panchakarma retreats',
    languages: ['Malayalam', 'English', 'German'],
    contactNote: 'Accredited by Kerala Tourism Green Palm Certification',
  },
];
