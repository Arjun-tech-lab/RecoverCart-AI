'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useState } from 'react';

export function Header() {
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">P</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 hidden sm:block">Premium</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xs items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none flex-1"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              Shop
            </Link>
            <Link href="/" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              About
            </Link>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-900 hover:text-gray-700 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-4">
            <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">
              Shop
            </Link>
            <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
