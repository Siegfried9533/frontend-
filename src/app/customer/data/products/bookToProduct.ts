/**
 * File này chịu trách nhiệm chuyển đổi dữ liệu sách từ API (BookResponse) 
 * sang định dạng phù hợp với giao diện người dùng (Product)
 * 
 * Các chức năng chính:
 * 1. Chuyển đổi cấu trúc dữ liệu từ backend sang frontend
 * 2. Thêm các trường mặc định cho rating và discount
 * 3. Tự động tạo URL ảnh cho sách dựa trên ID
 */

import { BookResponse } from "@/app/customer/types";
import { getBookImage } from "./bookImages";

export const mapBookToProduct = (book: BookResponse) => {
    return {
        id: book.id,
        title: book.title,
        price: book.price,
        image: getBookImage(book.id),
        author: book.author,
        category: book.category,
        rating: book.rating || 4.5,
        discount: book.discount || 0,
        description: book.description,
        publisher: book.publisher,
        publicationDate: book.publicationDate,
        language: book.language,
        readingAge: book.readingAge,
        pages: book.pages,
        dimension: book.dimension,
        quantity: book.quantity,
        soldQuantity: book.soldQuantity || 0
    };
}; 