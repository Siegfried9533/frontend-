/**
 * File này quản lý URL ảnh cho các sách trong hệ thống
 * 
 * Các chức năng chính:
 * 1. Lưu trữ ánh xạ giữa ID sách và URL ảnh tương ứng
 * 2. Cung cấp hàm helper để lấy ảnh cho sách
 * 3. Tự động tạo URL ảnh mặc định nếu không tìm thấy ảnh trong map
 * 
 * Cách sử dụng:
 * - Thêm URL ảnh mới: Thêm vào object bookImages
 * - Lấy ảnh cho sách: Sử dụng hàm getBookImage(bookId)
 */

// Map book IDs to image URLs
export const bookImages: { [key: number]: string } = {
    1: "/images/product/thegreatgatsby.jpg",
    2: "/images/product/tokillamockingbird.jpg",
    3: "/images/product/1984.jpg",
    4: "/images/product/mobydick.jpg",
    5: "/images/product/warandpeace.jpg",
    6: "/images/product/prideandprejudice.jpg",
    7: "/images/product/thecatcherintherye.jpg",
    8: "/images/product/bravenewworld.jpg",
    9: "/images/product/thehobbit.jpg",
    10: "/images/product/thelordoftherings.jpg",
    11: "/images/product/harrypotterandthesorcerer'sstone.jpg",
    12: "/images/product/thealchemist.jpg",
    13: "/images/product/thelittleprince.jpg",
    14: "/images/product/ataleoftwocities.jpg",
    15: "/images/product/crimeandpunishment.jpg",
    16: "/images/product/amancalledove.jpg",
    17: "/images/product/thekiterunner.jpg",
    18: "/images/product/normalpeople.jpg",
    19: "/images/product/snowcrash.jpg",
    20: "/images/product/redmars.jpg",
    21: "/images/product/thelefthandofdarkness.jpg",
    22: "/images/product/eragon.jpg",
    // Thêm các ID và URL khác tại đây
};

/**
 * Hàm helper để lấy ảnh cho sách
 * @param bookId ID của sách cần lấy ảnh
 * @returns URL của ảnh sách. Nếu không tìm thấy trong map, trả về URL mặc định
 */
export const getBookImage = (bookId: number): string => {
    return bookImages[bookId] || `/images/products/book${bookId}.jpg`;
}; 