import EditCategoryForm from '@/components/categories/EditCategoryForm';
import RemoveCategoryBtn from '@/components/categories/RemoveCategoryBtn';
import { getCategoryWithId } from '@/hooks/use-data';
import { Category } from '@prisma/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Category',
};

const EditCategoryPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const category = await getCategoryWithId(id);

  return (
    <div className='h-full flex items-center justify-center'>
      <div className='border border-gray-200 rounded-md w-full md:w-[650px] overflow-hidden shadow-lg p-4 space-y-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-xl font-semibold'>แก้ไขข้อมูลสินค้า: {category?.name}</h1>
          <p className='text-xs'>ไอดีหมวดหมู่: {id}</p>
        </div>
        <div className='space-y-2'>
          <EditCategoryForm category={category as Category} />
          <RemoveCategoryBtn id={id} />
        </div>
      </div>
    </div>
  );
};
export default EditCategoryPage;