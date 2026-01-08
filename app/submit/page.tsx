'use client';

import { useState } from 'react';
import { AdSlot } from '@/components/AdSlot';

export default function SubmitPage() {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          author: author || 'Anonymous',
          honeypot,
          tags: [],
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: 'success',
          text: 'Thank you! Your joke has been submitted for review.',
        });
        setContent('');
        setAuthor('');
        setHoneypot('');
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to submit joke',
        });
      }
    } catch {
      setMessage({
        type: 'error',
        text: 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-viola-purple mb-8">Submit Your Joke</h1>

      <AdSlot position="top" />

      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Joke</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your viola joke..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-viola-purple focus:outline-none resize-none"
              rows={5}
              required
              minLength={10}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {content.length}/500 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name (optional)
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Anonymous"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-viola-purple focus:outline-none"
              maxLength={50}
            />
          </div>

          {/* Honeypot field - hidden from users */}
          <div className="hidden">
            <input
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              name="website"
              tabIndex={-1}
            />
          </div>

          <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
            <p>
              <strong>Note:</strong> Your joke will be reviewed before appearing on the site. We
              keep submissions family-friendly.
            </p>
          </div>

          {message && (
            <div
              className={`rounded-lg border px-4 py-3 ${
                message.type === 'success'
                  ? 'border-green-200 bg-green-50 text-green-800'
                  : 'border-red-200 bg-red-50 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || content.length < 10}
            className="w-full rounded-lg bg-viola-purple px-6 py-3 font-semibold text-white transition-colors hover:bg-viola-dark disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Joke'}
          </button>
        </form>
      </div>

      <div className="rounded-lg bg-gray-50 border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Guidelines</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ Keep jokes family-friendly and respectful</li>
          <li>✓ Be original or provide proper attribution</li>
          <li>✓ Jokes should be about viola or musicians</li>
          <li>✓ No spam, violence, or hateful content</li>
          <li>✓ Minimum 10 characters, maximum 500 characters</li>
        </ul>
      </div>

      <AdSlot position="bottom" />
    </div>
  );
}
