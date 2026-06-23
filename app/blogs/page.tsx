import type { Metadata } from 'next';
import React from 'react';
import { Navbar } from '../../components/Navbar';
import { BlogHero } from '../../components/BlogHero';
import { Reveal } from '../../components/Reveal';
import { ParallaxImage } from '../../components/ParallaxImage';
import { getFeaturedBlogPosts, getPublishedBlogPosts } from '../../lib/blog';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blogs | Dr. Kshiteez Puri',
  description:
    'Professional orthopedic blogs with patient-friendly guidance on knee pain, fractures, sports injuries, arthritis, and recovery planning.',
};

export default async function BlogsPage() {
  const featuredPosts = await getFeaturedBlogPosts(3);
  const allPosts = await getPublishedBlogPosts();
  const detailedArticles = allPosts.filter((post) => !post.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-[#171717] font-sans selection:bg-[#1a36e8] selection:text-white">
      <Navbar />

      <main>
        <BlogHero />

        {/* Featured Blogs Section */}
        <section id="blogs" className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
              <div className="md:col-span-3">
                <Reveal>
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                    FEATURED BLOGS
                  </h2>
                </Reveal>
              </div>
              <div className="md:col-span-7">
                <Reveal delay={100}>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1a36e8] tracking-tight mb-6">
                    Featured reads for patients and families
                  </h3>
                </Reveal>
                <Reveal delay={180}>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">
                    These posts are written to feel approachable without losing the clinical precision that matters when someone is deciding whether to rest, seek care, or begin rehabilitation.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="flex flex-col gap-24 md:gap-28">
              {featuredPosts.length === 0 ? (
                <div className="rounded-[2rem] border border-gray-100 bg-white p-10 text-center text-gray-500 shadow-sm">
                  No featured blog posts are published yet.
                </div>
              ) : (
                featuredPosts.map((post, index) => {
                  const reversed = index % 2 === 1;

                  return (
                    <div key={post.id} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                      <div className={`md:col-span-5 flex flex-col justify-center order-2 md:order-1 ${reversed ? 'md:order-2' : ''}`}>
                        <Reveal delay={100}>
                          <Link href={`/blogs/${post.slug}`} className="hover:text-[#1a36e8] transition-colors">
                            <h4 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-4 uppercase tracking-wide hover:text-[#1a36e8] transition-colors leading-tight">
                              {post.title}
                            </h4>
                          </Link>
                        </Reveal>
                        <Reveal delay={200}>
                          <p className="text-gray-500 leading-relaxed mb-4">
                            {post.summary}
                          </p>
                        </Reveal>
                        <Reveal delay={260}>
                          <p className="text-sm uppercase tracking-[0.24em] text-gray-400 mb-4 font-semibold">
                            {post.category} · {post.readTime}
                          </p>
                        </Reveal>
                        <Reveal delay={280}>
                          <Link
                            href={`/blogs/${post.slug}`}
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
                            href={`/blogs/${post.slug}`}
                            className="block rounded-[2rem] overflow-hidden hover:scale-[1.01] transition-transform duration-300 shadow-sm"
                          >
                            <ParallaxImage
                              src={post.imageUrl || '/images/blog.jpg'}
                              alt={post.title}
                              speed={0.12 + index * 0.02}
                            />
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

        {/*
        <section id="blog-detail" className="py-24 md:py-32 bg-brand-light/30">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
              <div className="lg:col-span-3">
                <Reveal>
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                    DETAILED BLOGS
                  </h2>
                </Reveal>
              </div>
              <div className="lg:col-span-7">
                <Reveal delay={100}>
                  <h3 className="text-4xl md:text-5xl font-medium text-[#1a36e8] tracking-tight mb-6">
                    Deeper reads with practical takeaways
                  </h3>
                </Reveal>
                <Reveal delay={160}>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">
                    Each article below expands on a common orthopedic concern and shows how to think about symptoms, next steps, and safe recovery in a way that feels usable in everyday life.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-7 flex flex-col gap-16">
                {detailedArticles.length === 0 ? (
                  <div className="rounded-[2rem] border border-gray-100 bg-white p-10 text-gray-500 shadow-sm text-center">
                    No additional published blog posts are available yet.
                  </div>
                ) : (
                  detailedArticles.map((article, index) => {
                    const reversed = index % 2 === 1;

                    return (
                      <div key={article.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className={`md:col-span-6 flex flex-col justify-center order-2 md:order-1 ${reversed ? 'md:order-2' : ''}`}>
                          <Reveal delay={100}>
                            <Link href={`/blogs/${article.slug}`} className="hover:text-[#1a36e8] transition-colors">
                              <h4 className="text-xl md:text-2xl font-medium text-gray-900 mb-3 uppercase tracking-wide hover:text-[#1a36e8] transition-colors leading-tight">
                                {article.title}
                              </h4>
                            </Link>
                          </Reveal>
                          <Reveal delay={200}>
                            <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-3">
                              {article.summary}
                            </p>
                          </Reveal>
                          <Reveal delay={260}>
                            <p className="text-xs uppercase tracking-[0.24em] text-gray-400 mb-3 font-semibold">
                              {article.category} · {article.readTime}
                            </p>
                          </Reveal>
                          <Reveal delay={280}>
                            <Link
                              href={`/blogs/${article.slug}`}
                              className="group inline-flex items-center gap-2 text-xs font-semibold text-[#1a36e8] hover:text-[#1226c7] transition-colors"
                            >
                              Read Full Article
                              <span className="inline-block transition-transform group-hover:translate-x-1 duration-200">
                                &rarr;
                              </span>
                            </Link>
                          </Reveal>
                        </div>

                        <div className={`md:col-span-6 order-1 md:order-2 ${reversed ? 'md:order-1' : ''}`}>
                          <Reveal delay={300} direction="left">
                            <Link
                              href={`/blogs/${article.slug}`}
                              className="block rounded-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-300 shadow-sm"
                            >
                              <img
                                src={article.imageUrl || '/images/blog.jpg'}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                              />
                            </Link>
                          </Reveal>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="lg:col-span-5">
                <Reveal delay={120}>
                  <div className="lg:sticky lg:top-28 rounded-[2rem] border border-gray-100 bg-[#1a36e8] p-6 md:p-8 text-white shadow-sm">
                    <p className="text-sm font-medium uppercase tracking-widest text-white/70 mb-4">
                      Need direct advice?
                    </p>
                    <h4 className="text-2xl font-medium tracking-tight mb-4">
                      If a symptom is changing, it is worth getting it reviewed.
                    </h4>
                    <p className="text-white/80 leading-relaxed mb-6">
                      Blogs are helpful for orientation, but a live assessment is the best next step when pain, swelling, instability, or recovery is not following the expected pattern.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="tel:+9779866366061"
                        className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-[#1a36e8] transition-transform hover:scale-105"
                      >
                        Call now
                      </a>
                      <a
                        href="mailto:kshiteez_puri@outlook.com"
                        className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/15"
                      >
                        Email clinic
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
         Detailed Blogs Section */}

        {/* Footer Top Promo */}
        <section id="footer-top" className="relative overflow-hidden bg-white py-24 md:py-28">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1a36e8]/30 to-transparent" />
          <div className="absolute -top-24 right-[-8rem] h-64 w-64 rounded-full bg-[#1a36e8]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-[-7rem] h-72 w-72 rounded-full bg-white/80 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <Reveal>
              <div className="rounded-[2rem] border border-gray-100 bg-brand-light/40 p-8 md:p-12 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8">
                    <p className="text-sm font-medium uppercase tracking-widest text-gray-500 mb-4">
                      Consultation
                    </p>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#1a36e8] tracking-tight mb-5">
                      Need help deciding what the next step should be?
                    </h3>
                    <p className="max-w-2xl text-gray-600 leading-relaxed">
                      Whether it&apos;s knee pain, a fracture review, sports injury recovery, or another orthopedic concern, a structured consultation is the clearest way to move forward.
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-4">
                    <a
                      href="tel:+9779866366061"
                      className="group inline-flex items-center justify-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-800 hover:scale-105"
                    >
                      Call +977 9866366061
                      <span className="h-2 w-2 rounded-full bg-white transition-transform duration-300 group-hover:scale-150" />
                    </a>
                    <a
                      href="mailto:kshiteez_puri@outlook.com"
                      className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-[#1a36e8]/25 hover:text-[#1a36e8]"
                    >
                      kshiteez_puri@outlook.com
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
