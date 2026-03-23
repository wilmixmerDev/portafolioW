"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center the 32px cursor
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleLinkHoverStart = () => setIsHovering(true);
    const handleLinkHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    // Add listeners to all clickable elements
    const clickables = document.querySelectorAll("a, button, input, textarea, label");
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHoverStart);
      el.addEventListener("mouseleave", handleLinkHoverEnd);
      // Give these elements `cursor: none` so our custom cursor stays visible
      (el as HTMLElement).style.cursor = "none";
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);

      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverStart);
        el.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY, isVisible]);

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
          opacity: isHovering ? 0 : (isVisible ? 1 : 0),
        }}
      />
    </>
  );
}
