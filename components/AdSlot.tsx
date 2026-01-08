'use client';

interface AdSlotProps {
  position?: 'top' | 'middle' | 'bottom';
}

export function AdSlot({ position = 'middle' }: AdSlotProps) {
  const enabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';

  if (!enabled) {
    return null;
  }

  return (
    <div
      className="my-8 rounded-lg border border-gray-300 bg-gray-100 p-4 text-center text-sm text-gray-600"
      data-ad-slot={position}
    >
      <p>Advertisement space</p>
      {/* Wire to Google AdSense or other provider */}
      {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}
    </div>
  );
}
