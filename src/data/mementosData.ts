export interface BharatMemento {
  id: string;
  name: string;
  destination: string;
  state: string;
  type: 'Handmade Craft' | 'Heritage Artwork' | 'Traditional Textile' | 'Cultural Keepsake' | 'Digital Stamp';
  description: string;
  culturalSignificance: string;
  artisanCommunity: string;
  image: string;
  priceEstimate?: string;
  isPhysical: boolean;
  responsiblePurchasingNote: string;
  badgeUnlocked: string;
}

export const bharatMementos: BharatMemento[] = [
  {
    id: 'rumi-darwaza-miniature',
    name: 'Rumi Darwaza Heritage Miniature',
    destination: 'Lucknow',
    state: 'Uttar Pradesh',
    type: 'Heritage Artwork',
    description: 'A handcrafted brass and terracotta architectural replica of the 18th-century Awadhi gateway built under Nawab Asaf-ud-Daula.',
    culturalSignificance: 'Commemorates the unsupported vault engineering and syncretic Islamic-Rajput architectural synthesis of Lucknow.',
    artisanCommunity: 'Awadh Metalcraft & Terracotta Guilds of Old Chowk',
    image: '/images/lucknow.jpg',
    priceEstimate: '₹650 – ₹1,200',
    isPhysical: true,
    responsiblePurchasingNote: 'Purchase directly from cooperative artisan stalls near Chowk to ensure fair compensation.',
    badgeUnlocked: 'HERITAGE EXPLORER'
  },
  {
    id: 'banarasi-zari-keepsake',
    name: 'Banarasi Brocade & Zari Framed Keepsake',
    destination: 'Varanasi',
    state: 'Uttar Pradesh',
    type: 'Traditional Textile',
    description: 'A framed masterwork sample of pure silver/gold zari woven on traditional jacquard pit looms with ancient floral butidar motifs.',
    culturalSignificance: 'Celebrates over 500 years of handloom weaving heritage mentioned in ancient Buddhist and Mughal texts.',
    artisanCommunity: 'Master Weavers of Madanpura and Lallapura Weaver Colonies',
    image: '/images/varanasi.jpg',
    priceEstimate: '₹800 – ₹2,500',
    isPhysical: true,
    responsiblePurchasingNote: 'Look for the Silk Mark and Handloom Mark to support authentic traditional artisan families.',
    badgeUnlocked: 'CRAFT DISCOVERER'
  },
  {
    id: 'pietra-dura-inlay-plaque',
    name: 'Parchin Kari (Pietra Dura) Inlay Coaster',
    destination: 'Agra',
    state: 'Uttar Pradesh',
    type: 'Handmade Craft',
    description: 'White Makrana marble plaque precisely inlaid with lapis lazuli, malachite, and carnelian semi-precious stone petals.',
    culturalSignificance: 'The identical Mughal decorative stone craft perfected on the walls of the Taj Mahal and Itimad-ud-Daulah.',
    artisanCommunity: 'Descendant Marble Inlay Artisans of Taj Ganj',
    image: '/images/agra-crafts.jpg',
    priceEstimate: '₹500 – ₹1,800',
    isPhysical: true,
    responsiblePurchasingNote: 'Support artisan home workshops directly rather than commercial commission shops.',
    badgeUnlocked: 'HERITAGE EXPLORER'
  },
  {
    id: 'saryu-brass-diya',
    name: 'Sacred Saryu Engraved Brass Deepam',
    destination: 'Ayodhya',
    state: 'Uttar Pradesh',
    type: 'Cultural Keepsake',
    description: 'Traditional solid brass oil lamp hand-etched with sacred river lotus and Deepotsav motifs.',
    culturalSignificance: 'Used in the millennia-old evening Saryu Aarti and Diwali illumination traditions of Ayodhya.',
    artisanCommunity: 'Brass Casters and Etchers of Ayodhya Heritage Quarter',
    image: '/images/ayodhya.jpg',
    priceEstimate: '₹350 – ₹900',
    isPhysical: true,
    responsiblePurchasingNote: 'Crafted with recycled sacred temple brass following zero-waste Vedic casting traditions.',
    badgeUnlocked: 'CULTURAL STORYTELLER'
  },
  {
    id: 'braj-sheesham-flute',
    name: 'Braj Hand-Carved Sheesham Wood Flute',
    destination: 'Mathura & Vrindavan',
    state: 'Uttar Pradesh',
    type: 'Handmade Craft',
    description: 'Acoustically tuned Indian classical bansuri hand-carved from seasoned wood with traditional peacock feather etching.',
    culturalSignificance: 'The sacred musical symbol of Lord Krishna’s divine Raslila and Braj folk culture along the Yamuna.',
    artisanCommunity: 'Folk Instrument Craftsmen of Mathura & Gokul',
    image: '/images/festival.jpg',
    priceEstimate: '₹300 – ₹750',
    isPhysical: true,
    responsiblePurchasingNote: 'Sourced from sustainably harvested timber by generational musical instrument families.',
    badgeUnlocked: 'FESTIVAL VOYAGER'
  },
  {
    id: 'chikankari-embroidered-keepsake',
    name: 'Chikankari Shadow-Work Linen Art',
    destination: 'Lucknow',
    state: 'Uttar Pradesh',
    type: 'Traditional Textile',
    description: 'Delicate hand-embroidered pure linen panel featuring 32 distinct historical Nawabi needlework stitches.',
    culturalSignificance: 'UNESCO-recognized intangible needlecraft patronized by Empress Nur Jahan and Awadh royalty.',
    artisanCommunity: 'Women’s Self-Help Artisan Cooperatives of Kakori and Malihabad',
    image: '/images/food.jpg',
    priceEstimate: '₹450 – ₹1,500',
    isPhysical: true,
    responsiblePurchasingNote: 'Buying directly from women’s craft collectives empowers rural artisan families across Awadh.',
    badgeUnlocked: 'CRAFT DISCOVERER'
  }
];
