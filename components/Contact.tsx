'use client';

import React from 'react';
import { Reveal } from './Reveal';
import { useAmbientBackground } from '../hooks/useAmbientBackground';

export const Contact: React.FC = () => {
  const { sectionRef, canvasRef } = useAmbientBackground();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative isolate py-32 md:py-48 overflow-hidden bg-[#F5F7FA]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-white/20 via-white/0 to-white/75" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl flex flex-col items-center text-center">
        
        <Reveal>
          <h2 className="text-sm font-medium text-gray-600 uppercase tracking-widest mb-6 bg-white/50 px-4 py-1 rounded-full inline-block backdrop-blur-sm">
            BOOK AN ORTHOPEDIC CONSULTATION
          </h2>
        </Reveal>
        
        <Reveal delay={100}>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1a36e8] tracking-tight mb-6 max-w-3xl leading-tight">
            Consultations in Kathmandu and Online — Knee, Joint & Back Pain Specialist Nepal
          </h3>
        </Reveal>

        <Reveal delay={150}>
          <p className="text-gray-600 max-w-2xl mb-8">
            To schedule an appointment for orthopedic consultation, knee replacement evaluation, sports injury treatment or fracture care, contact the clinic in Kathmandu or request an online doctor consultation across Nepal.
          </p>
        </Reveal>

        <Reveal delay={200} className="w-full">
          <form className="w-full flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col text-left">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2 ml-4">First name *</label>
                <input 
                  type="text" 
                  id="firstName" 
                  required
                  className="w-full bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a36e8]/50 transition-all"
                />
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2 ml-4">Last name *</label>
                <input 
                  type="text" 
                  id="lastName" 
                  required
                  className="w-full bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a36e8]/50 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col text-left">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 ml-4">Email *</label>
              <input 
                type="email" 
                id="email" 
                required
                className="w-full bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a36e8]/50 transition-all"
              />
            </div>

            <div className="flex flex-col text-left">
              <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 ml-4">Message</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a36e8]/50 transition-all resize-none"
              ></textarea>
            </div>

            <div className="mt-4">
              <button 
                type="submit" 
                className="w-full bg-black text-white font-medium rounded-full py-4 hover:bg-neutral-800 transition-colors duration-300 shadow-lg shadow-black/20"
              >
                Send
              </button>
            </div>

          </form>
        </Reveal>

      </div>
    </section>
  );
};
