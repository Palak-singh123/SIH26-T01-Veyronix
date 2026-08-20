'use client';

import { motion } from 'framer-motion';

interface SideActionsProps {
  onOpenAIPlanner: () => void;
  onScrollToShadows: () => void;
}

export default function SideActions({
  onOpenAIPlanner,
  onScrollToShadows,
}: SideActionsProps) {
  return (
    <>
      {/* Left Edge: Cultural Shadows */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <motion.button
          onClick={onScrollToShadows}
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
          className="group flex items-center bg-navy-dark/90 border-y border-r border-saffron/40 hover:border-saffron py-3.5 px-2 rounded-r-sm backdrop-blur-md shadow-2xl transition-all duration-300"
          title="Discover Cultural Shadows"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-saffron text-xs group-hover:scale-125 transition-transform">
              ✦
            </span>
            <span
              className="text-[9px] font-heading uppercase tracking-[0.25em] text-ivory/80 group-hover:text-saffron font-medium transition-colors"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              CULTURAL SHADOWS
            </span>
          </div>
        </motion.button>
      </div>

      {/* Right Edge: Plan Your Journey (Opens Bharat AI) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <motion.button
          onClick={onOpenAIPlanner}
          initial={{ x: 10 }}
          whileHover={{ x: 0 }}
          className="group flex items-center bg-navy-dark/90 border-y border-l border-saffron/40 hover:border-saffron py-3.5 px-2 rounded-l-sm backdrop-blur-md shadow-2xl transition-all duration-300"
          title="Plan Your Journey with AI"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-saffron text-xs group-hover:scale-125 transition-transform">
              🤖
            </span>
            <span
              className="text-[9px] font-heading uppercase tracking-[0.25em] text-ivory/80 group-hover:text-saffron font-medium transition-colors"
              style={{ writingMode: 'vertical-rl' }}
            >
              PLAN YOUR JOURNEY
            </span>
          </div>
        </motion.button>
      </div>
    </>
  );
}
