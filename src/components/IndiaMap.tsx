'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { states, stateMapData } from '@/data/states';
import Image from 'next/image';

interface IndiaMapProps {
  selectedState: string | null;
  onSelectState: (id: string) => void;
}

export default function IndiaMap({ selectedState, onSelectState }: IndiaMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const hoveredData = states.find((s) => s.id === hoveredState);
  const hoverPos = hoveredState ? stateMapData[hoveredState] : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16"
    >
      {/* SVG Map */}
      <div className="relative w-full max-w-[500px] aspect-[3/4]">
        {/* Ambient glow behind map */}
        <div className="absolute inset-0 bg-gradient-radial from-terracotta/5 via-transparent to-transparent rounded-full blur-3xl scale-150" />

        <svg
          viewBox="0 0 500 620"
          className="w-full h-full relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* India outline — simplified artistic representation */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(196,114,78,0.15)" />
              <stop offset="100%" stopColor="rgba(45,53,97,0.15)" />
            </linearGradient>
            <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-terracotta)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--color-terracotta)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* India silhouette path */}
          <path
            d="M215 50 L240 45 L260 55 L270 48 L285 52 L290 60 L280 70 L275 85 L290 90 
               L310 85 L330 90 L350 100 L370 105 L385 120 L390 140 L395 160 L400 175 
               L405 195 L400 210 L395 230 L385 250 L380 270 L375 285 L370 300 
               L360 320 L350 340 L340 355 L330 370 L315 385 L305 400 L295 415 
               L285 430 L280 445 L275 460 L270 475 L265 490 L260 500 L255 510 
               L250 520 L240 535 L235 540 L230 535 L225 520 L220 510 L215 500 
               L210 485 L200 470 L195 455 L190 440 L185 425 L175 415 L165 405 
               L155 395 L145 385 L135 370 L130 355 L125 340 L120 325 L115 310 
               L110 295 L108 280 L110 265 L115 250 L120 235 L125 220 L130 205 
               L135 190 L140 175 L148 160 L155 150 L162 140 L170 130 L175 120 
               L180 105 L185 90 L190 75 L195 65 L205 55 Z"
            fill="url(#mapGradient)"
            stroke="rgba(196,114,78,0.3)"
            strokeWidth="1"
            className="transition-all duration-500"
          />

          {/* Animated border particles */}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={`particle-${i}`} r="1.5" fill="var(--color-terracotta)" opacity="0.4">
              <animateMotion
                dur={`${8 + i * 2}s`}
                repeatCount="indefinite"
                begin={`${i * 1.5}s`}
                path="M215 50 L240 45 L260 55 L290 60 L280 70 L290 90 L330 90 L370 105 L390 140 L400 175 L395 230 L380 270 L350 340 L315 385 L280 445 L260 500 L240 535 L225 520 L200 470 L175 415 L135 370 L115 310 L110 265 L125 220 L140 175 L162 140 L180 105 L195 65 Z"
              />
            </circle>
          ))}

          {/* State interactive dots */}
          {Object.entries(stateMapData).map(([id, pos]) => {
            const stateInfo = states.find((s) => s.id === id);
            const isHovered = hoveredState === id;
            const isSelected = selectedState === id;

            return (
              <g key={id}>
                {/* Outer glow ring */}
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r={pos.r}
                  fill="none"
                  stroke={isHovered || isSelected ? 'rgba(196,114,78,0.4)' : 'rgba(196,114,78,0.1)'}
                  strokeWidth="1"
                  className="transition-all duration-400"
                />

                {/* Pulsing background */}
                {(isHovered || isSelected) && (
                  <circle
                    cx={pos.cx}
                    cy={pos.cy}
                    r={pos.r * 0.8}
                    fill="rgba(196,114,78,0.1)"
                    className="animate-pulse-glow"
                  />
                )}

                {/* Interactive area */}
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r={pos.r}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredState(id)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => onSelectState(id)}
                />

                {/* Center dot */}
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r={isHovered || isSelected ? 5 : 3}
                  fill={isSelected ? 'var(--color-saffron)' : 'var(--color-terracotta)'}
                  filter={isHovered || isSelected ? 'url(#glow)' : undefined}
                  className="transition-all duration-300 pointer-events-none"
                />

                {/* State label */}
                {(isHovered || isSelected) && (
                  <text
                    x={pos.cx}
                    y={pos.cy - pos.r - 10}
                    textAnchor="middle"
                    fill="var(--color-ivory)"
                    fontSize="11"
                    fontFamily="var(--font-heading)"
                    letterSpacing="0.1em"
                    className="uppercase pointer-events-none"
                  >
                    {stateInfo?.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating label for map */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <span className="text-[9px] tracking-[0.3em] uppercase text-ivory/25 font-heading">
            Click a region to explore
          </span>
        </div>
      </div>

      {/* Hover tooltip card */}
      <AnimatePresence>
        {hoveredData && !selectedState && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[340px] glass rounded-sm overflow-hidden"
          >
            <div className="relative h-[180px]">
              <Image
                src={hoveredData.image}
                alt={hoveredData.name}
                fill
                className="object-cover"
                sizes="340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="font-heading text-lg tracking-wider uppercase text-ivory mb-1">
                {hoveredData.name}
              </h3>
              <p className="text-xs text-terracotta font-heading tracking-widest mb-3">
                {hoveredData.tagline}
              </p>
              <div className="flex flex-wrap gap-2">
                {hoveredData.categories.map((cat) => (
                  <span key={cat} className="category-pill text-[10px]">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* State List (Mobile fallback) */}
      <div className="lg:hidden w-full grid grid-cols-2 gap-3 mt-8">
        {states.map((state) => (
          <motion.button
            key={state.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectState(state.id)}
            className={`relative h-[120px] overflow-hidden rounded-sm group ${
              selectedState === state.id ? 'ring-1 ring-terracotta' : ''
            }`}
          >
            <Image
              src={state.image}
              alt={state.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-charcoal/20" />
            <div className="absolute bottom-3 left-3 text-left">
              <h4 className="font-heading text-xs tracking-wider uppercase text-ivory">
                {state.name}
              </h4>
              <p className="text-[9px] text-ivory/50 mt-0.5">{state.tagline}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
