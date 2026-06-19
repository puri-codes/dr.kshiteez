import React from 'react';
import { Reveal } from './Reveal';

const projects = [
  {
    title: "SNAPX SERVICES",
    description: "Designed a clean, conversion-focused service website optimized for desktop and mobile. Focused on clarity, trust, and a smooth user journey from value to action.",
    image: "https://static.wixstatic.com/media/c837a6_d81ab00f9017464eab81628bc4b99bb6~mv2.jpg/v1/fill/w_590,h_391,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Uiux%20design%20web_Gemini%203.jpg",
    align: "right"
  },
  {
    title: "FLOWER SHOP",
    description: "Designed a clean, elegant flower shop e-commerce experience focused on smooth browsing and effortless checkout. The UI highlights product beauty while ensuring an intuitive purchase flow.",
    image: "https://static.wixstatic.com/media/c837a6_02c46201df784b84a51d0b4b21531271~mv2.jpg/v1/crop/x_482,y_0,w_2204,h_1462/fill/w_590,h_391,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Uiux%20design%20web_Gemini%203.jpg",
    align: "right"
  },
  {
    title: "BUSINESS SERVICE WEBSITE",
    description: "Designed a clean, conversion-focused website for a professional service company. The UX prioritizes clarity, trust, and a smooth content flow from value proposition to action.",
    image: "https://static.wixstatic.com/media/c837a6_5b8eaf14916c4c7ab61836516c7fa4ea~mv2.jpg/v1/fill/w_590,h_391,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Uiux%20design%20web_Gemini%203%20(Nano%20Banana%20Pro)_2026-04-27_13-59-12.jpg",
    align: "right"
  }
];

export const Work: React.FC = () => {
  return (
    <section id="work" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-3">
            <Reveal>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                02. WORK
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6">
            <Reveal delay={100}>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1a36e8] tracking-tight mb-6">
                Featured Projects
              </h3>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-gray-600 leading-relaxed max-w-md">
                A glimpse into my work. Crafting user-centric digital products that bridge the gap between complex problems and elegant interface solutions.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-3 flex justify-start md:justify-end items-start">
            <Reveal delay={300}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all duration-300 hover:scale-105"
              >
                Get in Touch
                <span className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-300"></span>
              </a>
            </Reveal>
          </div>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((project, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              {/* Text Content */}
              <div className="md:col-span-5 flex flex-col justify-center order-2 md:order-1">
                <Reveal delay={100}>
                  <h4 className="text-xl md:text-2xl font-medium text-gray-900 mb-4 uppercase tracking-wide">
                    {project.title}
                  </h4>
                </Reveal>
                <Reveal delay={200}>
                  <p className="text-gray-500 leading-relaxed">
                    {project.description}
                  </p>
                </Reveal>
              </div>

              {/* Image */}
              <div className="md:col-span-7 order-1 md:order-2">
                <Reveal delay={300} direction="left">
                  <div className="w-full aspect-[4/3] md:aspect-[3/2] bg-gray-100 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </Reveal>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
