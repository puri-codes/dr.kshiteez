import React from 'react';
import { Reveal } from './Reveal';

const expertiseData = [
  {
    title: "Orthopedic clinical examination & diagnosis",
    description: "Comprehensive musculoskeletal examination and formulation of differential diagnoses.",
    image: "images/clinical_examinations.jpg"
  },
  {
    title: "Fracture management & immobilization",
    description: "Closed and open fracture management techniques, casting, splinting, and fixation assistance.",
    image: "images/Fracture_management.jpg"
  },
  {
    title: "Trauma & emergency orthopedic care",
    description: "Acute trauma management, emergency operative assistance, and post-trauma rehabilitation planning.",
    image: "images/Trauma.jpg"
  }
];

export const Expertise: React.FC = () => {
  return (
    <section id="expertise" className="py-24 md:py-32 bg-brand-light/30">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <Reveal>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">
              EXPERTISE — ORTHOPEDIC SURGEON NEPAL
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1a36e8] tracking-tight">
              Core Competencies
            </h3>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-gray-600 max-w-2xl">
              Specialized orthopedic services: knee replacement surgery, hip replacement, sports injury treatment, spine and back pain management, arthritis care and fracture treatment across Kathmandu and Nepal.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertiseData.map((item, index) => (
            <Reveal key={index} delay={200 + (index * 100)} className="flex flex-col h-full">
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex-grow flex flex-col">
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-6 bg-gray-50">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </div>
                <div className="px-2 pb-4 flex-grow flex flex-col">
                  <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};
