/**
 * Verified Cultural Guides & Naturalists Dataset
 * Bharat Bharman Official Guide Registry
 */

export interface GuideReview {
  id: string;
  userName: string;
  userLocation: string;
  rating: number;
  date: string;
  comment: string;
  aspectsLiked: string[];
}

export interface CulturalGuide {
  id: string;
  name: string;
  title: string;
  location: string;
  state: string;
  languages: string[];
  specializations: string[];
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  avatar: string;
  bio: string;
  documentaryVideo?: string;
  destinationsCovered: string[];
  isVerified: boolean;
  scoreBreakdown: {
    knowledge: number;
    communication: number;
    storytelling: number;
    professionalism: number;
  };
  reviews: GuideReview[];
}

export const registeredGuides: CulturalGuide[] = [
  {
    id: 'rahul-sharma-lucknow',
    name: 'Rahul Sharma',
    title: 'Senior Awadh Heritage & Culinary Chronicler',
    location: 'Lucknow, Old Chowk & Kakori',
    state: 'Uttar Pradesh',
    languages: ['English', 'Hindi', 'Urdu'],
    specializations: ['Heritage', 'Architecture', 'Food', 'Crafts', 'Local Culture'],
    experienceYears: 12,
    rating: 4.9,
    reviewsCount: 148,
    avatar: '/images/lucknow.jpg',
    bio: 'Descendant of 4th generation Awadhi storytellers (Dastangos). Specializes in acoustic architecture of Bara Imambara, secret labyrinth routes, and generational Zardozi embroidery workshops in Chowk.',
    documentaryVideo: '/videos/hero-cinematic.mp4',
    destinationsCovered: ['Bara Imambara', 'Rumi Darwaza', 'Chowk Heritage Walk', 'Kakori Artisan Guilds', 'Residency'],
    isVerified: true,
    scoreBreakdown: {
      knowledge: 98,
      communication: 96,
      storytelling: 100,
      professionalism: 97,
    },
    reviews: [
      {
        id: 'rev-1',
        userName: 'Alistair Vance',
        userLocation: 'London, UK',
        rating: 5,
        date: '2026-07-14',
        comment: 'Rahul opened doors to artisan courtyards in Old Chowk that no guidebook mentioned. The acoustic demonstrations in the Imambara were unforgettable.',
        aspectsLiked: ['Knowledge', 'Storytelling', 'Local insights'],
      },
      {
        id: 'rev-2',
        userName: 'Priya Narayanan',
        userLocation: 'Bengaluru, India',
        rating: 5,
        date: '2026-06-28',
        comment: 'His deep knowledge of Awadhi food history and Chikankari stitches made this the highlight of our UP trip.',
        aspectsLiked: ['Storytelling', 'Professionalism'],
      },
    ],
  },
  {
    id: 'anand-verma-varanasi',
    name: 'Pt. Anand Verma',
    title: 'Vedic Scholar & Ghat Cultural Naturalist',
    location: 'Varanasi (Kashi)',
    state: 'Uttar Pradesh',
    languages: ['English', 'Hindi', 'Sanskrit', 'French'],
    specializations: ['Spiritual', 'Heritage', 'Living Traditions', 'Crafts', 'Photography'],
    experienceYears: 16,
    rating: 4.95,
    reviewsCount: 215,
    avatar: '/images/varanasi.jpg',
    bio: 'Sanskrit scholar trained at Banaras Hindu University. Leads sunrise spiritual walks from Assi to Manikarnika, Jacquard silk pit loom master visits, and evening philosophical discussions on Ganga metaphysics.',
    destinationsCovered: ['84 Sacred Ghats', 'Kashi Vishwanath Corridor', 'Madanpura Handloom Guilds', 'Sarnath Stupas'],
    isVerified: true,
    scoreBreakdown: {
      knowledge: 100,
      communication: 95,
      storytelling: 99,
      professionalism: 98,
    },
    reviews: [
      {
        id: 'rev-3',
        userName: 'Elena Rostova',
        userLocation: 'Vienna, Austria',
        rating: 5,
        date: '2026-08-02',
        comment: 'Anandji transformed our understanding of Varanasi. Rather than a tourist spectacle, he showed us the living breathing philosophy of Kashi.',
        aspectsLiked: ['Knowledge', 'Local insights', 'Storytelling'],
      },
    ],
  },
  {
    id: 'vikram-singh-agra',
    name: 'Vikram Singh Rathore',
    title: 'Mughal Architecture & Lapidary Arts Expert',
    location: 'Agra & Fatehpur Sikri',
    state: 'Uttar Pradesh',
    languages: ['English', 'Hindi', 'Spanish', 'German'],
    specializations: ['Architecture', 'History', 'Crafts', 'Photography'],
    experienceYears: 10,
    rating: 4.85,
    reviewsCount: 132,
    avatar: '/images/agra-crafts.jpg',
    bio: 'Architectural historian with family ties to Taj Ganj stone-inlay artisans. Offers moonlight Yamuna vantage points, secret corridors of Agra Fort, and direct master sessions with Parchin Kari lapidary masters.',
    destinationsCovered: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh', 'Taj Ganj Marble Guilds'],
    isVerified: true,
    scoreBreakdown: {
      knowledge: 97,
      communication: 98,
      storytelling: 94,
      professionalism: 99,
    },
    reviews: [
      {
        id: 'rev-4',
        userName: 'Carlos Mendes',
        userLocation: 'Madrid, Spain',
        rating: 5,
        date: '2026-07-20',
        comment: 'Vikram’s passion for marble inlay history and secret viewpoints of Fatehpur Sikri made this trip extraordinary.',
        aspectsLiked: ['Knowledge', 'Professionalism'],
      },
    ],
  },
  {
    id: 'birbal-tharu-dudhwa',
    name: 'Birbal Tharu',
    title: 'Indigenous Terai Naturalist & Tiger Corridor Guide',
    location: 'Dudhwa & Pilibhit Tiger Corridor',
    state: 'Uttar Pradesh',
    languages: ['Hindi', 'Tharu', 'English'],
    specializations: ['Wildlife', 'Nature', 'Local Culture', 'Adventure'],
    experienceYears: 14,
    rating: 4.92,
    reviewsCount: 94,
    avatar: '/images/hero-bg.jpg',
    bio: 'Born in the indigenous Tharu villages on the Indo-Nepal border. Master wildlife tracker certified by Wildlife Trust of India with unmatched knowledge of Sal tree ecology, Barasingha habits, and tiger pugmarks.',
    destinationsCovered: ['Dudhwa National Park', 'Pilibhit Tiger Reserve (Chuka Beach)', 'Kishanpur Sanctuary', 'Tharu Tribal Village'],
    isVerified: true,
    scoreBreakdown: {
      knowledge: 99,
      communication: 92,
      storytelling: 96,
      professionalism: 98,
    },
    reviews: [
      {
        id: 'rev-5',
        userName: 'David Miller',
        userLocation: 'Sydney, Australia',
        rating: 5,
        date: '2026-05-18',
        comment: 'Birbal spotted a mother tigress and two cubs along the Sharda canal without disturbing them in the slightest. An ethical master naturalist.',
        aspectsLiked: ['Knowledge', 'Local insights', 'Professionalism'],
      },
    ],
  },
];
