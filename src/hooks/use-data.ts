import { unstable_cache } from 'next/cache';
import { Category, Product } from '@/types';

const categorys: Category[] = [
  {
    id: '1',
    name: 'สมาร์ทโฟน',
    imageUrl: '/categories/smartphones.jpg',
    products: [
      { id: '1', name: 'iPhone 15 Pro Max' },
      { id: '2', name: 'Samsung Galaxy S24 Ultra' },
      { id: '3', name: 'Google Pixel 8 Pro' }
    ]
  },
  {
    id: '2',
    name: 'แล็ปท็อป',
    imageUrl: '/categories/laptops.jpg',
    products: [
      { id: '4', name: 'MacBook Pro 14"' },
      { id: '5', name: 'MacBook Air M2' },
      { id: '6', name: 'Dell XPS 13' },
      { id: '7', name: 'ASUS ROG' }
    ]
  },
  {
    id: '3',
    name: 'แท็บเล็ต',
    imageUrl: '/categories/tablets.jpg',
    products: [
      { id: '8', name: 'iPad Pro 12.9"' },
      { id: '9', name: 'iPad Air' },
      { id: '10', name: 'Samsung Galaxy Tab S9' }
    ]
  },
  {
    id: '4',
    name: 'หูฟัง',
    imageUrl: '/categories/headphones.jpg',
    products: [
      { id: '11', name: 'AirPods Pro' },
      { id: '12', name: 'Sony WH-1000XM5' },
      { id: '13', name: 'Samsung Galaxy Buds2 Pro' }
    ]
  },
  {
    id: '5',
    name: 'สมาร์ทวอทช์',
    imageUrl: '/categories/smartwatches.jpg',
    products: [
      { id: '14', name: 'Apple Watch Series 9' },
      { id: '15', name: 'Apple Watch Ultra 2' },
      { id: '16', name: 'Samsung Galaxy Watch 6' }
    ]
  },
  {
    id: '6',
    name: 'อุปกรณ์เสริม',
    imageUrl: '/categories/accessories.jpg',
    products: [
      { id: '17', name: 'Apple Magic Keyboard' },
      { id: '18', name: 'Apple Pencil' },
      { id: '19', name: 'เคสโทรศัพท์' },
      { id: '20', name: 'ที่ชาร์จไร้สาย' }
    ]
  }
];

const mockProducts: Product[] = [
 {
   id: '1',
   name: 'iPhone 15 Pro Max',
   description: 'สมาร์ทโฟนรุ่นท็อปพร้อมชิป A17 Pro',
   price: 48900,
   imageUrl: '/products/iphone15.jpg',
   categoryId: '1',
   createdAt: new Date(),
   updatedAt: new Date()
 },
 {
   id: '2', 
   name: 'Samsung Galaxy S24 Ultra',
   description: 'สมาร์ทโฟนเรือธงรุ่นล่าสุดจาก Samsung',
   price: 45900,
   imageUrl: '/products/s24.jpg', 
   categoryId: '1',
   createdAt: new Date(),
   updatedAt: new Date()
 },
 {
   id: '3',
   name: 'iPad Pro 12.9"',
   description: 'แท็บเล็ตประสิทธิภาพสูงสำหรับมืออาชีพ',
   price: 42900,
   imageUrl: '/products/ipad.jpg',
   categoryId: '2',
   createdAt: new Date(),
   updatedAt: new Date()
 },
 {
   id: '4',
   name: 'MacBook Pro 14"',
   description: 'โน้ตบุ๊กประสิทธิภาพสูงสำหรับงานระดับมืออาชีพ',
   price: 59900,
   imageUrl: '/products/macbook.jpg',
   categoryId: '3',
   createdAt: new Date(),
   updatedAt: new Date()
 }
];

// Mock Users Data
const mockUsers = [
 {
   id: '1',
   username: 'admin',
   name: 'Admin User',
   email: 'admin@example.com',
   createdAt: new Date(),
   updatedAt: new Date()
 }
];

const getUserWithUsername = async (username: string) => {
 try {
   const user = mockUsers.find(user => user.username === username);
   return { user };
 } catch (error) {
   console.log(error);
   return { user: null };
 }
};

const getCategories = unstable_cache(async () => {
 try {
  return categorys;
} catch (error) {
  console.error('Error fetching categories:', error);
  return [] as Category[];
 }
}, ['categories'], { revalidate: 3600, tags: ['categories'] });

const getCategoryWithId = async (id: string) => {
 try {
   const category = categorys.find(category => category.id === id);
   return { category };
 } catch (error) {
   console.log(error);
   return { category: null };
 }
};

const getProducts = unstable_cache(async () => {
 try {
   return { products: mockProducts };
 } catch (error) {
   console.log(error);
   return { products: [] };
 }
}, ['products'], { revalidate: 3600, tags: ['products'] });

const getProductWithId = async (id: string) => {
 try {
   const product = mockProducts.find(product => product.id === id);
   return { product };
 } catch (error) {
   console.log(error);
   return { product: null };
 }
};

export {
 getUserWithUsername,
 getCategories,
 getCategoryWithId,
 getProducts,
 getProductWithId,
};