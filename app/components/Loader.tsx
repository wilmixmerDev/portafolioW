"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 2.8 seconds for cinematic effect
    const timer = setTimeout(() => {
      setLoading(false);
      onComplete();
      // Optional: re-enable scroll if we locked it
      document.body.style.overflow = "auto";
    }, 2800);

    // Lock scroll while loading
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    return () => {
      clearTimeout(timer);
      if (typeof window !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070707]"
        >
          <div className="relative flex flex-col items-center">
            {/* Detailed Authentic BMW Roundel SVG Animation */}
            <svg viewBox="0 0 500 500" className="w-28 h-28 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] select-none">
               {/* Outer and inner bounding rings */}
               <motion.circle cx="250" cy="250" r="230" stroke="white" strokeWidth="12" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
               <motion.circle cx="250" cy="250" r="150" stroke="white" strokeWidth="12" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 1.5, ease: "easeInOut" }} />
               <motion.circle cx="250" cy="250" r="245" stroke="white" strokeWidth="3" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
               
               {/* 4 BMW Quadrants */}
               <motion.path d="M 250 100 A 150 150 0 0 1 400 250 L 250 250 Z" fill="white" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.8, ease: "easeOut" }} />
               <motion.path d="M 250 400 A 150 150 0 0 1 100 250 L 250 250 Z" fill="white" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }} />
               
               {/* BMW Letters B M W */}
               <motion.text x="130" y="150" fill="white" fontSize="65" fontFamily="Arial, sans-serif" fontWeight="bold" transform="rotate(-40 140 140)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }}>B</motion.text>
               <motion.text x="250" y="80" fill="white" fontSize="65" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}>M</motion.text>
               <motion.text x="370" y="150" fill="white" fontSize="65" fontFamily="Arial, sans-serif" fontWeight="bold" transform="rotate(40 360 140)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0, duration: 0.8 }}>W</motion.text>
            </svg>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
              className="text-white text-[11px] mt-8 font-headline tracking-[0.4em] uppercase text-center"
            >
              WILMER IRIARTE
            </motion.div>

            <div className="flex w-32 mt-5 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
                className="h-full bg-white"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
