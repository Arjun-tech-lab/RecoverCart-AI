export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'Home' | 'Fashion' | 'Tech' | 'Lifestyle';
  rating: number;
  reviews: number;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Premium Canvas Tote',
    price: 89.99,
    image: '/products/tote.jpg',
    description: 'Handcrafted canvas tote with genuine leather handles. Perfect for everyday use.',
    category: 'Fashion',
    rating: 4.8,
    reviews: 234,
    inStock: true,
  },
  {
    id: 'prod-002',
    name: 'Minimalist Wall Clock',
    price: 129.99,
    image: '/products/clock.jpg',
    description: 'Scandinavian-inspired wall clock with precision movement. Adds elegance to any space.',
    category: 'Home',
    rating: 4.9,
    reviews: 156,
    inStock: true,
  },
  {
    id: 'prod-003',
    name: 'Wireless Earbuds Pro',
    price: 199.99,
    image: '/products/earbuds.jpg',
    description: 'Premium noise-cancelling wireless earbuds with 8-hour battery life.',
    category: 'Tech',
    rating: 4.7,
    reviews: 512,
    inStock: true,
  },
  {
    id: 'prod-004',
    name: 'Organic Cotton Pillow Set',
    price: 149.99,
    image: '/products/pillows.jpg',
    description: 'Luxurious set of two organic cotton pillows with adjustable fill.',
    category: 'Home',
    rating: 4.9,
    reviews: 189,
    inStock: true,
  },
  {
    id: 'prod-005',
    name: 'Leather Desk Organizer',
    price: 79.99,
    image: '/products/organizer.jpg',
    description: 'Full-grain leather organizer with multiple compartments. Italian crafted.',
    category: 'Lifestyle',
    rating: 4.8,
    reviews: 98,
    inStock: true,
  },
  {
    id: 'prod-006',
    name: 'Sustainable Water Bottle',
    price: 34.99,
    image: '/products/bottle.jpg',
    description: 'Eco-friendly stainless steel water bottle with temperature control coating.',
    category: 'Lifestyle',
    rating: 4.6,
    reviews: 342,
    inStock: true,
  },
  {
    id: 'prod-007',
    name: 'Designer Coffee Maker',
    price: 249.99,
    image: '/products/coffee.jpg',
    description: 'Precision pour-over coffee maker with temperature control. German engineered.',
    category: 'Home',
    rating: 4.9,
    reviews: 267,
    inStock: true,
  },
  {
    id: 'prod-008',
    name: 'Premium Sunglasses',
    price: 189.99,
    image: '/products/sunglasses.jpg',
    description: 'UV-protective sunglasses with acetate frame and mineral glass lenses.',
    category: 'Fashion',
    rating: 4.8,
    reviews: 143,
    inStock: true,
  },
];
