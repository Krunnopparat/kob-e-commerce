import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User,
  Package,
  Heart,
  MapPin,
  Bell,
  Settings,
  ChevronRight,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

export default function ProfilePage() {
  const user = {
    name: 'คุณ สมชาย ใจดี',
    email: 'somchai@example.com',
    phone: '081-234-5678',
    joinDate: '01/01/2024',
    avatar: '/placeholder-avatar.jpg'
  };

  const recentOrders = [
    {
      id: '#12345',
      date: '15/12/2024',
      total: 49900,
      status: 'กำลังจัดส่ง',
      items: [
        {
          name: 'iPhone 15 Pro',
          quantity: 1,
          image: '/uploads/iphone-13.jpg'
        }
      ]
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">สมาชิกตั้งแต่ {user.joinDate}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            ข้อมูลส่วนตัว
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package size={16} />
            ประวัติการสั่งซื้อ
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart size={16} />
            สินค้าที่ถูกใจ
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin size={16} />
            ที่อยู่จัดส่ง
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลส่วนตัว</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">อีเมล</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                  <Input id="phone" defaultValue={user.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">วันเกิด</Label>
                  <Input id="birthdate" type="date" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>บันทึกข้อมูล</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>ประวัติการสั่งซื้อ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={order.items[0].image}
                          alt={order.items[0].name}
                          fill
                          className="object-cover rounded"
                        />
                        {order.items.length > 1 && (
                          <Badge className="absolute -top-2 -right-2">
                            +{order.items.length - 1}
                          </Badge>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.date}</div>
                        <Badge variant={order.status === 'กำลังจัดส่ง' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <div className="text-right font-medium">
                        ฿{order.total.toLocaleString()}
                      </div>
                      <Button variant="ghost" size="sm">
                        ดูรายละเอียด
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>สินค้าที่ถูกใจ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Wishlist items would go here */}
                <div className="text-center py-8 text-gray-500">
                  ยังไม่มีสินค้าที่ถูกใจ
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>ที่อยู่จัดส่ง</CardTitle>
              <Button>เพิ่มที่อยู่ใหม่</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Address cards would go here */}
                <div className="text-center py-8 text-gray-500">
                  ยังไม่มีที่อยู่จัดส่ง
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};