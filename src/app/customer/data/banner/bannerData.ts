export interface Banner {
    title: string;
    description: string;
    images: string[];
    button: string;
    discountText: string;
    link: string;
}

export const bannerData: Banner[] = [
    {
        title: 'The Alchemist',
        description: "A shepherd's journey to find his personal legend.",
        images: ['/images/product/thealchemist.jpg'],
        button: 'Buy Now',
        discountText: 'Buy now Get 10% off',
        link: 'shop?category=Fiction',
    },
    {
        title: 'The Hobbit',
        description: "A hobbit's adventurous journey to reclaim treasure from a dragon.",
        images: ['/images/product/thehobbit.jpg'],
        button: 'Shop Fantasy',
        discountText: 'Buy now Get 5% off',
        link: 'shop?category=Fantasy',
    },
    {
        title: 'Pride and Prejudice',
        description: 'A romantic novel about manners and matrimonial machinations.',
        images: ['/images/product/prideandprejudice.jpg'],
        button: 'Order Now',
        discountText: 'Buy now Get 15% off',
        link: 'shop?category=Romance',
    },
];
