"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 26,
    restDelta: 0.001
  });

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-120">
      <div className="h-0.75 w-full bg-white/8" />
      <motion.div
        className="absolute left-0 top-0 h-0.75 w-full origin-left bg-linear-to-r from-[#00A2E8] via-[#10069F] to-[#E32118] shadow-[0_0_12px_rgba(0,162,232,0.45)]"
        style={{ scaleX }}
      />
    </div>
  );
}
