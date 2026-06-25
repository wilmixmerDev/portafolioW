"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const isVisibleRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const pendingX = useRef(0);
  const pendingY = useRef(0);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    document.body.style.cursor = "none";

    const flush = () => {
      cursorX.set(pendingX.current - 16);
      cursorY.set(pendingY.current - 16);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
      rafRef.current = null;
    };

    const moveCursor = (e: MouseEvent) => {
      pendingX.current = e.clientX;
      pendingY.current = e.clientY;
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(flush);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    // Event delegation: un solo listener en lugar de N listeners individuales
    const handlePointerOver = (e: PointerEvent) => {
      const hoverable = (e.target as HTMLElement).closest("a, button, input, textarea, label");
      setIsHovering(!!hoverable);
    };

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("pointerover", handlePointerOver);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("pointerover", handlePointerOver);
      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] rounded-full hidden sm:block shadow-lg"
        style={{
          x: cursorX,
          y: cursorY,
          width: 32,
          height: 32,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
          border: isHovering ? "1px solid rgba(255, 255, 255, 0.8)" : "2px solid rgba(255, 255, 255, 0.5)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Small center dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 rounded-full bg-white hidden sm:block shadow-md"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 13,
          translateY: 13,
          opacity: isHovering ? 0 : isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
