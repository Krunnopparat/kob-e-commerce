import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, ChevronRight, Star, Cpu, Laptop, Smartphone, Monitor, Headphones } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function HomePage(){
  const promotions = [
    {
      id: 1,
      title: 'iPhone 15 Series',
      subtitle: 'พร้อมโปรโมชั่นพิเศษ ผ่อน 0% นาน 10 เดือน',
      image: {
        src: '/banner1.webp',
        width: 1200,
        height: 400,
        alt: 'iPhone 15 Promotion'
      }
    },
    {
      id: 2,
      title: 'MacBook Air M2',
      subtitle: 'บางเบา พกพาสะดวก พร้อมประสิทธิภาพที่เหนือชั้น',
      image: {
        src: '/banner1.webp',
        width: 1200,
        height: 400,
        alt: 'MacBook Air Promotion'
      }
    }
  ];

  const featuredCategories = [
    { name: 'สมาร์ทโฟน', icon: Smartphone, color: 'bg-blue-500' },
    { name: 'แล็ปท็อป', icon: Laptop, color: 'bg-purple-500' },
    { name: 'คอมพิวเตอร์', icon: Monitor, color: 'bg-green-500' },
    { name: 'อุปกรณ์เสริม', icon: Headphones, color: 'bg-orange-500' },
    { name: 'อุปกรณ์เกมมิ่ง', icon: Cpu, color: 'bg-red-500' },
  ];

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      price: 49900,
      originalPrice: 52900,
      discount: 5,
      image: {
        src: '/uploads/iphone-13.jpg',
        width: 300,
        height: 300,
        alt: 'iPhone 15 Pro Max'
      },
      rating: 4.8,
      reviews: 256,
      badge: 'ใหม่',
      spec: 'A17 Pro | 256GB | Natural Titanium'
    },
    // ... เพิ่มสินค้าอื่นๆ ตามต้องการ
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {promotions.map((promo) => (
              <CarouselItem key={promo.id}>
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
                  <Image
                    src={promo.image.src}
                    alt={promo.image.alt}
                    width={promo.image.width}
                    height={promo.image.height}
                    className="object-cover"
                  />
                  <div className="absolute bottom-8 left-8 z-20 text-white">
                    <h2 className="text-4xl font-bold mb-2">{promo.title}</h2>
                    <p className="text-xl opacity-90">{promo.subtitle}</p>
                    <Button size="lg" className="mt-4">
                      ช้อปเลย
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Featured Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">หมวดหมู่สินค้า</h2>
          <Button variant="ghost">
            ดูทั้งหมด <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredCategories.map((category) => (
            <Link href="#" key={category.name}>
              <Card className="group cursor-pointer hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">สินค้าแนะนำ</h2>
          <Link href='/products' className="text-primary">
            ดูทั้งหมด
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      </section>

      {/* Brands Section */}
      <section className="bg-gray-50 -mx-4 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">แบรนด์ชั้นนำ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {/* Brand logos would go here */}
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="aspect-[3/2] bg-white rounded-lg shadow-sm p-4 flex items-center justify-center">
                <div className="text-gray-400 font-medium">Brand Logo</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
