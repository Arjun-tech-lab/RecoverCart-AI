// components/recovery/RecoveryOffer.tsx

'use client';

interface RecoveryOfferProps {
  title?: string;
  offer?: string;
  cta?: string;
  onAction?: () => void;
}

export function RecoveryOffer({
  title = 'Exclusive Offer',
  offer = 'Save more on this order today.',
  cta = 'Apply Now',
  onAction,
}: RecoveryOfferProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">
        Limited Time
      </p>

      <h3 className="text-base font-semibold text-gray-900">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2 leading-6">
        {offer}
      </p>

      <button
        onClick={onAction}
        className="w-full mt-4 rounded-xl bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition"
      >
        {cta}
      </button>
    </div>
  );
}