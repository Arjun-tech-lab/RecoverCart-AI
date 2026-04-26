// components/cart/ShippingOptions.tsx

'use client';

interface ShippingOptionsProps {
  selected: 'standard' | 'express' | null;
  onChange: (value: 'standard' | 'express') => void;
}

export function ShippingOptions({
  selected,
  onChange,
}: ShippingOptionsProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 mt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Shipping Options
      </h2>

      <div className="space-y-3">
        {/* Standard */}
        <button
          onClick={() => onChange('standard')}
          className={`w-full text-left rounded-xl border p-4 transition ${
            selected === 'standard'
              ? 'border-black bg-gray-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Standard Delivery
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Delivered in 4–6 business days
              </p>
            </div>

            <span className="text-sm font-semibold text-gray-900">
              ₹99
            </span>
          </div>
        </button>

        {/* Express */}
        <button
          onClick={() => onChange('express')}
          className={`w-full text-left rounded-xl border p-4 transition ${
            selected === 'express'
              ? 'border-black bg-gray-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Express Delivery
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Delivered in 1–2 business days
              </p>
            </div>

            <span className="text-sm font-semibold text-gray-900">
              ₹199
            </span>
          </div>
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Free standard shipping on orders above ₹5000
      </p>
    </div>
  );
}