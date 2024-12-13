
import CardLoading from '@/components/customs/CardLoading';
import ProductList from '@/components/products/ProductList';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const ProductPage = () => {
  return (
    <div className='p-4'>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">สินค้า</h1>
        <Button asChild>
          <Link href="/admin/products/create" className="flex items-center">
            <PlusCircle size={24} />
            เพิ่มสินค้าใหม่
          </Link>
        </Button>
      </div>
      <Suspense fallback={<CardLoading />}>
        <ProductList />
      </Suspense>
    </div>
  );
};
export default ProductPage;