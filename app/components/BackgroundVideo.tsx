"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function BackgroundVideo({ isLoaded }: { isLoaded: boolean }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const updateViewport = () => {
      setIsMobile(mediaQuery.matches);
      setVideoFailed(false);
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const videoSrc = isMobile
    ? "/videos/ssstik.io_@sl0wguy_1774411355251.mp4"
    : "/videos/BMW M3 Competition - 4K Cinematic Short Video.mp4";

  useEffect(() => {
    if (isLoaded && videoRef.current) {
      videoRef.current.play().catch(() => setVideoFailed(true));
    }
  }, [isLoaded, videoSrc]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
        <video
          key={videoSrc}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          onError={() => setVideoFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {videoFailed && <div className="fixed inset-0 z-5 bg-[#0e0e0e]" />}

      <div className="fixed inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.72)_100%)]" />
    </motion.div>
  );
}
