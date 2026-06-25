"use client";

import { useEffect, useRef, useState } from "react";

/**
 * BMW Roundel rendered entirely from particles.
 * Particles drift aimlessly when idle and snap to roundel shape on hover,
 * with a smooth, springy easing.
 */
export default function BMWParticleRoundel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveredRef = useRef(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    isHoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");

    const updateTouchMode = () => {
      const touchMode = mediaQuery.matches;
      setIsTouchDevice(touchMode);
      if (!touchMode) {
        setHovered(false);
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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 160; // canvas px
    const CX = SIZE / 2;
    const CY = SIZE / 2;
    const R_OUTER = 72;
    const R_INNER = 46;
    const R_THIN  = 75;

    let animId: number;

    // ─── Collect target positions from the roundel geometry ─────────────
    type Pt = { x: number; y: number; color: string };
    const targets: Pt[] = [];
    const STEP = 4.5;

    const inRing = (x: number, y: number) => {
      const d = Math.hypot(x - CX, y - CY);
      return d >= R_INNER && d <= R_OUTER;
    };
    const inThin = (x: number, y: number) => {
      const d = Math.hypot(x - CX, y - CY);
      return d >= R_THIN - 1.5 && d <= R_THIN + 1.5;
    };
    // Quadrant: top-right & bottom-left are "white" (light)
    const inWhiteQuadrant = (x: number, y: number) => {
      // BMW standard: top-right white, top-left blue, bottom-right blue, bottom-left white
      const dx = x - CX;
      const dy = y - CY;
      return (dx >= 0 && dy <= 0) || (dx <= 0 && dy >= 0);
    };

    // BMW M stripe colors for colored quadrant particles
    const BMW_COLORS = ["#00A2E8", "#10069F", "#E32118"];
    const pickColor = (x: number, y: number): string => {
      // Assign based on x-position for nice gradient feel on blue quads
      const norm = (x - CX + R_OUTER) / (2 * R_OUTER); // 0..1
      if (norm < 0.35) return BMW_COLORS[0];
      if (norm < 0.65) return BMW_COLORS[1];
      return BMW_COLORS[2];
    };

    for (let py = 0; py < SIZE; py += STEP) {
      for (let px = 0; px < SIZE; px += STEP) {
        if (inRing(px, py)) {
          const wq = inWhiteQuadrant(px, py);
          targets.push({ x: px, y: py, color: wq ? "rgba(255,255,255,0.9)" : pickColor(px, py) });
        }
        if (inThin(px, py)) {
          targets.push({ x: px, y: py, color: "rgba(255,255,255,0.35)" });
        }
      }
    }

    // ─── Particle class ──────────────────────────────────────────────────
    class Particle {
      x: number; y: number;
      tx: number; ty: number;
      vx = (Math.random() - 0.5) * 1.5;
      vy = (Math.random() - 0.5) * 1.5;
      color: string;
      size: number;
      friction = 0.96 + Math.random() * 0.02;
      ease    = 0.06 + Math.random() * 0.04; // snappy but smooth

      constructor(t: Pt) {
        this.tx = t.x; this.ty = t.y; this.color = t.color;
        this.x = Math.random() * SIZE;
        this.y = Math.random() * SIZE;
        this.size = 1.5 + Math.random() * 1;
      }

      update(assemble: boolean) {
        if (assemble) {
          const dx = this.tx - this.x;
          const dy = this.ty - this.y;
          this.vx += dx * this.ease;
          this.vy += dy * this.ease;
          this.vx *= this.friction;
          this.vy *= this.friction;
        } else {
          this.vx *= 1.001;
          this.vy *= 1.001;
          if (Math.random() < 0.008) {
            this.vx += (Math.random() - 0.5) * 0.4;
            this.vy += (Math.random() - 0.5) * 0.4;
          }
          this.vx = Math.max(-1.8, Math.min(1.8, this.vx));
          this.vy = Math.max(-1.8, Math.min(1.8, this.vy));
          // Wrap edges
          if (this.x < -8 || this.x > SIZE + 8) this.vx *= -1;
          if (this.y < -8 || this.y > SIZE + 8) this.vy *= -1;
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

    canvas.width  = SIZE;
    canvas.height = SIZE;
    const particles = targets.map((t) => new Particle(t));

    const IDLE_INTERVAL = 1000 / 30;
    let lastFrameTime = 0;

    const tick = (time: number) => {
      animId = requestAnimationFrame(tick);
      const assemble = isHoveredRef.current;
      if (!assemble && time - lastFrameTime < IDLE_INTERVAL) return;
      lastFrameTime = time;
      ctx.clearRect(0, 0, SIZE, SIZE);
      for (const p of particles) { p.update(assemble); p.draw(ctx); }
    };
    tick(0);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      className="relative cursor-crosshair"
      style={{ width: 120, height: 120 }}
      onMouseEnter={() => {
        if (!isTouchDevice) setHovered(true);
      }}
      onMouseLeave={() => {
        if (!isTouchDevice) setHovered(false);
      }}
      onTouchStart={(event) => {
        if (!isTouchDevice) return;
        event.preventDefault();
        setHovered((current) => !current);
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
