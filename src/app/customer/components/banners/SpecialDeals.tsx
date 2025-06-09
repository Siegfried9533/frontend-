"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "@/app/customer/data/products/productsData";
import { cn } from "@/lib/utils";
import { Product } from "@/app/customer/types";

interface CountdownProps {
  targetDate: number;
}

const CountdownTimer: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="py-2 flex items-center gap-3">
      <div>
        <p className="text-2xl font-medium">{timeLeft.days < 10 && '0'}{timeLeft.days} :</p>
        <small>Days</small>
      </div>
      <div>
        <p className="text-2xl font-medium">{timeLeft.hours < 10 && '0'}{timeLeft.hours} :</p>
        <small>Hours</small>
      </div>
      <div>
        <p className="text-2xl font-medium">{timeLeft.minutes < 10 && '0'}{timeLeft.minutes} :</p>
        <small>Minutes</small>
      </div>
      <div>
        <p className="text-2xl font-medium">{timeLeft.seconds < 10 && '0'}{timeLeft.seconds}</p>
        <small>Seconds</small>
      </div>
    </div>
  );
};

/**
 * Component hiển thị các sách đang được giảm giá đặc biệt
 * @param textCenter - Boolean để xác định vị trí căn giữa của tiêu đề
 */
const SpecialDeals = ({ textCenter }: { textCenter: boolean }) => {
  // State quản lý danh sách sách và trạng thái loading
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Effect hook để lấy dữ liệu sách khi component mount
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

  // Hiển thị loading state khi đang tải dữ liệu
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-16 bg-slate-200 dark:bg-slate-800">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        {/* Tiêu đề section */}
        <h2
          className={cn(
            "text-3xl lg:text-5xl w-fit mx-auto  mb-12 p-2 font-bold border-l-4 border-rose-500",
            textCenter ? "text-center" : "text-left"
          )}
        >
          Special Deals
        </h2>
        {/* Grid hiển thị các sách đang giảm giá */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.slice(0, 4).map((deal) => (
            <div
              key={deal.id}
              className="bg-white dark:bg-slate-700 shadow-md rounded-lg overflow-hidden flex flex-col lg:flex-row items-center p-6 lg:p-4 gap-6"
            >
              {/* Hình ảnh sách */}
              <div className="relative w-full h-48 lg:w-40 lg:h-40  bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={deal.image || ""}
                  alt={deal.title}
                  fill
                  className="rounded-lg object-contain lg:object-cover"
                />
              </div>
              <div className="flex flex-col flex-grow">
                {/* Bộ đếm ngược thời gian giảm giá */}
                <CountdownTimer targetDate={Date.now() + 7 * 24 * 60 * 60 * 200} />

                {/* Thông tin sách */}
                <h3 className="text-xl font-semibold mb-2">
                  {deal.title.slice(0, 50)}...
                </h3>
                <div className="flex items-center justify-between gap-4 lg:gap-2">
                  {/* Giá và giảm giá */}
                  <div className="flex flex-col lg:flex-row items-center lg:items-start">
                    <span className="text-muted-foreground text-sm line-through mr-2">
                      ${deal.price}
                    </span>
                    <span className="text-green-500 text-xl mx-1 font-semibold">
                      ${deal.price - deal.discount}
                    </span>
                    <span className="text-sm ml-1 text-rose-500">
                      (${deal.discount} off)
                    </span>
                  </div>
                  {/* Nút xem chi tiết */}
                  <Link
                    href={`/shop/${deal.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-block text-center whitespace-nowrap"
                  >
                    View Deal
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialDeals;
