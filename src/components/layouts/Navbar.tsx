'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Search,
    MenuIcon,
    ShoppingCart,
    User,
    Heart,
    Bell,
    LogOut
} from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Navbar() {
    const isAuthenticated = true;
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const menuItems = [
        { name: 'หน้าแรก', path: '/' },
        { name: 'สินค้าทั้งหมด', path: '/products' },
        { name: 'โปรโมชั่น', path: '/promotions' },
        { name: 'ติดต่อเรา', path: '/contact' },
    ];

    const userMenuItems = [
        { name: 'รายการสั่งซื้อ', path: '/orders', icon: ShoppingCart },
        { name: 'บัญชี', path: '/ProfilePage', icon: User },
    ];

    return (
        <nav className="shadow-lg bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Mobile Menu Button */}
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <MenuIcon className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-72">
                            <SheetHeader>
                                <SheetTitle>เมนู</SheetTitle>
                            </SheetHeader>
                            <div className="mt-6 flex flex-col gap-4">
                                {menuItems.map((item) => (
                                    <SheetClose asChild key={item.path}>
                                        <Link href={item.path} className="text-lg hover:text-primary">
                                            {item.name}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <Link href="/" className="text-xl md:text-2xl font-bold text-primary">
                        Kob E-Commerce
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="text-gray-600 hover:text-primary transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-6">
                        <div className="relative flex-1">
                            <Input
                                type="search"
                                placeholder="ค้นหาสินค้า..."
                                className="pl-10 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        <Button type="submit" variant="secondary">ค้นหา</Button>
                    </form>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link href="/cart" className="relative">
                                    <Button variant="ghost" size="icon">
                                        <ShoppingCart className="h-5 w-5" />
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                            2
                                        </span>
                                    </Button>
                                </Link>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="/placeholder-avatar.jpg" alt="ผู้ใช้" />
                                                <AvatarFallback>KE</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        {userMenuItems.map((item) => (
                                            <DropdownMenuItem key={item.path} asChild>
                                                <Link href={item.path} className="flex items-center">
                                                    <item.icon className="mr-2 h-4 w-4" />
                                                    <span>{item.name}</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>ออกจากระบบ</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" asChild>
                                    <Link href="/login">เข้าสู่ระบบ</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/register">สมัครสมาชิก</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <form onSubmit={handleSearch} className="md:hidden px-4 pb-4">
                <div className="relative">
                    <Input
                        type="search"
                        placeholder="ค้นหาสินค้า..."
                        className="pl-10 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
            </form>
        </nav>
    );
};