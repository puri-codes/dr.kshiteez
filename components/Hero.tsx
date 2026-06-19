'use client';

import React from 'react';
import { Reveal } from './Reveal';
import { useAmbientBackground } from '../hooks/useAmbientBackground';

export const Hero: React.FC = () => {
  const { sectionRef, canvasRef } = useAmbientBackground();

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate min-h-[100svh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-[#F5F7FA]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-white/20 via-white/0 to-white/75" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center w-full max-w-7xl">
        
        {/* Main Title */}
        <Reveal delay={100} className="w-full text-center mb-12">
          <h1 className="text-[12vw] md:text-[10vw] lg:text-[140px] leading-[0.85] font-bold text-[#1a36e8] tracking-tighter uppercase">
            Dr. Kshiteez Puri
          </h1>
        </Reveal>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Physician',
          name: 'Dr. Kshiteez Puri',
          medicalSpecialty: 'Orthopedics',
          description: 'Orthopedic Surgeon Nepal — Bone & Joint Specialist. Knee replacement, sports injury treatment, fracture care and arthritis management. Consultations available in Kathmandu and online. Offering trusted medical consultation in Nepal, personalized treatment plans, and specialist orthopedic services for patients across Kathmandu, Lalitpur, Pokhara and beyond.',
          serviceType: ['Knee replacement', 'Sports injury treatment', 'Fracture care', 'Arthritis management'],
          areaServed: ['Kathmandu', 'Lalitpur', 'Pokhara', 'Nepal', 'Online'],
          sameAs: [
            'https://www.linkedin.com/in/dr-kshiteez-puri-9044a6251/',
            'https://www.instagram.com/kshiteez7/',
            'https://facebook.com/kshiteez2'
          ]
        }) }} />

        {/* Subtitles & CTA Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-end mt-8">
          
          {/* Left Subtitle */}
          <Reveal delay={300} direction="right" className="text-left">
            <p className="text-gray-600 text-sm md:text-base max-w-[250px] leading-relaxed">
              Specialized in the diagnosis, treatment, and surgical management of musculoskeletal conditions and trauma.
            </p>
          </Reveal>

          {/* Center Subtitle */}
          <Reveal delay={400} className="text-center flex justify-center">
            <p className="text-gray-500 text-sm md:text-base max-w-[300px] leading-relaxed">
             Dedicated to advancing orthopedic healthcare through clinical practice, research, and medical education.
            </p>
          </Reveal>

          {/* Right CTA */}
          <Reveal delay={500} direction="left" className="flex justify-start md:justify-end">
            <a 
              href="#contact" 
              className="group inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all duration-300 hover:scale-105"
            >
              Reach Me Out
              <span className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-300"></span>
            </a>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
