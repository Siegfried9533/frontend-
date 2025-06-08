import { book } from './product';
import { Product } from '@/app/customer/types';

export const mapBookToProduct = (book: book): Product => {
    return {
        id: book.id,
        name: book.name,
        category: book.category,
        description: book.description,
        price: book.price,
        discount: 0, // Có thể thêm trường discount vào book nếu cần
        rating: 0, // Có thể thêm trường rating vào book nếu cần
        stockItems: book.stock,
        reviews: [], // Có thể thêm trường reviews vào book nếu cần
        brand: book.publisher,
        color: [], // Có thể thêm trường color vào book nếu cần
        images: [book.image], // Sử dụng đường dẫn trực tiếp từ book.image
        aboutItem: [
            `Author: ${book.author}`,
            `Publisher: ${book.publisher}`,
            `Release Date: ${book.releaseDate}`,
            `Language: ${book.language}`,
            `Age: ${book.age}`,
            `Pages: ${book.numpage}`,
            `Size: ${book.size}`,
        ],
    };
}; 