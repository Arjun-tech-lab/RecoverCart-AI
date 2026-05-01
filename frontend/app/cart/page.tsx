'use client';

import { useEffect, useRef, useState } from 'react';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { CartList } from '@/components/cart/CartList';
import { ShippingOptions } from '@/components/cart/ShippingOptions';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { CheckoutAssistant } from '@/components/recovery/CheckoutAssistant';

import { useCartStore } from '@/lib/store';
import { useOrderTotals } from '@/lib/useOrderTotals';

import {
  checkHesitation,
  getRecoveryPlan,
} from '@/services/api';

export default function CartPage() {
  const items = useCartStore(
    (state) => state.items
  );

  const { subtotal } = useOrderTotals();

  const shippingOption =
    useCartStore(
      (state) =>
        state.shippingOption
    );

  const setShippingOption =
    useCartStore(
      (state) =>
        state.setShippingOption
    );

  const recoveryData =
    useCartStore(
      (state) =>
        state.recoveryData
    );

  const setRecoveryData =
    useCartStore(
      (state) =>
        state.setRecoveryData
    );

  /* ---------------- STATE ---------------- */

  const [
    timeOnCart,
    setTimeOnCart,
  ] = useState(0);

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

  const [
    loadingRecovery,
    setLoadingRecovery,
  ] = useState(false);

  const [
    lastInteractionTime,
    setLastInteractionTime,
  ] = useState(
    Date.now()
  );

  /* ---------------- REFS ---------------- */

  const isCheckingRef =
    useRef(false);

  const lastPopupRef =
    useRef(false);

  const lastCheckRef = useRef(0);
  const lastInterventionTimeRef = useRef(0);

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
      }, 500);

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

  /* ---------------- SHIPPING ---------------- */

  const handleShippingChange =
    (
      option: any
    ) => {
      setShippingOption(
        option
      );

      setShippingClicks(
        (prev) =>
          prev + 1
      );

      setLastInteractionTime(
        Date.now()
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

      setLastInteractionTime(
        Date.now()
      );
    }

    previousQtyRef.current =
      currentQty;
  }, [items]);

  /* ---------------- BACKEND CHECK ---------------- */

  const runRecoveryCheck =
    async () => {
      const now =
        Date.now();

      const idleSeconds =
        (
          now -
          lastInteractionTime
        ) /
        1000;

      /* user still active */
      if (idleSeconds < 5 && !useCartStore.getState().metrics.checkoutHovered) return;

      /* Stop checking if an offer is already applied */
      if (useCartStore.getState().recoveryData?.isApplied) return;

      /* avoid spam */
      if (now - lastCheckRef.current < 500) return;

      if (
        isCheckingRef.current
      )
        return;

      if (
        items.length === 0
      )
        return;

      try {
        isCheckingRef.current =
          true;

        lastCheckRef.current =
          now;

        setLoadingRecovery(
          true
        );

        const triggerRes =
          await checkHesitation(
            {
              timeSpent:
                timeOnCart,
              idleTime:
                idleSeconds,
              quantityChanges,
              shippingClicks: useCartStore.getState().metrics.shippingToggles,
              itemRemoved:
                useCartStore.getState().metrics.itemsRemoved > 0,
              checkoutClicked:
                false,
              checkoutHovered:
                useCartStore.getState().metrics.checkoutHovered,
              cartValue:
                subtotal,
              itemCount:
                items.length,
              idleTime:
                idleSeconds,
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

          const reason =
            triggerRes
              .data
              .reason ||
            'deciding';

          setHesitationScore(
            score
          );

          /* Auto sidebar recovery */
          const timeSinceLastIntervention = now - lastInterventionTimeRef.current;
          
          if (popup && timeSinceLastIntervention > 2000) {
            const plan = await getRecoveryPlan({
              reason,
              cartValue: subtotal,
            });

            if (plan?.success) {
              setRecoveryData({
                ...plan.data,
                reason,
                idleTime: idleSeconds,
              });
              lastInterventionTimeRef.current = now;
            }
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

  /* ---------------- RENDER ---------------- */

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">

      

        <div className="mx-auto max-w-7xl px-4 py-12">

          <div className="mb-10">
            <p className="mb-2 text-sm text-gray-500">
              Premium Shopping Experience
            </p>

            <h1 className="text-3xl font-semibold text-gray-900">
              Your Cart
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

            {/* LEFT */}
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

            {/* RIGHT */}
            <div className="space-y-4 lg:col-span-1">

              <CheckoutAssistant
                recoveryData={
                  recoveryData
                }
                hesitationScore={
                  hesitationScore
                }
                loading={
                  loadingRecovery
                }
              />

              <OrderSummary />

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}