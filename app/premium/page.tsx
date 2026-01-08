import { Metadata } from 'next';
import Link from 'next/link';
import { ViolaSoundPlayer } from '@/components/ViolaSoundPlayer';
import { TuneButton } from '@/components/TuneButton';
import { AdSlot } from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Premium Viola Features | Viola Joke',
  description: 'Unlock premium features: high-volume sounds, baroque tuning, and exclusive content.',
  openGraph: {
    title: 'Premium Viola Features',
    description: 'Get premium access to enhanced viola tools and features',
    url: 'https://violajoke.com/premium',
  },
};

export default function PremiumPage() {
  // Mock premium features - would be connected to payment in production
  const isPremium = false; // Set to true if user has active subscription

  const premiumFeatures = [
    {
      title: '🔊 High-Volume Sounds',
      description: 'Crystal clear, high-quality viola recordings at maximum volume',
      included: true,
    },
    {
      title: '🎼 Baroque Tuning Button',
      description: 'A=415 Hz for authentic Baroque period tuning',
      included: true,
    },
    {
      title: '✨ Exclusive Joke Access',
      description: 'Premium-only viola jokes and content',
      included: true,
    },
    {
      title: '🎵 Advanced Sound Library',
      description: 'Access to 100+ professional viola recordings',
      included: true,
    },
    {
      title: '📊 Performance Analytics',
      description: 'Track your practice sessions and improvement',
      included: true,
    },
    {
      title: '🎓 Tuning Guides',
      description: 'Detailed guides for different tuning systems',
      included: true,
    },
  ];

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-viola-purple mb-4">✨ Premium Edition</h1>
        <p className="text-xl text-gray-600">Unlock exclusive features for viola enthusiasts</p>
      </div>

      {!isPremium && (
        <div className="rounded-xl bg-gradient-to-r from-viola-purple to-viola-accent p-8 mb-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Upgrade Now</h2>
          <p className="text-lg mb-6">Get unlimited access to premium features</p>
          <div className="text-4xl font-bold mb-6">Lifetime Viola Fan<div className="text-2xl mt-2">Full Access: $4.99</div></div>
          <button className="rounded-lg bg-white text-viola-purple px-8 py-3 font-bold text-lg transition-all hover:shadow-lg">
            Start 7-Day Free Trial
          </button>
          <p className="text-sm mt-4 opacity-90">Cancel anytime. No credit card required.</p>
        </div>
      )}

      <AdSlot position="top" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {premiumFeatures.map((feature) => (
          <div
            key={feature.title}
            className="rounded-lg border-2 border-viola-light bg-white p-6"
          >
            <h3 className="text-lg font-bold text-viola-purple mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
            {feature.included && !isPremium && (
              <p className="text-xs text-viola-accent font-semibold mt-3">Premium Only</p>
            )}
            {isPremium && (
              <p className="text-xs text-green-600 font-semibold mt-3">✓ Unlocked</p>
            )}
          </div>
        ))}
      </div>

      {isPremium && (
        <>
          <div className="space-y-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-viola-purple mb-4">🎵 Tuning Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TuneButton audioUrl="/audio/440hz.mp3" />
                <TuneButton audioUrl="/audio/415hz-baroque.mp3" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-viola-purple mb-4">
                🎻 Premium Sound Library
              </h2>
              <ViolaSoundPlayer
                soundUrls={[
                  '/audio/viola-1.mp3',
                  '/audio/viola-2.mp3',
                  '/audio/viola-3.mp3',
                ]}
                premiumMode={true}
              />
            </div>
          </div>
        </>
      )}

      {!isPremium && (
        <div className="rounded-lg bg-viola-light p-8 text-center mb-12">
          <h2 className="text-2xl font-bold text-viola-dark mb-4">
            Free User Features
          </h2>
          <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
            <li>✓ Browse unlimited viola jokes</li>
            <li>✓ Submit your own jokes</li>
            <li>✓ Search and filter jokes</li>
            <li>✓ Access basic tuning tool (440 Hz only)</li>
            <li>✓ Basic sound player</li>
          </ul>
          <button className="rounded-lg bg-viola-purple px-8 py-3 font-bold text-white transition-all hover:bg-viola-dark">
            Upgrade to Premium
          </button>
        </div>
      )}

      <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-600">Yes! Cancel your subscription at any time with no penalties.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">We accept all major credit cards, PayPal, and Apple Pay.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Is there a free trial?</h3>
            <p className="text-gray-600">Yes! Try premium features free for 7 days.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">What if I don't like premium?</h3>
            <p className="text-gray-600">Email support@violajoke.com and we'll refund your money within 30 days.</p>
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <Link
          href="/"
          className="inline-block rounded-lg bg-viola-purple px-6 py-3 font-semibold text-white transition-all hover:bg-viola-dark"
        >
          ← Back to Home
        </Link>
      </div>

      <AdSlot position="bottom" />
    </div>
  );
}
