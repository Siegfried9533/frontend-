import { Product } from "@/app/customer/types";
import { BookResponse } from "@/app/customer/types";
import { mapBookToProduct } from "./bookToProduct";

/**
 * Hàm lấy danh sách sách từ API và chuyển đổi sang định dạng Product
 * @returns Promise<Product[]> - Danh sách sách đã được chuyển đổi
 */
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // Gọi API lấy danh sách sách
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    console.log('Fetching books from:', `${apiUrl}/api/books`);

    const response = await fetch(`${apiUrl}/api/books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (!data.data || !Array.isArray(data.data)) {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid API response format');
    }

    // Chuyển đổi dữ liệu từ BookResponse sang Product
    return data.data.map((book: BookResponse) => mapBookToProduct(book));
  } catch (error) {
    console.error('Error fetching books:', error);
    // Trả về dữ liệu mẫu trong trường hợp lỗi
    return productsData;
  }
};

/**
 * Dữ liệu sách mẫu cho mục đích phát triển và kiểm thử
 * Sẽ được thay thế bằng dữ liệu từ API trong môi trường production
 */
export const productsData: Product[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    category: "Fiction",
    price: 15.99,
    publisher: "Scribner",
    publicationDate: "1925-04-10",
    language: "English",
    readingAge: 16,
    pages: 180,
    dimension: "5.5 x 8.5 inches",
    quantity: 50,
    discount: 5,
    image: "/images/product/thegreatgatsby.jpg",
    rating: 4.5,
    soldQuantity: 1000
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "The story of racial injustice and the loss of innocence in the American South.",
    category: "Fiction",
    price: 14.99,
    publisher: "Grand Central",
    publicationDate: "1960-07-11",
    language: "English",
    readingAge: 14,
    pages: 281,
    dimension: "5.2 x 8 inches",
    quantity: 45,
    discount: 3,
    image: "/images/product/tokillamockingbird.jpg",
    rating: 4.8,
    soldQuantity: 1500
  }
];


