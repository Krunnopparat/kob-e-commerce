import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';

const CreateProductPage = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin/products" className="flex items-center gap-2">
            <ArrowLeft size={20} />
            กลับไปหน้าสินค้า
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">เพิ่มสินค้าใหม่</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลสินค้า</CardTitle>
          <CardDescription>กรอกรายละเอียดสินค้าของคุณ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">ชื่อสินค้า *</Label>
                <Input
                  id="name"
                  placeholder="กรุณากรอกชื่อสินค้า"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">รหัสสินค้า (SKU)</Label>
                <Input
                  id="sku"
                  placeholder="กรุณากรอกรหัสสินค้า"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">ราคา *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="กรุณากรอกราคาสินค้า"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">จำนวนสินค้าคงเหลือ *</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="กรุณากรอกจำนวนสินค้า"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">หมวดหมู่ *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกหมวดหมู่" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">โทรศัพท์</SelectItem>
                  <SelectItem value="tablet">แท็บเล็ต</SelectItem>
                  <SelectItem value="laptop">โน้ตบุ๊ก</SelectItem>
                  <SelectItem value="accessories">อุปกรณ์เสริม</SelectItem>
                  <SelectItem value="wearable">อุปกรณ์สวมใส่</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">รายละเอียดสินค้า</Label>
              <Textarea
                id="description"
                placeholder="กรุณากรอกรายละเอียดสินค้า"
                rows={5}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <Label>รูปภาพสินค้า *</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 text-gray-400">
                  <Upload size={48} />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">ลากไฟล์มาวางที่นี่ หรือ คลิกเพื่อเลือกไฟล์</p>
                  <p className="text-sm text-gray-500">PNG, JPG หรือ WEBP ขนาดไม่เกิน 5MB</p>
                </div>
                <Button variant="outline">เลือกไฟล์</Button>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">การตั้งค่าเพิ่มเติม</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>แสดงสินค้า</Label>
                  <p className="text-sm text-gray-500">เปิดให้แสดงสินค้านี้ในหน้าร้าน</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>สินค้าแนะนำ</Label>
                  <p className="text-sm text-gray-500">แสดงในส่วนสินค้าแนะนำ</p>
                </div>
                <Switch />
              </div>
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

export default CreateProductPage;