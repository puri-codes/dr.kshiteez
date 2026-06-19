import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Expertise } from '../components/Expertise';
import { Blogs } from '../components/Blogs';
import { Experience } from '../components/Experience';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-[#171717] font-sans selection:bg-[#1a36e8] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
