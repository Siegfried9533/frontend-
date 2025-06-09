export const calculateDiscount = (originalPrice: number, discountPrice: number): number => {
    return /* Math.round */(originalPrice - (1 - ((originalPrice - discountPrice) / originalPrice)) / 100);
}; 