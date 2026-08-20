'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { allStatesAndUTs, StateUTData } from '@/data/allStatesData';
import { nationalParks, NationalPark } from '@/data/nationalParksData';
import { heritageDestinations, HeritageDestination } from '@/data/tourismData';

interface InteractiveIndiaMapProps {
  onSelectDestination?: (destId: string) => void;
  onSelectPark?: (parkId: string) => void;
  onRevealShadow?: (destName: string) => void;
}

type MapMode = 'destinations' | 'national-parks' | 'cultural-shadows';

interface GeoStateNode {
  id: string;
  name: string;
  region: 'North' | 'North East' | 'East' | 'Central' | 'West' | 'South';
  path: string;
  center: [number, number];
  shadowTitle: string;
  shadowDescription: string;
}

// Complete geographic state polygons with authentic Indian borders
const geoStateNodes: GeoStateNode[] = [
  // ── NORTH ──────────────────────────────────────────────────
  {
    id: 'ladakh',
    name: 'Ladakh',
    region: 'North',
    path: 'M230 45 C242 35, 268 35, 282 52 C295 68, 298 88, 288 105 C275 115, 255 115, 240 108 C232 98, 222 78, 222 65 Z',
    center: [258, 72],
    shadowTitle: 'Choglamsar Thangka & Wool Guilds',
    shadowDescription: 'Generational Tibetan mineral pigment thangka scrolls and high-altitude nomadic Pashmina combers.',
  },
  {
    id: 'jammu-kashmir',
    name: 'Jammu & Kashmir',
    region: 'North',
    path: 'M175 75 C190 55, 218 46, 230 45 C222 65, 232 98, 222 118 C202 125, 180 120, 168 102 C165 92, 168 82, 175 75 Z',
    center: [195, 85],
    shadowTitle: 'Old Srinagar Walnut Carvers & Sozni Stitches',
    shadowDescription: 'Hidden artisanal lanes of downtown Srinagar preserving intricate 500-year-old walnut wood joinery.',
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    region: 'North',
    path: 'M222 118 C232 98, 240 108, 265 118 C270 138, 255 155, 236 155 C220 148, 215 132, 222 118 Z',
    center: [242, 134],
    shadowTitle: 'Kinnauri Weavers & Kath-Kuni Architecture',
    shadowDescription: 'Earthquake-resilient dry stone-wood Himalayan architecture and sacred geometric loom weaving.',
  },
  {
    id: 'punjab',
    name: 'Punjab',
    region: 'North',
    path: 'M168 122 C195 120, 220 125, 215 150 C202 170, 180 172, 160 158 C155 145, 160 130, 168 122 Z',
    center: [186, 146],
    shadowTitle: 'Phulkari Silk Thread Embroidery Masters',
    shadowDescription: 'Generational bridal folk embroidery worked meticulously from the reverse side of coarse cotton.',
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    region: 'North',
    path: 'M265 118 C285 115, 310 130, 315 155 C298 175, 275 178, 255 168 C248 152, 255 132, 265 118 Z',
    center: [282, 144],
    shadowTitle: 'Aipan Sacred Ritual Art of Kumaon',
    shadowDescription: 'Traditional red clay (Geru) and rice paste geometric floor and doorstep sacred mandalas.',
  },
  {
    id: 'haryana',
    name: 'Haryana & Delhi',
    region: 'North',
    path: 'M202 155 C225 150, 248 155, 245 185 C230 198, 208 195, 192 185 C190 170, 195 160, 202 155 Z',
    center: [218, 172],
    shadowTitle: 'Mughal & Sultanate Stone Inlay Masters of Mehrauli',
    shadowDescription: 'Living sandstone lattice (Jali) carvers and generational kite makers of Old Delhi.',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    region: 'North',
    path: 'M115 170 C165 150, 198 185, 212 202 C215 238, 185 278, 138 270 C102 255, 92 210, 115 170 Z',
    center: [155, 218],
    shadowTitle: 'Sanganeri Natural Dye Hand-Block Guilds',
    shadowDescription: 'Generational Chippa community block printers using carved teakwood and natural indigo & madder dyes.',
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    region: 'North',
    path: 'M245 175 C298 168, 355 185, 378 220 C362 258, 310 272, 252 258 C232 242, 222 200, 245 175 Z',
    center: [298, 216],
    shadowTitle: 'Lucknow Chikankari & Varanasi Pit-Loom Silks',
    shadowDescription: '32 ancient needlecraft stitches in Old Chowk and generational Jacquard silk brocade weavers of Kashi.',
  },

  // ── CENTRAL ────────────────────────────────────────────────
  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    region: 'Central',
    path: 'M182 262 C255 248, 318 258, 348 288 C332 338, 260 350, 188 332 C162 305, 165 275, 182 262 Z',
    center: [256, 296],
    shadowTitle: 'Gond Tribal Mythological Murals & Chanderi Weaving',
    shadowDescription: 'Intricate dot-and-line tree-of-life paintings and translucent royal silk-cotton Chanderi weaves.',
  },
  {
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    region: 'Central',
    path: 'M318 288 C348 280, 362 318, 358 368 C332 398, 305 388, 295 342 C295 312, 305 298, 318 288 Z',
    center: [332, 338],
    shadowTitle: 'Bastar Lost-Wax Bell Metal (Dhokra) Masters',
    shadowDescription: '4,000-year-old Harappan lost-wax brass and bell-metal casting practiced by tribal master artisans.',
  },

  // ── WEST ───────────────────────────────────────────────────
  {
    id: 'gujarat',
    name: 'Gujarat',
    region: 'West',
    path: 'M68 230 C105 210, 142 230, 158 260 C146 298, 115 318, 72 298 C52 270, 48 245, 68 230 Z',
    center: [106, 266],
    shadowTitle: 'Nirona Rogan Castor Oil Art & Patan Patola',
    shadowDescription: 'Rare freehand stylus painting using boiled castor oil paste and double-ikat silk weaving.',
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    region: 'West',
    path: 'M138 312 C210 295, 268 318, 278 368 C252 418, 175 428, 132 388 C122 352, 125 325, 138 312 Z',
    center: [196, 362],
    shadowTitle: 'Warli Sacred Ochre-Rice Murals & Paithani Silks',
    shadowDescription: 'Indigenous geometric tribal murals celebrating mother nature and real gold zari peacock borders.',
  },
  {
    id: 'goa',
    name: 'Goa',
    region: 'West',
    path: 'M142 428 C158 425, 165 440, 155 450 C145 450, 138 438, 142 428 Z',
    center: [150, 438],
    shadowTitle: 'Indo-Portuguese Azulejo Tile Masters & Feni Distillers',
    shadowDescription: 'Hand-painted glazed ceramic blue tiles and traditional copper-pot cashew apple earthen feni.',
  },

  // ── EAST ───────────────────────────────────────────────────
  {
    id: 'bihar',
    name: 'Bihar',
    region: 'East',
    path: 'M358 200 C398 195, 422 215, 418 240 C388 252, 360 248, 345 230 C345 215, 350 205, 358 200 Z',
    center: [382, 222],
    shadowTitle: 'Mithila (Madhubani) Natural Pigment Painters',
    shadowDescription: 'Ancient narrative paintings using twigs, matchsticks and natural dyes extracted from turmeric and indigo.',
  },
  {
    id: 'jharkhand',
    name: 'Jharkhand',
    region: 'East',
    path: 'M350 244 C388 240, 412 255, 408 288 C378 298, 350 288, 338 268 C338 252, 345 245, 350 244 Z',
    center: [376, 268],
    shadowTitle: 'Sohrai & Khovar Sacred Mud Wall Murals',
    shadowDescription: 'Matriarchal mural art painted with natural clays during harvest and marriage seasons.',
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    region: 'East',
    path: 'M408 210 C428 205, 438 245, 432 302 C408 318, 388 298, 396 258 C402 235, 402 220, 408 210 Z',
    center: [414, 262],
    shadowTitle: 'Kumartuli Clay Idol Sculptors & Kantha Embroidery',
    shadowDescription: '300-year-old river clay sculptors on the Hooghly river creating sacred festival idols.',
  },
  {
    id: 'odisha',
    name: 'Odisha',
    region: 'East',
    path: 'M345 292 C392 280, 418 318, 408 368 C368 388, 335 368, 330 328 C330 305, 335 295, 345 292 Z',
    center: [372, 332],
    shadowTitle: 'Raghurajpur Palm Leaf (Pattachitra) Heritage Village',
    shadowDescription: 'Centuries of palm-leaf etching with iron styluses and mineral colors depicting epics.',
  },

  // ── NORTH EAST ─────────────────────────────────────────────
  {
    id: 'assam-northeast',
    name: 'North East (Assam & Seven Sisters)',
    region: 'North East',
    path: 'M432 180 C472 160, 525 170, 538 210 C522 258, 468 262, 436 222 C422 195, 426 185, 432 180 Z',
    center: [478, 212],
    shadowTitle: 'Majuli Island Mask Makers & Golden Muga Silk',
    shadowDescription: 'Bamboo-and-clay theatrical masks in Vaishnavite Satras and organic golden silk woven in Sualkuchi.',
  },

  // ── SOUTH ──────────────────────────────────────────────────
  {
    id: 'andhra-telangana',
    name: 'Telangana & Andhra Pradesh',
    region: 'South',
    path: 'M236 362 C308 345, 338 388, 328 462 C268 478, 218 442, 222 396 C222 375, 226 365, 236 362 Z',
    center: [278, 412],
    shadowTitle: 'Kalamkari Natural Dye Pen-Drawing & Bidriware',
    shadowDescription: 'Freehand kalam bamboo pen painting using tamarind pens and zinc-copper silver inlay metalwork.',
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    region: 'South',
    path: 'M165 398 C228 386, 242 448, 228 502 C182 518, 152 472, 156 426 C156 412, 160 402, 165 398 Z',
    center: [192, 458],
    shadowTitle: 'Kinhal Wooden Toys & Mysore Sandalwood Carving',
    shadowDescription: 'Lightwood carved deities pasted with liquid tamarind seed paste and pure gold leaf.',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    region: 'South',
    path: 'M165 492 C192 486, 198 542, 182 578 C166 572, 156 526, 165 492 Z',
    center: [176, 536],
    shadowTitle: 'Aranmula Metal Mirrors & Kathakali Chutti Masters',
    shadowDescription: 'Metallurgical mystery of copper-tin reflective alloy mirrors and 4-hour rice-paste face makeup.',
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    region: 'South',
    path: 'M196 482 C248 472, 248 542, 216 582 C182 578, 186 532, 196 482 Z',
    center: [218, 532],
    shadowTitle: 'Swamimalai Chola Bronze Castings & Kanchipuram Silks',
    shadowDescription: 'Living Shilpa Shastra lost-wax sacred temple bronzes and mulberry zari korvai borders.',
  },
];

// Interactive Markers with accurate geo projection coordinates
const destinationMarkers = [
  { id: 'lucknow', name: 'Lucknow (Awadh)', stateId: 'uttar-pradesh', cx: 285, cy: 205, type: 'Heritage & Craft', shadow: 'Chikankari & Zardozi Guilds' },
  { id: 'varanasi', name: 'Varanasi (Kashi)', stateId: 'uttar-pradesh', cx: 335, cy: 225, type: 'Spiritual UNESCO', shadow: 'Madanpura Handloom Silk Weavers' },
  { id: 'agra', name: 'Agra (Taj & Fort)', stateId: 'uttar-pradesh', cx: 250, cy: 200, type: 'UNESCO Monument', shadow: 'Taj Ganj Pietra Dura Artisans' },
  { id: 'ayodhya', name: 'Ayodhya (Saryu)', stateId: 'uttar-pradesh', cx: 310, cy: 205, type: 'Ramayana Heritage', shadow: 'Saryu River Brass Casting Masters' },
  { id: 'mathura', name: 'Mathura-Vrindavan', stateId: 'uttar-pradesh', cx: 240, cy: 190, type: 'Braj Culture', shadow: 'Sanjhi Paper Stencil Folk Art' },
  { id: 'jaipur', name: 'Jaipur (Pink City)', stateId: 'rajasthan', cx: 185, cy: 195, type: 'Royal Heritage', shadow: 'Sanganeri Block Printing Guilds' },
  { id: 'hampi', name: 'Hampi (Vijayanagara)', stateId: 'karnataka', cx: 195, cy: 445, type: 'UNESCO Ruins', shadow: 'Ancient Stone Acoustic Pillars' },
  { id: 'madurai', name: 'Madurai (Meenakshi)', stateId: 'tamil-nadu', cx: 215, cy: 535, type: 'Dravidian Temple', shadow: 'Jasmine Flower & Bronze Casting' },
];

const parkMarkers = [
  { id: 'dudhwa', name: 'Dudhwa National Park', state: 'Uttar Pradesh', cx: 285, cy: 185, wildlife: 'Tiger, Rhino, Barasingha' },
  { id: 'pilibhit', name: 'Pilibhit Tiger Reserve (TX2)', state: 'Uttar Pradesh', cx: 270, cy: 180, wildlife: 'Royal Bengal Tiger Corridor' },
  { id: 'corbett', name: 'Jim Corbett National Park', state: 'Uttarakhand', cx: 275, cy: 145, wildlife: 'Tigers & Asian Elephants' },
  { id: 'kaziranga', name: 'Kaziranga National Park', state: 'Assam', cx: 475, cy: 195, wildlife: 'One-Horned Rhinoceros' },
  { id: 'gir', name: 'Gir National Park', state: 'Gujarat', cx: 95, cy: 275, wildlife: 'Asiatic Lions' },
  { id: 'kanha', name: 'Kanha Tiger Reserve', state: 'Madhya Pradesh', cx: 270, cy: 300, wildlife: 'Tigers & Hardground Barasingha' },
  { id: 'sundarbans', name: 'Sundarbans Biosphere', state: 'West Bengal', cx: 420, cy: 285, wildlife: 'Swimming Mangrove Tigers' },
  { id: 'periyar', name: 'Periyar Tiger Reserve', state: 'Kerala', cx: 175, cy: 545, wildlife: 'Wild Elephants & Lake Rafting' },
];

export default function InteractiveIndiaMap({
  onSelectDestination,
  onSelectPark,
  onRevealShadow,
}: InteractiveIndiaMapProps) {
  const { t } = useLanguage();
  const [mapMode, setMapMode] = useState<MapMode>('destinations');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedStateId, setSelectedStateId] = useState<string>('rajasthan');
  const [hoveredState, setHoveredState] = useState<GeoStateNode | null>(null);

  // Active state data resolution
  const activeGeoNode = geoStateNodes.find((s) => s.id === selectedStateId) || geoStateNodes[6];
  const activeStateDetails =
    allStatesAndUTs.find((s) => s.id === selectedStateId) ||
    allStatesAndUTs.find((s) => s.id === 'rajasthan') ||
    allStatesAndUTs[0];

  const regions = ['ALL', 'NORTH', 'NORTH EAST', 'EAST', 'CENTRAL', 'WEST', 'SOUTH'];

  return (
    <section id="interactive-map" className="relative section-cinematic bg-[#031527] overflow-hidden">
      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-saffron/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-green/5 blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-saffron font-heading block mb-3 font-semibold">
            {t.exploreCircuits}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-4">
            {t.mapTitle}
          </h2>
          <p className="font-body text-ivory/60 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
            {t.mapSub}
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>

        {/* ── Quick State Selector Dropdown & Mode Controls ─── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-navy-card p-4 rounded-sm border border-ivory/10 shadow-xl">
          {/* State Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-heading text-saffron tracking-wider font-semibold">
              {t.selectState}
            </span>
            <select
              value={selectedStateId}
              onChange={(e) => setSelectedStateId(e.target.value)}
              className="px-3 py-1.5 bg-navy-dark border border-ivory/20 rounded text-xs text-white font-heading font-medium focus:outline-none focus:border-saffron"
            >
              {allStatesAndUTs.map((s) => (
                <option key={s.id} value={s.id} className="bg-navy-dark text-white">
                  {s.name} ({s.region})
                </option>
              ))}
            </select>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMapMode('destinations')}
              className={`px-3 py-1.5 rounded-sm text-xs font-heading uppercase tracking-wider font-semibold transition-all ${
                mapMode === 'destinations'
                  ? 'bg-saffron text-white shadow-md'
                  : 'bg-navy-dark text-ivory/60 hover:text-white'
              }`}
            >
              🏛️ Destinations
            </button>
            <button
              onClick={() => setMapMode('national-parks')}
              className={`px-3 py-1.5 rounded-sm text-xs font-heading uppercase tracking-wider font-semibold transition-all ${
                mapMode === 'national-parks'
                  ? 'bg-green text-white shadow-md'
                  : 'bg-navy-dark text-ivory/60 hover:text-white'
              }`}
            >
              🐅 National Parks
            </button>
            <button
              onClick={() => setMapMode('cultural-shadows')}
              className={`px-3 py-1.5 rounded-sm text-xs font-heading uppercase tracking-wider font-semibold transition-all ${
                mapMode === 'cultural-shadows'
                  ? 'bg-gold text-white shadow-md'
                  : 'bg-navy-dark text-ivory/60 hover:text-white'
              }`}
            >
              ✦ Cultural Shadows
            </button>
          </div>

          {/* Regional Filter Chips */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2 py-1 rounded text-[10px] font-heading uppercase tracking-wider transition-all ${
                  selectedRegion === reg
                    ? 'bg-gold/20 text-gold border border-gold/50 font-semibold'
                    : 'text-ivory/50 hover:text-white'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main Map + State Story Details Layout ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Authentic Indian Map Canvas */}
          <div className="lg:col-span-7 glass-navy p-5 rounded-sm border border-ivory/10 shadow-2xl relative">
            <div className="flex items-center justify-between mb-2 text-[10px] uppercase font-heading text-ivory/40">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green animate-ping" />
                Live Interactive Map of India
              </span>
              <span className="text-saffron font-semibold">
                {hoveredState ? `Hovered: ${hoveredState.name}` : `Active: ${activeStateDetails.name}`}
              </span>
            </div>

            {/* SVG Indian Map */}
            <div className="relative w-full aspect-[4/4.8] bg-[#020e1f] rounded border border-ivory/10 overflow-hidden flex items-center justify-center p-2">
              <svg viewBox="40 20 520 580" className="w-full h-full select-none">
                <defs>
                  <filter id="stateGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="oceanShade" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#04182e" />
                    <stop offset="100%" stopColor="#020e1c" />
                  </linearGradient>
                  <linearGradient id="landmassBase" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(242, 140, 40, 0.15)" />
                    <stop offset="100%" stopColor="rgba(22, 132, 71, 0.15)" />
                  </linearGradient>
                </defs>

                {/* Ocean Background Watermark Labels */}
                <text x="70" y="380" fill="rgba(255, 248, 236, 0.12)" fontSize="10" fontFamily="var(--font-heading)" className="uppercase tracking-widest">
                  ARABIAN SEA
                </text>
                <text x="390" y="420" fill="rgba(255, 248, 236, 0.12)" fontSize="10" fontFamily="var(--font-heading)" className="uppercase tracking-widest">
                  BAY OF BENGAL
                </text>
                <text x="210" y="570" fill="rgba(255, 248, 236, 0.12)" fontSize="8" fontFamily="var(--font-heading)" className="uppercase tracking-widest text-center">
                  INDIAN OCEAN
                </text>

                {/* Geographic Continental Outline Base */}
                <path
                  d="M230 45 C245 35, 275 35, 290 55 C295 80, 270 115, 305 130 C310 155, 375 160, 430 180 C475 160, 535 190, 535 225 C500 260, 435 250, 420 300 C410 365, 350 375, 335 440 C285 500, 230 580, 205 580 C180 580, 155 525, 145 435 C135 375, 75 315, 65 265 C60 230, 110 205, 120 170 C165 140, 180 75, 230 45 Z"
                  fill="url(#landmassBase)"
                  stroke="rgba(242, 140, 40, 0.4)"
                  strokeWidth="1.5"
                />

                {/* All State Vector Regions */}
                {geoStateNodes.map((state) => {
                  const isSelected = selectedStateId === state.id;
                  const isHovered = hoveredState?.id === state.id;
                  const isRegionMatched =
                    selectedRegion === 'ALL' ||
                    state.region.toUpperCase().includes(selectedRegion);

                  return (
                    <g key={state.id}>
                      <path
                        d={state.path}
                        fill={
                          isSelected
                            ? '#F28C28'
                            : isHovered
                            ? '#C89B3C'
                            : isRegionMatched
                            ? 'rgba(255, 248, 236, 0.14)'
                            : 'rgba(255, 248, 236, 0.04)'
                        }
                        stroke={
                          isSelected
                            ? '#FFFFFF'
                            : isHovered
                            ? '#FFFFFF'
                            : 'rgba(255, 248, 236, 0.35)'
                        }
                        strokeWidth={isSelected ? '2.5' : isHovered ? '1.8' : '1'}
                        className="cursor-pointer transition-all duration-300"
                        onMouseEnter={() => setHoveredState(state)}
                        onMouseLeave={() => setHoveredState(null)}
                        onClick={() => setSelectedStateId(state.id)}
                      />

                      {/* State Name Text */}
                      <text
                        x={state.center[0]}
                        y={state.center[1]}
                        textAnchor="middle"
                        fill={isSelected ? '#041A31' : isHovered ? '#FFFFFF' : 'rgba(255, 248, 236, 0.85)'}
                        fontSize="6.5"
                        fontFamily="var(--font-heading)"
                        fontWeight={isSelected ? 'bold' : '600'}
                        className="select-none pointer-events-none uppercase drop-shadow"
                      >
                        {state.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}

                {/* Mode 1: Destinations Marker Pins */}
                {mapMode === 'destinations' &&
                  destinationMarkers.map((m) => (
                    <g
                      key={m.id}
                      className="cursor-pointer group"
                      onClick={() => onSelectDestination && onSelectDestination(m.id)}
                    >
                      <circle
                        cx={m.cx}
                        cy={m.cy}
                        r="4.5"
                        fill="#F28C28"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        filter="url(#stateGlow)"
                      />
                      <text
                        x={m.cx}
                        y={m.cy - 7}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="6.5"
                        fontFamily="var(--font-heading)"
                        fontWeight="bold"
                        className="select-none uppercase drop-shadow"
                      >
                        📍 {m.name.split(' ')[0]}
                      </text>
                    </g>
                  ))}

                {/* Mode 2: National Parks Pins */}
                {mapMode === 'national-parks' &&
                  parkMarkers.map((p) => (
                    <g
                      key={p.id}
                      className="cursor-pointer group"
                      onClick={() => onSelectPark && onSelectPark(p.id)}
                    >
                      <circle
                        cx={p.cx}
                        cy={p.cy}
                        r="5"
                        fill="#168447"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        filter="url(#stateGlow)"
                        className="animate-pulse"
                      />
                      <text
                        x={p.cx}
                        y={p.cy - 7}
                        textAnchor="middle"
                        fill="#20A55B"
                        fontSize="6.5"
                        fontFamily="var(--font-heading)"
                        fontWeight="bold"
                        className="select-none uppercase"
                      >
                        🐾 {p.name.split(' ')[0]}
                      </text>
                    </g>
                  ))}

                {/* Mode 3: Cultural Shadows Pins */}
                {mapMode === 'cultural-shadows' &&
                  destinationMarkers.map((m) => (
                    <g
                      key={m.id}
                      className="cursor-pointer group"
                      onClick={() => onRevealShadow && onRevealShadow(m.name)}
                    >
                      <circle
                        cx={m.cx}
                        cy={m.cy}
                        r="5"
                        fill="#C89B3C"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                      <text
                        x={m.cx}
                        y={m.cy - 7}
                        textAnchor="middle"
                        fill="#DFB55B"
                        fontSize="6.5"
                        fontFamily="var(--font-heading)"
                        fontWeight="bold"
                        className="select-none uppercase"
                      >
                        ✦ {m.name.split(' ')[0]}
                      </text>
                    </g>
                  ))}
              </svg>

              {/* Map Legend */}
              <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center justify-between text-[8px] sm:text-[9px] uppercase font-heading bg-navy-dark/95 px-3 py-1.5 rounded border border-ivory/10">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-saffron font-medium">
                    <span className="w-2 h-2 rounded-full bg-saffron" /> Destination
                  </span>
                  <span className="flex items-center gap-1 text-green font-medium">
                    <span className="w-2 h-2 rounded-full bg-green" /> National Park
                  </span>
                  <span className="flex items-center gap-1 text-gold font-medium">
                    <span className="w-2 h-2 rounded-full bg-gold" /> Cultural Shadow
                  </span>
                </div>
                <span className="text-ivory/50">Click any state to explore</span>
              </div>
            </div>
          </div>

          {/* Right: Dynamic Selected State & Destination Story Panel */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStateId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="glass-navy p-6 rounded-sm border border-ivory/10 shadow-2xl space-y-4"
              >
                {/* State Tag & Region */}
                <div className="flex items-center justify-between">
                  <span className="category-pill text-[9px] bg-navy-dark/90 text-saffron font-medium">
                    {activeStateDetails.region} Region • {activeStateDetails.type}
                  </span>
                  <span className="text-xs text-gold font-heading font-semibold">
                    {activeStateDetails.destinationCount} Curated Sites
                  </span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl text-white font-light">
                  {activeStateDetails.name}
                </h3>

                <p className="font-body text-xs sm:text-sm text-ivory/85 leading-relaxed italic border-l-2 border-saffron pl-3">
                  &ldquo;{activeStateDetails.tagline}&rdquo;
                </p>

                <p className="font-body text-xs text-ivory/70 leading-relaxed">
                  {activeStateDetails.culturalHighlight}
                </p>

                {/* Major Signature Destinations for the Selected State */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-heading text-gold tracking-wider block mb-2 font-semibold">
                    Curated Destinations in {activeStateDetails.name}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeStateDetails.famousFor.map((dest) => (
                      <button
                        key={dest}
                        onClick={() => {
                          const matched = heritageDestinations.find((d) =>
                            dest.toLowerCase().includes(d.name.toLowerCase()) ||
                            d.name.toLowerCase().includes(dest.toLowerCase()) ||
                            dest.toLowerCase().includes(d.location.toLowerCase()) ||
                            d.location.toLowerCase().includes(dest.toLowerCase())
                          );
                          if (onSelectDestination) {
                            onSelectDestination(matched ? matched.id : dest.toLowerCase());
                          }
                        }}
                        className="px-2.5 py-1 rounded bg-navy-dark text-[10px] font-heading text-ivory/80 hover:text-saffron hover:border-saffron/40 border border-ivory/10 transition-colors"
                      >
                        📍 {dest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Cultural Shadow for the Selected State */}
                <div className="p-3.5 rounded bg-navy-dark/90 border border-gold/30 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-heading text-gold font-semibold">
                      ✦ Cultural Shadow: {activeGeoNode.shadowTitle}
                    </span>
                    <button
                      onClick={() => onRevealShadow && onRevealShadow(activeStateDetails.name)}
                      className="text-[9px] text-saffron underline font-heading font-semibold"
                    >
                      Reveal Story →
                    </button>
                  </div>
                  <p className="text-xs text-ivory/75 font-body leading-relaxed">
                    {activeGeoNode.shadowDescription}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
