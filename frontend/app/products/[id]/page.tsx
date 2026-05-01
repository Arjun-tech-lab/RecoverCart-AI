'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { ProductGrid } from '@/components/product/ProductGrid';

import { products } from '@/lib/products';
import { useCartStore } from '@/lib/store';
import { useCurrency } from '@/lib/useCurrency';

import {
  Star,
  ShoppingCart,
  Check,
  Heart,
  Minus,
  Plus,
} from 'lucide-react';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({
  params,
}: ProductPageProps) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.id === resolvedParams.id);

  const addItem = useCartStore((state) => state.addItem);
  const { format } = useCurrency();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  if (!product) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              Product not found
            </h1>

            <p className="text-gray-500 mt-3">
              The product you are looking for does not exist.
            </p>

            <Link
              href="/"
              className="inline-flex mt-6 rounded-xl bg-black px-6 py-3 text-white font-medium hover:bg-gray-800 transition"
            >
              Back to Shop
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.category === product.category
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <>
      <Header />

      <main className="bg-white min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="text-sm text-gray-500">
            <Link
              href="/"
              className="hover:text-gray-900 transition"
            >
              Home
            </Link>

            <span className="mx-2">/</span>

            <span className="text-gray-900">
              {product.name}
            </span>
          </div>
        </div>

        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">
                {product.category}
              </p>

              <h1 className="text-4xl font-semibold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-5">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i <
                        Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviews}{' '}
                  reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-6">
                <p className="text-4xl font-bold text-gray-900">
                  {format(product.price)}
                </p>

                <p className="text-sm mt-2">
                  {product.inStock ? (
                    <span className="text-green-600 font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium">
                      Out of Stock
                    </span>
                  )}
                </p>
              </div>

              {/* Description */}
              <p className="mt-6 text-gray-600 leading-7">
                {product.description}
              </p>

              {/* Quantity */}
              <div className="mt-8">
                <p className="text-sm font-medium text-gray-900 mb-3">
                  Quantity
                </p>

                <div className="inline-flex items-center gap-4 rounded-xl border border-gray-200 px-4 py-3">
                  <button
                    onClick={() =>
                      setQuantity(
                        Math.max(1, quantity - 1)
                      )
                    }
                  >
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>

                  <span className="w-6 text-center font-medium text-gray-900">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 rounded-xl py-4 font-medium transition flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    setFavorite(!favorite)
                  }
                  className="w-14 rounded-xl border border-gray-300 flex items-center justify-center hover:border-black transition"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorite
                        ? 'fill-black text-black'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* Trust Section */}
              <div className="mt-10 border-t border-gray-200 pt-8 space-y-5">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Free Shipping
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    On orders above {format(5000)}.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">
                    30-Day Returns
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Hassle-free returns.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">
                    1-Year Warranty
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Manufacturer warranty included.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-gray-200 py-16">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                You Might Also Like
              </h2>

              <ProductGrid
                products={relatedProducts}
              />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}