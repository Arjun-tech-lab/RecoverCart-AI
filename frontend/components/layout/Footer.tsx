// components/layout/Footer.tsx

'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">P</span>
              </div>

              <span className="text-lg font-semibold text-gray-900">
                Premium
              </span>
            </div>

            <p className="text-sm text-gray-500 leading-6">
              Curated premium products designed for everyday elegance,
              performance, and lasting quality.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Shop
            </h3>

            <div className="space-y-3">
              <Link
                href="/"
                className="block text-sm text-gray-500 hover:text-gray-900 transition"
              >
                New Arrivals
              </Link>

              <Link
                href="/"
                className="block text-sm text-gray-500 hover:text-gray-900 transition"
              >
                Best Sellers
              </Link>

              <Link
                href="/"
                className="block text-sm text-gray-500 hover:text-gray-900 transition"
              >
                Categories
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Support
            </h3>

            <div className="space-y-3">
              <Link
                href="/"
                className="block text-sm text-gray-500 hover:text-gray-900 transition"
              >
                Contact Us
              </Link>

              <Link
                href="/"
                className="block text-sm text-gray-500 hover:text-gray-900 transition"
              >
                Shipping Info
              </Link>

              <Link
                href="/"
                className="block text-sm text-gray-500 hover:text-gray-900 transition"
              >
                Returns
              </Link>
            </div>
          </div>

          {/* Trust */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Why Choose Us
            </h3>

            <div className="space-y-3 text-sm text-gray-500">
              <p>Secure Checkout</p>
              <p>Easy Returns</p>
              <p>Fast Delivery</p>
              <p>Premium Support</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2026 Premium. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition">
              Privacy
            </Link>

            <Link href="/" className="hover:text-gray-900 transition">
              Terms
            </Link>

            <Link href="/" className="hover:text-gray-900 transition">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}