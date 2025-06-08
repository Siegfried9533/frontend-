import { book } from '../data/products/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Interface cho response từ API
interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

// Lấy tất cả sách
export const getAllBooks = async (): Promise<book[]> => {
    try {
        const response = await fetch(`${API_URL}/books`);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const books = await response.json();
        return books;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// Lấy sách theo ID
export const getBookById = async (id: number): Promise<book> => {
    try {
        const response = await fetch(`${API_URL}/books/book?Id=${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch book with id ${id}`);
        }
        const book = await response.json();
        return book;
    } catch (error) {
        console.error(`Error fetching book with id ${id}:`, error);
        throw error;
    }
};

// Lấy sách theo danh mục
export const getBooksByCategory = async (category: string): Promise<book[]> => {
    try {
        const response = await fetch(`${API_URL}/books/category/${category}`);
        const result: ApiResponse<book[]> = await response.json();
        return result.data;
    } catch (error) {
        console.error(`Error fetching books in category ${category}:`, error);
        throw error;
    }
};

// Tìm kiếm sách
export const searchBooks = async (query: string): Promise<book[]> => {
    try {
        const response = await fetch(`${API_URL}/books/search?q=${encodeURIComponent(query)}`);
        const result: ApiResponse<book[]> = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
};

// Lọc sách theo nhiều tiêu chí
export const filterBooks = async (filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    language?: string;
    status?: string;
}): Promise<book[]> => {
    try {
        const queryParams = new URLSearchParams();
        if (filters.category) queryParams.append('category', filters.category);
        if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
        if (filters.language) queryParams.append('language', filters.language);
        if (filters.status) queryParams.append('status', filters.status);

        const response = await fetch(`${API_URL}/books/search?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error('Failed to filter books');
        }
        const books = await response.json();
        return books;
    } catch (error) {
        console.error('Error filtering books:', error);
        throw error;
    }
}; 