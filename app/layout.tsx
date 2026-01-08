import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/lib/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Viola Joke - Random viola jokes, memes & humor',
  description:
    'Laugh at the best viola jokes, memes and humor. Explore thousands of jokes about viola players, instruments, and classical music.',
  keywords: ['viola', 'jokes', 'humor', 'music', 'comedy', 'puns'],
  metadataBase: new URL('https://violajoke.com'),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    url: 'https://violajoke.com',
    title: 'Viola Joke - Random viola jokes & humor',
    description: 'Laugh at the best viola jokes and humor. Daily jokes about viola players.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Viola Joke',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viola Joke - Random viola jokes & humor',
    description: 'The best viola jokes and memes.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-rose-100">
        <AuthProvider>
          <Header />
          <div className="flex-1 flex">
            {/* Left Sidebar Ad */}
            <div className="hidden lg:block lg:w-40 px-2 py-4">
              <div className="sticky top-4">
                <div className="rounded-lg border-2 border-viola-light bg-white p-3">
                  <p className="text-xs text-gray-500 font-semibold mb-2">ADVERTISEMENT</p>
                  <div className="h-60 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                    Ad Space
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 max-w-4xl mx-auto w-full">{children}</main>

            {/* Right Sidebar Ad */}
            <div className="hidden lg:block lg:w-40 px-2 py-4">
              <div className="sticky top-4">
                <div className="rounded-lg border-2 border-viola-light bg-white p-3">
                  <p className="text-xs text-gray-500 font-semibold mb-2">ADVERTISEMENT</p>
                  <div className="h-60 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                    Ad Space
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
