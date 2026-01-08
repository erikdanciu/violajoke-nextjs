'use client';

export function DonateButton() {
  const handleDonate = () => {
    // Open donation modal or redirect to payment
    alert('Thank you for supporting viola music! Donate button integration coming soon. You can support via PayPal, Ko-fi, or Patreon.');
  };

  return (
    <button
      onClick={handleDonate}
      className="rounded-lg bg-gradient-to-r from-viola-purple to-viola-accent px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:from-viola-dark hover:to-rose-600"
    >
      ❤️ Donate to Support Violists
    </button>
  );
}
