'use client';

import { useEffect, useState } from 'react';
import { Joke } from '@/lib/jokes-db';
import { JokeCard } from '@/components/JokeCard';
import { useRouter } from 'next/navigation';

interface AdminPageProps {
  searchParams: {
    token?: string;
  };
}

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthed(true);
        loadSubmissions();
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Authentication failed');
    } finally {
      setLoading(false);
      setPassword('');
    }
  };

  const loadSubmissions = async () => {
    try {
      const res = await fetch('/api/admin/submissions');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch {
      setError('Failed to load submissions');
    }
  };

  const handleApprove = async (jokeId: string) => {
    try {
      const res = await fetch(`/api/admin/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jokeId }),
      });

      if (res.ok) {
        loadSubmissions();
      }
    } catch {
      setError('Failed to approve joke');
    }
  };

  const handleDelete = async (jokeId: string) => {
    if (!confirm('Delete this submission?')) return;

    try {
      const res = await fetch(`/api/admin/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jokeId }),
      });

      if (res.ok) {
        loadSubmissions();
      }
    } catch {
      setError('Failed to delete joke');
    }
  };

  if (!isAuthed) {
    return (
      <div className="container mx-auto max-w-md px-4 py-12">
        <h1 className="text-2xl font-bold text-viola-purple mb-8">Admin Panel</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-viola-purple focus:outline-none"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-viola-purple px-4 py-2 font-semibold text-white transition-colors hover:bg-viola-dark disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-viola-purple">Admin Panel</h1>
        <button
          onClick={() => setIsAuthed(false)}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Pending Submissions ({submissions.length})
        </h2>

        {submissions.length === 0 ? (
          <p className="text-gray-600">No pending submissions</p>
        ) : (
          <div className="space-y-4">
            {submissions.map((joke) => (
              <div key={joke.id} className="border border-gray-200 rounded-lg p-4">
                <JokeCard joke={joke} showAuthor showTags={false} />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleApprove(joke.id)}
                    className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleDelete(joke.id)}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                  >
                    ✕ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
