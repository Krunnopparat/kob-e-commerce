'use client';

import { ChartColumnStacked, ListOrdered, PackageSearch } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarRoutes = [
  {
    icon: <PackageSearch />,
    title: 'สินค้า',
    path: '/admin/products',
  },
  {
    icon: <ChartColumnStacked />,
    title: 'หมวดหมู่สินค้า',
    path: '/admin/categories',
  },
  {
    icon: <ListOrdered />,
    title: 'ออเดอร์',
    path: '/admin/orders',
  },
];

const MenuLink = () => {
  const pathname = usePathname();

  return (
    <>
      {
        sidebarRoutes.map((route, index) => (
          <Link
            key={index}
            href={route.path}
            className={cn('flex items-center gap-4 p-3 rounded-lg hover:bg-yellow-100', {
              'bg-yellow-500 hover:bg-yellow-600 text-white': pathname.startsWith(route.path),
            })}
          >
            {route.icon} {route.title}
          </Link>
        ))
      }
    </>
  );
};
export default MenuLink;