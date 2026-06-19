'use client';

import React, { useEffect, useRef, useState } from 'react';

export function useParallax(speed = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({ transform: 'translateY(0px)' });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const elemCenter = rect.top + rect.height / 2;
      const offset = elemCenter - windowHeight / 2;
      const translate = -offset * speed;
      setStyle({ transform: `translateY(${translate}px)`, willChange: 'transform' });
    };

    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return { ref, style } as const;
}
