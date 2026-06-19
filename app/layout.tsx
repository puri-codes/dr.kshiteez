import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import './globals.css';

const KEYWORDS = [
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

export const metadata: Metadata = {
  title: 'Dr. Kshiteez Puri',
  description:
    'Dr. Kshiteez Puri — Orthopedic Surgeon. Orthopedic Surgeon Nepal, Orthopedic Surgeon Kathmandu, Bone & Joint Specialist Nepal. Services: knee replacement, sports injury treatment, fracture care, arthritis treatment, back pain treatment and consultations in Kathmandu and across Nepal.',
  keywords: KEYWORDS,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="keywords" content={KEYWORDS.join(', ')} />
        <meta name="author" content="Dr. Kshiteez Puri" />
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-[#171717] font-sans selection:bg-[#1a36e8] selection:text-white overflow-x-hidden">
        <Script
          id="tailwind-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      brand: {
                        blue: '#1a36e8',
                        dark: '#171717',
                        muted: '#666666',
                        light: '#f4f5f7'
                      }
                    },
                    fontFamily: {
                      sans: ['Inter', 'sans-serif'],
                    },
                    letterSpacing: {
                      tighter: '-0.04em',
                      tight: '-0.02em',
                    }
                  }
                }
              }
            `,
          }}
        />
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <Script
          id="physician-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Physician',
              name: 'Dr. Kshiteez Puri',
              medicalSpecialty: 'Orthopedics',
              description:
                'Orthopedic Surgeon in Nepal providing knee replacement, sports injury treatment, fracture care, arthritis and back pain treatments. Available for consultations in Kathmandu and across Nepal.',
              telephone: '+9779866366061',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bairiya (R.N.P-10), Chitwan',
                addressCountry: 'NP',
              },
              sameAs: [
                'https://www.linkedin.com/in/dr-kshiteez-puri-9044a6251/',
                'https://www.instagram.com/kshiteez7/',
                'https://facebook.com/kshiteez2',
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
