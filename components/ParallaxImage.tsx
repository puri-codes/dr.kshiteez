'use client';

import React from 'react';
import { useParallax } from '../hooks/useParallax';

interface Props {
  src: string;
  alt?: string;
  speed?: number;
}

export const ParallaxImage: React.FC<Props> = ({ src, alt = '', speed = 0.16 }) => {
  const { ref, style } = useParallax(speed);

  return (
    <div ref={ref} style={style} className="w-full aspect-[4/3] md:aspect-[3/2] bg-gray-100 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
      />
    </div>
  );
};

export default ParallaxImage;
