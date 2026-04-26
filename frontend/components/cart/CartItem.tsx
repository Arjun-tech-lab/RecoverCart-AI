// components/cart/CartItem.tsx

'use client';

import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/lib/store';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
}

export function CartItem({ item }: CartItemProps) {
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const increase = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex gap-4 py-5 border-b border-gray-100">
      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900">
          {item.name}
        </h3>

        <p className="text-lg font-semibold text-gray-900 mt-2">
          ₹{item.price.toFixed(0)}
        </p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(item.id)}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2">
          <button onClick={decrease}>
            <Minus className="w-4 h-4 text-gray-700" />
          </button>

          <span className="text-sm font-medium text-gray-900 w-4 text-center">
            {item.quantity}
          </span>

          <button onClick={increase}>
            <Plus className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}