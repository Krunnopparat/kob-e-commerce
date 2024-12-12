import { type NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { UserInfo } from './types/user-info';

// กำหนดเส้นทางที่ต้องการการยืนยันตัวตน
const protectedRoutes: string[] = ['/cart'];

// ฟังก์ชันตรวจสอบว่าเป็นเส้นทางของผู้ดูแลระบบหรือไม่
const isAdminRoute = (pathname: string) => pathname.startsWith('/admin');

// ฟังก์ชันสำหรับตรวจสอบความถูกต้องของโทเค็น JWT
const validateToken = async (token: string) => {
  try {
    // เข้ารหัสค่าลับ (secret) จากตัวแปรสภาพแวดล้อม
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    // ตรวจสอบและแยกข้อมูลจากโทเค็น JWT
    const { payload } = await jwtVerify(token, secret);
    return payload; // คืนค่าข้อมูลที่ถอดรหัสได้
  } catch (error) {
    console.log(error); // แสดงข้อผิดพลาดใน console
    return null; // คืนค่า null เมื่อโทเค็นไม่ถูกต้อง
  }
};

// มิดเดิลแวร์สำหรับการจัดการคำขอ
export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname; // ดึงเส้นทางจากคำขอ
  const token = req.cookies.get('token')?.value; // ดึงโทเค็นจากคุกกี้

  // กำหนดข้อมูลผู้ใช้เริ่มต้น
  let userInfo: UserInfo = {
    isAuthenticated: false, // สถานะการยืนยันตัวตน
    username: '', // ชื่อผู้ใช้
    email: '', // อีเมลผู้ใช้
    role: '', // บทบาทของผู้ใช้
  };

  if (token) {
    // ตรวจสอบโทเค็นและดึงข้อมูล
    const payload = await validateToken(token);
    if (payload) {
      // อัปเดตข้อมูลผู้ใช้เมื่อโทเค็นถูกต้อง
      userInfo = {
        isAuthenticated: true,
        username: payload.username as  string,
        email: payload.email as string,
        role: payload.role as string,
      };

      // ตรวจสอบว่าโทเค็นหมดอายุหรือไม่
      if ((payload.exp as number) < Date.now() / 1000) {
        req.cookies.delete('token'); // ลบโทเค็นเมื่อหมดอายุ
        userInfo = {
          isAuthenticated: false,
          username: '',
          email: '',
          role: '',
        };
      };
    };
  };

  const response = NextResponse.next(); // สร้างคำตอบเริ่มต้น
  response.headers.set('X-USER-INFO', JSON.stringify(userInfo)); // เพิ่มข้อมูลผู้ใช้ใน header

  // ตรวจสอบเส้นทางที่ต้องการการยืนยันตัวตน
  if (protectedRoutes.includes(pathname) && !userInfo.isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', req.url)); // เปลี่ยนเส้นทางไปหน้า sign-in
  }

  // ตรวจสอบเส้นทางของผู้ดูแลระบบ
  if (isAdminRoute(pathname) && (!userInfo.isAuthenticated || userInfo.role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/', req.url)); // เปลี่ยนเส้นทางไปหน้าแรก
  }

  // ป้องกันการเข้าถึงหน้า sign-in หรือ sign-up เมื่อผู้ใช้ล็อกอินแล้ว
  if (userInfo.isAuthenticated && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/', req.url)); // เปลี่ยนเส้นทางไปหน้าแรก
  }

  return response; // ส่งคำตอบกลับ
};

// กำหนดการแมปเส้นทางสำหรับมิดเดิลแวร์
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // ยกเว้นบางเส้นทางที่ไม่ต้องตรวจสอบ
};