'use client';

import { useEffect, useRef, useState } from 'react';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { CartList } from '@/components/cart/CartList';
import { ShippingOptions } from '@/components/cart/ShippingOptions';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { HesitationRecoveryModal } from '@/components/recovery/HesitationRecoveryModal';

import { useCartStore } from '@/lib/store';

import {
  checkHesitation,
  getRecoveryPlan,
} from '@/services/api';

type ShippingType =
  | 'standard'
  | 'express'
  | null;

export default function CartPage() {
  const items = useCartStore(
    (state) => state.items
  );

  const getTotalPrice =
    useCartStore(
      (state) =>
        state.getTotalPrice
    );

  const subtotal =
    getTotalPrice();

  /* ---------------- STATE ---------------- */

  const [
    shippingOption,
    setShippingOption,
  ] =
    useState<ShippingType>(
      null
    );

  const [timeOnCart,
    setTimeOnCart] =
    useState(0);

  const [
    showRecoveryModal,
    setShowRecoveryModal,
  ] = useState(false);

  const [
    popupDismissed,
    setPopupDismissed,
  ] = useState(false);

  const [
    quantityChanges,
    setQuantityChanges,
  ] = useState(0);

  const [
    shippingClicks,
    setShippingClicks,
  ] = useState(0);

  const [
    hesitationScore,
    setHesitationScore,
  ] = useState(0);

  const [reason,
    setReason] =
    useState('');

  const [
    recoveryData,
    setRecoveryData,
  ] = useState<any>(null);

  const [
    loadingRecovery,
    setLoadingRecovery,
  ] = useState(false);

  /* ---------------- REFS ---------------- */

  const isCheckingRef =
    useRef(false);

  const lastPopupRef =
    useRef(false);

  const previousQtyRef =
    useRef(
      items.reduce(
        (
          total,
          item
        ) =>
          total +
          item.quantity,
        0
      )
    );

  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    if (
      items.length === 0
    )
      return;

    const timer =
      setInterval(() => {
        setTimeOnCart(
          (prev) =>
            prev + 1
        );
      }, 1000);

    return () =>
      clearInterval(
        timer
      );
  }, [items.length]);

  /* ---------------- PERIODIC CHECK ---------------- */

  useEffect(() => {
    if (
      items.length === 0
    )
      return;

    const interval =
      setInterval(() => {
        runRecoveryCheck();
      }, 30000);

    return () =>
      clearInterval(
        interval
      );
  }, [
    items.length,
    subtotal,
    quantityChanges,
    shippingClicks,
  ]);

  /* ---------------- FIRST CHECK AFTER 15s ---------------- */

  useEffect(() => {
    if (
      timeOnCart >= 15 &&
      !popupDismissed &&
      !showRecoveryModal &&
      items.length > 0
    ) {
      runRecoveryCheck();
    }
  }, [
    timeOnCart,
    popupDismissed,
    showRecoveryModal,
    items.length,
  ]);

  /* ---------------- RESET DISMISS WHEN USER ACTIVE ---------------- */

  useEffect(() => {
    if (
      quantityChanges > 0 ||
      shippingClicks > 0
    ) {
      setPopupDismissed(
        false
      );
    }
  }, [
    quantityChanges,
    shippingClicks,
  ]);

  /* ---------------- SHIPPING ---------------- */

  const handleShippingChange =
    (
      option:
        ShippingType
    ) => {
      setShippingOption(
        option
      );

      setShippingClicks(
        (prev) =>
          prev + 1
      );
    };

  /* ---------------- QUANTITY TRACK ---------------- */

  useEffect(() => {
    const currentQty =
      items.reduce(
        (
          total,
          item
        ) =>
          total +
          item.quantity,
        0
      );

    if (
      previousQtyRef.current !==
        currentQty &&
      items.length > 0
    ) {
      setQuantityChanges(
        (prev) =>
          prev + 1
      );
    }

    previousQtyRef.current =
      currentQty;
  }, [items]);

  /* ---------------- BACKEND CHECK ---------------- */

  const runRecoveryCheck =
    async () => {
      if (
        isCheckingRef.current
      )
        return;

      if (
        popupDismissed
      )
        return;

      if (
        showRecoveryModal
      )
        return;

      if (
        items.length === 0
      )
        return;

      try {
        isCheckingRef.current =
          true;

        setLoadingRecovery(
          true
        );

        const triggerRes =
          await checkHesitation(
            {
              timeSpent:
                timeOnCart,
              quantityChanges,
              shippingClicks,
              itemRemoved:
                false,
              checkoutClicked:
                false,
              cartValue:
                subtotal,
              itemCount:
                items.length,
            }
          );

        if (
          triggerRes?.success &&
          triggerRes?.data
        ) {
          const score =
            triggerRes
              .data
              .score || 0;

          const popup =
            triggerRes
              .data
              .popup ||
            false;

          setHesitationScore(
            score
          );

          if (
            popup &&
            !lastPopupRef.current
          ) {
            setReason('');

            setRecoveryData(
              null
            );

            setShowRecoveryModal(
              true
            );

            lastPopupRef.current =
              true;
          }

          if (
            !popup
          ) {
            lastPopupRef.current =
              false;
          }
        }
      } catch (
        error
      ) {
        console.error(
          'Recovery engine failed:',
          error
        );
      } finally {
        isCheckingRef.current =
          false;

        setLoadingRecovery(
          false
        );
      }
    };

  /* ---------------- USER SELECTS REASON ---------------- */

 const handleReasonSelect = async (
  selectedReason: string
) => {
  try {
    const recoveryRes =
      await getRecoveryPlan({
        reason: selectedReason,
        cartValue: subtotal,
      });

    if (recoveryRes?.success) {
      const freshData =
        recoveryRes.data;

      console.log(
        'UPDATED PLAN:',
        freshData
      );

      setRecoveryData(null);

      setTimeout(() => {
        setRecoveryData(
          freshData
        );
      }, 50);
    }
  } catch (error) {
    console.error(error);
  }
};
  /* ---------------- RENDER ---------------- */

  return (
    <>
      <Header />

      <HesitationRecoveryModal
        isOpen={
          showRecoveryModal
        }
        onClose={() => {
          setShowRecoveryModal(
            false
          );

          setPopupDismissed(
            true
          );

          setRecoveryData(
            null
          );
        }}
        hesitationScore={
          hesitationScore
        }
        timeOnCart={
          timeOnCart
        }
        subtotal={
          subtotal
        }
        shippingOption={
          shippingOption
        }
        recoveryData={
          recoveryData
        }
        reason={
          reason
        }
        onReasonSelect={
          handleReasonSelect
        }
      />

      <main className="min-h-screen bg-white">

        {/* Floating Loader */}
        {loadingRecovery &&
          !showRecoveryModal && (
            <div className="fixed top-24 right-6 z-50 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs text-gray-600 shadow-md">
              Checking...
            </div>
          )}

        <div className="max-w-7xl mx-auto px-4 py-12">

          {/* Heading */}
          <div className="mb-10">
            <p className="text-sm text-gray-500 mb-2">
              Premium Shopping Experience
            </p>

            <h1 className="text-3xl font-semibold text-gray-900">
              Your Cart
            </h1>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left */}
            <div className="lg:col-span-2">
              <CartList />

              <ShippingOptions
                selected={
                  shippingOption
                }
                onChange={
                  handleShippingChange
                }
              />
            </div>

            {/* Right */}
            <div className="lg:col-span-1">
              <OrderSummary
                recoveryData={
                  recoveryData
                }
                shippingOption={
                  shippingOption
                }
              />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}