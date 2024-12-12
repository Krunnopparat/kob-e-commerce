'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
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

const renderLinks = (links: typeof navLinks | typeof authLinks, isIcon = false) => {
  return (
    links.map((link, index) => (
      <Link
        key={index}
        href={link.path}
        className={cn('transition-all duration-300', {
          'p-2 rounded-full bg-purple-100 hover:bg-purple-200': isIcon,
          'block py-3 px-4 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md': !isIcon
        })}
      >
        {isIcon && 'Icon' in link ? (
          <link.Icon
            size={24}
            className='text-purple-600 hover:text-purple-800 transition-colors duration-300'
          />
        ) : (
          <span className='font-medium'>{link.name}</span>
        )}
      </Link>
    ))
  );
};

type MenuProps = {
  userInfo: UserInfo;
};

const Menu = ({ userInfo }: MenuProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
      <div className='hidden md:flex items-center space-x-6'>
        {userInfo.isAuthenticated ? renderLinks(navLinks, true) : renderLinks(authLinks)}
      </div>

      <div className='md:hidden'>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button size='icon' variant='outline' className='border-purple-200 hover:bg-purple-50'>
              <MenuIcon className='text-purple-600' />
            </Button>
          </SheetTrigger>

          <SheetContent className='bg-white'>
            <SheetHeader className='border-b pb-4 mb-4'>
              <SheetTitle className='text-left text-2xl font-bold text-purple-700'>Menu</SheetTitle>
            </SheetHeader>
            <SheetDescription className='text-base'>
              {userInfo.isAuthenticated
                ? renderLinks(navLinks)
                : renderLinks(authLinks)}
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Menu;

