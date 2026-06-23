'use client';

import React, { useState } from 'react';

export default function AdminLoginPage() {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || 'Login failed');
      }

      window.location.href = '/admin/blogs';
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#1a36e8]">Admin login</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#111827]">Access blog management</h1>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Enter your admin secret to manage blog posts, featured articles, and SEO attributes stored in Neon.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Admin Secret</span>
            <input
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1a36e8] focus:outline-none"
              type="password"
              placeholder="Enter admin secret"
              required
            />
          </label>

          {error && <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-3xl bg-[#1a36e8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1429d6] disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
