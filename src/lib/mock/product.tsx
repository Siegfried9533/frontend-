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

// mock data - sau này sẽ thay bằng API call
export const mockBooks: book[] = [
    {
        id: 1,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publisher: "Scribner",
        releaseDate: "1925-04-10",
        language: "English",
        age: 16,
        numpage: 218,
        size: "5.5 x 8.5 inches",
        price: 15.99,
        image: "/images/product/thegreatgatsby.jpg",
        category: "Fiction",
        stock: 12,
        status: "Active",
        description: "A novel about the American dream and the roaring twenties."
    },
    {
        id: 2,
        name: "To Kill a Mockingbird",
        author: "Harper Lee",
        publisher: "J.B. Lippincott & Co.",
        releaseDate: "1960-07-11",
        language: "English",
        age: 14,
        numpage: 281,
        size: "5.5 x 8.5 inches",
        price: 12.5,
        image: "/images/product/tokillamockingbird.jpg",
        category: "Classic",
        stock: 8,
        status: "Pending",
        description: "A story of racial injustice and childhood in the Deep South."
    },
    {
        id: 3,
        name: "1984",
        author: "George Orwell",
        publisher: "Secker & Warburg",
        releaseDate: "1949-06-08",
        language: "English",
        age: 16,
        numpage: 328,
        size: "5.5 x 8.5 inches",
        price: 10.75,
        image: "/images/product/1984.jpg",
        category: "Dystopian",
        stock: 5,
        status: "Inactive",
        description: "A dystopian novel about totalitarianism and surveillance."
    },
    {
        id: 4,
        name: "Moby Dick",
        author: "Herman Melville",
        publisher: "Harper & Brothers",
        releaseDate: "1851-10-18",
        language: "English",
        age: 16,
        numpage: 635,
        size: "6 x 9 inches",
        price: 14.2,
        image: "/images/product/mobydick.jpg",
        category: "Adventure",
        stock: 3,
        status: "On Sale",
        description: "A sailor's narrative of the obsessive quest for a white whale."
    },
    {
        id: 5,
        name: "War and Peace",
        author: "Leo Tolstoy",
        publisher: "The Russian Messenger",
        releaseDate: "1869-01-01",
        language: "Russian",
        age: 18,
        numpage: 1225,
        size: "6 x 9 inches",
        price: 18.9,
        image: "/images/product/warandpeace.jpg",
        category: "History",
        stock: 7,
        status: "Active",
        description: "A historical epic about Napoleon's invasion of Russia."
    },
    {
        id: 6,
        name: "Pride and Prejudice",
        author: "Jane Austen",
        publisher: "T. Egerton",
        releaseDate: "1813-01-28",
        language: "English",
        age: 14,
        numpage: 279,
        size: "5 x 8 inches",
        price: 11.99,
        image: "/images/product/prideandprejudice.jpg",
        category: "Romance",
        stock: 10,
        status: "Active",
        description: "A romantic novel about manners and matrimonial machinations."
    },
    {
        id: 7,
        name: "The Catcher in the Rye",
        author: "J.D. Salinger",
        publisher: "Little, Brown and Company",
        releaseDate: "1951-07-16",
        language: "English",
        age: 15,
        numpage: 234,
        size: "5.5 x 8.5 inches",
        price: 13.4,
        image: "/images/product/thecatcherintherye.jpg",
        category: "Drama",
        stock: 6,
        status: "Pending",
        description: "A teenager's cynical view of the adult world."
    },
    {
        id: 8,
        name: "Brave New World",
        author: "Aldous Huxley",
        publisher: "Chatto & Windus",
        releaseDate: "1932-01-01",
        language: "English",
        age: 16,
        numpage: 311,
        size: "5.5 x 8.5 inches",
        price: 9.99,
        image: "/images/product/bravenewworld.jpg",
        category: "Science Fiction",
        stock: 4,
        status: "Inactive",
        description: "A futuristic society driven by technological advancements."
    },
    {
        id: 9,
        name: "The Hobbit",
        author: "J.R.R. Tolkien",
        publisher: "George Allen & Unwin",
        releaseDate: "1937-09-21",
        language: "English",
        age: 12,
        numpage: 310,
        size: "5 x 8 inches",
        price: 16.3,
        image: "/images/product/thehobbit.jpg",
        category: "Fantasy",
        stock: 11,
        status: "On Sale",
        description: "A hobbit's adventurous journey to reclaim treasure from a dragon."
    },
    {
        id: 10,
        name: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        publisher: "George Allen & Unwin",
        releaseDate: "1954-07-29",
        language: "English",
        age: 14,
        numpage: 1178,
        size: "6 x 9 inches",
        price: 25.0,
        image: "/images/product/thelordoftherings.jpg",
        category: "Fantasy",
        stock: 9,
        status: "Active",
        description: "The epic tale of a quest to destroy a powerful ring."
    },
    {
        id: 11,
        name: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        publisher: "Bloomsbury",
        releaseDate: "1997-06-26",
        language: "English",
        age: 10,
        numpage: 223,
        size: "5.5 x 8.5 inches",
        price: 20.0,
        image: "/images/product/harrypotterandthesorcerer'sstone.jpg",
        category: "Fantasy",
        stock: 15,
        status: "Active",
        description: "The beginning of the magical journey of Harry Potter."
    },
    {
        id: 12,
        name: "The Alchemist",
        author: "Paulo Coelho",
        publisher: "HarperTorch",
        releaseDate: "1988-01-01",
        language: "Portuguese",
        age: 12,
        numpage: 208,
        size: "5 x 8 inches",
        price: 10.5,
        image: "/images/product/thealchemist.jpg",
        category: "Fiction",
        stock: 12,
        status: "Active",
        description: "A shepherd's journey to find his personal legend."
    },
    {
        id: 13,
        name: "The Little Prince",
        author: "Antoine de Saint-Exupéry",
        publisher: "Reynal & Hitchcock",
        releaseDate: "1943-04-06",
        language: "French",
        age: 8,
        numpage: 96,
        size: "5 x 7 inches",
        price: 7.99,
        image: "/images/product/thelittleprince.jpg",
        category: "Children",
        stock: 20,
        status: "Pending",
        description: "A poetic tale of loneliness, friendship, and love."
    },
    {
        id: 14,
        name: "A Tale of Two Cities",
        author: "Charles Dickens",
        publisher: "Chapman & Hall",
        releaseDate: "1859-04-30",
        language: "English",
        age: 14,
        numpage: 341,
        size: "5.5 x 8.5 inches",
        price: 13.0,
        image: "/images/product/ataleoftwocities.jpg",
        category: "Classic",
        stock: 5,
        status: "Inactive",
        description: "A novel set in London and Paris before and during the French Revolution."
    },
    {
        id: 15,
        name: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        publisher: "The Russian Messenger",
        releaseDate: "1866-01-01",
        language: "Russian",
        age: 18,
        numpage: 671,
        size: "6 x 9 inches",
        price: 15.5,
        image: "/images/product/crimeandpunishment.jpg",
        category: "Drama",
        stock: 6,
        status: "Active",
        description: "A psychological drama of a man's moral dilemmas after murder."
    }
];

export const updateBook = async (updatedBook: book): Promise<book> => {
    // Giả lập delay và trả về dữ liệu mới
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(updatedBook);
        }, 300);
    });
};
