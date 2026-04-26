// components/product/ProductGrid.tsx

'use client';

import { ProductCard } from './ProductCard';
import { Product } from '@/lib/products';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          No products found
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          Try another category or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}