"use client";

import { motion } from "framer-motion";

const phrases = [
  "SHEER DRIVING PLEASURE",
  "///M PERFORMANCE",
  "THE ULTIMATE MACHINE",
  "DESIGNED TO PERFORM",
  "ENGINEERED EXCELLENCE",
  "BORN ON THE TRACK",
];

export default function BMWMarquee() {
  // Duplicate for seamless loop
  const items = [...phrases, ...phrases];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/5 bg-black/30 py-3 backdrop-blur-sm sm:py-4">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black/60 to-transparent sm:w-24" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black/60 to-transparent sm:w-24" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        className="flex w-max gap-0"
      >
        {items.map((phrase, i) => (
          <div key={i} className="flex items-center">
            {/* BMW mini roundel dot */}
            <span className="mx-4 flex shrink-0 sm:mx-6">
              <svg viewBox="0 0 32 32" className="h-3.5 w-3.5 opacity-40 sm:h-4 sm:w-4">
                <circle cx="16" cy="16" r="15" stroke="white" strokeWidth="2" fill="none" />
                <circle cx="16" cy="16" r="9.5" stroke="white" strokeWidth="2" fill="none" />
                <path d="M 16 6.5 A 9.5 9.5 0 0 1 25.5 16 L 16 16 Z" fill="white" />
                <path d="M 16 25.5 A 9.5 9.5 0 0 1 6.5 16 L 16 16 Z" fill="white" />
              </svg>
            </span>
            <span className="whitespace-nowrap font-headline text-[9px] font-bold uppercase tracking-[0.45em] text-white/20 sm:text-[10px] sm:tracking-[0.5em]">
              {phrase}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
