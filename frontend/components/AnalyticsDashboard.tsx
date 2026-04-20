'use client';

import { useState } from 'react';
import { BarChart3, X, TrendingUp, AlertCircle, Zap } from 'lucide-react';
import { useAnalyticsStore } from '@/lib/store';

export function AnalyticsDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const analytics = useAnalyticsStore((state) => state.analytics);

  const getHesitationLevel = (score: number) => {
    if (score < 20) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
    if (score < 50) return { level: 'Medium', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const hesitationInfo = getHesitationLevel(analytics.hesitationScore);

  const recommendations = [
    {
      title: 'Long Cart Duration',
      description: `User spent ${analytics.timeOnCart}s on cart`,
      action: 'Show discount offer',
      enabled: analytics.timeOnCart > 10,
    },
    {
      title: 'Quantity Changes',
      description: `${analytics.quantityChanges} quantity adjustments made`,
      action: 'Highlight product benefits',
      enabled: analytics.quantityChanges > 1,
    },
    {
      title: 'Shipping Hesitation',
      description: `${analytics.shippingInteractions} shipping option interactions`,
      action: 'Offer free shipping',
      enabled: analytics.shippingInteractions > 1,
    },
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-colors"
        aria-label="Toggle analytics dashboard"
      >
        <BarChart3 className="w-6 h-6" />
      </button>

      {/* Analytics Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-h-96 overflow-y-auto bg-white rounded-xl shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gray-900" />
              <h2 className="font-semibold text-gray-900">Session Analytics</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close analytics"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-6">
            {/* Session Info */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Session ID</span>
                <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                  {analytics.sessionId.slice(0, 8)}...
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Session Duration</span>
                <span className="text-sm font-semibold text-gray-900">{analytics.timeOnCart}s</span>
              </div>
            </div>

            {/* Hesitation Score */}
            <div className={`p-4 rounded-lg border-2 ${hesitationInfo.bg}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-semibold ${hesitationInfo.color}`}>
                  Hesitation Score
                </span>
                <span className={`text-2xl font-bold ${hesitationInfo.color}`}>
                  {analytics.hesitationScore.toFixed(0)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    analytics.hesitationScore < 20
                      ? 'bg-green-600'
                      : analytics.hesitationScore < 50
                        ? 'bg-amber-600'
                        : 'bg-red-600'
                  }`}
                  style={{ width: `${Math.min(analytics.hesitationScore, 100)}%` }}
                />
              </div>
              <p className={`text-xs mt-2 ${hesitationInfo.color}`}>
                {hesitationInfo.level} hesitation detected
              </p>
            </div>

            {/* Interaction Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Quantity Changes</p>
                <p className="text-xl font-bold text-gray-900">{analytics.quantityChanges}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Shipping Interactions</p>
                <p className="text-xl font-bold text-gray-900">{analytics.shippingInteractions}</p>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-amber-600" />
                <p className="text-sm font-semibold text-gray-900">Recommended Actions</p>
              </div>
              <div className="space-y-2">
                {recommendations
                  .filter((rec) => rec.enabled)
                  .map((recommendation, index) => (
                    <div
                      key={index}
                      className="p-3 bg-amber-50 rounded-lg border border-amber-200"
                    >
                      <p className="text-sm font-medium text-amber-900">
                        {recommendation.title}
                      </p>
                      <p className="text-xs text-amber-700 mt-1">{recommendation.description}</p>
                      <p className="text-xs font-semibold text-amber-600 mt-2">
                        → {recommendation.action}
                      </p>
                    </div>
                  ))}
                {recommendations.filter((rec) => rec.enabled).length === 0 && (
                  <p className="text-xs text-gray-600 italic">No intervention needed</p>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-blue-900">How it works</p>
                  <p className="text-xs text-blue-700 mt-1">
                    This dashboard tracks user behavior and shows personalized recovery
                    strategies when hesitation is detected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
