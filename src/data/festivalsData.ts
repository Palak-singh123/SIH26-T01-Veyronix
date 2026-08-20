/**
 * Annual Pan-India 12-Month Festival Calendar
 * Source: Ministry of Culture / Sangeet Natak Akademi / State Tourism Departments
 */

export interface PanIndiaFestival {
  id: string;
  name: string;
  state: string;
  region: 'North' | 'North East' | 'East' | 'Central' | 'West' | 'South';
  month: 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
  approximateSeason: string;
  category: 'CULTURAL & SPIRITUAL' | 'MUSIC & ARTS' | 'FOOD & RECREATION' | 'NATURE & WILDLIFE' | 'NATIONAL OCCASIONS';
  culturalMeaning: string;
  ritualsAndHighlights: string[];
  heroImage: string;
  relatedCircuit?: string;
  source: string;
}

export const allAnnualFestivals: PanIndiaFestival[] = [
  // ── JANUARY ───────────────────────────────────────────────
  {
    id: 'makar-sankranti-pongal',
    name: 'Makar Sankranti / Pongal / Magh Bihu',
    state: 'Pan-India (Tamil Nadu, Assam, Gujarat, UP)',
    region: 'North',
    month: 'January',
    approximateSeason: 'Mid-January (Solar Ingress into Capricorn)',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'Pan-Indian harvest celebration honoring the Sun God Surya, marking longer days and winter harvest.',
    ritualsAndHighlights: ['International Kite Flying (Gujarat)', 'Jallikattu & Sweet Pongal (Tamil Nadu)', 'Meji bonfire feasts (Assam)', 'Ganga Sagar holy dip (Bengal)'],
    heroImage: '/images/indian-festivals.jpg',
    relatedCircuit: 'Spiritual Circuit',
    source: 'Ministry of Culture, Government of India',
  },
  {
    id: 'maha-kumbh-prayagraj',
    name: 'Maha Kumbh & Magh Mela',
    state: 'Uttar Pradesh (Prayagraj)',
    region: 'North',
    month: 'January',
    approximateSeason: 'January – February (Purnima to Maha Shivratri)',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'The largest peaceful gathering of humanity on Earth at the sacred Triveni Sangam confluence of Ganga, Yamuna, and mystical Saraswati.',
    ritualsAndHighlights: ['Shahi Snan (Royal Akhada Processions)', 'Kalpavas Vedic vow monastic living', 'Evening Sangam Maha Aarti', 'Philosophical debates of 13 Akhadas'],
    heroImage: '/images/varanasi.jpg',
    relatedCircuit: 'Ramayana & Spiritual Circuit',
    source: 'UP Tourism PDF / UNESCO Intangible Cultural Heritage',
  },

  // ── FEBRUARY ──────────────────────────────────────────────
  {
    id: 'khajuraho-dance-festival',
    name: 'Khajuraho Dance Festival',
    state: 'Madhya Pradesh (Khajuraho)',
    region: 'Central',
    month: 'February',
    approximateSeason: 'Third week of February (7 days)',
    category: 'MUSIC & ARTS',
    culturalMeaning: 'Celebrating classical Indian dance forms (Kathak, Bharatanatyam, Odissi, Kathakali, Kuchipudi) against the floodlit backdrop of 10th-century UNESCO Western Group temples.',
    ritualsAndHighlights: ['Open-air twilight classical concerts', 'Sculpture & terracotta craft exhibits', 'Interactive seminars with master Gurus'],
    heroImage: '/images/rajasthan.jpg',
    relatedCircuit: 'Heritage & Culture Circuit',
    source: 'Madhya Pradesh Tourism Board',
  },
  {
    id: 'jaisalmer-desert-festival',
    name: 'Jaisalmer Desert Festival',
    state: 'Rajasthan (Sam Sand Dunes)',
    region: 'North',
    month: 'February',
    approximateSeason: 'Magh Purnima (February)',
    category: 'MUSIC & ARTS',
    culturalMeaning: 'Vibrant celebration of Thar desert folklore, Kalbelia dance, turban tying, and Gair dance under the full moon dunes.',
    ritualsAndHighlights: ['Camel polo and camel beauty pageants', 'Langa-Manganiyar Sufi ballads', 'Desert moonlit fireworks over Golden Fort'],
    heroImage: '/images/rajasthan.jpg',
    relatedCircuit: 'Desert Heritage Circuit',
    source: 'Rajasthan Tourism',
  },

  // ── MARCH ─────────────────────────────────────────────────
  {
    id: 'lathmar-holi-braj',
    name: 'Lathmar & Rangotsav Holi',
    state: 'Uttar Pradesh (Barsana, Nandgaon, Mathura, Vrindavan)',
    region: 'North',
    month: 'March',
    approximateSeason: 'Phalguna Shukla Navami to Chaitra Krishna Pratipada',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'Legendary playful re-enactment of Lord Krishna visiting Radha’s village of Barsana, where women playfully wield bamboo sticks (lathis) while men defend with leather shields amid organic gulal colors.',
    ritualsAndHighlights: ['Samaj Gayan devotional singing', 'Phoolon ki Holi (Flower petal Holi) in Vrindavan', 'Widows Holi at Gopinath Temple', 'Huranga water celebrations at Dauji'],
    heroImage: '/images/indian-festivals.jpg',
    relatedCircuit: 'Krishna / Braj Circuit',
    source: 'UP Tourism PDF / Sangeet Natak Akademi',
  },
  {
    id: 'chapchar-kut-mizoram',
    name: 'Chapchar Kut',
    state: 'Mizoram (Aizawl)',
    region: 'North East',
    month: 'March',
    approximateSeason: 'First Friday of March',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'Oldest agricultural festival of the Mizo people celebrating the completion of forest clearing with vibrant Cheraw bamboo dances and community unity.',
    ritualsAndHighlights: ['Synchronized Cheraw bamboo jumping', 'Traditional Puan costume parades', 'Mizo folk choir chants'],
    heroImage: '/images/kerala.jpg',
    relatedCircuit: 'North East Tribal Heritage',
    source: 'Mizoram Tourism Department',
  },

  // ── APRIL ─────────────────────────────────────────────────
  {
    id: 'thrissur-pooram',
    name: 'Thrissur Pooram (Festival of Festivals)',
    state: 'Kerala (Vadakkunnathan Temple, Thrissur)',
    region: 'South',
    month: 'April',
    approximateSeason: 'Medam month (April – May)',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'Over 200 years of temple pageant grandeur uniting 10 temples in friendly competition of percussion symphony (Ilanjithara Melam) and silk parasol exchange (Kudamattam).',
    ritualsAndHighlights: ['250-musician Pandi Melam drum ensemble', 'Caparisoned elephant royal processions', 'Spectacular dawn pyrotechnic fireworks'],
    heroImage: '/images/kerala.jpg',
    relatedCircuit: 'South Temple Circuit',
    source: 'Kerala Tourism Department',
  },

  // ── MAY ───────────────────────────────────────────────────
  {
    id: 'buddha-purnima-sarnath',
    name: 'Buddha Purnima (Vesak)',
    state: 'Uttar Pradesh (Sarnath) & Bihar (Bodh Gaya)',
    region: 'North',
    month: 'May',
    approximateSeason: 'Vaisakha Purnima (Full Moon of May)',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'Commemorating the Birth, Enlightenment under the Bodhi Tree, and Mahaparinirvana of Gautama Buddha.',
    ritualsAndHighlights: ['Chanting at Damekh & Chaukhandi Stupas', 'Lighting thousands of butter lamps', 'Global monastic peaceful procession'],
    heroImage: '/images/varanasi.jpg',
    relatedCircuit: 'Buddhist Circuit',
    source: 'UP Tourism PDF / Mahabodhi Temple Trust',
  },

  // ── JUNE ──────────────────────────────────────────────────
  {
    id: 'hemis-festival-ladakh',
    name: 'Hemis Tsechu Festival',
    state: 'Ladakh (Hemis Gompa)',
    region: 'North',
    month: 'June',
    approximateSeason: '10th day of Tibetan lunar month (June / July)',
    category: 'MUSIC & ARTS',
    culturalMeaning: 'Celebrating Guru Padmasambhava (Guru Rinpoche) who introduced Tantric Buddhism to the Himalayas.',
    ritualsAndHighlights: ['Sacred Cham mask dances by lamas', 'Unfurling of ancient multi-story silk thangka', 'Tibetan long-horn (Dungchen) music'],
    heroImage: '/images/kashmir.jpg',
    relatedCircuit: 'Himalayan Buddhist Circuit',
    source: 'UT Ladakh Tourism Directorate',
  },

  // ── JULY ──────────────────────────────────────────────────
  {
    id: 'puri-rath-yatra',
    name: 'Jagannath Rath Yatra',
    state: 'Odisha (Puri)',
    region: 'East',
    month: 'July',
    approximateSeason: 'Ashadha Shukla Dwitiya (June / July)',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'Annual royal journey of Lord Jagannath, Balabhadra, and Subhadra aboard towering wooden chariots (Nandighosa, Taladhwaja, Darpadalana) to Gundicha Temple.',
    ritualsAndHighlights: ['Chera Panhara (King sweeping chariots with golden broom)', 'Millions pulling chariot ropes (Mukti)', 'Sand art on Puri golden beach'],
    heroImage: '/images/tamil-nadu.jpg',
    relatedCircuit: 'East Heritage & Spiritual Circuit',
    source: 'Odisha Tourism / Shree Jagannath Temple Administration',
  },

  // ── AUGUST ────────────────────────────────────────────────
  {
    id: 'janmashtami-mathura',
    name: 'Krishna Janmashtami & Kajari Teej',
    state: 'Uttar Pradesh (Mathura, Vrindavan, Mirzapur)',
    region: 'North',
    month: 'August',
    approximateSeason: 'Bhadrapada Krishna Ashtami (August)',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'Midnight birth celebration of Lord Krishna in Mathura prison cell shrine, coupled with monsoon Kajari folk ballads in eastern UP.',
    ritualsAndHighlights: ['Midnight Maha Abhishek with milk & saffron', 'Dahi Handi human pyramids', 'Monsoon Kajari folk singing swings'],
    heroImage: '/images/indian-festivals.jpg',
    relatedCircuit: 'Krishna / Braj Circuit',
    source: 'UP Tourism PDF',
  },
  {
    id: 'onam-kerala',
    name: 'Onam (Harvest & Homecoming)',
    state: 'Kerala',
    region: 'South',
    month: 'August',
    approximateSeason: 'Chingam month (August – September)',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'Welcoming the benevolent mythical King Mahabali, celebrating harvest bounty, egalitarian harmony, and floral artistry.',
    ritualsAndHighlights: ['Pookkalam intricate natural flower carpets', 'Onasadya 26-dish feast served on banana leaf', 'Vallam Kali (Snake boat races on Pampa river)', 'Pulikali tiger dance'],
    heroImage: '/images/kerala.jpg',
    relatedCircuit: 'Kerala Backwaters Heritage',
    source: 'Kerala Tourism Department',
  },

  // ── SEPTEMBER ─────────────────────────────────────────────
  {
    id: 'ganesh-chaturthi-maharashtra',
    name: 'Ganesh Chaturthi',
    state: 'Maharashtra (Mumbai, Pune)',
    region: 'West',
    month: 'September',
    approximateSeason: 'Bhadrapada Shukla Chaturthi (10 Days)',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'Celebration of Lord Ganesha, transformed by Lokmanya Tilak into a historic national unifying movement of arts, street theatre, and community seva.',
    ritualsAndHighlights: ['Lalbaugcha Raja & Dagdusheth royal pandals', 'Dhol-Tasha 100-drum youth troupes', 'Anant Chaturdashi grand sea immersion processions'],
    heroImage: '/images/indian-festivals.jpg',
    relatedCircuit: 'West Heritage Circuit',
    source: 'Maharashtra Tourism (MTDC)',
  },

  // ── OCTOBER ───────────────────────────────────────────────
  {
    id: 'durga-puja-bengal',
    name: 'Durga Puja (UNESCO Heritage of Humanity)',
    state: 'West Bengal (Kolkata)',
    region: 'East',
    month: 'October',
    approximateSeason: 'Ashwin month (Mahalaya to Bijoya Dashami)',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'The victory of Goddess Durga over Mahishasura, representing the triumph of divine feminine cosmic energy (Shakti) over evil. World’s largest open-air art installation festival.',
    ritualsAndHighlights: ['Over 3,000 themed artistic pavilions (pandals)', 'Dhunuchi Naach incense clay-pot dance to Dhaak drum beats', 'Sindoor Khela on Dashami'],
    heroImage: '/images/indian-festivals.jpg',
    relatedCircuit: 'East Heritage & Art Circuit',
    source: 'UNESCO Representative List / West Bengal Tourism',
  },
  {
    id: 'kullu-dussehra',
    name: 'International Kullu Dussehra',
    state: 'Himachal Pradesh (Dhalpur Ground, Kullu)',
    region: 'North',
    month: 'October',
    approximateSeason: 'Starts on Vijaya Dashami day (7 Days)',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'Where 300+ local mountain devatas (village deities) travel in sacred palanquins from remote valleys to pay homage to Lord Raghunath.',
    ritualsAndHighlights: ['Sacred Ratha pulling of Lord Raghunath', 'Assembly of 300 hill village deities and shamans', 'Nightly Natti folk dance performances'],
    heroImage: '/images/kashmir.jpg',
    relatedCircuit: 'Himalayan Heritage Circuit',
    source: 'Himachal Tourism (HPTDC)',
  },

  // ── NOVEMBER ──────────────────────────────────────────────
  {
    id: 'dev-deepawali-varanasi',
    name: 'Dev Deepawali & Deepotsav Ayodhya',
    state: 'Uttar Pradesh (Varanasi & Ayodhya)',
    region: 'North',
    month: 'November',
    approximateSeason: 'Kartik Purnima (15 days after Diwali)',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'The night the Gods descend to earth to bathe in the holy Ganges. Over 1.5 million clay lamps (diyas) illuminate all 84 ghats of Varanasi and the banks of River Saryu in Ayodhya (Guinness World Record).',
    ritualsAndHighlights: ['Continuous unbroken crescent of 84 glowing ghats', 'Grand Dashashwamedh Maha Aarti with Vedic trumpets', 'Saryu River floating lamp illumination'],
    heroImage: '/images/varanasi.jpg',
    relatedCircuit: 'Ramayana & Spiritual Circuit',
    source: 'UP Tourism PDF',
  },
  {
    id: 'pushkar-camel-fair',
    name: 'Pushkar International Fair',
    state: 'Rajasthan (Pushkar Lake)',
    region: 'North',
    month: 'November',
    approximateSeason: 'Kartik Shukla Ekadashi to Kartik Purnima',
    category: 'CULTURAL & SPIRITUAL',
    culturalMeaning: 'One of the world’s largest camel and livestock fairs combined with holy pilgrimage to the only Lord Brahma temple in the world.',
    ritualsAndHighlights: ['Trading of over 50,000 decorated camels and horses', 'Rajasthani turban tying and mustache competitions', 'Kartik Purnima holy lake bath at sunrise'],
    heroImage: '/images/rajasthan.jpg',
    relatedCircuit: 'Desert Heritage Circuit',
    source: 'Rajasthan Tourism (RTDC)',
  },

  // ── DECEMBER ──────────────────────────────────────────────
  {
    id: 'hornbill-festival-nagaland',
    name: 'Hornbill Festival (Festival of Festivals)',
    state: 'Nagaland (Naga Heritage Village, Kisama)',
    region: 'North East',
    month: 'December',
    approximateSeason: 'December 1 to 10 every year',
    category: 'MUSIC & ARTS',
    culturalMeaning: 'Celebration uniting all 16 recognized tribes of Nagaland to showcase ancestral songs, warrior dances, woodcraft, and culinary traditions under one cultural roof.',
    ritualsAndHighlights: ['Traditional Morung dormitory village showcases', 'Indigenous archery and Naga wrestling', 'Hornbill International Rock Concert & Fire eating'],
    heroImage: '/images/indian-festivals.jpg',
    relatedCircuit: 'North East Tribal Heritage',
    source: 'Department of Tourism, Nagaland',
  },
  {
    id: 'rann-utsav-kutch',
    name: 'Rann Utsav (White Desert Festival)',
    state: 'Gujarat (Dhordo, Great Rann of Kutch)',
    region: 'West',
    month: 'December',
    approximateSeason: 'November to February (Full Moon Highlights)',
    category: 'MUSIC & ARTS',
    culturalMeaning: 'Spectacular cultural celebration of Kutch embroidery, Rogan art, Kutchi folk musicians on the endless white salt desert under the starlit sky.',
    ritualsAndHighlights: ['Full moon camel cart rides on white salt plains', 'Rogan fabric painting and copper bell master artisan workshops', 'Luxury tent city cultural nights'],
    heroImage: '/images/rajasthan.jpg',
    relatedCircuit: 'West Heritage & Desert Circuit',
    source: 'Gujarat Tourism (TCGL)',
  },
];

export const festivalMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;
