import React from 'react';
import type { BlogPost } from '../lib/blog';
import { Reveal } from './Reveal';
import { ParallaxImage } from './ParallaxImage';
import Link from 'next/link';

interface BlogsProps {
  posts: BlogPost[];
}

export const Blogs: React.FC<BlogsProps> = ({ posts }) => {
  const displayedPosts = posts.slice(0, 3);

  return (
    <section id="blogs" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
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
                href="/blogs"
                className="group inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all duration-300 hover:scale-105"
              >
                Read All Blogs
                <span className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-300"></span>
              </a>
            </Reveal>
          </div>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {displayedPosts.length === 0 ? (
            <div className="rounded-[2rem] border border-gray-100 bg-white p-10 text-center text-gray-500 shadow-sm">
              No published blog posts are available at the moment.
            </div>
          ) : (
            displayedPosts.map((item, index) => {
              const reversed = index % 2 === 1;

              return (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                  <div className={`md:col-span-5 flex flex-col justify-center order-2 md:order-1 ${reversed ? 'md:order-2' : ''}`}>
                    <Reveal delay={100}>
                      <Link href={`/blogs/${item.slug}`} className="hover:text-[#1a36e8] transition-colors">
                        <h4 className="text-xl md:text-2xl font-medium text-gray-900 mb-4 uppercase tracking-wide hover:text-[#1a36e8] transition-colors">
                          {item.title}
                        </h4>
                      </Link>
                    </Reveal>
                    <Reveal delay={200}>
                      <p className="text-gray-500 leading-relaxed mb-4">
                        {item.summary}
                      </p>
                    </Reveal>
                    <Reveal delay={260}>
                      <p className="text-sm uppercase tracking-[0.24em] text-gray-400 mb-4">
                        {item.category} · {item.readTime}
                      </p>
                    </Reveal>
                    <Reveal delay={280}>
                      <Link
                        href={`/blogs/${item.slug}`}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-[#1a36e8] hover:text-[#1226c7] transition-colors"
                      >
                        Read Full Article
                        <span className="inline-block transition-transform group-hover:translate-x-1 duration-200">
                          &rarr;
                        </span>
                      </Link>
                    </Reveal>
                  </div>

                  <div className={`md:col-span-7 order-1 md:order-2 ${reversed ? 'md:order-1' : ''}`}>
                    <Reveal delay={300} direction="left">
                      <Link
                        href={`/blogs/${item.slug}`}
                        className="block rounded-[2rem] overflow-hidden hover:scale-[1.01] transition-transform duration-300 shadow-sm"
                      >
                        <ParallaxImage src={item.imageUrl || '/images/blog.jpg'} alt={item.title} speed={0.12 + index * 0.02} />
                      </Link>
                    </Reveal>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
