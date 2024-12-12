'use server';
import { FormState } from '@/utils/initial-state';
import db from '@/lib/db';
import { productSchema } from '@/utils/schemas';
import { revalidateTag } from 'next/cache';
import { handleUploadImage, removeImage } from './use-image';

const createProduct = async (_prevState: FormState, formData: FormData) => {
  const name = formData.get('name') as string;
  const categoryId = formData.get('categoryId') as string;
  const price = formData.get('price') as string;
  const image = formData.get('image') as File | null;
  const quantity = formData.get('quantity') as string;

  try {
    const result = productSchema.safeParse({
      name,
      categoryId,
      price: Number(price),
      image,
      quantity: Number(quantity),
    });

    if (result.error) {
      const errors = result.error.flatten().fieldErrors;
      console.log(errors);
      return {
        status: 'error',
        errors,
        message: 'กรุณากรอกข้อมูลให้ถูกต้อง',
      };
    };

    const validData = result.data;

    const category = await db.category.findFirst({
      where: { id: validData.categoryId },
    });

    if (!category) {
      return {
        status: 'error',
        message: 'ไม่พบหมวดหมู่สินค้า',
      };
    };

    const product = await db.product.findFirst({
      where: { name: validData.name, categoryId: validData.categoryId },
    });

    if (product) {
      return {
        status: 'error',
        message: 'ชื่อสินค้าซ้ํา',
      };
    };

    const { imageUrl, imageId } = await handleUploadImage(validData.image as File | null);

    await db.product.create({
      data: {
        name: validData.name,
        categoryId: validData.categoryId,
        price: validData.price,
        quantity: validData.quantity,
        imageUrl,
        imageId,
      },
    });

    revalidateTag('products');
    revalidateTag('categories');

    return {
      status: 'success',
      message: 'สร้างสินค้าสําเร็จ',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: 'สร้างสินค้าไม่สําเร็จ',
    };
  };
};

const updateProduct = async (_prevState: FormState, formData: FormData) => {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const categoryId = formData.get('categoryId') as string;
  const price = formData.get('price') as string;
  const image = formData.get('newImage') as File | null;
  const quantity = formData.get('quantity') as string;

  try {
    const result = productSchema.safeParse({
      id,
      name,
      categoryId,
      price: Number(price),
      image,
      quantity: Number(quantity),
    });

    if (result.error) {
      const errors = result.error.flatten().fieldErrors;
      return {
        status: 'error',
        errors,
        message: 'กรุณากรอกข้อมูลให้ถูกต้อง',
      };
    }

    const validData = result.data

    const category = await db.category.findFirst({
      where: { id: validData.categoryId },
    });

    if (!category) {
      return {
        status: 'error',
        message: 'ไม่พบหมวดหมู่สินค้า',
      };
    };

    const product = await db.product.findFirst({
      where: {
        name: validData.name,
        categoryId: validData.categoryId,
      },
    });

    if (product && product.id !== id) {
      return {
        status: 'error',
        message: 'ชื่อสินค้าซ้ํา',
      };
    };

    const { imageUrl, imageId } = await handleUploadImage(validData.image as File | null);
    if (imageUrl && product?.imageId) {
      await removeImage(product.imageId);
    };

    await db.product.update({
      where: {
        id,
      },
      data: {
        name: validData.name,
        categoryId: validData.categoryId,
        price: validData.price,
        quantity: validData.quantity,
        imageUrl: imageUrl || product?.imageUrl,
        imageId: imageId || product?.imageId,
      },
    });

    revalidateTag('products');
    revalidateTag('categories');

    return {
      status: 'success',
      message: 'แก้ไขสินค้าสําเร็จ',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: 'แก้ไขสินค้าไม่สําเร็จ',
    };
  };
};

const removeProduct = async (id: string) => {
  try {
    const product = await db.product.findFirst({
      where: { id },
      select: { imageId: true },
    });

    if (product?.imageId) {
      await removeImage(product.imageId);
    };

    await db.product.delete({
      where: { id },
    });

    revalidateTag('products');
    revalidateTag('categories');

    return {
      status: 'success',
      message: 'ลบสินค้าสําเร็จ',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: 'ลบสินค้าไม่สําเร็จ',
    };
  };
};

export { createProduct, updateProduct, removeProduct };