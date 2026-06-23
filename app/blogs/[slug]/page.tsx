import type { Metadata } from 'next';
import { getBlogPostBySlug } from '../../../lib/blog';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { ShareButtons } from '../../../components/ShareButtons';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return { title: 'Blog not found', description: 'Blog post not found.' };
  }

  return {
    title: `${post.seoTitle || post.title} | Dr. Kshiteez Puri`,
    description: post.seoDescription || post.summary,
    keywords: post.seoKeywords.split(',').map((keyword) => keyword.trim()),
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    robots: post.metaRobots,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.summary,
      images: post.bannerImageUrl ? [{ url: post.bannerImageUrl, alt: post.title }] : undefined,
      type: 'article',
      url: post.canonicalUrl || undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-[#171717] font-sans selection:bg-[#1a36e8] selection:text-white">
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center max-w-xl">
          <h1 className="text-4xl font-semibold text-[#1a36e8] tracking-tight">Post not found</h1>
          <p className="mt-4 text-gray-500 leading-relaxed">The requested blog post does not exist or has been unpublished.</p>
          <div className="mt-8">
            <Link href="/blogs" className="inline-flex items-center gap-2 bg-[#1a36e8] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#1226c7] transition-all">
              &larr; Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Draft';

  return (
    <div className="min-h-screen bg-white text-[#171717] font-sans selection:bg-[#1a36e8] selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Breadcrumb navigation */}
          <div className="flex justify-center mb-6">
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-gray-400">
              <Link href="/blogs" className="hover:text-[#1a36e8] transition-colors">
                Blogs
              </Link>
              <span>&gt;</span>
              <span className="text-[#1a36e8] truncate max-w-[200px] sm:max-w-[300px]">
                {post.title}
              </span>
            </nav>
          </div>

          {/* Hero Section Format */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 block mb-4">
              {formattedDate}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#171717] leading-[1.1] mb-6">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto font-normal">
              {post.summary}
            </p>
          </div>

          {/* Full-width Centered Banner Image */}
          <div className="w-full max-w-5xl mx-auto mb-16 md:mb-24 overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm bg-gray-50 aspect-[16/9]">
            <img
              src={post.bannerImageUrl || post.imageUrl || '/images/blog.jpg'}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-5xl mx-auto">
            {/* Left Column: Share section */}
            <div className="lg:col-span-2 lg:sticky lg:top-28 h-fit">
              <ShareButtons />
            </div>

            {/* Center Column: Blog Main Content */}
            <div className="lg:col-span-7 space-y-12">
              {post.intro && (
                <p className="text-lg leading-relaxed text-gray-600 font-normal">
                  {post.intro}
                </p>
              )}

              <div className="space-y-12">
                {post.contentSections.map((section, index) => (
                  <div key={index} className="space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-medium text-[#171717] tracking-tight border-b border-gray-100 pb-3">
                      {section.heading}
                    </h2>
                    {section.items && section.items.length > 0 && (
                      <ul className="space-y-4 text-gray-600 text-base leading-relaxed">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="mt-2.5 h-2 w-2 rounded-full bg-[#1a36e8] flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.imageUrl && (
                      <div className="my-8 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
                        <img
                          src={section.imageUrl}
                          alt={section.heading}
                          className="w-full h-auto object-cover max-h-[400px]"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Details & Author Sidebar */}
            <div className="lg:col-span-3 space-y-8 lg:sticky lg:top-28 h-fit">
              {/* Details box */}
              <div className="rounded-3xl border border-gray-100 bg-brand-light/30 p-6 space-y-4 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block border-b border-gray-100 pb-2">
                  Details
                </span>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      Date
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      {formattedDate}
                    </span>
                  </div>
                  {post.category && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        Category
                      </span>
                      <span className="text-sm font-semibold text-gray-700">
                        {post.category}
                      </span>
                    </div>
                  )}
                  {post.readTime && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        Read Time
                      </span>
                      <span className="text-sm font-semibold text-gray-700">
                        {post.readTime}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Author box */}
              <div className="rounded-3xl border border-gray-100 bg-brand-light/30 p-6 space-y-4 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block border-b border-gray-100 pb-2">
                  Author
                </span>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                    <img
                      src="/images/pic3.jpeg"
                      alt="Dr. Kshiteez Puri"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-tight">
                      Dr. Kshiteez Puri
                    </h4>
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block">
                      Orthopedic Surgeon
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  Orthopedic Surgeon in Nepal specializing in joint replacement, sports injury treatments, and advanced fracture care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
