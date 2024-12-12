import EditProductForm from '@/components/products/EditProfuctForm';
import RemoveProductBtn from '@/components/products/RemoveProductBtn';
import { getCategories, getProductWithId } from '@/hooks/use-data';
import { Category, Product } from '@prisma/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Product',
};

const EditProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const product = await getProductWithId(id);
  const categories = await getCategories();

  return (
    <div className='h-full flex items-center justify-center'>
      <div className='border border-gray-200 rounded-md w-[650px] overflow-hidden shadow-lg p-4 space-y-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-xl font-semibold'>แก้ไขข้อมูลสินค้า: {product?.name}</h1>
          <p className='text-xs'>ไอดีสินค้า: {id}</p>
        </div>
        <div className='space-y-2'>
          <EditProductForm
            product={product as Product}
            categories={categories as Category[]}
          />
          <RemoveProductBtn id={id} />
        </div>
      </div>
    </div>
  );
};
export default EditProductPage;