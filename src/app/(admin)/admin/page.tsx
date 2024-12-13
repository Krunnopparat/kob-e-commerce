'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line,
  XAxis, 
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer 
} from 'recharts';
import { 
  ShoppingBag,
  Users,
  CreditCard,
  Package,
  TrendingUp,
  TrendingDown,
  Activity
} from "lucide-react";

const AdminPage = () => {
  // Mock data - ในการใช้งานจริงควรดึงจาก API
  const salesData = [
    { month: 'ม.ค.', revenue: 45000, orders: 120 },
    { month: 'ก.พ.', revenue: 52000, orders: 145 },
    { month: 'มี.ค.', revenue: 49000, orders: 132 },
    { month: 'เม.ย.', revenue: 58000, orders: 155 },
    { month: 'พ.ค.', revenue: 55000, orders: 148 },
    { month: 'มิ.ย.', revenue: 62000, orders: 165 },
  ];

  const stats = [
    {
      title: "ยอดขายวันนี้",
      value: "฿12,450",
      change: "+12%",
      trend: "up",
      icon: CreditCard
    },
    {
      title: "ออเดอร์วันนี้",
      value: "45",
      change: "+8%",
      trend: "up",
      icon: ShoppingBag
    },
    {
      title: "ลูกค้าใหม่",
      value: "18",
      change: "-2%",
      trend: "down",
      icon: Users
    },
    {
      title: "สินค้าคงเหลือ",
      value: "264",
      change: "-5",
      trend: "down",
      icon: Package
    }
  ];

  const recentOrders = [
    { id: "ORD001", customer: "สมชาย ใจดี", date: "13 ธ.ค. 2024", total: "฿2,400", status: "สำเร็จ" },
    { id: "ORD002", customer: "วิภา มานะ", date: "13 ธ.ค. 2024", total: "฿1,850", status: "กำลังจัดส่ง" },
    { id: "ORD003", customer: "สุดา รักดี", date: "13 ธ.ค. 2024", total: "฿3,200", status: "รอการชำระ" },
    { id: "ORD004", customer: "มานพ ศรีวิไล", date: "12 ธ.ค. 2024", total: "฿1,600", status: "สำเร็จ" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ภาพรวม</h1>
        <p className="text-muted-foreground">แดชบอร์ดและสถิติร้านค้าของคุณ</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">ยอดขาย</TabsTrigger>
          <TabsTrigger value="orders">ออเดอร์</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ยอดขายย้อนหลัง 6 เดือน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>จำนวนออเดอร์ย้อนหลัง 6 เดือน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>ออเดอร์ล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">{order.id}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium">{order.total}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className={`text-sm ${
                  order.status === 'สำเร็จ' 
                    ? 'text-green-600' 
                    : order.status === 'กำลังจัดส่ง'
                    ? 'text-blue-600'
                    : 'text-yellow-600'
                }`}>
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminPage;