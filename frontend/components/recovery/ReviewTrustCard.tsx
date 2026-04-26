// components/recovery/ReviewTrustCard.tsx

'use client';

interface ReviewTrustCardProps {
  review?: string;
}

export function ReviewTrustCard({
  review = '⭐ 4.8/5 from 1,240 verified buyers. Trusted quality and smooth delivery.',
}: ReviewTrustCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">
        Customer Confidence
      </p>

      <p className="text-sm text-gray-900 leading-6">
        {review}
      </p>

      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <span>✓ Verified Reviews</span>
        <span>•</span>
        <span>✓ Secure Checkout</span>
      </div>
    </div>
  );
}