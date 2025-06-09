/**
 * File này định nghĩa các interface và type cho ứng dụng
 * 
 * Các chức năng chính:
 * 1. Định nghĩa cấu trúc dữ liệu cho response từ API
 * 2. Định nghĩa các type cho các component
 * 3. Đảm bảo type safety cho toàn bộ ứng dụng
 */

// change or modify the types as your requirement

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  author: string;
  category: string;
  rating: number;
  discount: number;
  description: string;
  publisher: string;
  publicationDate: string;
  language: string;
  readingAge: number;
  pages: number;
  dimension: string;
  quantity: number;
  soldQuantity: number;
}

export type Review = {
  author: string;
  image: string;
  content: string;
  rating: number
  date: Date;
};

export interface SearchParams {
  page?: string;
  category?: string;
  brand?: string;
  search?: string;
  min?: string;
  max?: string;
  color?: string;
}

export type CartItem = Product & {
  selectedColor: string;
  quantity: number;
};

export interface BookResponse {
  id: number;
  title: string;
  author: string;
  description: string;
  category: string;
  price: number;
  publisher: string;
  publicationDate: string;
  language: string;
  readingAge: number;
  pages: number;
  dimension: string;
  quantity: number;
  discount: number;
  imageUrl: string;
  rating: number;
  soldQuantity: number;
  createdAt: string;
}
