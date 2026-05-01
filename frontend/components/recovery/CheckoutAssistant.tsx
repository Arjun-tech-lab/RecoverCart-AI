'use client';

import { Sparkles, ShieldCheck, Truck, Tag, Check, ArrowRight, Gift, Flame, Clock, Loader2, Coins, Zap, Activity } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useCartStore } from '@/lib/store';
import { useOrderTotals } from '@/lib/useOrderTotals';

const ANALYSIS_MESSAGES = [
  'Reviewing cart value...',
  'Checking shipping options...',
  'Detecting hesitation signals...',
  'Finding best recovery path...'
];

export function CheckoutAssistant() {
  const items = useCartStore((state) => state.items);
  const recoveryData = useCartStore((state) => state.recoveryData);
  const setRecoveryData = useCartStore((state) => state.setRecoveryData);
  const setShippingOption = useCartStore((state) => state.setShippingOption);

  const [stage, setStage] = useState<'analyzing' | 'monitoring' | 'intervention' | 'applied'>('analyzing');
  const [messageIndex, setMessageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(599);
  const [simulatedLift, setSimulatedLift] = useState(0);

  // Initial Analysis Sequence
  useEffect(() => {
    if (items.length === 0) return;
    if (recoveryData?.isApplied) {
      setStage('applied');
      return;
    }

    setStage('analyzing');
    setMessageIndex(0);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % ANALYSIS_MESSAGES.length);
    }, 750);

    const finishTimeout = setTimeout(() => {
      setStage('monitoring');
      clearInterval(messageInterval);
    }, 400);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(finishTimeout);
    };
  }, []);

  // Watch for Backend AI Trigger
  useEffect(() => {
    if (stage === 'monitoring' && recoveryData && !recoveryData.isApplied && recoveryData.reason) {
      setStage('intervention');
      setSimulatedLift(Math.floor(Math.random() * (22 - 12 + 1) + 12));
    }
  }, [recoveryData, stage]);

  // Countdown timer logic
  useEffect(() => {
    if (stage !== 'intervention') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [stage]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const applyOffer = () => {
    // The offer is already perfectly formatted from the backend in recoveryData.offer!
    setRecoveryData({
      ...recoveryData,
      isApplied: true,
    });
    setStage('applied');
  };

  // Card Configuration based on Backend Reason
  const cardConfig = useMemo(() => {
    const reason = recoveryData?.reason || null;

    switch (reason) {
      case 'price_hesitation':
        return {
          icon: Tag,
          title: 'AI Price Optimization',
          heading: 'Apply instant 5% savings?',
          desc: 'We noticed you removed an item. Here is a small discount to help.',
          cta: 'Apply 5% Savings',
          action: applyOffer,
          showTimer: false,
        };
      case 'shipping_confusion':
        return {
          icon: Truck,
          title: 'Delivery Guidance',
          heading: 'Standard delivery arrives Tue. Upgrade to Express?',
          desc: 'Clear delivery ETA: Standard (Tue) vs Express (Tomorrow).',
          cta: 'Switch to Recommended',
          action: () => {
            setShippingOption('express');
            setStage('applied');
          },
          showTimer: false,
        };
      case 'trust_payment':
        return {
          icon: ShieldCheck,
          title: 'Checkout Protection',
          heading: 'Secure payment • COD available • Easy returns',
          desc: 'You can trust us with your order. 256-bit Secure Checkout.',
          cta: 'Continue Safely',
          action: () => setStage('applied'),
          showTimer: false,
        };
      case 'uncertainty':
        return {
          icon: Zap,
          title: 'Value Optimization',
          heading: 'Need help choosing quantity? Best value at 2 units.',
          desc: 'You seem unsure about quantities. Buy 2 and unlock special bundle savings!',
          cta: 'Update to 2 Units',
          action: () => {
            if (items.length > 0) {
              useCartStore.getState().updateQuantity(items[0].id, 2);
            }
            applyOffer();
          },
          showTimer: false,
        };
      case 'deciding':
        return {
          icon: Clock,
          title: 'Special Reserved Offer',
          heading: 'Reserved your cart items. Offer available for next 5 mins.',
          desc: 'Still deciding? We reserved a special discount for you.',
          cta: 'Use Reserved Offer',
          action: applyOffer,
          showTimer: true,
        };
      default:
        return null;
    }
  }, [recoveryData, items]);

  if (items.length === 0) return null;

  // Render Logic
  if (stage === 'analyzing') {
    return (
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-b from-indigo-50/80 to-white p-6 shadow-sm transition-all duration-500 overflow-hidden relative">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-20"></div>
            <div className="rounded-full bg-indigo-600 p-2.5 shadow-lg shadow-indigo-200">
              <Activity className="h-5 w-5 text-white animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-900">
              AI Recovery Engine
            </h3>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-indigo-600 h-5">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span className="animate-fade-in-up">{ANALYSIS_MESSAGES[messageIndex]}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'monitoring' || !cardConfig) {
    return (
      <div className="flex items-center gap-2 text-xs font-medium text-gray-400 px-2 animate-fade-in opacity-50">


      </div>
    );
  }

  const isApplied = stage === 'applied';
  const Icon = isApplied ? Check : cardConfig.icon;
  const idleTime = recoveryData?.idleTime || 0;

  return (
    <div className={`rounded-2xl border transition-all duration-500 relative overflow-hidden group ${isApplied ? 'border-green-200 bg-green-50/40' : 'border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 shadow-lg shadow-indigo-100/50'}`}>
      <div className="relative z-10 p-6">
        <div className="flex items-start gap-4">
          <div className={`rounded-xl p-3 shadow-sm ${isApplied ? 'bg-green-600 text-white shadow-green-200' : 'bg-indigo-600 text-white shadow-indigo-200'}`}>
            <Icon className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isApplied ? 'text-green-700' : 'text-indigo-600'}`}>
                {!isApplied && <Sparkles className="h-3 w-3" />}
                {isApplied ? 'Recovery Action Applied' : cardConfig.title}
              </p>
              {!isApplied && cardConfig.showTimer && (
                <div className="flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 border border-red-100 animate-pulse">
                  <Clock className="h-3 w-3" />
                  {formatTime(timeLeft)}
                </div>
              )}
            </div>

            <h3 className="mt-2 text-lg font-bold text-gray-900 leading-tight">
              {isApplied ? 'Cart Optimized Successfully' : cardConfig.heading}
            </h3>
            <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
              {cardConfig.desc}
            </p>
          </div>
        </div>

        <button
          onClick={cardConfig.action}
          disabled={isApplied}
          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-300 ${isApplied
              ? 'bg-green-100 text-green-700 cursor-default border border-green-200'
              : 'bg-gray-900 text-white hover:bg-black hover:shadow-lg hover:shadow-gray-300 hover:-translate-y-0.5'
            }`}
        >
          {isApplied ? (
            <>
              <Check className="h-4 w-4" />
              ✓ Active
            </>
          ) : (
            <>
              {cardConfig.cta}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        {!isApplied && recoveryData?.reason === 'trust_gap' && (
          <div className="mt-5 grid grid-cols-2 gap-y-2 gap-x-1 text-xs font-medium text-gray-500 border-t border-indigo-100/50 pt-4">
            <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-indigo-500" /> COD available</div>
            <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-indigo-500" /> Easy returns</div>
            <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-indigo-500" /> Encrypted payment</div>
            <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-indigo-500" /> Trusted checkout</div>
          </div>
        )}

        {isApplied && recoveryData?.reason === 'deciding' && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-green-100/50 p-3 border border-green-200/50">
            <div className="flex items-center gap-2 text-green-800">
              <Truck className="h-4 w-4" />
              <span className="text-xs font-semibold">Real-time Delivery Tracking Included</span>
            </div>
            <button className="text-xs font-bold text-green-700 hover:text-green-900 underline" onClick={(e) => { e.preventDefault(); alert('Live Tracking Demo: Your order will be trackable via GPS once dispatched.'); }}>
              View Demo
            </button>
          </div>
        )}

      </div>
    </div>
  );
}