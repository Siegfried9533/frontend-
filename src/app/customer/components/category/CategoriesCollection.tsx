"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchProducts } from "@/app/customer/data/products/productsData";
import Link from "next/link";
import { Product } from "@/app/customer/types";

const CategoriesCollection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleCollectionClick = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    router.push(`shop?${params.toString()}`);
  };

  // Lấy các sản phẩm theo danh mục
  const getProductsByCategory = (category: string) => {
    return products.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  };

  // Danh sách các danh mục chính
  const mainCategories = ["Fiction", "Fantasy", "Science Fiction"];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-16 bg-slate-200 dark:bg-slate-800">
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-wrap">
        {mainCategories.map((category) => {
          const categoryProducts = getProductsByCategory(category);
          if (categoryProducts.length === 0) return null;

          return (
            <div
              key={category}
              onClick={() => handleCollectionClick(category)}
              className="flex flex-col gap-4 items-start justify-between p-4 md:p-8 rounded-xl bg-white dark:bg-slate-900 shadow-md"
            >
              <h2 className="text-xl md:text-2xl text-center font-semibold my-4 w-full">
                Best Deals For You On <span className="text-2xl font-bold">{category}</span>
              </h2>
              <div className="grid grid-cols-2 gap-4 place-content-center w-full">
                {categoryProducts.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col items-center justify-center text-center gap-2"
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="object-contain rounded-md"
                    />
                    <div className="flex items-center flex-col">
                      <p className="bg-rose-600 p-1 text-sm text-white whitespace-nowrap w-fit">
                        {product.discount}% off
                      </p>
                      <Link
                        href={`/shop/${product.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-semibold hover:text-green-500"
                      >
                        {product.title.slice(0, 15)}...
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="mt-4 flex items-center gap-4 text-lg font-semibold w-full"
                variant={"outline"}
                size={"lg"}
              >
                <ArrowRight /> Collections
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesCollection;
