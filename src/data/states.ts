export interface StateData {
  id: string;
  name: string;
  slug: string;
  region: string;
  tagline: string;
  description: string;
  image: string;
  categories: string[];
  famousDestinations: string[];
  hiddenExperiences: string[];
}

export const states: StateData[] = [
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    slug: 'rajasthan',
    region: 'North',
    tagline: 'Land of living heritage',
    description: 'Beyond the forts lies a Rajasthan of artisans, oral traditions, desert communities and living heritage that few travellers ever witness.',
    image: '/images/rajasthan.jpg',
    categories: ['Heritage', 'Crafts', 'Folk Traditions'],
    famousDestinations: ['Jaipur', 'Udaipur', 'Jaisalmer', 'Jodhpur'],
    hiddenExperiences: ['Block printing villages of Bagru', 'Bishnoi community visits', 'Desert folk music sessions', 'Stepwell architecture tours'],
  },
  {
    id: 'kerala',
    name: 'Kerala',
    slug: 'kerala',
    region: 'South',
    tagline: 'Where landscape becomes culture',
    description: 'Kerala is not just backwaters and beaches. It is a living tapestry of performing arts, spice traditions, temple festivals and culinary wisdom passed through generations.',
    image: '/images/kerala.jpg',
    categories: ['Backwaters', 'Food', 'Performing Arts'],
    famousDestinations: ['Alleppey', 'Munnar', 'Kochi', 'Wayanad'],
    hiddenExperiences: ['Theyyam ritual performances', 'Toddy shop culture', 'Chettinad spice markets', 'Snake boat race preparations'],
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    slug: 'tamil-nadu',
    region: 'South',
    tagline: 'A living archive of architecture and classical culture',
    description: 'Tamil Nadu holds one of the oldest continuous cultural traditions on Earth — from Bharatanatyam to bronze casting, from Chettinad cuisine to Dravidian temple architecture.',
    image: '/images/tamil-nadu.jpg',
    categories: ['Architecture', 'Dance', 'Cuisine'],
    famousDestinations: ['Chennai', 'Madurai', 'Thanjavur', 'Mahabalipuram'],
    hiddenExperiences: ['Bronze idol making in Swamimalai', 'Chettinad mansion heritage walks', 'Kolam art traditions', 'Carnatic music sabhas'],
  },
  {
    id: 'varanasi',
    name: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    region: 'North',
    tagline: 'Where spirituality meets the everyday',
    description: 'Beyond the Taj Mahal and the ghats of Varanasi lies a world of Mughal culinary traditions, handloom weaving, and communities keeping ancient crafts alive.',
    image: '/images/varanasi.jpg',
    categories: ['Spirituality', 'Textiles', 'Heritage'],
    famousDestinations: ['Agra', 'Varanasi', 'Lucknow', 'Prayagraj'],
    hiddenExperiences: ['Banarasi silk weaving workshops', 'Lucknowi chikan embroidery', 'Awadhi cooking traditions', 'Morning raaga sessions at ghats'],
  },
  {
    id: 'kashmir',
    name: 'Jammu & Kashmir',
    slug: 'jammu-kashmir',
    region: 'North',
    tagline: 'Paradise with a thousand layers',
    description: 'Kashmir is far more than its valleys. It is papier-mâché artistry, pashmina weaving, Sufi shrines, and a culinary tradition that rivals any in the world.',
    image: '/images/kashmir.jpg',
    categories: ['Landscapes', 'Crafts', 'Cuisine'],
    famousDestinations: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg'],
    hiddenExperiences: ['Papier-mâché workshops', 'Wazwan feast preparations', 'Pashmina weaving villages', 'Sufi shrine music evenings'],
  },
  {
    id: 'goa',
    name: 'Goa',
    slug: 'goa',
    region: 'West',
    tagline: 'Where two cultures became one',
    description: 'Beyond the beaches, Goa holds centuries of Indo-Portuguese fusion — in its architecture, cuisine, music, and a way of life found nowhere else in India.',
    image: '/images/goa.jpg',
    categories: ['Architecture', 'Food', 'Music'],
    famousDestinations: ['Panaji', 'Old Goa', 'Anjuna', 'Palolem'],
    hiddenExperiences: ['Feni distillation process', 'Latin Quarter heritage walks', 'Village feast celebrations', 'Mando music traditions'],
  },
];

export const stateMapData: Record<string, { cx: number; cy: number; r: number }> = {
  'rajasthan': { cx: 185, cy: 195, r: 45 },
  'kerala': { cx: 240, cy: 520, r: 20 },
  'tamil-nadu': { cx: 280, cy: 480, r: 30 },
  'varanasi': { cx: 320, cy: 210, r: 35 },
  'kashmir': { cx: 215, cy: 70, r: 25 },
  'goa': { cx: 195, cy: 410, r: 15 },
};
