'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const layers = [
  {
    level: 'Famous',
    tagline: 'What most travellers see',
    description: 'The iconic monuments, the popular beaches, the well-known temples. The surface layer of Indian tourism that appears in every guidebook.',
    image: '/images/taj-mahal.jpg',
    color: 'terracotta',
    bgColor: 'rgba(196,114,78,0.06)',
    borderColor: 'rgba(196,114,78,0.2)',
  },
  {
    level: 'Hidden',
    tagline: 'What fewer travellers discover',
    description: 'The artisan workshops behind the monument. The local festival that no tour operator knows. The cuisine that exists only in one village.',
    image: '/images/agra-crafts.jpg',
    color: 'sandstone',
    bgColor: 'rgba(212,165,116,0.06)',
    borderColor: 'rgba(212,165,116,0.2)',
  },
  {
    level: 'Forgotten',
    tagline: 'Stories that deserve attention',
    description: 'Disappearing crafts. Oral traditions with no written record. Communities whose cultural practices are fading. Heritage that needs discovery to survive.',
    image: '/images/varanasi.jpg',
    color: 'gold',
    bgColor: 'rgba(184,151,47,0.06)',
    borderColor: 'rgba(184,151,47,0.2)',
  },
];

export default function CulturalLayers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  return (
    <section ref={sectionRef} className="relative section-cinematic overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-6">
            THREE <span className="text-terracotta">LAYERS</span> OF INDIA
          </h2>
          <p className="font-body text-ivory/40 max-w-xl mx-auto text-sm leading-relaxed">
            Bharat Bharman doesn&apos;t just show you destinations.
            It reveals the depth beneath them.
          </p>
        </motion.div>

        {/* Layers with connecting line */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-ivory/5 md:-translate-x-px">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-terracotta via-sandstone to-gold"
            />
          </div>

          {/* Layer cards */}
          <div className="space-y-12 md:space-y-20">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.level}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true, margin: '-80px' }}
                className={`relative flex flex-col ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8 md:gap-12`}
              >
                {/* Dot on timeline */}
                <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 z-10">
                  <div
                    className={`w-3 h-3 rounded-full border-2`}
                    style={{ borderColor: layer.borderColor, backgroundColor: layer.bgColor }}
                  />
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2 pl-14 md:pl-0">
                  <div className="relative h-[220px] sm:h-[280px] overflow-hidden rounded-sm group">
                    <Image
                      src={layer.image}
                      alt={layer.level}
                      fill
                      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                        layer.level === 'Forgotten' ? 'sepia brightness-75' : ''
                      } ${layer.level === 'Hidden' ? 'brightness-90 saturate-75' : ''}`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 pl-14 md:pl-0">
                  <span
                    className={`text-[10px] tracking-[0.4em] uppercase font-heading block mb-2`}
                    style={{ color: `var(--color-${layer.color})`, opacity: 0.6 }}
                  >
                    Layer {i + 1}
                  </span>
                  <h3
                    className="font-heading text-2xl sm:text-3xl font-light tracking-wider uppercase mb-2"
                    style={{ color: `var(--color-${layer.color})` }}
                  >
                    {layer.level}
                  </h3>
                  <p className="text-xs text-ivory/50 font-heading tracking-wider uppercase mb-4">
                    {layer.tagline}
                  </p>
                  <p className="text-sm text-ivory/40 font-body leading-relaxed max-w-md">
                    {layer.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
