import db from '@/lib/db';
import { unstable_cache } from 'next/cache';

const getUserWithUsername = async (username: string) => {
  try {
    const user = await db.user.findFirst({
      where: { username },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  };
};

const getCategories = unstable_cache(async () => {
  try {
    const categories = await db.category.findMany({
      orderBy: { createdAt: 'desc' },
      include: { products: true },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return null;
  };
}, ['categories'], { revalidate: 3600, tags: ['categories'] });

const getCategoryWithId = async (id: string) => {
  try {
    const category = await db.category.findFirst({
      where: { id },
    });

    return category;
  } catch (error) {
    console.log(error);
    return null;
  };
};

const getProducts = unstable_cache(async () => {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return products;
  } catch (error) {
    console.log(error);
    return null;
  };
}, ['products'], { revalidate: 3600, tags: ['products'] });

const getProductWithId = async (id: string) => {
  try {
    const product = await db.product.findFirst({
      where: { id },
    });

    return product;
  } catch (error) {
    console.log(error);
    return null;
  };
};

export {
  getUserWithUsername,
  getCategories,
  getCategoryWithId,
  getProducts,
  getProductWithId,
};