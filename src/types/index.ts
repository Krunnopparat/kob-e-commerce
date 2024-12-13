export interface CategoryProduct {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  products: CategoryProduct[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  subtotal: number;
  discount: number;
  shippingCost: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    district: string;
    province: string;
    postalCode: string;
  };
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}