'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

/**
 * Interactive constellation field rendered on a 2D canvas.
 * - A drifting grid of particles connected by hairlines when close.
 * - Particles near the cursor are pushed outward and brighten (mouse warp).
 * - Pauses when scrolled off-screen; DPR-capped; rAF-driven.
 */
type P = { x: number; y: number; vx: number; vy: number; bx: number; by: number };

export default function AuroraCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let particles: P[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(110, Math.floor((w * h) / 14000));
      particles = Array.from({ length: density }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          bx: x,
          by: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // gentle drift around base point
        p.bx += p.vx;
        p.by += p.vy;
        if (p.bx < 0 || p.bx > w) p.vx *= -1;
        if (p.by < 0 || p.by > h) p.vy *= -1;

        // mouse repulsion
        const dx = p.bx - mouse.x;
        const dy = p.by - mouse.y;
        const dist = Math.hypot(dx, dy);
        const R = 150;
        if (dist < R) {
          const force = (1 - dist / R) * 18;
          p.x = p.bx + (dx / (dist || 1)) * force;
          p.y = p.by + (dy / (dist || 1)) * force;
        } else {
          p.x += (p.bx - p.x) * 0.08;
          p.y += (p.by - p.y) * 0.08;
        }
      }

      // connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            const alpha = (1 - d / 120) * 0.18;
            ctx.strokeStyle = `rgba(124,150,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // particles
      for (const p of particles) {
        const near = Math.hypot(p.bx - mouse.x, p.by - mouse.y) < 150;
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? 2.4 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = near ? 'rgba(34,211,238,0.9)' : 'rgba(180,190,255,0.55)';
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (raf) return;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => build();

    build();
    if (reduced) {
      // static single frame, no animation, no interaction
      draw();
      stop();
      return () => {};
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);
    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} className="h-full w-full" aria-hidden="true" />;
}