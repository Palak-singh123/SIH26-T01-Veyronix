'use client';

import { motion } from 'framer-motion';

const upcomingFeatures = [
  {
    icon: '🤖',
    title: 'AI Journey Planner',
    description: 'An intelligent planner that crafts culturally-rich itineraries based on your interests, not just popularity.',
  },
  {
    icon: '🗺️',
    title: 'Cultural Passport',
    description: 'Collect cultural experiences across India. Track your journey through heritage, crafts, food and stories.',
  },
  {
    icon: '🧭',
    title: 'Local Guide Network',
    description: 'Connect with cultural practitioners, artisans and local storytellers who bring destinations to life.',
  },
  {
    icon: '📍',
    title: 'GIS Discovery Engine',
    description: 'Advanced geographical intelligence that reveals hidden cultural experiences near any destination.',
  },
];

export default function ComingSoon() {
  return (
    <section id="coming-soon" className="relative section-cinematic overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-dark to-charcoal" />
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,240,232,0.2) 1px, transparent 0)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-ivory/20 font-heading block mb-4">
            Coming in Step 2 & 3
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light tracking-wide mb-6 text-ivory/60">
            THE JOURNEY IS JUST <span className="text-terracotta/70">BEGINNING</span>
          </h2>
          <p className="font-body text-ivory/30 max-w-lg mx-auto text-sm leading-relaxed">
            Bharat Bharman is evolving. These features will transform how you experience India.
          </p>
          <div className="accent-line mx-auto mt-8 opacity-50" />
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {upcomingFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-light rounded-sm p-6 sm:p-8 group hover:border-terracotta/20 transition-colors duration-500"
            >
              <span className="text-2xl mb-4 block">{feature.icon}</span>
              <h3 className="font-heading text-sm tracking-[0.15em] uppercase text-ivory/60 mb-3 group-hover:text-ivory/80 transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-ivory/30 font-body leading-relaxed group-hover:text-ivory/40 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
