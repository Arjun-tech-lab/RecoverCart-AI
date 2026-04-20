'use client';

import { Header } from '@/components/Header';
import { products } from '@/lib/products';
import { useCartStore } from '@/lib/store';
import Image from 'next/image';
import { Star, ShoppingCart, Check, Heart } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <>
        <Header />
        <main className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
            <p className="text-gray-600 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/" className="text-gray-900 underline hover:text-gray-700">
              Back to shop
            </Link>
          </div>
        </main>
      </>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-sm text-gray-900">{product.name}</span>
        </div>

        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-start">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">{product.category}</p>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-balance">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</div>
                <p className="text-sm text-gray-600 mt-1">
                  {product.inStock ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-900">Quantity:</label>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-gray-600 hover:text-gray-900"
                    >
                      −
                    </button>
                    <span className="text-gray-900 font-medium w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                      isAdded
                        ? 'bg-green-600 text-white'
                        : product.inStock
                          ? 'bg-gray-900 text-white hover:bg-gray-800'
                          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added to cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`px-6 py-3 rounded-lg border transition-colors ${
                      isFavorite
                        ? 'bg-gray-100 border-gray-300 text-gray-900'
                        : 'bg-white border-gray-300 text-gray-600 hover:border-gray-900'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t border-gray-200 pt-8">
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
                    <p className="text-gray-600">On orders over $50. We ship within 1-2 business days.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">30-Day Returns</h3>
                    <p className="text-gray-600">Not satisfied? Return your item for a full refund, no questions asked.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Warranty</h3>
                    <p className="text-gray-600">All products come with a 1-year manufacturer warranty.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="max-w-7xl mx-auto px-4 py-16 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <div className="group flex flex-col bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900">{relatedProduct.name}</h3>
                      <p className="text-lg font-bold text-gray-900 mt-2">${relatedProduct.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
