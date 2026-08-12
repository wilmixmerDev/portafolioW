"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ParticleText — renders text AND a BMW roundel in the same canvas.
 * All particles drift when idle; on hover they converge to their targets.
 *
 * BMW Roundel geometry (matched to reference):
 *  - 3 white circle strokes: outer border, outer ring edge, inner circle edge
 *  - Horizontal + vertical white cross inside inner circle
 *  - Top-right & Bottom-left quadrants filled with white particles
 *  - Top-left & Bottom-right quadrants empty (black bg shows through = correct)
 */
export default function ParticleText({ text }: { text: string }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  useEffect(() => { isHoveredRef.current = isHovered; }, [isHovered]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");

    const updateTouchMode = () => {
      const touchMode = mediaQuery.matches;
      setIsTouchDevice(touchMode);
      if (!touchMode) {
        setIsHovered(false);
      }
    };

    updateTouchMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateTouchMode);
      return () => mediaQuery.removeEventListener("change", updateTouchMode);
    }

    mediaQuery.addListener(updateTouchMode);
    return () => mediaQuery.removeListener(updateTouchMode);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animId: number;

    const CW = 1700;
    const CH = 300;
    canvas.width  = CW;
    canvas.height = CH;

    const WHITE = "rgba(255,255,255,0.88)";
    const WHITE_DIM = "rgba(255,255,255,0.35)";

    // ── Particle class ─────────────────────────────────────────────────────
    class Particle {
      x: number; y: number;
      tx: number; ty: number;
      vx: number; vy: number;
      color: string;
      size: number;
      friction: number;
      ease: number;

      constructor(tx: number, ty: number, color: string) {
        this.tx = tx; this.ty = ty; this.color = color;
        this.x  = Math.random() * CW;
        this.y  = Math.random() * CH;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size     = Math.random() * 2 + 1;
        this.friction = 0.92 + Math.random() * 0.04;
        this.ease     = 0.025 + Math.random() * 0.02;
      }

      update(assemble: boolean) {
        if (assemble) {
          this.vx += (this.tx - this.x) * this.ease;
          this.vy += (this.ty - this.y) * this.ease;
          this.vx *= this.friction;
          this.vy *= this.friction;
        } else {
          this.vx *= 1.002;
          this.vy *= 1.002;
          this.vx = Math.max(-1.5, Math.min(1.5, this.vx));
          this.vy = Math.max(-1.5, Math.min(1.5, this.vy));
          if (Math.random() < 0.01) {
            this.vx += (Math.random() - 0.5) * 0.5;
            this.vy += (Math.random() - 0.5) * 0.5;
          }
          if (this.x < -50 || this.x > CW + 50) this.vx *= -1;
          if (this.y < -50 || this.y > CH + 50) this.vy *= -1;
        }
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(c: CanvasRenderingContext2D) {
        c.fillStyle = this.color;
        c.beginPath();
        c.rect(this.x, this.y, this.size, this.size);
        c.fill();
      }
    }

    // ── 1. Text particles ──────────────────────────────────────────────────
    ctx.fillStyle    = "white";
    ctx.font         = "900 180px Inter, system-ui, sans-serif";
    ctx.textAlign    = "left";
    ctx.textBaseline = "middle";

    const textWidth  = ctx.measureText(text).width;
    const ROUNDEL_SPACE = 270; // reserve space for roundel on right
    const startX = Math.max(20, (CW - ROUNDEL_SPACE - textWidth) / 2);

    ctx.fillText(text, startX, CH / 2);

    const imageData = ctx.getImageData(0, 0, CW, CH);
    const pxData    = imageData.data;
    ctx.clearRect(0, 0, CW, CH);

    const S = 4; // text sample step
    for (let py = 0; py < CH; py += S) {
      for (let px = 0; px < CW; px += S) {
        if (pxData[(py * CW + px) * 4 + 3] > 128) {
          particles.push(new Particle(px, py, WHITE));
        }
      }
    }

    // ── 2. BMW Roundel particles ───────────────────────────────────────────
    //
    // Structure (matching the reference logo):
    //   R_BORDER  = outermost thin circle
    //   R_OUTER   = outer edge of the black ring  (just inside border)
    //   R_INNER   = inner edge of the black ring  (inner circle)
    //
    //   Ring band:  R_INNER < dist < R_OUTER  → NO PARTICLES (dark ring)
    //   3 circle strokes:                     → white particles
    //   Inside inner circle (dist < R_INNER):
    //     cross (|dx| or |dy| < 3)            → white
    //     top-right quad (dx>0, dy<0)          → white (filled)
    //     bottom-left quad (dx<0, dy>0)        → white (filled)
    //     top-left & bottom-right              → NO particles (dark)

    const textEndX = startX + textWidth;
    const R_BORDER = 110;
    const R_OUTER  = 105;
    const R_INNER  = 66;
    const STROKE   = 2.5; // half-width of circle strokes

    const RCX = Math.min(CW - R_BORDER - 15, textEndX + 30 + R_BORDER);
    const RCY = CH / 2;

    const RS = 3; // roundel sample step (finer for detail)

    for (let py = Math.floor(RCY - R_BORDER - 4); py <= RCY + R_BORDER + 4; py += RS) {
      for (let px = Math.floor(RCX - R_BORDER - 4); px <= RCX + R_BORDER + 4; px += RS) {
        const dx   = px - RCX;
        const dy   = py - RCY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // ① Outermost thin border circle
        if (Math.abs(dist - R_BORDER) <= STROKE) {
          particles.push(new Particle(px, py, WHITE_DIM));
          continue;
        }

        // ② Outer ring edge circle
        if (Math.abs(dist - R_OUTER) <= STROKE) {
          particles.push(new Particle(px, py, WHITE));
          continue;
        }

        // ③ Inner circle edge
        if (Math.abs(dist - R_INNER) <= STROKE) {
          particles.push(new Particle(px, py, WHITE));
          continue;
        }

        // Inside inner circle — cross + white quadrants
        if (dist < R_INNER - STROKE) {
          // Cross divider (horizontal + vertical line)
          if (Math.abs(dx) <= STROKE || Math.abs(dy) <= STROKE) {
            particles.push(new Particle(px, py, WHITE));
            continue;
          }

          // White filled quadrants: top-right (dx>0, dy<0) & bottom-left (dx<0, dy>0)
          if ((dx > 0 && dy < 0) || (dx < 0 && dy > 0)) {
            particles.push(new Particle(px, py, WHITE));
          }
          // Top-left & bottom-right → no particles (dark background shows = correct)
        }
      }
    }

    // ── Animation loop ─────────────────────────────────────────────────────
    // Cuando idle corre a 30 fps para ahorrar CPU; cuando hover a 60 fps.
    const IDLE_INTERVAL = 1000 / 30;
    let lastFrameTime = 0;

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
      const assembling = isHoveredRef.current;
      if (!assembling && time - lastFrameTime < IDLE_INTERVAL) return;
      lastFrameTime = time;
      ctx.clearRect(0, 0, CW, CH);
      for (const p of particles) { p.update(assembling); p.draw(ctx); }
    };

    animate(0);
    return () => cancelAnimationFrame(animId);
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="relative h-[24vw] w-[110%] -translate-x-[5%] cursor-crosshair scale-105 sm:h-[10vw] sm:w-full sm:translate-x-0 md:h-[clamp(8.5rem,10.5vw,14rem)]"
      onMouseEnter={() => {
        if (!isTouchDevice) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (!isTouchDevice) setIsHovered(false);
      }}
      onTouchStart={(event) => {
        if (!isTouchDevice) return;
        event.preventDefault();
        setIsHovered((current) => !current);
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute left-1/2 top-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain mask-[radial-gradient(ellipse_at_center,black_62%,transparent_100%)]"
      />
    </div>
  );
}
