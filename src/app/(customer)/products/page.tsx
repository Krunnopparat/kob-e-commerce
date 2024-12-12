import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { ShoppingCart, SlidersHorizontal } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

export default function ProductsPage() {
    const categories = [
        { id: 'phones', name: 'สมาร์ทโฟน', count: 124 },
        { id: 'laptops', name: 'โน๊ตบุ๊ค', count: 89 },
        { id: 'tablets', name: 'แท็บเล็ต', count: 45 },
        { id: 'desktops', name: 'คอมพิวเตอร์', count: 67 },
        { id: 'accessories', name: 'อุปกรณ์เสริม', count: 234 },
    ];

    const brands = [
        { id: 'apple', name: 'Apple', count: 78 },
        { id: 'samsung', name: 'Samsung', count: 92 },
        { id: 'asus', name: 'Asus', count: 45 },
        { id: 'acer', name: 'Acer', count: 34 },
        { id: 'lenovo', name: 'Lenovo', count: 56 },
    ];

    const products = Array(12).fill({
        id: 1,
        name: 'iPhone 15 Pro',
        spec: 'A17 Pro | 256GB | Natural Titanium',
        price: 49900,
        originalPrice: 52900,
        image: {
            src: '/uploads/iphone-13.jpg',
            width: 300,
            height: 300,
            alt: 'iPhone 15 Pro'
        },
        rating: 4,
        reviews: 256,
        badge: 'ใหม่'
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">สินค้าทั้งหมด</h1>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <Input placeholder="ค้นหาสินค้า..." className="w-full" />
                    </div>
                    <Select defaultValue="recommended">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="เรียงลำดับ" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recommended">แนะนำ</SelectItem>
                            <SelectItem value="newest">ใหม่ล่าสุด</SelectItem>
                            <SelectItem value="price-asc">ราคาต่ำ - สูง</SelectItem>
                            <SelectItem value="price-desc">ราคาสูง - ต่ำ</SelectItem>
                            <SelectItem value="popular">ยอดนิยม</SelectItem>
                        </SelectContent>
                    </Select>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="lg:hidden">
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                กรองสินค้า
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px]">
                            <SheetHeader>
                                <SheetTitle>กรองสินค้า</SheetTitle>
                            </SheetHeader>
                            {/* Filter Content - Mobile */}
                            <div className="mt-4">
                                <FilterAccordions />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Filters - Desktop */}
                <div className="hidden lg:block w-[240px] flex-shrink-0">
                    <div className="sticky top-6">
                        <FilterAccordions />
                    </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {products.map((product, index) => (
                            <Card key={index} className="border rounded-lg overflow-hidden group">
                                <div className="relative">
                                    <div className="aspect-square bg-white p-4">
                                        <Image
                                            src={product.image.src}
                                            alt={product.image.alt}
                                            width={product.image.width}
                                            height={product.image.height}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                    {product.badge && (
                                        <Badge className="absolute top-2 left-2 bg-blue-500 text-white font-normal">
                                            {product.badge}
                                        </Badge>
                                    )}
                                </div>

                                <CardContent className="p-4">
                                    <h3 className="font-medium text-base mb-1 line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                                        {product.spec}
                                    </p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-primary">
                                            ฿{product.price.toLocaleString()}
                                        </span>
                                        {product.originalPrice > product.price && (
                                            <span className="text-sm text-gray-400 line-through">
                                                ฿{product.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </CardContent>

                                <CardFooter className="p-4 pt-0">
                                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" size="sm">
                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                        เพิ่มลงตะกร้า
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center gap-2">
                        <Button variant="outline" size="sm" disabled>
                            ก่อนหน้า
                        </Button>
                        <Button variant="outline" size="sm" className="bg-primary text-white">
                            1
                        </Button>
                        <Button variant="outline" size="sm">2</Button>
                        <Button variant="outline" size="sm">3</Button>
                        <Button variant="outline" size="sm">
                            ถัดไป
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Filter Accordions Component
const FilterAccordions = () => (
    <Accordion type="multiple" defaultValue={['category', 'brand', 'price']}>
        <AccordionItem value="category">
            <AccordionTrigger>หมวดหมู่</AccordionTrigger>
            <AccordionContent>
                {['สมาร์ทโฟน', 'โน๊ตบุ๊ค', 'แท็บเล็ต', 'คอมพิวเตอร์', 'อุปกรณ์เสริม'].map((category) => (
                    <div key={category} className="flex items-center space-x-2 py-1">
                        <Checkbox id={category} />
                        <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {category}
                        </label>
                    </div>
                ))}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
            <AccordionTrigger>แบรนด์</AccordionTrigger>
            <AccordionContent>
                {['Apple', 'Samsung', 'Asus', 'Acer', 'Lenovo'].map((brand) => (
                    <div key={brand} className="flex items-center space-x-2 py-1">
                        <Checkbox id={brand} />
                        <label htmlFor={brand} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {brand}
                        </label>
                    </div>
                ))}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
            <AccordionTrigger>ช่วงราคา</AccordionTrigger>
            <AccordionContent className="pt-4 pb-6">
                <div className="space-y-4">
                    <Slider defaultValue={[20000]} max={100000} step={1000} />
                    <div className="flex items-center justify-between">
                        <Input type="number" placeholder="ต่ำสุด" className="w-24" />
                        <span className="text-gray-500">-</span>
                        <Input type="number" placeholder="สูงสุด" className="w-24" />
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
);