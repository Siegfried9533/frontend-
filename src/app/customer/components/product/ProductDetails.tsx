"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import BuyNowBtn from "../buttons/BuyNowBtn";
import AddToCartBtn from "../buttons/AddToCartBtn";
import ProductQuantityChange from "./ProductQuantityChange";
import RatingReview from "../others/RatingReview";
import ProductDescription from "./ProductDescription";
import { Product } from "@/app/customer/types";
import Link from "next/link";
import { calculateDiscount } from "@/app/customer/lib/calculateDiscount";

// Component hiển thị chi tiết sản phẩm (sách)
// TODO: Có thể tuỳ chỉnh layout, style, logic hiển thị giá, số lượng, nút mua hàng...
const ProductDetails = ({ product }: { product: Product }) => {
  // State lưu số lượng sản phẩm muốn mua
  const [quantity, setQuantity] = useState(1);

  return (
    // TODO: Tuỳ chỉnh padding, margin, khoảng cách giữa các phần tử
    <div className="space-y-2 mt-2">
      {/* Hiển thị thể loại sách, có thể tuỳ chỉnh style button, màu nền, bo góc */}
      <Link
        href={`/shop?category=${product.category}`}
        className="bg-lime-500 py-1 px-4 rounded-full w-fit"
      >
        {product.category}
      </Link>
      {/* Tiêu đề sách, có thể tuỳ chỉnh font, cỡ chữ, màu sắc */}
      <h2 className="text-2xl md:text-3xl font-bold capitalize">
        {product.title}
      </h2>
      {/* Đánh giá sao, có thể tuỳ chỉnh số lượng review, màu sao, hiệu ứng hover */}
      <RatingReview
        rating={product.rating}
        review={0}
      />
      {/* Mô tả sách, có thể tuỳ chỉnh độ dài, style, hiển thị rút gọn/mở rộng */}
      <ProductDescription description={product.description} />

      {/* Hiển thị trạng thái kho hàng, có thể tuỳ chỉnh text, màu sắc, logic hiển thị */}
      <div>
        {product.quantity === 0 ? (
          <p className="text-lg w-fit rounded-md text-muted-foreground">out of stock</p>
        ) : (
          <p className="text-lg w-fit rounded-md text-muted-foreground">
            Only <span className="text-lg text-black dark:text-white">({product.quantity})</span> items in stock
          </p>
        )}
      </div>

      {/* Khu vực hiển thị giá và chọn số lượng */}
      <div className="flex items-center gap-6">
        <div className="">
          {/* Giá gốc, có thể tuỳ chỉnh style, màu, font, có thể ẩn nếu không có giảm giá */}
          <p className="text-muted-foreground line-through text-2xl">
            ${product.price}
          </p>
          <div className="flex items-center gap-4">
            {/* Giá sau giảm, có thể tuỳ chỉnh border, màu, hiệu ứng, logic tính giá */}
            <p className="text-3xl font-bold text-green-500 border-green-500 border py-2 px-6 rounded-lg">
              ${calculateDiscount(product.price, product.discount)}
            </p>
            {/* Component thay đổi số lượng mua, có thể tuỳ chỉnh min/max, style nút */}
            <ProductQuantityChange
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
        </div>
      </div>
      {/* Khu vực nút mua hàng, có thể tuỳ chỉnh thứ tự, style, logic truyền dữ liệu */}
      <div className="flex flex-col md:flex-row items-center gap-4 !my-6">
        {/* Nút thêm vào giỏ hàng */}
        <AddToCartBtn product={{ ...product, quantity, selectedColor: "default" }} />
        {/* Nút mua ngay */}
        <BuyNowBtn product={{ ...product, quantity, selectedColor: "default" }} />
      </div>
      {/* Separator, có thể tuỳ chỉnh màu, độ dày, margin */}
      <Separator className="!mt-4" />
    </div>
  );
};

export default ProductDetails;
