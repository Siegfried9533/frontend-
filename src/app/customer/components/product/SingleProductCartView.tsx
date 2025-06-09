"use client";
import React, { useEffect, useState } from "react";
import RatingReview from "../others/RatingReview";
import Link from "next/link";
import Image from "next/image";
import ProductOptions from "./ProductOptions";
import { Product } from "@/app/customer/types";
import { calculateDiscount } from "@/lib/calculateDiscount";
import { useRouter } from "next/navigation";

const SingleProductCartView = ({ product }: { product: Product }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const {
    category,
    discount,
    id,
    image,
    title,
    price,
    rating,
    quantity,
  } = product;

  // Tính giá sau khi giảm giá
  const discountedPrice = calculateDiscount(price, discount);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    // TODO: Có thể tùy chỉnh style card:
    // - border: Viền
    // - rounded-xl: Bo góc
    // - shadow-lg: Đổ bóng
    // - overflow-hidden: Ẩn nội dung tràn
    <Link
      href={`/shop/${id}`}
      className="relative border rounded-xl shadow-lg overflow-hidden group"
    >
      {/* TODO: Có thể tùy chỉnh container ảnh:
          - bg-gray-200: Màu nền
          - overflow-hidden: Ẩn nội dung tràn */}
      <div className={`w-full bg-gray-200 overflow-hidden`}>
        {/* TODO: Có thể tùy chỉnh container ảnh chính:
            - aspect-[5/8]: Tỷ lệ khung hình (5:8)
            - group-hover:scale-110: Hiệu ứng phóng to khi hover
            - transition-all duration-300: Thời gian chuyển động */}
        <div className="relative aspect-[5/8] w-full group-hover:scale-110 transition-all duration-300 rounded-md overflow-hidden">
          {/* TODO: Có thể tùy chỉnh ảnh:
              - object-cover: Cách ảnh được căn chỉnh
              - quality: Chất lượng ảnh (1-100)
              - sizes: Kích thước ảnh trên các màn hình */}
          <Image
            className="object-cover"
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />
          {/* TODO: Có thể tùy chỉnh badge trạng thái:
              - py-1 px-4: Padding
              - text-sm: Kích thước chữ
              - font-bold: Độ đậm chữ
              - bg-rose-500: Màu nền
              - text-white: Màu chữ */}
          {quantity === 0 ? (
            <p className="py-1 px-4 text-sm font-bold rounded-sm bg-rose-500 text-white absolute top-2 right-2">
              out of stock
            </p>
          ) : (
            <p className="py-1 px-4 text-sm font-bold rounded-sm bg-rose-500 text-white absolute top-2 right-2">
              {discount}% off
            </p>
          )}
        </div>
      </div>

      {/* TODO: Có thể tùy chỉnh container thông tin:
          - my-2: Margin trên dưới
          - space-y-1: Khoảng cách giữa các phần tử
          - p-4: Padding */}
      <div className="my-2 space-y-1 p-4">
        {/* TODO: Có thể tùy chỉnh link thể loại:
            - text-sm: Kích thước chữ
            - text-sky-500: Màu chữ
            - font-light: Độ đậm chữ */}
        <p
          onClick={(e) => {
            e.preventDefault();
            router.push(`shop?category=${category}`);
          }}
          className="text-sm text-sky-500 font-light -mb-1 hover:opacity-60"
        >
          {category}
        </p>

        {/* TODO: Có thể tùy chỉnh tiêu đề sách:
            - text-xl: Kích thước chữ
            - font-fold: Độ đậm chữ
            - capitalize: Viết hoa chữ cái đầu */}
        <h3 className="text-xl font-fold capitalize hover:text-green-500">
          {title.slice(0, 45)}
          {title.length > 45 && "..."}
        </h3>

        {/* TODO: Có thể tùy chỉnh đánh giá:
            - Thêm số lượng đánh giá
            - Thay đổi màu sao
            - Thêm hiệu ứng hover */}
        <RatingReview rating={rating} review={0} />

        {/* TODO: Có thể tùy chỉnh hiển thị giá:
            - text-lg: Kích thước chữ
            - font-bold: Độ đậm chữ
            - space-x-3: Khoảng cách giữa các phần tử */}
        <div className="text-lg font-bold space-x-3">
          <span className="line-through text-muted-foreground">${price}</span>
          <span className="text-xl font-bold text-green-500">
            ${discountedPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SingleProductCartView;
