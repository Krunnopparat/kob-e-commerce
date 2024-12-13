import { Suspense } from 'react';
import { Metadata } from 'next';
import OrderList from '@/components/orders/OrderList';
import CardLoading from '@/components/customs/CardLoading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Search, FilterX, Calendar, SlidersHorizontal } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'จัดการคำสั่งซื้อ',
};

const OrderPage = async () => {

    const orders: Order[] = [
        {
          id: '1',
          orderNumber: 'ORD-2024-001',
          userId: 'user1',
          userName: 'จอห์น โด',
          userEmail: 'john@example.com',
          status: 'processing',
          totalAmount: 15900,
          subtotal: 17900,
          discount: 2000,
          shippingCost: 0,
          paymentStatus: 'paid',
          paymentMethod: 'credit_card',
          shippingAddress: {
            fullName: 'จอห์น โด',
            phone: '0891234567',
            address: '123 ถ.สุขุมวิท แขวงคลองตัน',
            province: 'กรุงเทพมหานคร',
            district: 'เขตคลองเตย',
            postalCode: '10110'
          },
          items: [
            {
              id: 'item1',
              orderId: '1',
              productId: 'prod1',
              productName: 'iPhone 15 Pro Max 256GB',
              productImage: '/products/iphone15.jpg',
              quantity: 1,
              price: 15900,
              total: 15900
            },
            {
              id: 'item2',
              orderId: '1',
              productId: 'prod2',
              productName: 'เคส iPhone 15 Pro Max',
              productImage: '/products/case.jpg',
              quantity: 2,
              price: 1000,
              total: 2000
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Add more mock orders as needed
      ];
    
      if (!orders || orders.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg">
            <Package className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">ไม่พบคำสั่งซื้อ</h3>
            <p className="text-gray-500">ยังไม่มีคำสั่งซื้อในระบบ</p>
          </div>
        );
      }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header Section */}
      <div className="bg-white border-b p-4 sm:p-6">
        <div className="mx-auto">
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Title and Stats */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">คำสั่งซื้อทั้งหมด</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mt-4">
                <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-green-600">คำสั่งซื้อสำเร็จ</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-700">45</p>
                </div>
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-600">กำลังดำเนินการ</p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-700">12</p>
                </div>
                <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-yellow-600">รอชำระเงิน</p>
                  <p className="text-lg sm:text-2xl font-bold text-yellow-700">8</p>
                </div>
                <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-red-600">ยกเลิก</p>
                  <p className="text-lg sm:text-2xl font-bold text-red-700">3</p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="space-y-4">
              {/* Search Bar - Always Visible */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="ค้นหาด้วยเลขที่คำสั่งซื้อหรือชื่อลูกค้า..."
                  className="pl-10 h-11 w-full"
                />
              </div>

              {/* Mobile Filter Button */}
              <div className="flex lg:hidden justify-between gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      ตัวกรอง
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh]">
                    <SheetHeader>
                      <SheetTitle>ตัวกรอง</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-4 mt-4">
                      {/* Date Range */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">ช่วงวันที่</label>
                        <div className="flex gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start">
                                <Calendar className="mr-2 h-4 w-4" />
                                เริ่มต้น
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              {/* Calendar content */}
                            </PopoverContent>
                          </Popover>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start">
                                <Calendar className="mr-2 h-4 w-4" />
                                สิ้นสุด
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              {/* Calendar content */}
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      {/* Status Select */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">สถานะคำสั่งซื้อ</label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="สถานะคำสั่งซื้อ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">ทั้งหมด</SelectItem>
                            <SelectItem value="pending">รอชำระเงิน</SelectItem>
                            <SelectItem value="processing">กำลังดำเนินการ</SelectItem>
                            <SelectItem value="shipped">จัดส่งแล้ว</SelectItem>
                            <SelectItem value="delivered">สำเร็จ</SelectItem>
                            <SelectItem value="cancelled">ยกเลิก</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Payment Status Select */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">สถานะการชำระเงิน</label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="การชำระเงิน" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">ทั้งหมด</SelectItem>
                            <SelectItem value="pending">รอชำระเงิน</SelectItem>
                            <SelectItem value="paid">ชำระแล้ว</SelectItem>
                            <SelectItem value="failed">ไม่สำเร็จ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Clear Filter Button */}
                      <Button variant="outline" className="w-full" title="ล้างตัวกรอง">
                        <FilterX className="w-4 h-4 mr-2" />
                        ล้างตัวกรอง
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:flex gap-3">
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[140px] justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        เริ่มต้น
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      {/* Calendar content */}
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[140px] justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        สิ้นสุด
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      {/* Calendar content */}
                    </PopoverContent>
                  </Popover>
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="สถานะคำสั่งซื้อ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="pending">รอชำระเงิน</SelectItem>
                    <SelectItem value="processing">กำลังดำเนินการ</SelectItem>
                    <SelectItem value="shipped">จัดส่งแล้ว</SelectItem>
                    <SelectItem value="delivered">สำเร็จ</SelectItem>
                    <SelectItem value="cancelled">ยกเลิก</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="การชำระเงิน" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="pending">รอชำระเงิน</SelectItem>
                    <SelectItem value="paid">ชำระแล้ว</SelectItem>
                    <SelectItem value="failed">ไม่สำเร็จ</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" title="ล้างตัวกรอง">
                  <FilterX size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        <Suspense fallback={<CardLoading />}>
          <OrderList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrderPage;