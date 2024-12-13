import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChartColumnStacked, ListOrdered, PackageSearch, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sidebarRoutes = [
  {
    icon: <PackageSearch className="w-5 h-5" />,
    title: 'สินค้า',
    path: '/admin/products',
  },
  {
    icon: <ChartColumnStacked className="w-5 h-5" />,
    title: 'หมวดหมู่สินค้า',
    path: '/admin/categories',
  },
  {
    icon: <ListOrdered className="w-5 h-5" />,
    title: 'ออเดอร์',
    path: '/admin/orders',
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname();

  const NavLinks = () => (
    <div className="flex flex-col gap-2">
      {sidebarRoutes.map((route, index) => (
        <Link
          key={index}
          href={route.path}
          className={cn(
            'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
            'hover:bg-yellow-100 active:bg-yellow-200',
            {
              'bg-yellow-500 hover:bg-yellow-600 text-white': 
                pathname.startsWith(route.path),
            }
          )}
        >
          {route.icon}
          <span className="text-sm font-medium">{route.title}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 items-center gap-4 px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <div className="mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
          
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              alt="Logo"
              src="/logo.png"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <div className="font-semibold">
              {process.env.APP_NAME}{' '}
              <span className="text-sm text-muted-foreground">
                v{process.env.APP_VERSION}
              </span>
            </div>
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden sm:flex w-64 flex-col gap-4 border-r bg-gray-50/50">
          <div className="sticky top-16 p-4 pt-6">
            <NavLinks />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;