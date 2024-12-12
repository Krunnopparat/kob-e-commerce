'use server';

import db from '@/lib/db';
import { FormState } from '@/utils/initial-state';
import { signinSchema, signupSchema } from '@/utils/schemas';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { getUserWithUsername } from './use-data';

type UserPayload = {
  id: string;
  username: string;
  email: string;
  role: string;
};

const generateJwtToken = async (payload: UserPayload) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secret);
  return token;
};

const SignupAction = async (_prevState: FormState, formData: FormData) => {

  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const result = signupSchema.safeParse({
      username,
      email,
      password,
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return {
        status: 'error',
        errors,
        message: 'กรุณากรอกข้อมูลให้ถูกต้อง',
      };
    };

    const validData = result.data;

    const hashPassword = await bcrypt.hash(validData.password, 10);

    const newUser = await db.user.create({
      data: {
        username: validData.username,
        email: validData.email,
        password: hashPassword,
      },
    });

    const payload: UserPayload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    };

    const token = await generateJwtToken(payload);

    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 วัน
    });

    return {
      status: 'success',
      message: 'Signup successful',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: 'Signup failed',
    }
  };
};

const SigninAction = async (_prevState: FormState, formData: FormData) => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    const result = signinSchema.safeParse({
      username,
      password,
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return {
        status: 'error',
        errors,
        message: 'กรุณากรอกข้อมูลให้ถูกต้อง',
      };
    };

    const validData = result.data;

    const user = await getUserWithUsername(validData.username);

    if (!user) {
      return {
        status: 'error',
        message: 'ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง',
      };
    };

    const isPasswordValid = await bcrypt.compare(validData.password, user.password);

    if (!isPasswordValid) {
      return {
        status: 'error',
        message: 'ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง',
      };
    };

    const payload: UserPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = await generateJwtToken(payload);

    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 วัน
    });

    return {
      status: 'success',
      message: 'เข้าสู่ระบบสําเร็จ',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: 'เข้าสู่ระบบล้มเหลว',
    };
  };
};

export { SignupAction, SigninAction };
export type { UserPayload };