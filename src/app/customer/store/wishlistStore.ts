'use client';
import { Product } from '@/app/customer/types';
import { create } from 'zustand';

interface WishlistState {
  wishlistItems: Product[];
  addToWishlist: (newItem: Product) => void;
  removeFromWishlist: (itemId: number) => void;
  isInWishlist: (itemId: number) => boolean;
}

const STORAGE_KEY = "wishlist-items";

const useWishlistStore = create<WishlistState>((set) => {
  const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;
  const initialWishlistItems = isLocalStorageAvailable && localStorage.getItem(STORAGE_KEY);
  const parsedWishlistItems: Product[] = initialWishlistItems ? JSON.parse(initialWishlistItems) : [];

  return {
    wishlistItems: parsedWishlistItems,
    addToWishlist: (newItem: Product): void => {
      set((state) => ({
        wishlistItems: [...state.wishlistItems, newItem],
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(useWishlistStore.getState().wishlistItems));
    },
    removeFromWishlist: (itemId: number): void => {
      set((state) => ({
        wishlistItems: state.wishlistItems.filter((item) => item.id !== itemId),
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(useWishlistStore.getState().wishlistItems));
    },
    isInWishlist: (itemId: number): boolean => {
      return useWishlistStore.getState().wishlistItems.some((item) => item.id === itemId);
    },
  };
});

export default useWishlistStore;
