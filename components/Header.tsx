import Link from 'next/link';
import { UserMenu } from './UserMenu';

export function Header() {
  return (
    <header className="border-b-2 border-viola-light bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <Link href="/" className="text-3xl font-bold text-viola-purple hover:text-viola-dark transition-colors">
              🎵 Viola Joke
            </Link>
            <p className="text-gray-600 text-sm mt-1">The world's no. 1 viola joke website</p>
          </div>
        </div>
        <nav className="flex gap-6 text-sm font-medium flex-wrap items-center">
          <Link href="/" className="text-gray-700 hover:text-viola-purple transition-colors">
            Home
          </Link>
          <Link href="/jokes" className="text-gray-700 hover:text-viola-purple transition-colors">
            Browse Jokes
          </Link>
          <Link href="/my-jokes" className="text-gray-700 hover:text-viola-purple transition-colors">
            My Jokes
          </Link>
          <Link href="/premium" className="text-gray-700 hover:text-viola-accent transition-colors font-bold">
            ✨ Premium
          </Link>
          <Link href="/submit" className="text-gray-700 hover:text-viola-purple transition-colors">
            Submit
          </Link>
          <div className="border-l border-gray-300 pl-6">
            <UserMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
