"use client";
import { cn } from "@/app/customer/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  isInModal: boolean;
}

const ProductGallery = ({ images, isInModal }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageSelection = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="">
      <div
        className={cn(
          "relative w-full rounded-xl overflow-hidden bg-gray-200",
          isInModal
            ? "aspect-[5/8] w-full lg:min-w-[30rem]"
            : "aspect-[5/8] w-full lg:min-w-[30rem]"
        )}
      >
        <Image
          className="object-cover"
          src={selectedImage}
          alt="product"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
        />
      </div>
      <div className="flex items-center gap-2 p-2 overflow-auto hide-scrollbar mt-2">
        {images.map((image) => (
          <Image
            onClick={() => handleImageSelection(image)}
            className={cn("rounded-md object-cover border aspect-[5/8]", image === selectedImage && 'ring-2')}
            src={image}
            alt="product"
            key={image}
            width={100}
            height={160}
            quality={75}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
