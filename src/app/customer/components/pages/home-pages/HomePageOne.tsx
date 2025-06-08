import React, { Suspense } from "react";
import HeroBannerOne from "@/app/customer/components/hero/HeroBannerOne";
import ProductsCollectionOne from "@/app/customer/components/products/ProductsCollectionOne";
import NewsLetterTwo from "@/app/customer/components/newsLetter/NewsLetterTwo";
import LatestBlogPosts from "@/app/customer/components/blog/LatestBlogPosts";
import CategoriesCollection from "@/app/customer/components/category/CategoriesCollection";
import TestimonialsSection from "@/app/customer/components/others/Testimonials";
import BannerOne from "@/app/customer/components/banners/BannerOne";
import BenefitsSection from "@/app/customer/components/others/BenefitSection";
import Loader from "@/app/customer/components/others/Loader";

const HomePageOne = () => {
  return (
    <section className="overflow-hidden">
      <HeroBannerOne />
      <Suspense fallback={<Loader />}>
        <CategoriesCollection />
      </Suspense>
      <ProductsCollectionOne />
      <BenefitsSection textCenter={false} />
      <BannerOne />
      <TestimonialsSection textCenter={false} />
      <LatestBlogPosts twoColunmHeader={true} />
      <NewsLetterTwo />
    </section>
  );
};

export default HomePageOne;
