'use client';

import { useState } from 'react';
import { Order } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, ChevronDown, ChevronRight, MapPin, Receipt, Tag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPaymentStatusColor = (status: Order['paymentStatus']) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const OrderList = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Mock data
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
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px]"></TableHead>
            <TableHead>เลขที่คำสั่งซื้อ</TableHead>
            <TableHead>ลูกค้า</TableHead>
            <TableHead className="hidden md:table-cell">วันที่สั่งซื้อ</TableHead>
            <TableHead>ยอดรวม</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead className="hidden md:table-cell">การชำระเงิน</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <>
              <TableRow 
                key={order.id} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedRow(expandedRow === order.id ? null : order.id)}
              >
                <TableCell>
                  {expandedRow === order.id ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.shippingAddress.fullName}</p>
                    <p className="text-sm text-gray-500">{order.userEmail}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      {new Date(order.createdAt).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    ฿{order.totalAmount.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status === 'pending' && 'รอดำเนินการ'}
                    {order.status === 'processing' && 'กำลังดำเนินการ'}
                    {order.status === 'shipped' && 'จัดส่งแล้ว'}
                    {order.status === 'delivered' && 'สำเร็จ'}
                    {order.status === 'cancelled' && 'ยกเลิก'}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                    {order.paymentStatus === 'paid' && 'ชำระแล้ว'}
                    {order.paymentStatus === 'pending' && 'รอชำระ'}
                    {order.paymentStatus === 'failed' && 'ไม่สำเร็จ'}
                  </Badge>
                </TableCell>
              </TableRow>
              {/* Expanded Details Row */}
              {expandedRow === order.id && (
                <TableRow>
                  <TableCell colSpan={7} className="bg-gray-50 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Order Items */}
                      <div className="lg:col-span-2 space-y-4">
                        <h3 className="font-semibold text-gray-900">รายการสินค้า</h3>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg">
                              <div className="relative h-20 w-20 flex-shrink-0">
                                <Image
                                  src={item.productImage}
                                  alt={item.productName}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.productName}</h4>
                                <p className="text-sm text-gray-500">
                                  ฿{item.price.toLocaleString()} x {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">฿{item.total.toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Summary and Shipping */}
                      <div className="space-y-6">
                        {/* Order Summary */}
                        <div className="bg-white p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Receipt className="w-4 h-4" />
                            สรุปคำสั่งซื้อ
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">ราคาสินค้า</span>
                              <span>฿{order.subtotal.toLocaleString()}</span>
                            </div>
                            {order.discount > 0 && (
                              <div className="flex justify-between text-green-600">
                                <span className="flex items-center gap-1">
                                  <Tag className="w-4 h-4" />
                                  ส่วนลด
                                </span>
                                <span>-฿{order.discount.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-600">ค่าจัดส่ง</span>
                              <span>{order.shippingCost === 0 ? 'ฟรี' : `฿${order.shippingCost.toLocaleString()}`}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-medium text-base">
                              <span>ยอดรวมทั้งสิ้น</span>
                              <span>฿{order.totalAmount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            ที่อยู่จัดส่ง
                          </h3>
                          <div className="space-y-2 text-sm">
                            <p className="font-medium">{order.shippingAddress.fullName}</p>
                            <p className="text-gray-600">{order.shippingAddress.phone}</p>
                            <p className="text-gray-600">
                              {order.shippingAddress.address}
                              <br />
                              {order.shippingAddress.district} {order.shippingAddress.province}
                              <br />
                              {order.shippingAddress.postalCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;