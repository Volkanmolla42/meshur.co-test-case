import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

interface FavoritesState {
  // Normalized state: productId -> Product
  items: Record<number, Product>;
  ids: number[];

  // Actions
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
  getFavoriteProducts: () => Product[];
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: {},
      ids: [],

      addFavorite: (product) =>
        set((state) => {
          if (state.ids.includes(product.id)) return state;
          return {
            items: { ...state.items, [product.id]: product },
            ids: [...state.ids, product.id],
          };
        }),

      removeFavorite: (productId) =>
        set((state) => {
          const newItems = { ...state.items };
          delete newItems[productId];
          return {
            items: newItems,
            ids: state.ids.filter((id) => id !== productId),
          };
        }),

      toggleFavorite: (product) => {
        const state = get();
        if (state.ids.includes(product.id)) {
          state.removeFavorite(product.id);
        } else {
          state.addFavorite(product);
        }
      },

      isFavorite: (productId) => get().ids.includes(productId),

      clearFavorites: () => set({ items: {}, ids: [] }),

      getFavoriteProducts: () => {
        const { items, ids } = get();
        return ids.map((id) => items[id]).filter(Boolean);
      },
    }),
    {
      name: 'meshur-favorites',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, ids: state.ids }),
    }
  )
);
