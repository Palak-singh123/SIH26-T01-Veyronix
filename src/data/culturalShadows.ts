export interface CulturalShadow {
  id: string;
  city: string;
  state: string;
  famous: {
    name: string;
    description: string;
    image: string;
  };
  hidden: {
    name: string;
    description: string;
    image: string;
    experiences: string[];
  };
  forgotten: {
    name: string;
    description: string;
  };
}

export const culturalShadows: CulturalShadow[] = [
  {
    id: 'agra',
    city: 'Agra',
    state: 'Uttar Pradesh',
    famous: {
      name: 'Taj Mahal',
      description: 'The world\'s most famous monument of love. Every year, millions visit this ivory-white marble mausoleum.',
      image: '/images/taj-mahal.jpg',
    },
    hidden: {
      name: 'The Artisans of Agra',
      description: 'Behind the Taj Mahal, generations of craftsmen continue the same marble inlay tradition (Pietra Dura) that built the monument. Their workshops hold stories no guided tour will show you.',
      image: '/images/agra-crafts.jpg',
      experiences: [
        'Pietra Dura marble inlay workshops',
        'Mughal-era petha sweet making',
        'Leather craft of Agra\'s old quarters',
        'Mehtab Bagh sunset stories',
      ],
    },
    forgotten: {
      name: 'The forgotten builders\' village',
      description: 'The descendants of the artisans who built the Taj Mahal still live in Agra. Their stories, skills, and heritage remain largely invisible to the millions who visit each year.',
    },
  },
  {
    id: 'jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    famous: {
      name: 'Hawa Mahal',
      description: 'The iconic Palace of Winds, with its 953 windows, is one of India\'s most photographed monuments.',
      image: '/images/rajasthan.jpg',
    },
    hidden: {
      name: 'The Dyers of Jaipur',
      description: 'In the narrow lanes behind the palace, families have been practicing the art of block printing and natural dyeing for centuries. The colors of Rajasthan begin here.',
      image: '/images/rajasthan.jpg',
      experiences: [
        'Sanganer block printing workshops',
        'Natural indigo dyeing traditions',
        'Lac bangle making in old city',
        'Meenakari enamel jewelry craft',
      ],
    },
    forgotten: {
      name: 'The Jalandhara Weavers',
      description: 'An entire community of weavers once supplied textiles to the royal court. Today their descendants struggle to keep the tradition alive.',
    },
  },
];

export interface CulturalCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const culturalCategories: CulturalCategory[] = [
  {
    id: 'heritage',
    name: 'Heritage',
    description: 'Monuments, architecture and historical places that tell India\'s story across millennia.',
    icon: '🏛️',
    color: '#c4724e',
  },
  {
    id: 'crafts',
    name: 'Crafts',
    description: 'Artisans, textiles, handmade traditions passed through generations of skilled hands.',
    icon: '🧵',
    color: '#d4a574',
  },
  {
    id: 'stories',
    name: 'Stories',
    description: 'Local legends, oral histories and forgotten narratives waiting to be discovered.',
    icon: '📜',
    color: '#2d3561',
  },
  {
    id: 'festivals',
    name: 'Festivals',
    description: 'Living cultural celebrations that transform cities and villages across the nation.',
    icon: '🎭',
    color: '#e8913a',
  },
  {
    id: 'food',
    name: 'Food',
    description: 'Regional cuisines and culinary traditions that define India\'s incredible diversity.',
    icon: '🍛',
    color: '#b8972f',
  },
  {
    id: 'people',
    name: 'People',
    description: 'Communities and cultural practitioners keeping ancient traditions alive today.',
    icon: '🙏',
    color: '#3a6b5c',
  },
];
