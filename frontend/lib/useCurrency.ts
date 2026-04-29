import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Currency = 'INR' | 'USD';

interface CurrencyStore {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      currency: 'INR',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'currency-storage',
    }
  )
);

export function useCurrency() {
  const currency = useCurrencyStore((state) => state.currency);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);

  const format = (amount: number, forceCurrency?: Currency) => {
    const c = forceCurrency || currency;
    if (c === 'USD') {
      return '$' + (amount / 83).toFixed(2);
    }
    return '₹' + amount.toFixed(0);
  };

  return { currency, setCurrency, format };
}
