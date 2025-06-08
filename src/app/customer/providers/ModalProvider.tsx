"use client";
import MobileSearch from "@/app/customer/components/modals/MobileSearch";
import ProductQuickViewModal from "@/app/customer/components/modals/ProductQuickView";
import Loader from "@/app/customer/components/others/Loader";
import { useProductQuickViewStore } from "@/app/customer/store/productQuickViewStore";
import React, { Suspense } from "react";

const ModalProvider = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <ProductQuickViewModal />
        <MobileSearch />
      </Suspense>
    </div>
  );
};

export default ModalProvider;
