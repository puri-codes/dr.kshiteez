'use client';

import React, { useEffect, useMemo, useState } from 'react';

interface ContentSection {
  heading: string;
  items: string[];
  imageUrl?: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  summary: string;
  intro: string;
  contentSections: ContentSection[];
  imageUrl: string;
  bannerImageUrl: string;
  readTime: string;
  featured: boolean;
  isPublished: boolean;
  publishedAt: string | null;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  canonicalUrl: string;
  metaRobots: string;
}

type ImageFieldKey = 'imageUrl' | 'bannerImageUrl';

const emptyBlog: Omit<BlogPost, 'id'> = {
  title: '',
  slug: '',
  category: '',
  tags: [],
  summary: '',
  intro: '',
  contentSections: [],
  imageUrl: '',
  bannerImageUrl: '',
  readTime: '',
  featured: false,
  isPublished: false,
  publishedAt: null,
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  canonicalUrl: '',
  metaRobots: 'index, follow',
};

function classNames(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export const BlogAdminManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Omit<BlogPost, 'id'>>(emptyBlog);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<ImageFieldKey | null>(null);
  const [uploadingSectionIndex, setUploadingSectionIndex] = useState<number | null>(null);
  const [previewSections, setPreviewSections] = useState<string[]>([]);

  // Split keywords states
  const [primaryKeyword, setPrimaryKeyword] = useState('');
  const [secondaryKeywords, setSecondaryKeywords] = useState('');

  const selectedPost = useMemo(
    () => posts.find((post) => post.id === selectedId) ?? null,
    [posts, selectedId]
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedPost) {
      setFormState({
        title: selectedPost.title,
        slug: selectedPost.slug,
        category: selectedPost.category,
        tags: selectedPost.tags,
        summary: selectedPost.summary,
        intro: selectedPost.intro,
        contentSections: selectedPost.contentSections,
        imageUrl: selectedPost.imageUrl,
        bannerImageUrl: selectedPost.bannerImageUrl,
        readTime: selectedPost.readTime,
        featured: selectedPost.featured,
        isPublished: selectedPost.isPublished,
        publishedAt: selectedPost.publishedAt,
        seoTitle: selectedPost.seoTitle,
        seoDescription: selectedPost.seoDescription,
        seoKeywords: selectedPost.seoKeywords,
        canonicalUrl: selectedPost.canonicalUrl,
        metaRobots: selectedPost.metaRobots,
      });
      setPreviewSections(selectedPost.contentSections.map((section) => section.heading));

      // Load split keywords
      const keywordsList = selectedPost.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean);
      setPrimaryKeyword(keywordsList[0] || '');
      setSecondaryKeywords(keywordsList.slice(1).join(', '));
    } else {
      setFormState(emptyBlog);
      setPreviewSections([]);
      setPrimaryKeyword('');
      setSecondaryKeywords('');
    }
  }, [selectedPost]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/blogs');
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      setPosts(data.posts);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')     // Remove non-alphanumeric (except spaces/hyphens)
      .replace(/[\s_]+/g, '-')       // Replace spaces/underscores with hyphens
      .replace(/-+/g, '-');          // Remove duplicate hyphens
  };

  const handleTitleChange = (title: string) => {
    setFormState((prev) => {
      const slug = generateSlug(title);
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://drkshiteezpuri.com';
      return {
        ...prev,
        title,
        // Auto fill slug, seoTitle, and canonicalUrl
        slug: slug,
        seoTitle: title,
        canonicalUrl: `${origin}/blogs/${slug}`,
      };
    });
  };

  const handleSlugChange = (slugValue: string) => {
    const formattedSlug = generateSlug(slugValue);
    setFormState((prev) => {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://drkshiteezpuri.com';
      return {
        ...prev,
        slug: formattedSlug,
        canonicalUrl: `${origin}/blogs/${formattedSlug}`,
      };
    });
  };

  const handleSummaryChange = (summary: string) => {
    setFormState((prev) => ({
      ...prev,
      summary,
      // Auto fill SEO description from summary
      seoDescription: summary,
    }));
  };

  const handlePublishChange = (checked: boolean) => {
    setFormState((prev) => ({
      ...prev,
      isPublished: checked,
      // Meta robots auto fill based on publication status
      metaRobots: checked ? 'index, follow' : 'noindex, nofollow',
    }));
  };

  const handleChange = (key: keyof Omit<BlogPost, 'id'>, value: string | boolean | string[]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSectionChange = (index: number, field: 'heading' | 'items' | 'imageUrl', value: string) => {
    setFormState((prev) => {
      const sections = [...prev.contentSections];
      if (!sections[index]) {
        sections[index] = { heading: '', items: [], imageUrl: '' };
      }
      if (field === 'heading') {
        sections[index].heading = value;
      } else if (field === 'imageUrl') {
        sections[index].imageUrl = value;
      } else {
        sections[index].items = value.split('\n').map((item) => item.trim()).filter(Boolean);
      }
      return { ...prev, contentSections: sections };
    });
  };

  const handleAddSection = () => {
    setFormState((prev) => ({
      ...prev,
      contentSections: [...prev.contentSections, { heading: '', items: [], imageUrl: '' }],
    }));
  };

  const handleRemoveSection = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      contentSections: prev.contentSections.filter((_, idx) => idx !== index),
    }));
  };

  const handleSectionImageUpload = async (index: number, file: File) => {
    setError(null);
    setUploadingSectionIndex(index);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/blog-images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      handleSectionChange(index, 'imageUrl', data.image.imageUrl);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploadingSectionIndex(null);
    }
  };

  const handleSelectPost = (id: string) => {
    setSelectedId(id);
  };

  const handleNewPost = () => {
    setSelectedId(null);
  };

  const handleImageUpload = async (field: ImageFieldKey, file: File) => {
    setError(null);
    setUploadingField(field);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/blog-images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      handleChange(field, data.image.imageUrl);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      // Re-compile split keywords
      const combinedKeywords = [
        primaryKeyword.trim(),
        ...secondaryKeywords.split(',').map((k) => k.trim()).filter(Boolean),
      ].filter(Boolean).join(', ');

      const payload = {
        ...formState,
        tags: formState.tags.filter(Boolean),
        seoKeywords: combinedKeywords,
        metaRobots: formState.isPublished ? 'index, follow' : 'noindex, nofollow',
        contentSections: formState.contentSections.map((section) => ({
          heading: section.heading,
          items: section.items.filter(Boolean),
          imageUrl: section.imageUrl || '',
        })),
      };

      const url = selectedId ? `/api/admin/blogs/${selectedId}` : '/api/admin/blogs';
      const method = selectedId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      await fetchPosts();
      setSelectedId(null);
      setFormState(emptyBlog);
      setPrimaryKeyword('');
      setSecondaryKeywords('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/blogs/${selectedId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      await fetchPosts();
      setSelectedId(null);
      setFormState(emptyBlog);
      setPrimaryKeyword('');
      setSecondaryKeywords('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-8">
      <div className="space-y-6 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1a36e8]">Blog list</p>
            <h2 className="text-xl font-semibold text-[#0f172a]">Existing posts</h2>
          </div>
          <button
            type="button"
            onClick={handleNewPost}
            className="rounded-full bg-[#1a36e8] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1226c7]"
          >
            New Post
          </button>
        </div>

        {loading ? (
          <div className="p-6 text-gray-500">Loading posts...</div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">{error}</div>
        ) : posts.length === 0 ? (
          <div className="p-6 text-gray-500">No blog posts found.</div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <button
                key={post.id}
                type="button"
                onClick={() => handleSelectPost(post.id)}
                className={classNames(
                  'w-full rounded-3xl border px-4 py-4 text-left transition',
                  selectedId === post.id
                    ? 'border-[#1a36e8] bg-[#eff6ff]'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                )}
              >
                <p className="font-semibold text-[#111827]">{post.title}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {post.category}
                  {post.category && post.readTime ? ' · ' : ''}
                  {post.readTime}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">Blog editor</p>
              <h2 className="text-2xl font-semibold text-[#111827]">{selectedId ? 'Edit post' : 'Create new post'}</h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              {selectedId && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={saving}
                  className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || uploadingField !== null}
                className="rounded-full bg-[#1a36e8] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1226c7] disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save post'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Title</span>
              <input
                value={formState.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Slug</span>
              <input
                value={formState.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
                placeholder="post-title-url"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Category</span>
              <input
                value={formState.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Read time</span>
              <input
                value={formState.readTime}
                onChange={(e) => handleChange('readTime', e.target.value)}
                className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
                placeholder="5 min read"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Featured</span>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formState.featured}
                  onChange={(e) => handleChange('featured', e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-[#1a36e8] focus:ring-[#1a36e8]"
                />
                <span className="text-sm text-gray-600">Show on index page</span>
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Published</span>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formState.isPublished}
                  onChange={(e) => handlePublishChange(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-[#1a36e8] focus:ring-[#1a36e8]"
                />
                <span className="text-sm text-gray-600">Make this blog live</span>
              </div>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Tags</span>
            <input
              value={formState.tags.join(', ')}
              onChange={(e) => handleChange('tags', e.target.value.split(',').map((tag) => tag.trim()))}
              className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
              placeholder="orthopedics, recovery, sport"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Summary</span>
            <textarea
              value={formState.summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Intro paragraph</span>
            <textarea
              value={formState.intro}
              onChange={(e) => handleChange('intro', e.target.value)}
              rows={4}
              className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Banner image URL</span>
              <input
                value={formState.bannerImageUrl}
                onChange={(e) => handleChange('bannerImageUrl', e.target.value)}
                className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
                placeholder="/images/blog-banner.jpg"
              />
              <div className="mt-3 space-y-2">
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      void handleImageUpload('bannerImageUrl', file);
                      event.target.value = '';
                    }
                  }}
                  disabled={saving || uploadingField === 'bannerImageUrl'}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#1a36e8] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#1226c7] disabled:opacity-50"
                />
                <p className="text-xs leading-relaxed text-gray-500">
                  Upload from device or paste a URL. JPEG and PNG uploads are compressed before Neon storage.
                </p>
                {formState.bannerImageUrl && (
                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <img src={formState.bannerImageUrl} alt="Banner preview" className="h-40 w-full object-cover" />
                  </div>
                )}
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Card image URL</span>
              <input
                value={formState.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
                placeholder="/images/blog.jpg"
              />
              <div className="mt-3 space-y-2">
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      void handleImageUpload('imageUrl', file);
                      event.target.value = '';
                    }
                  }}
                  disabled={saving || uploadingField === 'imageUrl'}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#1a36e8] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#1226c7] disabled:opacity-50"
                />
                <p className="text-xs leading-relaxed text-gray-500">
                  Upload from device or paste a URL. JPEG and PNG uploads are compressed before Neon storage.
                </p>
                {formState.imageUrl && (
                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <img src={formState.imageUrl} alt="Card preview" className="h-40 w-full object-cover" />
                  </div>
                )}
              </div>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Featured SEO title (Automated)</span>
            <input
              value={formState.seoTitle}
              onChange={(e) => handleChange('seoTitle', e.target.value)}
              className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
              placeholder="Orthopedic blog title for search engines"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">SEO description (Automated)</span>
            <textarea
              value={formState.seoDescription}
              onChange={(e) => handleChange('seoDescription', e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
            />
          </label>

          {/* Keywords section with user directions split into Primary and Secondary */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr] bg-blue-50/30 p-5 rounded-3xl border border-blue-100/50">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Primary SEO Keyword</span>
              <p className="text-xs text-gray-500 mt-1">Specify exactly one primary keyword target for this post (e.g. <i>knee pain</i>).</p>
              <input
                value={primaryKeyword}
                onChange={(e) => setPrimaryKeyword(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
                placeholder="Primary keyword"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Secondary SEO Keywords</span>
              <p className="text-xs text-gray-500 mt-1">Add additional secondary keywords (comma-separated, no more than 4).</p>
              <input
                value={secondaryKeywords}
                onChange={(e) => setSecondaryKeywords(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
                placeholder="keyword 2, keyword 3, keyword 4"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Canonical URL (Automated)</span>
            <input
              value={formState.canonicalUrl}
              onChange={(e) => handleChange('canonicalUrl', e.target.value)}
              className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
              placeholder="https://example.com/blog/post-title"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Meta Robots (Automated)</span>
            <input
              value={formState.isPublished ? 'index, follow' : 'noindex, nofollow'}
              readOnly
              className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Set dynamically based on publication status: <b>index, follow</b> for live posts, and <b>noindex, nofollow</b> for drafts.
            </p>
          </label>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Preview sections</span>
              <textarea
                value={previewSections.join('\n')}
                onChange={(e) => setPreviewSections(e.target.value.split('\n').map((item) => item.trim()).filter(Boolean))}
                rows={3}
                className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
                placeholder="Section headings, one per line"
              />
            </label>
            <div className="rounded-3xl border border-gray-200 bg-[#f8fafc] p-4">
              <p className="text-sm font-semibold text-gray-700">SEO preview</p>
              <p className="mt-4 text-sm text-gray-500">Title</p>
              <p className="mt-1 text-base font-semibold text-gray-900">{formState.seoTitle || formState.title || 'Blog title goes here'}</p>
              <p className="mt-3 text-sm text-gray-500">{formState.seoDescription || formState.summary || 'SEO description goes here.'}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-400">
                {[
                  primaryKeyword.trim(),
                  ...secondaryKeywords.split(',').map((k) => k.trim()).filter(Boolean),
                ].filter(Boolean).join(', ') || 'SEO keywords'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-3xl border border-gray-200 bg-[#f8fafc] p-6 space-y-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Content section editor</h3>
                <p className="text-sm text-gray-500 mt-1">Add dynamic sections with headings, items, and custom images.</p>
              </div>

              {formState.contentSections.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center text-gray-500">
                  No sections added yet. Click &quot;Add Section&quot; below to begin.
                </div>
              ) : (
                <div className="space-y-6">
                  {formState.contentSections.map((section, idx) => (
                    <div key={idx} className="relative space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#1a36e8]">
                          Section {idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSection(idx)}
                          className="text-xs font-semibold text-red-600 hover:text-red-800 transition"
                        >
                          Remove Section
                        </button>
                      </div>

                      <label className="block">
                        <span className="text-sm font-medium text-gray-700">Section Heading</span>
                        <input
                          value={section.heading}
                          onChange={(e) => handleSectionChange(idx, 'heading', e.target.value)}
                          className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
                          placeholder="Section heading"
                        />
                      </label>

                      <label className="block">
                        <span className="text-sm font-medium text-gray-700">Items (one per line)</span>
                        <textarea
                          value={section.items.join('\n')}
                          onChange={(e) => handleSectionChange(idx, 'items', e.target.value)}
                          rows={4}
                          className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
                          placeholder="Bullet text separated by new lines"
                        />
                      </label>

                      <div className="border-t border-gray-100 pt-4">
                        <label className="block">
                          <span className="text-sm font-medium text-gray-700">Section Image URL (Optional)</span>
                          <input
                            value={section.imageUrl || ''}
                            onChange={(e) => handleSectionChange(idx, 'imageUrl', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
                            placeholder="/images/section-img.jpg"
                          />
                        </label>

                        <div className="mt-3 space-y-2">
                          <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (file) {
                                void handleSectionImageUpload(idx, file);
                                event.target.value = '';
                              }
                            }}
                            disabled={saving || uploadingSectionIndex === idx}
                            className="block w-full text-xs text-gray-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#1a36e8]/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[#1a36e8] hover:file:bg-[#1a36e8]/20 disabled:opacity-50"
                          />
                          <p className="text-xs text-gray-500">
                            Upload a specific image to display right after this content section.
                          </p>
                          {section.imageUrl && (
                            <div className="mt-3 relative max-w-xs overflow-hidden rounded-2xl border border-gray-200 bg-white">
                              <img src={section.imageUrl} alt={`Section ${idx + 1} preview`} className="h-32 w-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleSectionChange(idx, 'imageUrl', '')}
                                className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white hover:bg-black transition"
                                title="Remove section image"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Section Button moved below the content editor sections */}
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="group rounded-full bg-[#1a36e8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1226c7] shadow-sm flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Section</span>
                </button>
              </div>
            </div>
          </div>

          {error && <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        </div>
      </div>
    </div>
  );
};
