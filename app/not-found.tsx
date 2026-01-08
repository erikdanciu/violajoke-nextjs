import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>

      <p className="text-gray-600 mb-8">
        Sorry, we couldn't find what you're looking for. Try browsing some jokes instead!
      </p>

      <div className="space-x-4">
        <Link
          href="/"
          className="inline-block rounded-lg bg-viola-purple px-6 py-3 font-semibold text-white transition-colors hover:bg-viola-dark"
        >
          Home
        </Link>
        <Link
          href="/jokes"
          className="inline-block rounded-lg bg-viola-light px-6 py-3 font-semibold text-viola-dark transition-colors hover:bg-viola-purple hover:text-white"
        >
          Browse Jokes
        </Link>
      </div>
    </div>
  );
}
