'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { HesitationRecoveryModal } from '@/components/HesitationRecoveryModal';
import { useCartStore } from '@/lib/store';
import { useAnalyticsStore } from '@/lib/store';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  
  const startSession = useAnalyticsStore((state) => state.startSession);
  const recordTimeOnCart = useAnalyticsStore((state) => state.recordTimeOnCart);
  const recordQuantityChange = useAnalyticsStore((state) => state.recordQuantityChange);
  const recordShippingInteraction = useAnalyticsStore((state) => state.recordShippingInteraction);
  const updateHesitationScore = useAnalyticsStore((state) => state.updateHesitationScore);
  
  const [shippingOption, setShippingOption] = useState<'standard' | 'express' | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [showHesitationModal, setShowHesitationModal] = useState(false);

  
  const analytics = useAnalyticsStore((state) => state.analytics);

  // Initialize session and track time
  useEffect(() => {
  startSession();

  const startedAt = Date.now();

  const interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);

    setSessionTime(elapsed);
    recordTimeOnCart(elapsed);
  }, 1000);

  return () => clearInterval(interval);
}, []);

  // Update hesitation score when interactions happen
  useEffect(() => {
    updateHesitationScore();
  }, [items, shippingOption]);

  // Show hesitation modal when score is high and time threshold is met
  const [popupDismissed, setPopupDismissed] = useState(false);
useEffect(() => {
  if (
    sessionTime >= 30 &&
    items.length > 0 &&
    !showHesitationModal &&
    !popupDismissed &&
    shippingOption === null
  ) {
    setShowHesitationModal(true);
  }
}, [
  sessionTime,
  items.length,
  showHesitationModal,
  popupDismissed,
  shippingOption
]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
      recordQuantityChange();
    }
  };

  const handleShippingChange = (option: 'standard' | 'express') => {
    setShippingOption(option);
    recordShippingInteraction();
  };

  const subtotal = getTotalPrice();
  const shippingCost = shippingOption === 'express' ? 15 : shippingOption === 'standard' ? 5 : 0;
  const tax = (subtotal + shippingCost) * 0.08;
  const total = subtotal + shippingCost + tax;

  return (
    <>
      <Header />
      
      <HesitationRecoveryModal
        isOpen={showHesitationModal}
       onClose={() => {
  setShowHesitationModal(false);
  setPopupDismissed(true);
}}
        hesitationScore={analytics.hesitationScore}
        timeOnCart={sessionTime}
        subtotal={subtotal}
        shippingOption={shippingOption}
      />
      <main className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {items.length === 0 ? (
            <div className="text-center py-24">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">Add some products to get started!</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items - Left Column */}
              <div className="lg:col-span-2">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Your  Cart</h1>
                
                <div className="space-y-4 border-b border-gray-200 pb-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link
                          href={`/products/${item.id}`}
                          className="text-sm font-semibold text-gray-900 hover:text-gray-700"
                        >
                          {item.name}
                        </Link>
                        <p className="text-lg font-bold text-gray-900 mt-1">${item.price.toFixed(2)}</p>
                      </div>

                      {/* Quantity and Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-600 transition-colors mb-4"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:text-gray-900"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-gray-900 font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:text-gray-900"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Options */}
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Options</h2>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingOption === 'standard'}
                        onChange={(e) => handleShippingChange('standard')}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 flex-1">
                        <span className="font-medium text-gray-900">Standard Shipping - $5.00</span>
                        <p className="text-sm text-gray-600">Delivery in 5-7 business days</p>
                      </span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingOption === 'express'}
                        onChange={(e) => handleShippingChange('express')}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 flex-1">
                        <span className="font-medium text-gray-900">Express Shipping - $15.00</span>
                        <p className="text-sm text-gray-600">Delivery in 2-3 business days</p>
                      </span>
                    </label>
                  </div>
                </div>

                
              </div>

              {/* Order Summary - Right Column */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-8 sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    {shippingCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-900 font-medium">${shippingCost.toFixed(2)}</span>
                      </div>
                    )}
                    {(subtotal + shippingCost) > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax</span>
                        <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-8">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium mb-3"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    Continue Shopping
                  </Link>

                 <div className="text-xs text-gray-600 text-center mt-4 space-y-1">
  <p>Free shipping on orders over $50</p>
  <p>Secure checkout • Easy returns • COD available</p>
</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
