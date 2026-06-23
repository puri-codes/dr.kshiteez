'use client';

import React, { useState, useEffect } from 'react';

export const ShareButtons: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="flex flex-col gap-4 border-l border-gray-100 pl-4">
      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Share</span>
      <a
        href={fbShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-500 hover:text-[#1a36e8] font-medium transition-colors"
      >
        Facebook
      </a>
      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-500 hover:text-[#1a36e8] font-medium transition-colors"
      >
        Twitter
      </a>
      <button
        onClick={handleCopy}
        className="text-left text-sm text-gray-500 hover:text-[#1a36e8] font-medium transition-colors focus:outline-none"
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
};
