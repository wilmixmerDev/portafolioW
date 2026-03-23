"use client";

import { useEffect, useRef, useState } from "react";

export default function ParticleText({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  // Sync state to ref for animation loop
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let cw = canvas.width;
    let ch = canvas.height;

    class Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      vx: number;
      vy: number;
      size: number;
      friction: number;
      ease: number;

      constructor(x: number, y: number) {
        this.targetX = x;
        this.targetY = y;
        // Start randomly scattered
        this.x = Math.random() * cw;
        this.y = Math.random() * ch;
        // Random drift velocities for scattered state
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 1; // slightly larger particles
        this.friction = 0.94 + Math.random() * 0.03; // Much slower, graceful glide
        this.ease = 0.01 + Math.random() * 0.015; // Very soft magnetic pull
      }

      update(isAssembling: boolean) {
        if (isAssembling) {
          // Move towards target
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          this.vx += dx * this.ease;
          this.vy += dy * this.ease;
          this.vx *= this.friction; 
          this.vy *= this.friction;
        } else {
          // Drift aimlessly
          this.vx *= 1.002; 
          this.vy *= 1.002;
          
          if (this.vx > 1.5) this.vx = 1.5;
          if (this.vx < -1.5) this.vx = -1.5;
          if (this.vy > 1.5) this.vy = 1.5;
          if (this.vy < -1.5) this.vy = -1.5;

          if (Math.random() < 0.01) {
            this.vx += (Math.random() - 0.5) * 0.5;
            this.vy += (Math.random() - 0.5) * 0.5;
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        if (!isAssembling) {
          if (this.x < -50 || this.x > cw + 50) this.vx *= -1;
          if (this.y < -50 || this.y > ch + 50) this.vy *= -1;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "rgba(255, 255, 255, 0.85)"; // Brighter particles
        context.beginPath();
        context.rect(this.x, this.y, this.size, this.size);
        context.fill();
      }
    }

    const init = () => {
      // Set fixed high-res internal size, CSS will scale it down
      cw = 1400; // Wider to fit larger text
      ch = 300;
      canvas.width = cw;
      canvas.height = ch;

      // Draw text offscreen to get pixels
      ctx.fillStyle = "white";
      ctx.font = "900 180px Inter, system-ui, sans-serif"; // Heavily bolded and larger font
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      
      // Calculate text width to center it
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const startX = (cw - textWidth) / 2;
      
      ctx.fillText(text, startX, ch / 2);

      const imageData = ctx.getImageData(0, 0, cw, ch);
      const data = imageData.data;

      particles = [];

      // Create particles from opaque pixels (every 4th pixel for performance)
      for (let y = 0; y < ch; y += 4) {
        for (let x = 0; x < cw; x += 4) {
          const index = (y * cw + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) { // If pixel is mostly opaque
            particles.push(new Particle(x, y));
          }
        }
      }

      // Clear the text after reading pixels
      ctx.clearRect(0, 0, cw, ch);
    };

    const animate = () => {
      ctx.clearRect(0, 0, cw, ch);

      const isAssembling = isHoveredRef.current;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(isAssembling);
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [text]);

  return (
    <div 
      ref={containerRef} 
      className="w-full relative cursor-crosshair h-[12vw] sm:h-[10vw] md:h-[150px] scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-contain block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
      />
    </div>
  );
}
