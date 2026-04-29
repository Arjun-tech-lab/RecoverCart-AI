'use client';

import { useEffect, useState } from 'react';
import {
  X,
  Sparkles,
  BadgePercent,
  Truck,
  ShieldCheck,
  Clock3,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

interface HesitationRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  hesitationScore: number;
  timeOnCart: number;
  subtotal: number;
  shippingOption: 'standard' | 'express' | null;
  recoveryData?: any;
  reason?: string;
  onReasonSelect?: (
    reason: string
  ) => void | Promise<void>;
  onAccept?: () => void;
}

function getSafeValue(value: any) {
  if (!value) return '';

  if (typeof value === 'string') return value;

  if (typeof value === 'object') {
    return (
      value.label ||
      value.text ||
      value.message ||
      ''
    );
  }

  return String(value);
}

export function HesitationRecoveryModal({
  isOpen,
  onClose,
  hesitationScore,
  timeOnCart,
  recoveryData,
  onReasonSelect,
  onAccept,
}: HesitationRecoveryModalProps) {
  const [selectedReason, setSelectedReason] =
    useState<string | null>(null);

  const [loadingPlan, setLoadingPlan] =
    useState(false);

  /* reset when modal opens */
  useEffect(() => {
    if (isOpen) {
      setSelectedReason(null);
      setLoadingPlan(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const hasRecoveryData =
    !!recoveryData &&
    Object.keys(recoveryData).length > 0;

  const reasons = [
    {
      id: 'price',
      label: 'Price concerns',
      desc: 'Looking for a better deal',
      icon: BadgePercent,
    },
    {
      id: 'shipping',
      label: 'Shipping cost',
      desc: 'Delivery fee feels high',
      icon: Truck,
    },
    {
      id: 'trust',
      label: 'Payment security',
      desc: 'Need trust signals',
      icon: ShieldCheck,
    },
    {
      id: 'deciding',
      label: 'Still deciding',
      desc: 'Need more time',
      icon: Clock3,
    },
  ];

  const title =
    hasRecoveryData
      ? getSafeValue(
          recoveryData?.title
        ) ||
        'Recovery Plan Ready'
      : 'Need help checking out?';

  const question =
    hasRecoveryData
      ? getSafeValue(
          recoveryData?.question
        ) ||
        'We found a better checkout option for you.'
      : 'Choose what is stopping you.';

  const benchmark =
    getSafeValue(
      recoveryData?.benchmark
    );

  const review =
    getSafeValue(
      recoveryData?.review
    );

  const offer =
    getSafeValue(
      recoveryData?.offer
    );

  const cta =
    getSafeValue(
      recoveryData?.cta
    ) || 'Apply Now';

  const handleReasonClick =
    async (
      reasonId: string
    ) => {
      try {
        setSelectedReason(reasonId);
        setLoadingPlan(true);

        if (onReasonSelect) {
          await onReasonSelect(
            reasonId
          );
        }
      } catch (error) {
        console.error(
          'Reason select failed:',
          error
        );
      } finally {
        setLoadingPlan(false);
      }
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm px-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

        {/* Header */}
        <div className="border-b border-gray-100 px-6 py-5">
          <div className="flex items-start justify-between gap-4">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                <Sparkles className="h-3 w-3" />
                Smart Recovery Engine
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                {title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {question}
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

          </div>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">

          {/* Phase 1 Score */}
          {!hasRecoveryData &&
            !loadingPlan && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex justify-between text-sm font-medium text-amber-800">
                  <span>
                    Hesitation Score
                  </span>

                  <span>
                    {
                      hesitationScore
                    }
                    %
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-amber-200">
                  <div
                    className="h-full bg-amber-500"
                    style={{
                      width: `${Math.min(
                        hesitationScore,
                        100
                      )}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-amber-700">
                  User stayed{' '}
                  {
                    timeOnCart
                  }
                  s in cart
                </p>
              </div>
            )}

          {/* Phase 1 Reason Buttons */}
          {!hasRecoveryData &&
            !loadingPlan && (
              <div className="space-y-3">
                {reasons.map(
                  (item) => {
                    const Icon =
                      item.icon;

                    const active =
                      selectedReason ===
                      item.id;

                    return (
                      <button
                        key={
                          item.id
                        }
                        type="button"
                        onClick={() =>
                          handleReasonClick(
                            item.id
                          )
                        }
                        className={`w-full rounded-xl border p-4 text-left transition ${
                          active
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex gap-3">
                          <Icon className="mt-0.5 h-5 w-5 text-gray-700" />

                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {
                                item.label
                              }
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {
                                item.desc
                              }
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            )}

          {/* Loading */}
          {loadingPlan && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-center">
              <Loader2 className="mx-auto h-5 w-5 animate-spin text-gray-600" />

              <p className="mt-3 text-sm font-medium text-gray-900">
                Finding best recovery plan...
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Personalizing your checkout experience
              </p>
            </div>
          )}

          {/* Phase 2 */}
          {hasRecoveryData &&
            !loadingPlan && (
              <>
                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-700" />

                    <div>
                      <p className="text-sm font-semibold text-green-800">
                        Recovery Plan Ready
                      </p>

                      <p className="mt-1 text-xs text-green-700">
                        Optimized for higher checkout conversion
                      </p>
                    </div>
                  </div>
                </div>

                {benchmark && (
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-900">
                      Why this helps
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {
                        benchmark
                      }
                    </p>
                  </div>
                )}

                {review && (
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <p className="text-sm font-medium text-gray-900">
                      Trust Signal
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {
                        review
                      }
                    </p>
                  </div>
                )}

                {offer && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                    <p className="text-sm font-semibold text-green-800">
                      Special Offer
                    </p>

                    <p className="mt-1 text-sm text-green-700">
                      {offer}
                    </p>
                  </div>
                )}
              </>
            )}

        </div>

        {/* Footer */}
        <div className="grid grid-cols-2 gap-3 border-t border-gray-100 px-6 py-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 py-2.5 text-sm font-medium hover:bg-gray-50"
          >
            Close
          </button>

          <button
            onClick={hasRecoveryData && onAccept ? onAccept : onClose}
            disabled={loadingPlan}
            className="rounded-xl bg-black py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {hasRecoveryData
              ? cta
              : 'Continue'}
          </button>
        </div>

      </div>
    </div>
  );
}