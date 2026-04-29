'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCartStore } from '@/lib/store';
import { useCurrency } from '@/lib/useCurrency';
import { ArrowLeft, Check } from 'lucide-react';

type Step = 'shipping' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const getOrderTotals = useCartStore((state) => state.getOrderTotals);
  const clearCart = useCartStore((state) => state.clearCart);
  const { format } = useCurrency();

  const [step, setStep] = useState<Step>('shipping');

  const [orderNumber, setOrderNumber] = useState('');

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

  const { subtotal, discount, shipping, tax, total } = getOrderTotals();

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              Your cart is empty
            </h1>

            <p className="text-gray-500 mt-3">
              Add some products before checkout.
            </p>

            <Link
              href="/"
              className="inline-flex mt-8 rounded-xl bg-black px-6 py-3 text-white font-medium hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      setOrderNumber(`ORD-${Date.now()}`);
      clearCart();
      setStep('confirmation');
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Top */}
          {step !== 'confirmation' && (
            <div className="mb-10">
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Cart
              </Link>

              <h1 className="text-3xl font-semibold text-gray-900 mt-6">
                Checkout
              </h1>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2">
              {/* Shipping */}
              {step === 'shipping' && (
                <form
                  onSubmit={handleShippingSubmit}
                  className="rounded-2xl border border-gray-200 bg-white p-8"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Shipping Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input"
                    />

                    <input
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input"
                    />

                    <input
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input md:col-span-2"
                    />

                    <input
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input md:col-span-2"
                    />

                    <input
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="input md:col-span-2"
                    />

                    <input
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input"
                    />

                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="">Select State</option>
                      <option value="CA">CA</option>
                      <option value="NY">NY</option>
                      <option value="TX">TX</option>
                    </select>

                    <input
                      name="zip"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="input md:col-span-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 rounded-xl bg-black py-3 text-white font-medium hover:bg-gray-800 transition"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {/* Payment */}
              {step === 'payment' && (
                <form
                  onSubmit={handlePaymentSubmit}
                  className="rounded-2xl border border-gray-200 bg-white p-8"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Payment Details
                  </h2>

                  <div className="space-y-4">
                    <input
                      name="cardName"
                      placeholder="Name on Card"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="input"
                    />

                    <input
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="input"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="input"
                      />

                      <input
                        name="cardCvc"
                        placeholder="CVC"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className="input"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 rounded-xl bg-black py-3 text-white font-medium hover:bg-gray-800 transition"
                  >
                    Complete Order
                  </button>
                </form>
              )}

              {/* Confirmation */}
              {step === 'confirmation' && (
                <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-900">
                    Order Confirmed
                  </h2>

                  <p className="text-gray-500 mt-3">
                    Thank you for your purchase.
                  </p>

                  <p className="text-sm text-gray-500 mt-4">
                    Order Number:{' '}
                    <span className="font-medium text-gray-900">
                      {orderNumber}
                    </span>
                  </p>

                  <Link
                    href="/"
                    className="inline-flex mt-8 rounded-xl bg-black px-6 py-3 text-white font-medium hover:bg-gray-800 transition"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Right */}
            {step !== 'confirmation' && (
              <div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-3 border-b border-gray-200 pb-5">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-500">
                          {item.name} × {item.quantity}
                        </span>

                        <span className="text-gray-900 font-medium">
                          {format(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 py-5 border-b border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span>{format(subtotal)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-{format(discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span>{format(shipping)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax</span>
                      <span>{format(tax)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-5">
                    <span className="font-semibold text-gray-900">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-gray-900">
                      {format(total)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}