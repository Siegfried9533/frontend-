import { Product } from "@/app/customer/types";

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
        readingAge: "16+",
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
        readingAge: "14+",
        pages: 281,
        dimension: "5.2 x 8 inches",
        quantity: 45,
        discount: 3,
        image: "/images/product/tokillamockingbird.jpg",
        rating: 4.8,
        soldQuantity: 1500
    }
]; 