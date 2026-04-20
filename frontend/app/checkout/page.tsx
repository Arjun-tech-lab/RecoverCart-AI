'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useCartStore } from '@/lib/store';
import { ArrowLeft, Check } from 'lucide-react';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [orderNumber, setOrderNumber] = useState('');

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="bg-white min-h-screen">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center py-24">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">Add some products before checking out.</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Back to Shop
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.address &&
      formData.city &&
      formData.state &&
      formData.zip
    ) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.cardName &&
      formData.cardNumber &&
      formData.cardExpiry &&
      formData.cardCvc
    ) {
      const newOrderNumber = `ORD-${Date.now()}`;
      setOrderNumber(newOrderNumber);
      clearCart();
      setStep('confirmation');
    }
  };

  const subtotal = getTotalPrice();
  const shipping = 5;
  const tax = (subtotal + shipping) * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {step !== 'confirmation' && (
            <div className="mb-12">
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Cart
              </Link>

              {/* Progress Steps */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                    step === 'shipping' || step === 'payment'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  1
                </div>
                <div className={`flex-1 h-1 ${step === 'payment' ? 'bg-gray-900' : 'bg-gray-300'}`} />
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                    step === 'payment'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  2
                </div>
              </div>
              <div className="flex justify-between text-sm mt-4 text-gray-600">
                <span>Shipping Address</span>
                <span>Payment</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 'shipping' && (
                <form onSubmit={handleShippingSubmit}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Shipping Address</h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number (Optional)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />

                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                      >
                        <option value="">State</option>
                        <option value="CA">CA</option>
                        <option value="NY">NY</option>
                        <option value="TX">TX</option>
                        <option value="FL">FL</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-8 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {step === 'payment' && (
                <form onSubmit={handlePaymentSubmit}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Payment Information</h2>

                  <div className="space-y-6">
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Name on Card"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />

                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      maxLength={16}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        required
                        maxLength={5}
                        className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                      <input
                        type="text"
                        name="cardCvc"
                        placeholder="CVC"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        required
                        maxLength={3}
                        className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-8 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                  >
                    Complete Order
                  </button>
                </form>
              )}

              {step === 'confirmation' && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed</h2>
                  <p className="text-gray-600 mb-4">Thank you for your purchase!</p>
                  <p className="text-sm text-gray-600 mb-8">
                    Order Number: <span className="font-semibold text-gray-900">{orderNumber}</span>
                  </p>
                  <p className="text-gray-600 mb-8">
                    A confirmation email has been sent to {formData.email}
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-8 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} <span className="text-gray-500">x{item.quantity}</span>
                      </span>
                      <span className="text-gray-900 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
