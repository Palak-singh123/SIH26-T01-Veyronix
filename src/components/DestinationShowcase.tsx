'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const destinations = [
  {
    name: 'Varanasi',
    region: 'Uttar Pradesh',
    category: 'Spirituality',
    story: 'The oldest living city. Where dawn is a daily rebirth on ancient ghats.',
    image: '/images/varanasi.jpg',
    size: 'large',
  },
  {
    name: 'Kashmir',
    region: 'Jammu & Kashmir',
    category: 'Landscapes',
    story: 'Paradise carved by glaciers, coloured by chinar, woven by artisan hands.',
    image: '/images/kashmir.jpg',
    size: 'medium',
  },
  {
    name: 'Goa',
    region: 'West India',
    category: 'Heritage',
    story: 'Where Portuguese churches meet Indian spice markets on sun-washed streets.',
    image: '/images/goa.jpg',
    size: 'medium',
  },
  {
    name: 'Tamil Nadu',
    region: 'South India',
    category: 'Architecture',
    story: 'Temples that are living encyclopedias of Dravidian art and devotion.',
    image: '/images/tamil-nadu.jpg',
    size: 'large',
  },
];

export default function DestinationShowcase() {
  return (
    <section className="relative section-cinematic overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-terracotta/60 font-heading block mb-4">
            Cinematic Journeys
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-6">
            DISCOVER MORE OF <span className="text-terracotta">INDIA</span>
          </h2>
          <div className="accent-line mx-auto" />
        </motion.div>

        {/* Asymmetric Panel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className={`relative group cursor-pointer overflow-hidden rounded-sm ${
                dest.size === 'large'
                  ? 'md:col-span-7 h-[350px] sm:h-[420px] md:h-[480px]'
                  : 'md:col-span-5 h-[300px] sm:h-[380px] md:h-[480px]'
              }`}
            >
              {/* Image */}
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]"
                sizes={dest.size === 'large' ? '(max-width: 768px) 100vw, 58vw' : '(max-width: 768px) 100vw, 42vw'}
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Category - appears on hover */}
              <motion.div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="category-pill text-[9px] bg-charcoal/50 backdrop-blur-sm">
                  {dest.category}
                </span>
              </motion.div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="text-[9px] tracking-[0.3em] uppercase text-terracotta/70 font-heading block mb-2 transition-transform duration-500 group-hover:translate-y-0 translate-y-1">
                  {dest.region}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-light tracking-wider uppercase text-ivory mb-3 transition-transform duration-500 group-hover:-translate-y-1">
                  {dest.name}
                </h3>
                <p className="text-sm text-ivory/50 font-body max-w-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {dest.story}
                </p>

                {/* Accent line */}
                <div className="mt-4 w-0 group-hover:w-16 h-[1px] bg-gradient-to-r from-terracotta to-transparent transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
