'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn, isFinePointer, prefersReducedMotion } from '@/lib/utils';

/** Perspective tilt toward the cursor with a subtle glare sweep. */
export default function TiltCard({
  children,
  className,
  max = 10,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const active = isFinePointer() && !prefersReducedMotion();

  const rotX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 18,
  });
  const rotY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 18,
  });
  const glareX = useTransform(px, [0, 1], ['0%', '100%']);

  const onMove = (e: React.MouseEvent) => {
    if (!active) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      className={cn('border-gradient bg-ink-card relative overflow-hidden rounded-2xl', className)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-30"
        style={{
          background: useTransform(
            glareX,
            (gx) =>
              `radial-gradient(300px circle at ${gx} 0%, rgba(255,255,255,0.10), transparent 60%)`
          ),
        }}
      />
      <div style={{ transform: 'translateZ(40px)' }}>{children}</div>
    </motion.div>
  );
}