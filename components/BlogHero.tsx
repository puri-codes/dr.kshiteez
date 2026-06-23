'use client';

import React from 'react';
import { Reveal } from './Reveal';
import { useAmbientBackground } from '../hooks/useAmbientBackground';

const heroHighlights = [
  'Patient-friendly explanations',
  'Orthopedic case notes and recovery guidance',
  'Practical advice for symptoms, treatment, and follow-up',
];

export const BlogHero: React.FC = () => {
  const { sectionRef, canvasRef } = useAmbientBackground();

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#F5F7FA] pt-32 pb-20 flex items-center"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-white/20 via-white/0 to-white/75" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="flex min-h-[calc(100svh-8rem)] items-center justify-center">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-widest mb-6 bg-white/60 px-4 py-1 rounded-full inline-flex backdrop-blur-sm">
                Clinical blogs
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mx-auto text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.92] font-bold text-[#1a36e8] tracking-tighter max-w-4xl">
                Orthopedic blogs written with clarity, care, and clinical depth.
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-gray-600">
                A focused reading space for patients, families, and anyone looking for grounded explanations around injuries, fractures, joint pain, rehabilitation, and surgical recovery.
              </p>
            </Reveal>

            <Reveal delay={260} className="mt-8 flex flex-wrap justify-center gap-3">
              {heroHighlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/75 px-4 py-2 text-sm text-gray-600 shadow-sm backdrop-blur-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-[#1a36e8]" />
                  {item}
                </span>
              ))}
            </Reveal>

            <Reveal delay={340} className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#blogs"
                className="group inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-800 hover:scale-105"
              >
                Browse articles
                <span className="h-2 w-2 rounded-full bg-white transition-transform duration-300 group-hover:scale-150" />
              </a>
              <a
                href="#footer-top"
                className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/70 px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-[#1a36e8]/25 hover:text-[#1a36e8] hover:bg-white"
              >
                Book consultation
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
