import CategoryList from '@/components/categories/CategoryList';
import CardLoading from '@/components/customs/CardLoading';
import { Button } from '@/components/ui/button';
import { getCategories } from '@/hooks/use-data';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Category Manage',
};

const CategoryPage = async () => {
  const categoires = await getCategories();

  return (
    <div className='p-4'>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">หมวดหมู่สินค้า {`(${categoires?.length ?? 0})`}</h1>
        <Button asChild>
          <Link href="/admin/categories/create" className="flex items-center">
            <PlusCircle size={24} />
            เพิ่มหมวดหมู่สินค้า
          </Link>
        </Button>
      </div>
      <Suspense fallback={<CardLoading />}>
        <CategoryList />
      </Suspense>
    </div>
  );
};
export default CategoryPage;