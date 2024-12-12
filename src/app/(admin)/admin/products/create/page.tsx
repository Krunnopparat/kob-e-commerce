import CreateProductForm from '@/components/products/CreateProductForm';
import { getCategories } from '@/hooks/use-data';
import { Category } from '@prisma/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Product',
};

const CreateProductPage = async () => {
  const categories = await getCategories() as Category[];

  return (
    <div className='h-full flex items-center justify-center'>
      <div className='border border-gray-200 rounded-md w-[650px] overflow-hidden shadow-lg'>
        <h1 className='text-xl text-center font-semibold bg-yellow-500 text-white p-2'>กรอกข้อมูลสินค้าใหม่</h1>
        <CreateProductForm
          categories={categories}
        />
      </div>
    </div>
  );
};
export default CreateProductPage;