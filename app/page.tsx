import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Expertise } from '../components/Expertise';
import { Blogs } from '../components/Blogs';
import { Experience } from '../components/Experience';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { getFeaturedBlogPosts } from '../lib/blog';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const featuredPosts = await getFeaturedBlogPosts(3);

  return (
    <div className="min-h-screen bg-white text-[#171717] font-sans selection:bg-[#1a36e8] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Blogs posts={featuredPosts} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
