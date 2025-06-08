export const calculateDiscount = (originalPrice: number, discountPrice: number): number => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
}; 