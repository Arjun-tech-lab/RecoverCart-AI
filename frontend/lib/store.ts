import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export interface AnalyticsData {
  sessionId: string;
  startTime: number;
  timeOnCart: number;
  quantityChanges: number;
  shippingInteractions: number;
  hesitationScore: number;
  lastInteractionTime: number;
}

export interface AnalyticsStore {
  analytics: AnalyticsData;
  sessionStarted: boolean;
  startSession: () => void;
  recordTimeOnCart: (time: number) => void;
  recordQuantityChange: () => void;
  recordShippingInteraction: () => void;
  updateHesitationScore: () => void;
  resetSession: () => void;
}

// Cart Store
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));

// Analytics Store
const generateSessionId = () => Math.random().toString(36).substr(2, 9);

export const useAnalyticsStore = create<AnalyticsStore>((set, get) => ({
  analytics: {
    sessionId: generateSessionId(),
    startTime: Date.now(),
    timeOnCart: 0,
    quantityChanges: 0,
    shippingInteractions: 0,
    hesitationScore: 0,
    lastInteractionTime: Date.now(),
  },
  sessionStarted: false,
  startSession: () =>
    set({
      sessionStarted: true,
      analytics: {
        sessionId: generateSessionId(),
        startTime: Date.now(),
        timeOnCart: 0,
        quantityChanges: 0,
        shippingInteractions: 0,
        hesitationScore: 0,
        lastInteractionTime: Date.now(),
      },
    }),
  recordTimeOnCart: (time) =>
    set((state) => ({
      analytics: { ...state.analytics, timeOnCart: time },
    })),
  recordQuantityChange: () =>
    set((state) => ({
      analytics: {
        ...state.analytics,
        quantityChanges: state.analytics.quantityChanges + 1,
      },
    })),
  recordShippingInteraction: () =>
    set((state) => ({
      analytics: {
        ...state.analytics,
        shippingInteractions: state.analytics.shippingInteractions + 1,
      },
    })),
  updateHesitationScore: () => {
    const state = get();
    const { timeOnCart, quantityChanges, shippingInteractions } = state.analytics;
    const score = timeOnCart * 0.4 + quantityChanges * 0.3 + shippingInteractions * 0.3;
    set((state) => ({
      analytics: { ...state.analytics, hesitationScore: Math.min(score, 100) },
    }));
  },
  resetSession: () => set((state) => ({ sessionStarted: false })),
}));
