'use server';

import db from '@/lib/db';
import { FormState } from '@/utils/initial-state';
import { categorySchema } from '@/utils/schemas';
import { revalidateTag } from 'next/cache';
import { removeImage, handleUploadImage } from './use-image';

const createCategory = async (_prevState: FormState, formData: FormData) => {
  const name = formData.get('name') as string;
  const image = formData.get('image') as File | null;
  try {
    const result = categorySchema.safeParse({
      name,
      image: image || null,
    });

    if (result.error) {
      const errors = result.error.flatten().fieldErrors;
      return {
        status: 'error',
        errors,
        message: 'กรุณากรอกข้อมูลให้ถูกต้อง',
      };
    };

    const validData = result.data;

    const category = await db.category.findFirst({
      where: { name: validData.name },
    });

    if (category) {
      return {
        status: 'error',
        message: 'หมวดหมู่สินค้านี้มีอยู่แล้ว',
      };
    };

    const { imageUrl, imageId } = await handleUploadImage(validData.image as File | null);

    await db.category.create({
      data: {
        name: validData.name,
        imageUrl,
        imageId,
      },
    });

    revalidateTag('categories');

    return {
      status: 'success',
      message: 'สร้างหมวดหมู่สินค้าสําเร็จ',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: 'สร้างหมวดหมู่สินค้าไม่สําเร็จ',
    };
  };
};

const updateCategory = async (_prevState: FormState, formData: FormData) => {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const image = formData.get('newImage') as File | null;

  try {
    const result = categorySchema.safeParse({
      name,
      image: image || null,
    });

    if (result.error) {
      const errors = result.error.flatten().fieldErrors;
      return {
        status: 'error',
        errors,
        message: 'กรุณากรอกข้อมูลให้ถูกต้อง',
      };
    };

    const validData = result.data;

    const category = await db.category.findFirst({
      where: { name: validData.name },
    });

    if (category && category.id !== id) {
      return {
        status: 'error',
        message: 'หมวดหมู่สินค้านี้มีอยู่แล้ว',
      };
    };

    const { imageUrl, imageId } = await handleUploadImage(validData.image as File | null);
    if (imageUrl && category?.imageId) {
      await removeImage(category.imageId);
    };

    await db.category.update({
      where: { id },
      data: {
        name: validData.name,
        imageUrl: imageUrl || category?.imageUrl,
        imageId: imageId || category?.imageId,
      },
    });

    revalidateTag('categories');

    return {
      status: 'success',
      message: 'แก้ไขหมวดหมู่สินค้าสําเร็จ',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: 'แก้ไขหมวดหมู่สินค้าไม่สําเร็จ',
    };
  };
};

const removeCategory = async (id: string) => {
  try {
    const category = await db.category.findFirst({
      where: { id },
      select: { imageId: true },
    });

    if (category?.imageId) {
      await removeImage(category.imageId);
    };

    await db.category.delete({
      where: { id },
    });

    revalidateTag('categories');
    revalidateTag('products');

    return {
      status: 'success',
      message: 'ลบหมวดหมู่สินค้าสําเร็จ',
    }
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: 'ลบหมวดหมู่สินค้าไม่สําเร็จ',
    };
  };
};

export { createCategory, updateCategory, removeCategory };