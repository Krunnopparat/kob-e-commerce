import { z } from 'zod';

const imageFileSchema = z.custom<File | null>((file) => {
  if (file.size === 0 || file.name === 'undefined') return true;
  
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  return (
    file instanceof File &&
    allowedTypes.includes(file.type) &&
    file.size <= maxSize
  );
}, {
  message: "กรุณาเลือกรูปภาพ JPEG, PNG หรือ WebP และขนาดไม่เกิน 5MB หรือไม่เลือกรูปภาพเลย",
});

const signupSchema = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters long',
  }),
  email: z.string().email({
    message: 'Invalid email address',
  })
    .refine(
      (email) => email.endsWith('@gmail.com') || email.endsWith('@outlook.com'),
      {
        message: 'Only Gmail or Outlook email addresses are allowed',
      }
    ),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

const signinSchema = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters long',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

const categorySchema = z.object({
  name: z.string().min(1, {
    message: 'กรุณากรอกชื่อหมวดหมู่สินค้า',
  }),
  image: imageFileSchema,
});

const productSchema = z.object({
  name: z.string().min(1, {
    message: 'กรุณากรอกชื่อสินค้า',
  }),
  categoryId: z.string().min(1, {
    message: 'กรุณาเลือกหมวดหมู่สินค้า',
  }),
  price: z.number(),
  image: imageFileSchema,
  quantity: z.number().min(1, {
    message: 'กรุณากรอกจํานวนสินค้า',
  }),
});

export { signupSchema, signinSchema, categorySchema, productSchema };