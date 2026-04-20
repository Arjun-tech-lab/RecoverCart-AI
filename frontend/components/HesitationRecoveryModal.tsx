'use client';

import { useState } from 'react';
import { X, TrendingDown, Truck, Lock, Clock } from 'lucide-react';

interface HesitationRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  hesitationScore: number;
  timeOnCart: number;
  subtotal: number;
  shippingOption: string | null;
}

export function HesitationRecoveryModal({
  isOpen,
  onClose,
  hesitationScore,
  timeOnCart,
  subtotal,
}: HesitationRecoveryModalProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  if (!isOpen) return null;

  const reasons = [
    {
      id: 'price',
      icon: TrendingDown,
      label: 'Price concerns',
      action: 'Unlock 15% discount',
    },
    {
      id: 'shipping',
      icon: Truck,
      label: 'Shipping cost',
      action: 'Check free delivery',
    },
    {
      id: 'payment',
      icon: Lock,
      label: 'Payment security',
      action: 'Secure checkout info',
    },
    {
      id: 'deciding',
      icon: Clock,
      label: 'Still deciding',
      action: 'Save cart for later',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Need help checking out?
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Choose what’s stopping you.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">

          {/* Score */}
          <div className="mb-5">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-500">Checkout Confidence</span>
              <span className="font-medium text-gray-700">
                {100 - Math.min(hesitationScore, 100)}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-black"
                style={{
                  width: `${100 - Math.min(hesitationScore, 100)}%`,
                }}
              />
            </div>

            <p className="text-xs text-gray-400 mt-2">
              {timeOnCart}s in cart
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <button
                  key={reason.id}
                  onClick={() => setSelectedReason(reason.id)}
                  className={`w-full border rounded-xl p-3 text-left transition ${
                    selectedReason === reason.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex gap-3">
                    <Icon className="w-5 h-5 text-gray-600 mt-0.5" />

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {reason.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {reason.action}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic Box */}
          {selectedReason === 'price' && (
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3">
              <p className="text-sm font-semibold text-green-800">
                15% OFF Applied
              </p>
              <p className="text-xs text-green-700 mt-1">
                Code: SAVE15
              </p>
            </div>
          )}

          {selectedReason === 'shipping' && (
            <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3">
              <p className="text-sm font-semibold text-blue-800">
                Free Shipping
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Add ₹{Math.max(0, 75 - subtotal).toFixed(0)} more
              </p>
            </div>
          )}

          {selectedReason === 'payment' && (
            <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 p-3">
              <p className="text-sm font-semibold text-indigo-800">
                Secure Checkout
              </p>
              <p className="text-xs text-indigo-700 mt-1">
                SSL • PCI • Fraud Protected
              </p>
            </div>
          )}

          {selectedReason === 'deciding' && (
            <div className="mt-4 rounded-xl border border-purple-200 bg-purple-50 p-3">
              <p className="text-sm font-semibold text-purple-800">
                Cart Saved
              </p>
              <p className="text-xs text-purple-700 mt-1">
                Available for 30 days
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="grid grid-cols-2 gap-3 px-6 py-5 border-t border-gray-100">
          <button
            onClick={onClose}
            className="py-2.5 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-50"
          >
            Close
          </button>

          <button
            onClick={onClose}
            className="py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}