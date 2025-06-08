export interface book {
    id: number;
    name: string;
    author: string;
    publisher: string;
    releaseDate: string;
    language: string;
    age: number;
    numpage: number;
    size: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    status: string;
    description: string;
}

// Hàm lấy tất cả sách từ API
export const getAllBooks = async (): Promise<book[]> => {
    try {
        const response = await fetch('http://localhost:8080/api/books');
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// Hàm lấy sách theo ID
export const getBookById = async (id: number): Promise<book> => {
    try {
        const response = await fetch(`http://localhost:8080/api/books/book?Id=${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching book:', error);
        throw error;
    }
};

// Hàm tìm kiếm sách
export const searchBooks = async (
    searchTerm?: string,
    filters?: Record<string, string>,
    sort?: string,
    page: number = 0,
    size: number = 16
): Promise<{ content: book[], totalElements: number }> => {
    try {
        let url = `http://localhost:8080/api/books/search?page=${page}&size=${size}`;
        if (searchTerm) url += `&searchTerm=${searchTerm}`;
        if (sort) url += `&sort=${sort}`;
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                url += `&filter_${key}=${value}`;
            });
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to search books');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
};

export const updateBook = async (updatedBook: book): Promise<book> => {
    // Giả lập delay và trả về dữ liệu mới
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(updatedBook);
        }, 300);
    });
};
