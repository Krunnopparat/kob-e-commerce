'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    ChartColumnStacked,
    ListOrdered,
    PackageSearch,
    Menu,
    User,
    Settings,
    LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const AdminDashboardLayout = ({ children }: AdminLayoutProps) => {
    const pathname = usePathname();

    const admin = {
        name: "จอห์น โด",
        role: "ผู้ดูแลระบบ",
        email: "john@example.com",
        avatar: "/avatar.png"
    };

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
                <div className="flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
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
                            <div>
                                <div className="font-semibold">
                                    KOB
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    เวอร์ชั่น 1.0.2
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Admin Profile */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={admin.avatar} alt={admin.name} />
                                    <AvatarFallback>{admin.name[0]}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{admin.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{admin.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>โปรไฟล์</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>ตั้งค่า</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>ออกจากระบบ</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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

export default AdminDashboardLayout;