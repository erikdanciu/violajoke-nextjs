import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-8 mt-12">
      <div className="container mx-auto max-w-2xl px-4 text-center text-sm text-gray-600">
        <nav className="mb-4 space-x-6">
          <Link href="/jokes" className="hover:text-viola-purple transition-colors">
            Browse
          </Link>
          <Link href="/submit" className="hover:text-viola-purple transition-colors">
            Submit Joke
          </Link>
          <a
            href="/sitemap.xml"
            className="hover:text-viola-purple transition-colors"
          >
            Sitemap
          </a>
          <a
            href="/feed.xml"
            className="hover:text-viola-purple transition-colors"
          >
            RSS Feed
          </a>
        </nav>
        <p>
          © {new Date().getFullYear()} Viola Joke. A celebration of viola humor. Made with ♪
        </p>
      </div>
    </footer>
  );
}
