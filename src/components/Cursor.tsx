'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { isFinePointer, prefersReducedMotion } from '@/lib/utils';

/**
 * Custom magnetic cursor: a small dot + a larger trailing ring that grows and
 * inverts (mix-blend) over interactive elements. Only on fine pointers.
 *
 * Over injected third-party widgets (the Tyashin chatbot — DOM prefixed
 * `aapas-`) or any iframe, we HIDE the custom cursor and restore the real OS
 * cursor. Otherwise the chatbot's high z-index occludes the custom cursor,
 * leaving nothing visible over the chat (the native cursor is globally hidden),
 * which makes the launcher bubble hard to aim and click.
 */
const WIDGET_SELECTOR = '[class*="aapas-"],[id*="aapas-"],[class*="chat-widget"],iframe';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [hidden, setHidden] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    setEnabled(true);
    const root = document.documentElement;
    root.classList.add('cursor-none-fine');

    // Toggle the global native-cursor-hide class only when it actually changes.
    let nativeShown = false;
    const showNative = (show: boolean) => {
      if (show === nativeShown) return;
      nativeShown = show;
      root.classList.toggle('cursor-none-fine', !show);
      setHidden(show);
    };

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      const onWidget = !!el?.closest(WIDGET_SELECTOR);
      showNative(onWidget); // over chatbot/iframe → real cursor, custom hidden
      setHovering(!onWidget && !!el?.closest("a, button, [data-cursor='hover']"));
    };
    const downHandler = () => setDown(true);
    const upHandler = () => setDown(false);
    // Pointer entering an iframe (or leaving the window) fires mouseout with a
    // null relatedTarget — restore the native cursor so it's never invisible.
    const outHandler = (e: MouseEvent) => {
      if (e.relatedTarget === null) showNative(true);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', downHandler);
    window.addEventListener('mouseup', upHandler);
    document.addEventListener('mouseout', outHandler);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', downHandler);
      window.removeEventListener('mouseup', upHandler);
      document.removeEventListener('mouseout', outHandler);
      root.classList.remove('cursor-none-fine');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* center dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ x, y }}
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          opacity: hidden ? 0 : down ? 0.4 : 1,
          backgroundColor: hovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
    </>
  );
}
