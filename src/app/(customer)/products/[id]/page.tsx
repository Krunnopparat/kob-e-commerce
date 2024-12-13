'use client'
import React, { useState, use } from 'react';
import Image from 'next/image';
import QuantityInput from '@/components/ui/QuantityInputProps';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from "@/components/ui/separator";
import {
    Heart,
    ShoppingCart,
    Share2,
    ChevronRight,
    Check,
    Shield,
    Truck,
    RefreshCw,
    Star,
} from 'lucide-react';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function ProductDetail({ params }: PageProps) {
    const [selectedVariant, setSelectedVariant] = useState('256GB');
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { id } = use(params);

    const product = {
        id: id,
        name: 'iPhone 15 Pro Max',
        description: 'สมาร์ทโฟนรุ่นท็อปพร้อมชิป A17 Pro และกล้อง 48MP พร้อมฟีเจอร์ถ่ายภาพระดับมืออาชีพ และดีไซน์ไทเทเนียมสุดพรีเมียม',
        price: 49900,
        originalPrice: 52900,
        discount: 5,
        rating: 4.8,
        reviews: 256,
        stock: 10,
        specs: {
            storage: '256GB',
            color: 'Natural Titanium',
            display: '6.7-inch Super Retina XDR Display with ProMotion',
            chip: 'A17 Pro chip with 6‑core CPU and 6-core GPU',
            camera: '48MP Main | 12MP Ultra Wide | 12MP Telephoto with 5x optical zoom'
        },
        features: [
            "จอภาพ Super Retina XDR ขนาด 6.7 นิ้ว",
            "ชิป A17 Pro ประสิทธิภาพสูงสุด",
            "กล้องระบบ Pro ความละเอียด 48MP",
            "แบตเตอรี่ใช้งานได้ตลอดวัน"
        ],
        images: Array(4).fill('/uploads/iphone-13.jpg'),
        variants: [
            { name: '128GB', price: 44900 },
            { name: '256GB', price: 49900 },
            { name: '512GB', price: 59900 }
        ]
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                <Link href="/" className="hover:text-gray-700 transition-colors">หน้าแรก</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/products" className="hover:text-gray-700 transition-colors">สมาร์ทโฟน</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-6">
                    <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border shadow-sm">
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.name}
                            fill
                            className="object-contain p-8 transition-transform hover:scale-105"
                        />
                        {product.discount > 0 && (
                            <Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1">
                                ลด {product.discount}%
                            </Badge>
                        )}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all
                  ${selectedImage === index ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <Image
                                    src={image}
                                    alt={`${product.name} - Image ${index + 1}`}
                                    fill
                                    className="object-contain p-2"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center">
                                <div className="flex text-yellow-400">
                                    {Array(5).fill(null).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-200'}`}
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 font-medium">{product.rating}</span>
                            </div>
                            <Separator orientation="vertical" className="h-6" />
                            <Link href="#reviews" className="text-primary hover:underline">
                                {product.reviews} รีวิว
                            </Link>
                        </div>

                        <div className="flex items-baseline gap-3 mt-6">
                            <span className="text-3xl font-bold">฿{product.price.toLocaleString()}</span>
                            {product.originalPrice > product.price && (
                                <span className="text-xl text-gray-400 line-through">
                                    ฿{product.originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Features */}
                    <div className="space-y-4">
                        <h3 className="font-medium">จุดเด่นสินค้า</h3>
                        <ul className="space-y-3">
                            {product.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Separator />

                    {/* Variants & Quantity */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <label className="font-medium">เลือกความจุ</label>
                            <div className="flex gap-3">
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant.name}
                                        onClick={() => setSelectedVariant(variant.name)}
                                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all
                      ${selectedVariant === variant.name
                                                ? 'border-primary bg-primary/5 text-primary font-medium'
                                                : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        {variant.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium">จำนวน</label>
                            <div className="flex items-center gap-4">
                                <div className="space-y-2">
                                    <label className="font-medium">จำนวน</label>
                                    <div className="flex items-center gap-4">
                                        <QuantityInput
                                            value={quantity}
                                            onChange={setQuantity}
                                            min={1}
                                            max={product.stock}
                                        />
                                        <span className="text-sm text-gray-500">
                                            เหลือสินค้า {product.stock} ชิ้น
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <Button className="flex-1 h-12 text-base" size="lg">
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            เพิ่มลงตะกร้า
                        </Button>
                        <Button variant="outline" size="lg" className="h-12">
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="h-12">
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                            <Shield className="h-5 w-5 text-primary" />
                            <div className="text-sm">รับประกันสินค้า 1 ปี</div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                            <Truck className="h-5 w-5 text-primary" />
                            <div className="text-sm">จัดส่งฟรีทั่วประเทศ</div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                            <RefreshCw className="h-5 w-5 text-primary" />
                            <div className="text-sm">เปลี่ยนคืนได้ใน 7 วัน</div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                            <Shield className="h-5 w-5 text-primary" />
                            <div className="text-sm">สินค้าของแท้ 100%</div>
                        </div>
                    </div>

                    {/* Details Tabs */}
                    <Tabs defaultValue="details" className="mt-8">
                        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                            <TabsTrigger
                                value="details"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                            >
                                รายละเอียด
                            </TabsTrigger>
                            <TabsTrigger
                                value="specs"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                            >
                                สเปค
                            </TabsTrigger>
                            <TabsTrigger
                                value="shipping"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                            >
                                การจัดส่ง
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="prose mt-6">
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </TabsContent>
                        <TabsContent value="specs" className="mt-6">
                            <dl className="space-y-6">
                                {Object.entries(product.specs).map(([key, value]) => (
                                    <div key={key} className="grid grid-cols-3 gap-4">
                                        <dt className="font-medium text-gray-500 capitalize">{key}</dt>
                                        <dd className="col-span-2 text-gray-700">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </TabsContent>
                        <TabsContent value="shipping" className="mt-6">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg text-green-800">
                                    <Truck className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-medium">จัดส่งฟรี</div>
                                        <div className="text-sm">สำหรับการสั่งซื้อขั้นต่ำ ฿1,000</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-medium">วิธีการจัดส่ง</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between p-3 border rounded-lg">
                                            <div>Kerry Express</div>
                                            <div>1-2 วันทำการ</div>
                                        </div>
                                        <div className="flex justify-between p-3 border rounded-lg">
                                            <div>Thailand Post EMS</div>
                                            <div>2-3 วันทำการ</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};