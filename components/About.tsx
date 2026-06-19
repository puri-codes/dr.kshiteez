import React from 'react';
import { Reveal } from './Reveal';

export const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen bg-white flex items-center">
      <div className="w-full px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-12 lg:gap-20">
          {/* Section Title and Heading */}
          <div className="flex-1">
            <Reveal>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">
                ABOUT — ORTHOPEDIC SURGEON NEPAL
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium text-[#1a36e8] leading-tight tracking-tight">
                I am Dr. Kshiteez Puri, an Orthopedic Surgeon in Nepal and Kathmandu specializing in bone & joint care, knee and hip replacements, sports injury treatment, and fracture management.
              </h3>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-6 text-gray-600 max-w-xl">
                Offering trusted medical consultation in Nepal, personalized treatment plans, and specialist orthopedic services for patients across Kathmandu, Lalitpur, Pokhara and beyond.
              </p>
            </Reveal>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <Reveal delay={300}>
              <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden">
                <img 
                  src="images/pic3.jpeg" 
                  alt="Dr. Kshiteez Puri Potrait" 
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
