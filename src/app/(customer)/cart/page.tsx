import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Trash2, MinusCircle, PlusCircle, ChevronLeft } from 'lucide-react';

export default function CartPage(){
  const cartItems = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      spec: 'A17 Pro | 256GB | Natural Titanium',
      price: 49900,
      quantity: 1,
      image: {
        src: '/uploads/iphone-13.jpg',
        width: 100,
        height: 100,
        alt: 'iPhone 15 Pro'
      }
    },
    {
      id: 2,
      name: 'AirPods Pro (2nd generation)',
      spec: 'รุ่นใหม่พร้อม USB-C',
      price: 8990,
      quantity: 2,
      image: {
        src: '/uploads/airpods.jpg',
        width: 100,
        height: 100,
        alt: 'AirPods Pro'
      }
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/products" className="text-gray-500 hover:text-gray-700">
          <ChevronLeft className="h-5 w-5 inline-block" />
          <span>เลือกซื้อสินค้าต่อ</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">ตะกร้าสินค้า</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 relative bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={item.image.width}
                        height={item.image.height}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium line-clamp-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.spec}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">฿{(item.price * item.quantity).toLocaleString()}</div>
                          <div className="text-sm text-gray-500">฿{item.price.toLocaleString()} / ชิ้น</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">ตะกร้าของคุณว่างเปล่า</h3>
              <p className="text-gray-500 mb-4">เริ่มช้อปปิ้งกันเลย!</p>
              <Button asChild>
                <Link href="/products">เลือกซื้อสินค้า</Link>
              </Button>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="lg:w-[380px]">
            <Card className="p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">สรุปคำสั่งซื้อ</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>ราคาสินค้าทั้งหมด</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>ค่าจัดส่ง</span>
                  <span className="text-green-600">ฟรี</span>
                </div>
                
                <div className="py-3">
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกวิธีจัดส่ง" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">จัดส่งมาตรฐาน (2-3 วัน)</SelectItem>
                      <SelectItem value="express">จัดส่งด่วน (1-2 วัน)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-4" />
              
              <div className="flex justify-between font-semibold mb-6">
                <span>ราคารวมทั้งหมด</span>
                <span className="text-xl">฿{total.toLocaleString()}</span>
              </div>

              <Button className="w-full" size="lg">
                ดำเนินการชำระเงิน
              </Button>

              <div className="mt-4 text-sm text-gray-500">
                <p>การสั่งซื้อของคุณจะได้รับการยืนยันเมื่อเราได้รับการชำระเงิน</p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};