import { getProducts } from '@/hooks/use-data';
import Link from 'next/link';
import Image from 'next/image';
import { Edit2, Star, Tag, Box } from 'lucide-react';
import { thb } from '@/utils/formatNumber';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const ProductList = async () => {
  const products = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      price: 48900,
      imageUrl: '/products/iphone15.jpg',
      category: 'โทรศัพท์',
      rating: 4.8,
      stock: 15
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      price: 45900,
      imageUrl: '/products/s24.jpg',
      category: 'โทรศัพท์',
      rating: 4.7,
      stock: 20
    },
    {
      id: '3',
      name: 'iPad Pro 12.9"',
      price: 42900,
      imageUrl: '/products/ipad.jpg',
      category: 'แท็บเล็ต',
      rating: 4.9,
      stock: 8
    },
    {
      id: '4',
      name: 'MacBook Pro 14"',
      price: 59900,
      imageUrl: '/products/macbook.jpg',
      category: 'โน้ตบุ๊ก',
      rating: 4.9,
      stock: 12
    },
    {
      id: '5',
      name: 'AirPods Pro',
      price: 8990,
      imageUrl: '/products/airpods.jpg',
      category: 'อุปกรณ์เสริม',
      rating: 4.6,
      stock: 30
    },
    {
      id: '6',
      name: 'Apple Watch Series 9',
      price: 15900,
      imageUrl: '/products/watch.jpg',
      category: 'อุปกรณ์สวมใส่',
      rating: 4.7,
      stock: 18
    }
  ];

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input placeholder="ค้นหาสินค้า..." className="w-full" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="หมวดหมู่" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            <SelectItem value="phone">โทรศัพท์</SelectItem>
            <SelectItem value="tablet">แท็บเล็ต</SelectItem>
            <SelectItem value="laptop">โน้ตบุ๊ก</SelectItem>
            <SelectItem value="accessories">อุปกรณ์เสริม</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="เรียงตาม" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">ราคา: ต่ำ-สูง</SelectItem>
            <SelectItem value="price-desc">ราคา: สูง-ต่ำ</SelectItem>
            <SelectItem value="name">ชื่อสินค้า</SelectItem>
            <SelectItem value="rating">คะแนน</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product, index) => (
          <Link
            key={index}
            href={`/admin/products/edit/${product.id}`}
            className="block"
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    alt={product.name}
                    src={product.imageUrl ?? '/logo.png'}
                    fill
                    className="object-contain p-4"
                    priority
                  />
                  <Badge className="absolute top-2 right-2" variant="secondary">
                    {product.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Box className="w-4 h-4" />
                  <span>สินค้าคงเหลือ: {product.stock}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="text-lg font-bold text-gray-900">
                  {thb.format(product.price)}
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Edit2 className="w-4 h-4" />
                  แก้ไข
                </Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;