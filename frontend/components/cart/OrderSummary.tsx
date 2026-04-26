'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';

interface OrderSummaryProps {
  recoveryData?: any;
  shippingOption?: 'standard' | 'express' | null;
}

export function OrderSummary({
  recoveryData,
  shippingOption,
}: OrderSummaryProps) {
  const items = useCartStore(
    (state) => state.items
  );
  console.log("ORDER SUMMARY DATA", recoveryData);

  /* ---------------- SUBTOTAL ---------------- */

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      item.price *
        item.quantity,
    0
  );

  /* ---------------- OFFER ---------------- */

  const offer =
    recoveryData?.offer ||
    null;

  let discount = 0;

  /* ---------------- SHIPPING ---------------- */

  let shipping = 99; // default standard

  if (
    shippingOption ===
    'standard'
  ) {
    shipping = 99;
  }

  if (
    shippingOption ===
    'express'
  ) {
    shipping = 199;
  }

  /* free shipping over 5000 */
  if (subtotal >= 5000) {
    shipping = 0;
  }

  /* ---------------- APPLY OFFERS ---------------- */

  /* ---------------- APPLY OFFERS ---------------- */

if (
  offer?.type === 'discount_percent' ||
  offer?.type === 'discount'
) {
  const percent =
    Number(
      offer.value ||
      offer.percent ||
      0
    );

  discount =
    subtotal *
    (percent / 100);
}

if (
  offer?.type === 'flat_discount'
) {
  discount = Number(
    offer.value || 0
  );
}

if (
  offer?.type === 'free_shipping'
) {
  shipping = 0;
}
  /* ---------------- FINAL PRICE ---------------- */

  const finalSubtotal =
    subtotal - discount;

  const tax =
    finalSubtotal * 0.05;

  const total =
    finalSubtotal +
    shipping +
    tax;

  /* ---------------- LABEL ---------------- */

  const offerLabel =
    offer?.label ||
    recoveryData?.offer
      ?.label ||
    '';

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
            ₹
            {subtotal.toFixed(
              0
            )}
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>
              Discount
            </span>

            <span>
              -₹
              {discount.toFixed(
                0
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
            {shipping === 0
              ? 'Free'
              : `₹${shipping}`}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Tax
          </span>

          <span className="font-medium text-gray-900">
            ₹
            {tax.toFixed(
              0
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
          ₹
          {total.toFixed(
            0
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

      {/* Footer trust text */}
      <p className="mt-4 text-center text-xs text-gray-500">
        Secure checkout • Easy returns • COD available
      </p>

    </div>
  );
}