// components/recovery/PriceComparison.tsx

'use client';

interface PriceComparisonProps {
  ourPrice?: number;
  marketPrice?: number;
}

export function PriceComparison({
  ourPrice = 4999,
  marketPrice = 5499,
}: PriceComparisonProps) {
  const savings = marketPrice - ourPrice;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-3">
        Smart Price Check
      </p>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Market Average</span>
          <span className="text-gray-900 font-medium">
            ₹{marketPrice}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Our Price</span>
          <span className="text-gray-900 font-semibold">
            ₹{ourPrice}
          </span>
        </div>

        <div className="h-px bg-gray-100" />

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-900 font-medium">
            You Save
          </span>

          <span className="text-green-600 font-semibold">
            ₹{savings}
          </span>
        </div>
      </div>
    </div>
  );
}