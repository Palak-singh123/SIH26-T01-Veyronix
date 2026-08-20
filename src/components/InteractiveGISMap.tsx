'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geoNodes, GeoNode, defaultItineraries, ItineraryPlan } from '@/data/gisCoordinates';
import { usePassport } from '@/context/PassportContext';

interface InteractiveGISMapProps {
  activePlan?: ItineraryPlan;
  onOpenAIPlanner?: () => void;
}

export default function InteractiveGISMap({
  activePlan,
  onOpenAIPlanner,
}: InteractiveGISMapProps) {
  const { exploreDestination, revealShadow } = usePassport();
  const [selectedPlan, setSelectedPlan] = useState<ItineraryPlan>(
    activePlan || defaultItineraries['lucknow-3day']
  );
  const [selectedNode, setSelectedNode] = useState<GeoNode | null>(geoNodes['lucknow']);
  const [activeDay, setActiveDay] = useState<number>(1);

  const currentWaypoint = selectedPlan.waypoints.find((w) => w.day === activeDay) || selectedPlan.waypoints[0];
  const currentNode = geoNodes[currentWaypoint.nodeId] || geoNodes['lucknow'];

  const categoryColors = {
    UNESCO: '#F28C18',
    Heritage: '#C9A45C',
    Spiritual: '#0B2A4A',
    Wildlife: '#248B45',
    Hidden: '#C4724E',
  };

  return (
    <section id="gis-map" className="relative section-cinematic bg-navy-dark overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-saffron font-heading block mb-3 font-semibold">
            AI + GIS Spatial Intelligence
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-6">
            INTERACTIVE <span className="text-saffron font-medium">GIS ROUTE MAP</span>
          </h2>
          <p className="font-body text-ivory/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            AI understands your cultural preferences; GIS maps the optimal route trajectory, 
            connecting monuments directly to living artisan shadows.
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>

        {/* Plan Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-navy-card p-4 rounded-sm border border-ivory/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-heading uppercase text-saffron font-medium">
              Active Cultural Route:
            </span>
            <span className="text-xs sm:text-sm text-white font-heading">
              {selectedPlan.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedPlan(defaultItineraries['lucknow-3day'])}
              className={`px-3 py-1.5 rounded-sm text-xs font-heading uppercase transition-all ${
                selectedPlan.id === 'lucknow-3day'
                  ? 'bg-saffron text-white font-medium shadow'
                  : 'bg-navy-dark text-ivory/60 hover:text-white'
              }`}
            >
              3-Day Awadh
            </button>
            <button
              onClick={() => setSelectedPlan(defaultItineraries['up-5day-heritage'])}
              className={`px-3 py-1.5 rounded-sm text-xs font-heading uppercase transition-all ${
                selectedPlan.id === 'up-5day-heritage'
                  ? 'bg-saffron text-white font-medium shadow'
                  : 'bg-navy-dark text-ivory/60 hover:text-white'
              }`}
            >
              5-Day UP Odyssey
            </button>
            {onOpenAIPlanner && (
              <button
                onClick={onOpenAIPlanner}
                className="btn-primary text-[10px] !py-1.5 !px-3"
              >
                + Custom AI Route
              </button>
            )}
          </div>
        </div>

        {/* 2-Column GIS Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive GIS Vector Map */}
          <div className="lg:col-span-7 glass-navy rounded-sm p-6 border border-ivory/10 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 text-[10px] uppercase font-heading text-ivory/40">
              <span>Uttar Pradesh GIS Cultural Spatial Grid</span>
              <span className="text-green font-medium">● Spatial Engine Live</span>
            </div>

            {/* SVG GIS Map Canvas */}
            <div className="relative w-full aspect-[4/3] bg-navy-dark/90 rounded border border-ivory/5 overflow-hidden flex items-center justify-center">
              <svg viewBox="200 120 200 180" className="w-full h-full">
                <defs>
                  <filter id="gisGlow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="routeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F28C18" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#248B45" />
                  </linearGradient>
                </defs>

                {/* Regional Terrain Boundary Path */}
                <path
                  d="M230 150 L270 140 L320 150 L380 180 L385 240 L350 280 L300 275 L250 260 L230 220 Z"
                  fill="rgba(11, 42, 74, 0.4)"
                  stroke="rgba(242, 140, 24, 0.2)"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                />

                {/* Animated Route Line connecting Waypoints */}
                {selectedPlan.waypoints.length > 1 && (
                  <path
                    d={selectedPlan.waypoints
                      .map((wp, i) => {
                        const node = geoNodes[wp.nodeId] || geoNodes['lucknow'];
                        return `${i === 0 ? 'M' : 'L'} ${node.svgX} ${node.svgY}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke="url(#routeLineGrad)"
                    strokeWidth="2"
                    strokeDasharray="4,3"
                    className="animate-pulse"
                  />
                )}

                {/* All Hub Nodes */}
                {Object.values(geoNodes).map((node) => {
                  const isNodeInPlan = selectedPlan.waypoints.some((w) => w.nodeId === node.id);
                  const isFocused = currentNode.id === node.id;
                  const color = categoryColors[node.category] || '#F28C18';

                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedNode(node);
                        exploreDestination(node.name);
                      }}
                    >
                      {/* Pulse circle if focused */}
                      {isFocused && (
                        <circle
                          cx={node.svgX}
                          cy={node.svgY}
                          r="12"
                          fill="rgba(242, 140, 24, 0.25)"
                          className="animate-ping"
                        />
                      )}

                      {/* Outer Ring */}
                      <circle
                        cx={node.svgX}
                        cy={node.svgY}
                        r={isFocused ? 6 : isNodeInPlan ? 4.5 : 3}
                        fill={isFocused ? '#FFFFFF' : color}
                        stroke={isFocused ? '#F28C18' : 'rgba(255,255,255,0.4)'}
                        strokeWidth="1.5"
                        filter="url(#gisGlow)"
                      />

                      {/* Label */}
                      <text
                        x={node.svgX}
                        y={node.svgY - 7}
                        textAnchor="middle"
                        fill={isFocused ? '#FFFFFF' : 'rgba(248, 244, 234, 0.75)'}
                        fontSize={isFocused ? '7' : '5.5'}
                        fontFamily="var(--font-heading)"
                        fontWeight={isFocused ? 'bold' : 'normal'}
                        letterSpacing="0.05em"
                        className="select-none uppercase"
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Legend at bottom */}
              <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center justify-between text-[8px] sm:text-[9px] uppercase font-heading bg-navy-dark/95 px-3 py-1.5 rounded border border-ivory/10">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-saffron">
                    <span className="w-2 h-2 rounded-full bg-saffron" /> UNESCO / Landmark
                  </span>
                  <span className="flex items-center gap-1 text-green">
                    <span className="w-2 h-2 rounded-full bg-green" /> Wildlife Sanctuary
                  </span>
                  <span className="flex items-center gap-1 text-gold">
                    <span className="w-2 h-2 rounded-full bg-gold" /> Heritage / Craft
                  </span>
                </div>
                <span className="text-ivory/40">Click any node to inspect</span>
              </div>
            </div>
          </div>

          {/* Right: Day-by-Day Route Step Detail */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Day Selector Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {selectedPlan.waypoints.map((wp) => (
                <button
                  key={wp.day}
                  onClick={() => {
                    setActiveDay(wp.day);
                    setSelectedNode(geoNodes[wp.nodeId] || geoNodes['lucknow']);
                  }}
                  className={`px-4 py-2 rounded-sm text-xs font-heading uppercase tracking-wider font-semibold transition-all ${
                    activeDay === wp.day
                      ? 'bg-saffron text-white shadow-lg shadow-saffron/20'
                      : 'bg-navy-card text-ivory/60 border border-ivory/10 hover:text-white'
                  }`}
                >
                  Day {wp.day}
                </button>
              ))}
            </div>

            {/* Active Day Waypoint Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-navy p-6 rounded-sm border border-ivory/10 shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-heading text-saffron tracking-widest font-semibold">
                    Waypoint #{activeDay} of {selectedPlan.waypoints.length}
                  </span>
                  <span className="text-xs text-green font-heading font-medium">
                    {currentWaypoint.stayDuration}
                  </span>
                </div>

                <h3 className="font-heading text-xl text-white font-light">
                  {currentWaypoint.name}
                </h3>

                <p className="font-body text-xs sm:text-sm text-ivory/80 leading-relaxed">
                  {currentWaypoint.highlight}
                </p>

                {/* Cultural Shadow Spotlight */}
                <div className="p-4 rounded bg-navy-dark/90 border-l-2 border-saffron space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-heading text-saffron tracking-wider font-semibold">
                      ✦ Cultural Shadow Recommendation
                    </span>
                    <button
                      onClick={() => revealShadow(currentWaypoint.name)}
                      className="text-[9px] text-saffron underline uppercase font-heading"
                    >
                      Log to Passport
                    </button>
                  </div>
                  <p className="text-xs text-ivory/70 font-body leading-relaxed">
                    {currentWaypoint.shadowNote}
                  </p>
                </div>

                {/* Food recommendation */}
                <div className="p-3 rounded bg-navy-dark/60 border border-ivory/5 flex items-center gap-3">
                  <span className="text-xl">🍛</span>
                  <div>
                    <span className="text-[9px] uppercase font-heading text-gold block font-semibold">
                      Authentic Culinary Note
                    </span>
                    <span className="text-xs text-ivory/70 font-body">
                      {currentWaypoint.foodSuggestion}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
