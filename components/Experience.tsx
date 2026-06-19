import React from 'react';
import { Reveal } from './Reveal';

const experiences = [
  {
    company: "Grande International Hospital",
    role: "Orthopedics Trainee / Resident | Duration: 3 years",
    description: "Evaluation and management of orthopedic OPD and IPD patients; exposure to trauma, fracture management, emergency care; assisted in elective and emergency surgeries; pre- and post-operative patient management."
  },
  {
    company: "NBMS - Orthopedics",
    role: "National Board of Medical Specialist (Equivalent to TU) | Completed: 2025",
    description: "Specialist training in orthopedics completed at Grande International Hospital."
  },
  {
    company: "Taishan Medical University",
    role: "MBBS | 2012 - 2018",
    description: "Undergraduate medical training (MBBS)."
  }
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 md:py-32 bg-brand-light/30">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Header */}
          <div className="md:col-span-4">
            <Reveal>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">
                EXPERIENCE — ORTHOPEDIC CARE NEPAL
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="text-4xl md:text-5xl font-medium text-[#1a36e8] tracking-tight">
                Professional Journey
              </h3>
            </Reveal>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Physician',
              name: 'Dr. Kshiteez Puri',
              description: 'Clinical and surgical experience in orthopedic practice, trauma and fracture care, joint replacement and sports injury management in Kathmandu and regional centers across Nepal.',
              medicalSpecialty: 'Orthopedics',
              areaServed: ['Kathmandu', 'Nepal']
            }) }} />
          </div>

          {/* Timeline */}
          <div className="md:col-span-8 flex flex-col gap-6">
            {experiences.map((exp, index) => (
              <Reveal key={index} delay={200 + (index * 100)}>
                <div className="bg-white/60 backdrop-blur-sm border border-white rounded-2xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start hover:bg-white transition-colors duration-300">
                  
                  <div>
                    <h4 className="text-2xl font-medium text-[#1a36e8] mb-2">
                      {exp.company}
                    </h4>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1a36e8] flex-shrink-0"></span>
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        {exp.role}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-5 border-l border-transparent">
                      {exp.description}
                    </p>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
