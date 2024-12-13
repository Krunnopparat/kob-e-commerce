import CategoryList from '@/components/categories/CategoryList';
import CardLoading from '@/components/customs/CardLoading';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const metadata: Metadata = {
  title: 'Category Manage',
};

const CategoryPage = async () => {
  const categoires =[
    {
      id: '1',
      name: 'สมาร์ทโฟน',
      imageUrl: '/categories/smartphones.jpg',
      products: [
        { id: '1', name: 'iPhone 15 Pro Max' },
        { id: '2', name: 'Samsung Galaxy S24 Ultra' },
        { id: '3', name: 'Google Pixel 8 Pro' }
      ]
    },
    {
      id: '2',
      name: 'แล็ปท็อป',
      imageUrl: '/categories/laptops.jpg',
      products: [
        { id: '4', name: 'MacBook Pro 14"' },
        { id: '5', name: 'MacBook Air M2' },
        { id: '6', name: 'Dell XPS 13' },
        { id: '7', name: 'ASUS ROG' }
      ]
    },
    {
      id: '3',
      name: 'แท็บเล็ต',
      imageUrl: '/categories/tablets.jpg',
      products: [
        { id: '8', name: 'iPad Pro 12.9"' },
        { id: '9', name: 'iPad Air' },
        { id: '10', name: 'Samsung Galaxy Tab S9' }
      ]
    },
    {
      id: '4',
      name: 'หูฟัง',
      imageUrl: '/categories/headphones.jpg',
      products: [
        { id: '11', name: 'AirPods Pro' },
        { id: '12', name: 'Sony WH-1000XM5' },
        { id: '13', name: 'Samsung Galaxy Buds2 Pro' }
      ]
    },
    {
      id: '5',
      name: 'สมาร์ทวอทช์',
      imageUrl: '/categories/smartwatches.jpg',
      products: [
        { id: '14', name: 'Apple Watch Series 9' },
        { id: '15', name: 'Apple Watch Ultra 2' },
        { id: '16', name: 'Samsung Galaxy Watch 6' }
      ]
    },
    {
      id: '6',
      name: 'อุปกรณ์เสริม',
      imageUrl: '/categories/accessories.jpg',
      products: [
        { id: '17', name: 'Apple Magic Keyboard' },
        { id: '18', name: 'Apple Pencil' },
        { id: '19', name: 'เคสโทรศัพท์' },
        { id: '20', name: 'ที่ชาร์จไร้สาย' }
      ]
    }
  ];

  return (
    <div className="h-full bg-gray-50/50">
      {/* Header Section */}
      <div className="bg-white border-b p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            {/* Title and Add Button */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">หมวดหมู่สินค้า</h1>
                <p className="text-gray-500 mt-1">จัดการหมวดหมู่สินค้าทั้งหมด {categoires?.length ?? 0} รายการ</p>
              </div>
              <Button asChild className="bg-yellow-500 hover:bg-yellow-600">
                <Link href="/admin/categories/create" className="flex items-center gap-2">
                  <PlusCircle size={20} />
                  เพิ่มหมวดหมู่สินค้า
                </Link>
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="ค้นหาหมวดหมู่สินค้า..."
                  className="pl-10 h-11"
                />
              </div>
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="w-[180px] h-11">
                    <SelectValue placeholder="เรียงตาม" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">ชื่อ: A-Z</SelectItem>
                    <SelectItem value="name-desc">ชื่อ: Z-A</SelectItem>
                    <SelectItem value="products-desc">สินค้า: มาก-น้อย</SelectItem>
                    <SelectItem value="products-asc">สินค้า: น้อย-มาก</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="h-11 px-3" title="ตัวกรองเพิ่มเติม">
                  <SlidersHorizontal size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto p-6">
        <Suspense fallback={<CardLoading />}>
          <CategoryList />
        </Suspense>
      </div>
    </div>
  );
};
export default CategoryPage;