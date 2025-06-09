"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/customer/components/ui/tabs";
import { mapBookToProduct } from "@/app/customer/data/products/bookToProduct";
import React, { useEffect, useState } from "react";
import SingleProductCartView from "../product/SingleProductCartView";
import { BookResponse } from "@/app/customer/types";

const ProductsCollectionOne = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [featuredBooks, setFeaturedBooks] = useState<BookResponse[]>([]);
  const [bestSellers, setBestSellers] = useState<BookResponse[]>([]);
  const [newArrivals, setNewArrivals] = useState<BookResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

      // TODO: Có thể thêm các tham số để lọc sách theo:
      // - Số lượng sách hiển thị
      // - Thể loại
      // - Giá cả
      // - Đánh giá
      const [featuredRes, bestSellersRes, newArrivalsRes] = await Promise.all([
        fetch(`${apiUrl}/api/books/featured`),
        fetch(`${apiUrl}/api/books/best-sellers`),
        fetch(`${apiUrl}/api/books/new-arrivals`)
      ]);

      // Xử lý lỗi chi tiết cho từng response
      if (!featuredRes.ok) {
        const errorData = await featuredRes.json().catch(() => null);
        console.error('Featured Books API Error:', { status: featuredRes.status, statusText: featuredRes.statusText, errorData });
        throw new Error(`Failed to fetch featured books: ${featuredRes.status} ${featuredRes.statusText}`);
      }
      if (!bestSellersRes.ok) {
        const errorData = await bestSellersRes.json().catch(() => null);
        console.error('Best Sellers API Error:', { status: bestSellersRes.status, statusText: bestSellersRes.statusText, errorData });
        throw new Error(`Failed to fetch best sellers: ${bestSellersRes.status} ${bestSellersRes.statusText}`);
      }
      if (!newArrivalsRes.ok) {
        const errorData = await newArrivalsRes.json().catch(() => null);
        console.error('New Arrivals API Error:', { status: newArrivalsRes.status, statusText: newArrivalsRes.statusText, errorData });
        throw new Error(`Failed to fetch new arrivals: ${newArrivalsRes.status} ${newArrivalsRes.statusText}`);
      }

      const [featuredData, bestSellersData, newArrivalsData] = await Promise.all([
        featuredRes.json(),
        bestSellersRes.json(),
        newArrivalsRes.json()
      ]);

      // TODO: Có thể thêm xử lý dữ liệu ở đây:
      // - Sắp xếp sách theo tiêu chí
      // - Lọc sách theo điều kiện
      // - Format dữ liệu
      setFeaturedBooks(featuredData.data && Array.isArray(featuredData.data) ? featuredData.data : []);
      setBestSellers(bestSellersData.data && Array.isArray(bestSellersData.data) ? bestSellersData.data : []);
      setNewArrivals(newArrivalsData.data && Array.isArray(newArrivalsData.data) ? newArrivalsData.data : []);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Caught error in fetchBooks:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  // TODO: Có thể tùy chỉnh giao diện loading:
  // - Thêm animation
  // - Thêm skeleton loading
  // - Thay đổi style
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // TODO: Có thể tùy chỉnh giao diện error:
  // - Thêm icon lỗi
  // - Thêm nút thử lại
  // - Thay đổi style
  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    // TODO: Có thể điều chỉnh layout section:
    // - max-w-screen-xl: Chiều rộng tối đa
    // - py-16: Padding trên dưới
    // - px-4 md:px-8: Padding trái phải (responsive)
    <section className="max-w-screen-xl mx-auto py-16 px-4 md:px-8 w-full">
      <Tabs defaultValue="top-rated" className="w-full space-y-8 mx-0">
        <div className="flex items-center flex-col md:flex-row justify-between gap-2 flex-wrap w-full">
          {/* TODO: Có thể tùy chỉnh style tiêu đề:
              - text-3xl md:text-5xl: Kích thước chữ
              - border-l-4 border-l-rose-500: Viền bên trái
              - p-2: Padding */}
          <h2 className="text-3xl md:text-5xl font-semibold border-l-4 border-l-rose-500 p-2">
            Featured Books
          </h2>
          {/* TODO: Có thể tùy chỉnh style tab:
              - font-semibold: Độ đậm chữ
              - bg-transparent: Màu nền
              - md:text-xl: Kích thước chữ */}
          <TabsList className="font-semibold bg-transparent text-center">
            <TabsTrigger value="top-rated" className="md:text-xl">
              Top Rated
            </TabsTrigger>
            <TabsTrigger value="most-popular" className="md:text-xl">
              Most Popular
            </TabsTrigger>
            <TabsTrigger value="new-items" className="md:text-xl">
              New Items
            </TabsTrigger>
          </TabsList>
        </div>
        {/* TODO: Có thể tùy chỉnh grid layout:
            - grid-cols-1: Số cột trên mobile
            - md:grid-cols-3: Số cột trên tablet
            - lg:grid-cols-4: Số cột trên desktop
            - gap-6: Khoảng cách giữa các sách */}
        <TabsContent value="top-rated" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {featuredBooks?.map((book) => (
              <SingleProductCartView
                key={book.id}
                product={mapBookToProduct(book)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="most-popular">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers?.map((book) => (
              <SingleProductCartView
                key={book.id}
                product={mapBookToProduct(book)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="new-items">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals?.map((book) => (
              <SingleProductCartView
                key={book.id}
                product={mapBookToProduct(book)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProductsCollectionOne;
