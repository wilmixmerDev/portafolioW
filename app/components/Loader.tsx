"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 2.4 seconds for cinematic effect
    const timer = setTimeout(() => {
      setLoading(false);
      onComplete();
      // Optional: re-enable scroll if we locked it
      document.body.style.overflow = "auto";
    }, 2400);

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
            {/* Minimalist BMW Roundel SVG Animation */}
            <svg viewBox="0 0 100 100" className="w-20 h-20 stroke-white stroke-[1.5px] fill-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
               <motion.circle cx="50" cy="50" r="46" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }} />
               <motion.circle cx="50" cy="50" r="30" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }} />
               <motion.line x1="20" y1="50" x2="80" y2="50" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }} />
               <motion.line x1="50" y1="20" x2="50" y2="80" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }} />
            </svg>
            
            <motion.div
              initial={{ letterSpacing: "0em", opacity: 0, y: 10 }}
              animate={{ letterSpacing: "0.5em", opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              className="text-white text-[11px] mt-8 font-headline uppercase ml-2 text-center"
            >
              WILMER IRIARTE
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
