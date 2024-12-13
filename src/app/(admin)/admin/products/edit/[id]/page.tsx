import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const EditProductPage = ({ params }: { params: { id: string } }) => {
  // ในสถานการณ์จริงควรจะดึงข้อมูลจาก API ตาม ID
  const product = {
    id: params.id,
    name: 'iPhone 15 Pro Max',
    price: 48900,
    imageUrl: '/products/iphone15.jpg'
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin/products" className="flex items-center gap-2">
            <ArrowLeft size={20} />
            กลับไปหน้าสินค้า
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">แก้ไขสินค้า</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลสินค้า</CardTitle>
          <CardDescription>แก้ไขรายละเอียดสินค้าของคุณ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative h-64 w-full bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">ชื่อสินค้า</Label>
              <Input
                id="name"
                defaultValue={product.name}
                placeholder="กรุณากรอกชื่อสินค้า"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">ราคา</Label>
              <Input
                id="price"
                type="number"
                defaultValue={product.price}
                placeholder="กรุณากรอกราคาสินค้า"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">รูปภาพสินค้า</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="cursor-pointer"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/admin/products">ยกเลิก</Link>
          </Button>
          <Button className="flex items-center gap-2">
            <Save size={20} />
            บันทึก
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditProductPage;