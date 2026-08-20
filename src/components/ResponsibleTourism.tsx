'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function ResponsibleTourism() {
  const { language, t } = useLanguage();
  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  const principles = [
    {
      icon: '🧵',
      title: isHindi ? 'स्थानीय कारीगरों का समर्थन' : isBengali ? 'ঐতিহ্যবাহী কারিগরদের সহায়তা' : 'Support Generational Artisans',
      desc: isHindi
        ? 'बुनकर बस्तियों और पारंपरिक शिल्प केंद्रों से सीधे हस्तकरघा और हस्तशिल्प खरीदें।'
        : isBengali
        ? 'তাঁতি ও কারিগরদের কাছ থেকে সরাসরি হস্তশিল্প ক্রয় করে তাদের পাশে দাঁড়ান।'
        : 'Purchase handloom and handcrafted mementos directly from artisan cooperatives in weaver colonies and heritage craft quarters.',
    },
    {
      icon: '🪔',
      title: isHindi ? 'पावन व सांस्कृतिक स्थलों का आदर' : isBengali ? 'পবিত্র স্থানের মর্যাদা রক্ষা' : 'Respect Sacred & Cultural Spaces',
      desc: isHindi
        ? 'पूजा स्थलों पर शालीन वेशभूषा रखें और पवित्र घाटों पर स्थानीय परंपराओं का सम्मान करें।'
        : isBengali
        ? 'উপাসনালয় ও পবিত্র নদীঘাটের আচার-অনুষ্ঠানের প্রতি শ্রদ্ধাশীল থাকুন।'
        : 'Observe traditional customs, dress mindfully in places of worship, and honor local community rituals along sacred ghats.',
    },
    {
      icon: '🏛️',
      title: isHindi ? 'ऐतिहासिक धरोहरों का संरक्षण' : isBengali ? 'ঐতিহাসিক সৌধ সংরক্ষণ' : 'Preserve Architectural Monuments',
      desc: isHindi
        ? 'प्राचीन प्रस्तर और भित्तिचित्रों को नुकसान न पहुंचाएं ताकि भावी पीढ़ियां भी इसे संजो सकें।'
        : isBengali
        ? 'প্রাচীন স্থাপত্যের কোনো ক্ষতি না করে ভবিষ্যৎ প্রজন্মের জন্য সংরক্ষণ করুন।'
        : 'Treat ancient stone, fresco walls, and archaeological ruins with reverence so future generations can inherit living heritage.',
    },
    {
      icon: '🐅',
      title: isHindi ? 'प्राकृतिक पर्यावरण की रक्षा' : isBengali ? 'বন্যপ্রাণী ও পরিবেশ রক্ষা' : 'Protect Living Ecosystems',
      desc: isHindi
        ? 'तराई टाइगर कॉरिडोर और वन्य क्षेत्रों में प्लास्टिक-मुक्त और पर्यावरण-अनुकूल आचरण करें।'
        : isBengali
        ? 'সংরক্ষিত বনাঞ্চল ও অভয়ারণ্যে প্লাস্টিকমুক্ত এবং পরিচ্ছন্ন পরিবেশ বজায় রাখুন।'
        : 'Support conservation in Terai tiger corridors and river sanctuaries while following zero-plastic, leave-no-trace ethics.',
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-[#031527] border-y border-ivory/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-green font-heading block mb-2 font-semibold">
            {isHindi ? 'सद्भावनापूर्ण एवं जिम्मेदार पर्यटन' : isBengali ? 'টেকসই ও দায়িত্বশীল পর্যটন' : 'Sustainable & Ethical Exploration'}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wide mb-4">
            {isHindi ? (
              <>
                गहराई में अनुभव करें। <span className="text-green font-medium">प्रकृति का सम्मान करें।</span>
              </>
            ) : isBengali ? (
              <>
                গভীরভাবে ভ্রমণ করুন। <span className="text-green font-medium">ঐতিহ্য রক্ষা করুন।</span>
              </>
            ) : (
              <>
                TRAVEL DEEPER. <span className="text-green font-medium">LEAVE A LIGHTER FOOTPRINT.</span>
              </>
            )}
          </h2>
          <p className="font-body text-xs sm:text-sm text-ivory/60 max-w-xl mx-auto leading-relaxed">
            {isHindi
              ? 'सच्ची सांस्कृतिक खोज का अर्थ है उन लोगों, परंपराओं और पर्यावरण का सम्मान करना जो भारत को कालजयी बनाते हैं।'
              : isBengali
              ? 'প্রকৃত সাংস্কৃতিক আবিষ্কার মানে সেই মানুষ, ঐতিহ্য এবং পরিবেশের প্রতি শ্রদ্ধা জানানো যা ভারতকে অনন্য করে তুলেছে।'
              : 'True cultural discovery means honoring the people, traditions, and environments that make Bharat timeless.'}
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-navy p-6 rounded-sm border border-ivory/5 hover:border-green/40 transition-colors space-y-3"
            >
              <div className="text-2xl">{item.icon}</div>
              <h3 className="font-heading text-sm text-white font-medium">
                {item.title}
              </h3>
              <p className="text-xs text-ivory/60 font-body leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
