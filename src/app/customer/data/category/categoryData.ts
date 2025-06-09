export interface Category {
  id: number;
  name: string;
  image?: string;
  description?: string;
}

export const dummyCategories: Category[] = [
  { id: 1, name: "Fiction", image: "/images/category/fiction.jpg", description: "Explore captivating narratives and imaginative worlds." },
  { id: 2, name: "Non-Fiction", image: "/images/category/non-fiction.jpg", description: "Discover real-world facts and insightful perspectives." },
  { id: 3, name: "Science", image: "/images/category/science.jpg", description: "Delve into the wonders of scientific discovery and innovation." },
  { id: 4, name: "History", image: "/images/category/history.jpg", description: "Journey through time and unravel the past." },
  { id: 5, name: "Biography", image: "/images/category/biography.jpg", description: "Read inspiring stories of remarkable lives." },
  { id: 6, name: "Children", image: "/images/category/children.jpg", description: "Engage young minds with delightful tales and adventures." },
  { id: 7, name: "Education", image: "/images/category/education.jpg", description: "Enhance your knowledge and skills with educational resources." },
  { id: 8, name: "Reference", image: "/images/category/reference.jpg", description: "Find quick answers and essential information." }
];
