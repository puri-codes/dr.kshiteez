import React from 'react';
import { Reveal } from './Reveal';
import { ParallaxImage } from './ParallaxImage';

const blogs = [
  {
    title: "Case Report - Myocystecercosis in Hand",
    description: "Published in Grande Medical Journal. A documented case report on myocystecercosis presenting in the hand.",
    image: "images/blog.jpg",
    align: "right"
  },
  {
    title: "Article - Minimally Invasive Carpal Tunnel Release",
    description: "A clinical article describing a minimally invasive approach to carpal tunnel release with patient outcomes and surgical tips.",
    image: "images/blog.jpg",   
    align: "left"
  },
  {
    title: "Review - Advances in Peripheral Nerve Repair",
    description: "A concise review covering recent techniques and biomaterials used in peripheral nerve repair and regeneration.",
    image: "images/blog.jpg",
    align: "right"
  }
];

export const Blogs: React.FC = () => {
  return (
    <section id="blogs" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
            <div className="md:col-span-3">
              <Reveal>
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                  BLOGS
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-6">
              <Reveal delay={100}>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1a36e8] tracking-tight mb-6">
                  Publications & Case Reports
                </h3>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-gray-600 leading-relaxed max-w-md">
                  Selected clinical publications and case reports documenting clinical experience and research in orthopedic surgery Nepal, sports injury treatment, fracture care and techniques in joint preservation and nerve repair.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-3 flex justify-start md:justify-end items-start">
              <Reveal delay={300}>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all duration-300 hover:scale-105"
                >
                  Coming Soon
                  <span className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                </a>
              </Reveal>
            </div>
          </div>

          {/* Blogs List */}
          <div className="flex flex-col gap-24 md:gap-32">
            {blogs.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-5 flex flex-col justify-center order-2 md:order-1">
                  <Reveal delay={100}>
                    <h4 className="text-xl md:text-2xl font-medium text-gray-900 mb-4 uppercase tracking-wide">
                      {item.title}
                    </h4>
                  </Reveal>
                  <Reveal delay={200}>
                    <p className="text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </Reveal>
                </div>

                <div className="md:col-span-7 order-1 md:order-2">
                  <Reveal delay={300} direction="left">
                    <ParallaxImage src={item.image} alt={item.title} speed={0.12 + index * 0.02} />
                  </Reveal>
                </div>

              </div>
            ))}
          </div>

      </div>
    </section>
  );
};
