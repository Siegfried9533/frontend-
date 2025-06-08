"use client";
import React, { Suspense, useEffect, useState } from "react";
import ProductViewChange from "../product/ProductViewChange";
import Pagination from "../others/Pagination";
import SingleProductListView from "@/app/customer/components/product/SingleProductListView";
import { Product, SearchParams } from "@/app/customer/types";
import SingleProductCartView from "../product/SingleProductCartView";
import { Loader2 } from "lucide-react";
import Loader from "../others/Loader";
import { getAllBooks, searchBooks } from "@/app/customer/data/products/product";
import { mapBookToProduct } from "@/app/customer/data/products/bookToProduct";

interface ShopPageContainerProps {
  searchParams: SearchParams;
  gridColumn?: number;
}

const ShopPageContainer = ({
  searchParams,
  gridColumn,
}: ShopPageContainerProps) => {
  const [loading, setLoading] = useState(true);
  const [listView, setListView] = useState(false);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [paginatedData, setPaginatedData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.page) || 1
  );
  const itemsPerPage = 6;

  // Function to fetch and filter data based on search params
  const fetchAndFilterData = async () => {
    try {
      setLoading(true);
      let books;

      // Nếu có bất kỳ tham số lọc nào, sử dụng searchBooks
      if (searchParams.category || searchParams.min || searchParams.max) {
        const filters: Record<string, string> = {};
        if (searchParams.category) filters.category = searchParams.category;
        if (searchParams.min) filters.minPrice = searchParams.min;
        if (searchParams.max) filters.maxPrice = searchParams.max;

        const result = await searchBooks(
          searchParams.search,
          filters,
          undefined,
          currentPage - 1,
          itemsPerPage
        );
        books = result.content;
      } else {
        // Nếu không có tham số lọc, lấy tất cả sách
        books = await getAllBooks();
      }

      // Chuyển đổi book sang Product format
      const products = books.map(mapBookToProduct);
      setFilteredData(products);
      setCurrentPage(1); // Reset pagination to first page when filters change
    } catch (error) {
      console.error('Error fetching books:', error);
      // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo lỗi)
    } finally {
      setLoading(false);
    }
  };

  // Update filtered data whenever search params change
  useEffect(() => {
    fetchAndFilterData();
  }, [searchParams]);

  // change currentPage when searchparams page change
  useEffect(() => {
    setCurrentPage(Number(searchParams.page) || 1);
  }, [searchParams.page]);

  // Update paginated data whenever filtered data or pagination settings change
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredData.slice(startIndex, endIndex);
    setPaginatedData(paginatedProducts);
  }, [filteredData, currentPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full flex-col gap-3">
        <Loader2 className="animate-spin text-xl" size={50} />
        <p>Loading products..</p>
      </div>
    );
  }

  if (paginatedData.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center flex-col gap-4 text-xl mx-auto font-semibold space-y-4">
        <ProductViewChange
          listView={listView}
          setListView={setListView}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          itemPerPage={itemsPerPage}
          currentPage={currentPage}
        />
        <p>Sorry no result found with your filter selection</p>
      </div>
    );
  }

  return (
    <div className="md:ml-4 p-2 md:p-0">
      {/* product status and filter options */}
      <ProductViewChange
        listView={listView}
        setListView={setListView}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        itemPerPage={itemsPerPage}
        currentPage={currentPage}
      />

      {/* showing product list or cart view based on state */}
      {listView === true && (
        <div className="max-w-screen-xl mx-auto overflow-hidden py-4 md:py-8 gap-4 lg:gap-6">
          {paginatedData.map((product) => (
            <SingleProductListView key={product.id} product={product} />
          ))}
        </div>
      )}

      {listView === false && (
        <div
          className={`max-w-screen-xl mx-auto overflow-hidden py-4 md:py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${gridColumn || 3
            } overflow-hidden  gap-4 lg:gap-6`}
        >
          {paginatedData.map((product) => (
            <SingleProductCartView key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* product pagination here */}
      <Suspense fallback={<Loader />}>
        <Pagination
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          currentPage={currentPage}
          pageName="page"
        />
      </Suspense>
    </div>
  );
};

export default ShopPageContainer;
