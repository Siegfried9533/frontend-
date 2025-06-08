'use client';

import { useEffect, useState } from 'react';
import { apiService } from '@/services/api';
import { API_ENDPOINTS } from '@/config/api';
import { Product } from '@/types';

export default function BooksPage() {
    const [books, setBooks] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await apiService.get<Product[]>(API_ENDPOINTS.BOOKS.LIST);
                setBooks(data);
            } catch (err) {
                setError('Failed to fetch books');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book.id} className="border rounded-lg p-4 shadow-sm">
                        <img
                            src={book.images[0]}
                            alt={book.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">{book.name}</h2>
                        <p className="text-gray-600 mb-2">{book.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">${book.price}</span>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 