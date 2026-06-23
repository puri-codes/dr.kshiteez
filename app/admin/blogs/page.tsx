import { BlogAdminManager } from '../../../components/BlogAdminManager';

export default function AdminBlogsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#111827]">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="mb-10 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1a36e8]">Admin panel</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#0f172a]">Manage blog content and SEO</h1>
          <p className="max-w-3xl text-gray-600 leading-relaxed">
            Use this admin section to add, edit, feature, and remove blog posts. SEO fields and featured status are stored in Neon and reflected on the blog and home pages.
          </p>
        </div>

        <BlogAdminManager />
      </div>
    </div>
  );
}
