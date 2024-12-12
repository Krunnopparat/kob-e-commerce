import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Filter, Heart } from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // ตัวอย่างข้อมูลสินค้า (ในระบบจริงควรดึงจาก API)
  const products = Array(6).fill({
    id: 1,
    name: 'iPhone 15 Pro',
    spec: 'A17 Pro | 256GB | Natural Titanium',
    price: 49900,
    originalPrice: 52900,
    discount: 5,
    image: {
      src: '/uploads/iphone-13.jpg',
      width: 300,
      height: 300,
      alt: 'iPhone 15 Pro'
    },
    rating: 4.5,
    reviews: 256,
    badge: 'ใหม่'
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* Search Summary */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          ผลการค้นหา "{query}"
        </h1>
        <p className="text-gray-500">
          พบ {products.length} รายการ
        </p>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              กรองสินค้า
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>กรองสินค้า</SheetTitle>
            </SheetHeader>
            {/* Filter options */}
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">เรียงโดย:</span>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="เรียงลำดับ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">ความเกี่ยวข้อง</SelectItem>
              <SelectItem value="newest">ใหม่ล่าสุด</SelectItem>
              <SelectItem value="price-asc">ราคาต่ำ - สูง</SelectItem>
              <SelectItem value="price-desc">ราคาสูง - ต่ำ</SelectItem>
              <SelectItem value="popular">ยอดนิยม</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Results */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <Card key={index} className="group">
              <div className="relative">
                <div className="aspect-square bg-gray-50 p-4">
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    width={product.image.width}
                    height={product.image.height}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {product.badge && (
                  <Badge className="absolute top-2 left-2 bg-blue-500 text-white">
                    {product.badge}
                  </Badge>
                )}
                {product.discount > 0 && (
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                    -{product.discount}%
                  </Badge>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-4">
                <h3 className="font-medium mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                  {product.spec}
                </p>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-yellow-400">
                    {Array(5).fill(null).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
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
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  เพิ่มลงตะกร้า
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-medium mb-2">
            ไม่พบสินค้าที่คุณค้นหา
          </h2>
          <p className="text-gray-500 mb-4">
            ลองค้นหาด้วยคำค้นอื่น หรือดูสินค้าทั้งหมดของเรา
          </p>
          <Button asChild>
            <Link href="/products">ดูสินค้าทั้งหมด</Link>
          </Button>
        </div>
      )}

      {/* Load More */}
      {products.length > 0 && (
        <div className="mt-8 text-center">
          <Button variant="outline">
            โหลดเพิ่มเติม
          </Button>
        </div>
      )}
    </main>
  );
};

export default SearchPage;