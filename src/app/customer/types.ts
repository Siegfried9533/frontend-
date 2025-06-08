// change or modify the types as your requirement

export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
  rating: number;
  stockItems: number;
  reviews: any[];
  brand: string;
  color: string[];
  images: string[];
  aboutItem: string[];
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
