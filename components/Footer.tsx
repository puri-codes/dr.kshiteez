import React from 'react';
import { Reveal } from './Reveal';

const FOOTER_KEYWORDS = [
  'Dr. Kshiteez Puri',
  'Kshiteez Puri',
  'Doctor in Nepal',
  'Best doctor in Nepal',
  'Experienced doctor in Nepal',
  'Medical specialist Nepal',
  'Healthcare expert Nepal',
  'Medical consultation Nepal',
  'Online doctor consultation Nepal',
  'Nepal healthcare services',
  'Specialist doctor Kathmandu',
  'Trusted doctor Nepal',
  'Doctor in Kathmandu',
  'Best doctor in Kathmandu',
  'Doctor in Lalitpur',
  'Doctor in Bhaktapur',
  'Specialist doctor in Pokhara',
  'Doctor near me Nepal',
  'Medical clinic Kathmandu',
  'Healthcare services Kathmandu',
  'Nepal medical center',
  'Hospital specialist Kathmandu',
  'Orthopedic surgeon Nepal',
  'Best orthopedic surgeon in Nepal',
  'Orthopedic doctor Kathmandu',
  'Bone specialist Nepal',
  'Joint specialist Kathmandu',
  'Sports injury specialist Nepal',
  'Trauma surgeon Nepal',
  'Knee replacement Nepal',
  'Hip replacement Nepal',
  'Fracture treatment Nepal',
  'Arthritis treatment Nepal',
  'Back pain specialist Nepal',
  'Spine specialist Nepal',
  'Orthopedic consultation Kathmandu',
  'Pediatric orthopedic surgeon Nepal',
  'Knee pain treatment Nepal',
  'Back pain treatment Kathmandu',
  'Joint pain specialist Nepal',
  'Fracture treatment Kathmandu',
  'Sports injury treatment Nepal',
  'Arthritis doctor Nepal',
  'Shoulder pain treatment Nepal',
  'Neck pain specialist Kathmandu',
  'Orthopedic surgery Nepal',
  'Bone and joint care Nepal',
  'Best orthopedic surgeon in Kathmandu',
  'Orthopedic consultation in Nepal',
  'Knee replacement surgeon Nepal',
  'Bone specialist near me',
  'Sports injury doctor Kathmandu',
  'Fracture specialist Nepal',
  'Arthritis treatment specialist Nepal',
  'Back pain doctor Kathmandu',
  'Joint replacement surgeon Nepal',
  'Orthopedic clinic Kathmandu',
  'Orthopedic Surgeon Nepal',
  'Orthopedic Surgeon Kathmandu',
  'Bone & Joint Specialist Nepal',
  'Knee Replacement Surgery Nepal',
  'Sports Injury Treatment Nepal',
  'Fracture Care Kathmandu',
  'Arthritis Treatment Nepal',
  'Back Pain Specialist Nepal',
];

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/dr-kshiteez-puri-9044a6251/',
    title: 'LinkedIn',
    label: 'in',
    svgPath: (
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    ),
  },
  {
    href: 'https://www.instagram.com/kshiteez7/',
    title: 'Instagram',
    label: 'ig',
    svgPath: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
    ),
  },
  {
    href: 'https://facebook.com/kshiteez2',
    title: 'Facebook',
    label: 'fb',
    svgPath: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    href: 'https://wa.me/9779866366061',
    title: 'WhatsApp',
    label: 'wa',
    svgPath: (
      <>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.506 3.945 1.396 5.614L0 24l6.618-1.883A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.96c-1.877 0-3.666-.434-5.267-1.201l-.378-.211-3.915 1.114.996-3.636-.242-.38C2.5 15.666 2.04 13.876 2.04 12c0-5.523 4.497-10.02 10.02-10.02 5.523 0 10.02 4.497 10.02 10.02 0 5.523-4.497 10.02-10.02 10.02z" />
        <path fill="#fff" d="M17.372 14.226c-.298-.15-1.762-.87-2.036-.968-.274-.1-.475-.15-.672.15-.2.3-.77.968-.944 1.167-.174.2-.348.225-.646.075-.298-.15-1.259-.463-2.397-1.476-.887-.79-1.486-1.768-1.66-2.066-.174-.299-.018-.46.13-.609.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.374-.025-.524-.075-.15-.672-1.62-.92-2.214-.24-.58-.485-.5-.672-.51-.173-.01-.372-.01-.57-.01-.2 0-.523.075-.796.375-.274.3-1.044 1.02-1.044 2.485 0 1.465 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.083 4.5.71.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.572-.086 1.763-.72 2.01-1.414.248-.694.248-1.289.174-1.414-.074-.124-.274-.2-.572-.348z" />
      </>
    ),
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-brand-light/40 pt-24 pb-8 font-sans">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1a36e8]/30 to-transparent" />
      <div className="absolute -top-24 right-[-8rem] h-64 w-64 rounded-full bg-[#1a36e8]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[-7rem] h-72 w-72 rounded-full bg-white/80 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Hidden keyword list for SEO across pages (visually hidden) */}
        <ul className="sr-only">
          {FOOTER_KEYWORDS.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <Reveal className="lg:col-span-3">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1a36e8]">
                  Dr. Kshiteez Puri
                </h2>
                <p className="max-w-md text-base leading-relaxed text-gray-600">
                  Orthopedic Surgeon focused on clear diagnosis, thoughtful treatment, and patient-first care.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl bg-white/70 shadow-sm backdrop-blur-sm">
              <img
                src="images/pic3.jpeg"
                alt="Dr. Kshiteez Puri portrait"
                className="h-[360px] w-full object-contain object-center"
              />
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-3">
            <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 md:p-8 shadow-sm backdrop-blur-sm">
              <h3 className="text-sm font-medium uppercase tracking-widest text-gray-500 mb-5">
                Reach Out
              </h3>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Phone:</span>{' '}
                  <a href="tel:+9779866366061" className="transition-colors hover:text-[#1a36e8]">
                    +977 9866366061
                  </a>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Email:</span>{' '}
                  <a
                    href="mailto:kshiteez_puri@outlook.com"
                    className="transition-colors hover:text-[#1a36e8]"
                  >
                    kshiteez_puri@outlook.com
                  </a>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Address:</span> Bairiya (R.N.P-10), Chitwan
                </p>
              </div>

              <div className="mt-6 h-px bg-gradient-to-r from-[#1a36e8]/20 via-gray-200 to-transparent" />

              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.title}
                    aria-label={link.title}
                    className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-widest text-gray-600 transition-all hover:border-[#1a36e8]/25 hover:text-[#1a36e8] hover:shadow-sm"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {link.svgPath}
                    </svg>
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-5 py-4">
                <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
                  Find the clinic
                </p>
              </div>
              <div className="h-56 md:h-64">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Dr. Kshiteez Puri Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.7497127686356!2d84.43254377551348!3d27.675318074206267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307e7e69%3A0x12345678!2sBharatpur%2C%20Chitwan%2044200!5e0!3m2!1sen!2snp!4v1234567890"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6">
          <Reveal delay={200} className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
            <p className="text-xs text-gray-500">
              &copy; 2026 Dr. Kshiteez Puri Orthopedic Surgeon
            </p>
            <p className="text-xs text-gray-400">
              A calm, clinical presence carried through every section of the site.
            </p>
          </Reveal>
        </div>
      </div>
    </footer>
  );
};
