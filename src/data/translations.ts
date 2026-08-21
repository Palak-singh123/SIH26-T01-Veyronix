export type Language = 'en' | 'hi' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  isAvailable: boolean;
}

export const supportedLanguages: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', isAvailable: true },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', isAvailable: true },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা', isAvailable: true },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', isAvailable: false },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', isAvailable: false },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', isAvailable: false },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી', isAvailable: false },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', isAvailable: false },
];

export interface Translations {
  tagline: string;
  brandName: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroSub: string;
  exploreButton: string;
  planMyJourney: string;
  navDestinations: string;
  navExperiences: string;
  navPlan: string;
  navFestivals: string;
  navCulturalShadows: string;
  exploreCircuits: string;
  discoverShadows: string;
  planWithAI: string;
  myPassport: string;
  savedJourneys: string;
  searchPlaceholder: string;
  tourismCircuits: string;
  culturalShadows: string;
  beyondPostcard: string;
  wildBharat: string;
  indiaInSeason: string;
  mementosTitle: string;
  documentaries: string;
  whatEveryoneSees: string;
  lookCloser: string;
  travelDeeper: string;
  revealShadow: string;
  closeShadow: string;
  whyThisRoute: string;
  responsibleTourism: string;
  collectMemento: string;
  collected: string;
  comingSoon: string;
  mapTitle: string;
  mapSub: string;
  selectState: string;
  feedbackBtn: string;
  contactUs: string;
  guidesTitle: string;
  helplinesTitle: string;
}

export const dictionary: Record<'en' | 'hi' | 'bn', Translations> = {
  en: {
    tagline: 'EXPLORE INDIA, EXPERIENCE BHARAT',
    brandName: 'BHARAT BHARMAN',
    heroHeadline1: 'EXPLORE INDIA',
    heroHeadline2: 'EXPERIENCE BHARAT',
    heroSub: 'Discover the stories, living traditions and sacred landscapes that live beyond the landmark',
    exploreButton: 'EXPLORE BHARAT',
    planMyJourney: 'PLAN MY JOURNEY',
    navDestinations: 'Destinations',
    navExperiences: 'Experiences',
    navPlan: 'Plan Your Journey',
    navFestivals: 'Festivals',
    navCulturalShadows: 'Cultural Shadows',
    exploreCircuits: 'Explore Thematic Circuits',
    discoverShadows: 'Discover Cultural Shadows',
    planWithAI: 'Plan with Bharat AI',
    myPassport: 'Cultural Passport',
    savedJourneys: 'Saved Bookmarks',
    searchPlaceholder: 'Search 28 States, 8 UTs, National Parks, Crafts, Festivals...',
    tourismCircuits: 'JOURNEYS THROUGH BHARAT',
    culturalShadows: 'CULTURAL SHADOWS',
    beyondPostcard: 'BEYOND THE POSTCARD',
    wildBharat: 'WILD BHARAT & SANCTUARIES',
    indiaInSeason: 'INDIA, IN SEASON',
    mementosTitle: 'BHARAT MEMENTOS & ARTISANS',
    documentaries: 'INDIA THROUGH THE LENS',
    whatEveryoneSees: 'What Everyone Sees',
    lookCloser: 'Look Closer',
    travelDeeper: 'Travel Deeper, Leave a Lighter Footprint',
    revealShadow: 'REVEAL THE CULTURAL SHADOW',
    closeShadow: 'Return to Monument',
    whyThisRoute: 'Why This Journey?',
    responsibleTourism: 'Responsible Cultural Tourism',
    collectMemento: 'Collect Memento',
    collected: 'In Passport',
    comingSoon: 'Coming Soon',
    mapTitle: 'ONE COUNTRY, THOUSANDS OF STORIES',
    mapSub: 'Interact with the geographic boundaries of Bharat — Select any state to discover its hidden culture',
    selectState: 'Select State / UT:',
    feedbackBtn: 'Share Your Experience',
    contactUs: 'Contact Bharat Bharman',
    guidesTitle: 'Guides of Bharat',
    helplinesTitle: '24x7 Tourist Helplines & Climate Guide',
  },
  hi: {
    tagline: 'भारत भ्रमण — खोजें अनकहा भारत',
    brandName: 'भारत भ्रमण',
    heroHeadline1: 'भारत को जानें',
    heroHeadline2: 'संस्कृति को जिएं',
    heroSub: 'प्रसिद्ध स्मारकों से आगे बढ़कर भारत की जीवित परंपराओं, लुप्त कथाओं, हस्तशिल्प और पावन धरोहरों का साक्षात्कार करें',
    exploreButton: 'भारत दर्शन करें',
    planMyJourney: 'मेरी यात्रा की योजना बनाएं',
    navDestinations: 'गंतव्य स्थल',
    navExperiences: 'अनुभव',
    navPlan: 'यात्रा योजना',
    navFestivals: 'उत्सव व त्यौहार',
    navCulturalShadows: 'सांस्कृतिक परछाइयाँ',
    exploreCircuits: 'थीमैटिक परिपथ खोजें',
    discoverShadows: 'सांस्कृतिक परछाइयाँ देखें',
    planWithAI: 'भारत AI से योजना बनाएं',
    myPassport: 'सांस्कृतिक पासपोर्ट',
    savedJourneys: 'सहेजे गए स्थल',
    searchPlaceholder: '28 राज्य, 8 केंद्र शासित प्रदेश, राष्ट्रीय उद्यान, शिल्प खोजें...',
    tourismCircuits: 'भारत के पावन यात्रा परिपथ',
    culturalShadows: 'सांस्कृतिक परछाइयाँ (शैडोज़)',
    beyondPostcard: 'अनदेखे प्राकृतिक और ऐतिहासिक धरोहर स्थल',
    wildBharat: 'वन्य भारत एवं संरक्षित अभयारण्य',
    indiaInSeason: 'ऋतु अनुसार भारतीय उत्सव कैलेंडर',
    mementosTitle: 'भारत संस्मरण एवं कारीगर',
    documentaries: 'दस्तावेजी फिल्में एवं जीवंत गाथाएं',
    whatEveryoneSees: 'जो सब देखते हैं (प्रसिद्ध स्मारक)',
    lookCloser: 'निकट से जानें (जीवित परंपराएं)',
    travelDeeper: 'गहराई में अनुभव करें, प्रकृति का सम्मान करें',
    revealShadow: 'सांस्कृतिक रहस्य उद्घाटित करें',
    closeShadow: 'स्मारक दृश्य पर लौटें',
    whyThisRoute: 'यह यात्रा परिपथ क्यों?',
    responsibleTourism: 'जिम्मेदार सांस्कृतिक पर्यटन',
    collectMemento: 'संस्मरण संग्रहित करें',
    collected: 'पासपोर्ट में शामिल',
    comingSoon: 'शीघ्र उपलब्ध',
    mapTitle: 'एक देश, सहस्रों गाथाएं',
    mapSub: 'भारत के भौगोलिक मानचित्र पर किसी भी राज्य का चयन करें और उसकी अनकही सांस्कृतिक धरोहरें देखें',
    selectState: 'राज्य / केंद्र शासित प्रदेश चुनें:',
    feedbackBtn: 'अपना अनुभव साझा करें',
    contactUs: 'भारत भ्रमण संपर्क केंद्र',
    guidesTitle: 'भारत के प्रमाणित मार्गदर्शक',
    helplinesTitle: '24x7 पर्यटक हेल्पलाइन एवं मौसम निर्देशिका',
  },
  bn: {
    tagline: 'ভারত ভ্রমণ — আবিষ্কার করুন আসল ভারত',
    brandName: 'ভারত ভ্রমণ',
    heroHeadline1: 'ভারত দর্শন',
    heroHeadline2: 'ঐতিহ্যের অভিজ্ঞতা',
    heroSub: 'বিখ্যাত সৌধের বাইরে গিয়ে ভারতের জীবন্ত সংস্কৃতি, হস্তশিল্প এবং লুকোনো লোকগাথা আবিষ্কার করুন',
    exploreButton: 'ভারত অন্বেষণ করুন',
    planMyJourney: 'ভ্রমণ পরিকল্পনা তৈরি করুন',
    navDestinations: 'গন্তব্যস্থল',
    navExperiences: 'অভিজ্ঞতা',
    navPlan: 'ভ্রমণ পরিকল্পনা',
    navFestivals: 'উৎসব ও মেলা',
    navCulturalShadows: 'সাংস্কৃতিক ছায়া',
    exploreCircuits: 'ট্যুরিজম সার্কিট অন্বেষণ',
    discoverShadows: 'সাংস্কৃতিক রহস্য উন্মোচন',
    planWithAI: 'ভারত AI দিয়ে পরিকল্পনা',
    myPassport: 'সাংস্কৃতিক পাসপোর্ট',
    savedJourneys: 'সংরক্ষিত স্থানসমূহ',
    searchPlaceholder: '২৮টি রাজ্য, ৮টি কেন্দ্রশাসিত অঞ্চল, পার্ক, হস্তশিল্প খুঁজুন...',
    tourismCircuits: 'ভারতের ঐতিহ্যবাহী ভ্রমণ সার্কিট',
    culturalShadows: 'সাংস্কৃতিক ছায়া ও লোকশিল্প',
    beyondPostcard: 'অজানা প্রাকৃতিক ও ঐতিহাসিক স্থান',
    wildBharat: 'বন্য ভারত ও সংরক্ষিত অভয়ারণ্য',
    indiaInSeason: 'ঋতুভিত্তিক উৎসবের দিনপঞ্জি',
    mementosTitle: 'ভারতের স্মারক ও কারিগর',
    documentaries: 'চলচ্চিত্র ও জীবন্ত ঐতিহ্য কাহিনি',
    whatEveryoneSees: 'যা সবাই দেখে (বিখ্যাত স্মৃতিস্তম্ভ)',
    lookCloser: 'কাছ থেকে জানুন',
    travelDeeper: 'গভীরভাবে ভ্রমণ করুন, ঐতিহ্য রক্ষা করুন',
    revealShadow: 'সাংস্কৃতিক রহস্য উন্মোচন করুন',
    closeShadow: 'স্মৃতিস্তম্ভে ফিরে যান',
    whyThisRoute: 'এই পথ কেন বেছে নেবেন?',
    responsibleTourism: 'দায়িত্বশীল সাংস্কৃতিক পর্যটন',
    collectMemento: 'স্মারক সংগ্রহ করুন',
    collected: 'পাসপোর্টে যুক্ত',
    comingSoon: 'শীঘ্রই আসছে',
    mapTitle: 'এক দেশ, হাজারো কাহিনি',
    mapSub: 'ভারতের মানচিত্রে যেকোনো রাজ্য নির্বাচন করুন এবং তার সাংস্কৃতিক ঐতিহ্য আবিষ্কার করুন',
    selectState: 'রাজ্য নির্বাচন করুন:',
    feedbackBtn: 'আপনার অভিজ্ঞতা জানান',
    contactUs: 'যোগাযোগ করুন',
    guidesTitle: 'ভারতের ঐতিহ্য গাইড',
    helplinesTitle: '২৪x৭ পর্যটক হেল্পলাইন ও আবহাওয়া নির্দেশিকা',
  },
};
