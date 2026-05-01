'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCurrency } from '@/lib/useCurrency';
import { useOrderTotals } from '@/lib/useOrderTotals';
import { useCartStore } from '@/lib/store';

export function OrderSummary() {
  const recoveryData = useCartStore((state) => state.recoveryData);
  const { format } = useCurrency();
  const { subtotal, shipping, discount, tax, total } = useOrderTotals();

  const offerLabel = recoveryData?.isApplied ? (recoveryData?.offer?.label || '') : '';
  const bonusGift = recoveryData?.isApplied ? recoveryData?.offer?.gift : null;

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6">

      {/* Title */}
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Order Summary
      </h2>

      {/* Breakdown */}
      <div className="space-y-4 border-b border-gray-100 pb-5">

        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Subtotal
          </span>

          <span className="font-medium text-gray-900">
            {format(
              subtotal
            )}
          </span>
        </div>

        {/* Discount */}
        {discount >
          0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>
              Discount
            </span>

            <span>
              -
              {format(
                discount
              )}
            </span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Shipping
          </span>

          <span className="font-medium text-gray-900">
            {shipping ===
            0
              ? 'Free'
              : format(
                  shipping
                )}
          </span>
        </div>

        {/* Bonus Gift */}
        {bonusGift && (
          <div className="flex justify-between text-sm text-indigo-600">
            <span>
              Bonus Gift
            </span>
            <span className="font-medium">
              Free
            </span>
          </div>
        )}

        {/* Tax */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Tax
          </span>

          <span className="font-medium text-gray-900">
            {format(
              tax
            )}
          </span>
        </div>

      </div>

      {/* Total */}
      <div className="flex items-center justify-between py-5">
        <span className="font-semibold text-gray-900">
          Total
        </span>

        <span className="text-2xl font-bold text-gray-900">
          {format(
            total
          )}
        </span>
      </div>

      {/* Offer Badge */}
      {offerLabel && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {offerLabel}
        </div>
      )}

      {/* CTA */}
      <Link
        href="/checkout"
        onMouseEnter={() => {
          hoverTimeoutRef.current = setTimeout(() => {
            useCartStore.getState().setCheckoutHovered(true);
          }, 2000);
        }}
        onMouseLeave={() => {
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
          }
          useCartStore.getState().setCheckoutHovered(false);
        }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 font-medium text-white transition hover:bg-gray-800"
      >
        Proceed to Checkout

        <ArrowRight className="h-4 w-4" />
      </Link>

      <Link
        href="/"
        className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-gray-300 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
      >
        Continue Shopping
      </Link>

      {/* Footer */}
      <p className="mt-4 text-center text-xs text-gray-500">
        Secure checkout • Easy returns • COD available
      </p>

    </div>
  );
}