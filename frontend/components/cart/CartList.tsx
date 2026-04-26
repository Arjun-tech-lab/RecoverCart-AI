// components/cart/CartList.tsx

'use client';

import { CartItem } from './CartItem';
import { useCartStore } from '@/lib/store';

export function CartList() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Your cart is empty
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Add premium products to continue shopping.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}