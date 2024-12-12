import Logo from './Logo';
import SearchProduct from './SearchProduct';
import Menu from './Menu';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { MenuIcon, ShoppingCart, User } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { UserInfo } from '@/types/user-info';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'ตระกร้าสินค้า', path: '/cart', Icon: ShoppingCart },
  { name: 'บัญชีของฉัน', path: '/account', Icon: User },
];

const authLinks = [
  { name: 'เข้าสู่ระบบ', path: '/login' },
  { name: 'สมัครสมาชิก', path: '/register' },
];

const Navbar = async () => {

  const headerStore = await headers();
  const userInfo = headerStore.get('X-USER-INFO') as string;

  return (
    <nav className='shadow-lg'>
      <div className='max-w-7xl mx-auto h-16 flex items-center justify-between px-6 2xl:px-0'>
        <Link href='/' className='text-xl md:text-2xl font-bold text-primary'>
          Kob E-Commerce
        </Link>
        <div className='hidden md:flex items-center space-x-4'>
          <div className='relative'>
            <Input
              type='search'
              placeholder='ค้นหาสินค้า...'
              className='w-64 pl-10'
            />
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
          </div>
          <Button variant='outline'>ค้นหา</Button>
        </div>
        <Menu userInfo={JSON.parse(userInfo)} />
      </div>
    </nav>
  );
};

export default Navbar;