'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, ProductVariant } from '@/types';

export interface CartItem {
  productId: number;
  variantId: number;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartState {
  // Normalized state: variantId -> CartItem
  items: Record<number, CartItem>;
  variantIds: number[];

  // Actions
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;

  // Selectors
  getCartCount: () => number;
  getCartTotal: () => number;
  getCartItems: () => CartItem[];
  isInCart: (variantId: number) => boolean;
  getItemQuantity: (variantId: number) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: {},
      variantIds: [],

      addItem: (product, variant, quantity = 1) =>
        set((state) => {
          const existing = state.items[variant.id];
          if (existing) {
            // Update quantity if already in cart
            return {
              items: {
                ...state.items,
                [variant.id]: {
                  ...existing,
                  quantity: existing.quantity + quantity,
                },
              },
            };
          }
          // Add new item
          return {
            items: {
              ...state.items,
              [variant.id]: {
                productId: product.id,
                variantId: variant.id,
                product,
                variant,
                quantity,
              },
            },
            variantIds: [...state.variantIds, variant.id],
          };
        }),

      removeItem: (variantId) =>
        set((state) => {
          const newItems = { ...state.items };
          delete newItems[variantId];
          return {
            items: newItems,
            variantIds: state.variantIds.filter((id) => id !== variantId),
          };
        }),

      updateQuantity: (variantId, quantity) =>
        set((state) => {
          const existing = state.items[variantId];
          if (!existing) return state;
          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            const newItems = { ...state.items };
            delete newItems[variantId];
            return {
              items: newItems,
              variantIds: state.variantIds.filter((id) => id !== variantId),
            };
          }
          return {
            items: {
              ...state.items,
              [variantId]: { ...existing, quantity },
            },
          };
        }),

      clearCart: () => set({ items: {}, variantIds: [] }),

      getCartCount: () => {
        const { items, variantIds } = get();
        return variantIds.reduce((sum, id) => sum + (items[id]?.quantity || 0), 0);
      },

      getCartTotal: () => {
        const { items, variantIds } = get();
        return variantIds.reduce((sum, id) => {
          const item = items[id];
          if (!item) return sum;
          return sum + item.variant.price * item.quantity;
        }, 0);
      },

      getCartItems: () => {
        const { items, variantIds } = get();
        return variantIds.map((id) => items[id]).filter(Boolean);
      },

      isInCart: (variantId) => get().variantIds.includes(variantId),

      getItemQuantity: (variantId) => get().items[variantId]?.quantity || 0,
    }),
    {
      name: 'meshur-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, variantIds: state.variantIds }),
    }
  )
);
