'use client';
import { Product } from '@/app/customer/types';
import { create } from 'zustand';

interface ProductQuickViewState {
  isOpen: boolean;
  product: Product | null;
  openModal: (product: Product) => void;
  closeModal: () => void;
}

const useProductQuickViewStore = create<ProductQuickViewState>((set) => ({
  isOpen: false,
  product: null,
  openModal: (product: Product) => set({ isOpen: true, product }),
  closeModal: () => set({ isOpen: false, product: null }),
}));

export default useProductQuickViewStore;

// Dummy function to fetch product data (replace this with your actual API call)
// const fetchProduct = (productId: number): Product => {
//   // Example dummy data
//   return {
//     id: productId,
//     name: 'Product Name',
//     category: 'Category',
//     description: 'Product Description',
//     rating: 4.5,
//     reviews: 10,
//     price: 50,
//     discount: 0.2,
//     images: ['image1.jpg', 'image2.jpg'],
//   };
// };
