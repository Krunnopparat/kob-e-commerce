import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Category',
};

import CreateCategoryForm from '@/components/categories/CreateCategoryForm';

const CreateCategoryPage = () => {
  return (
    <div className='h-full flex items-center justify-center'>
      <div className='border border-gray-200 rounded-md w-[650px] overflow-hidden shadow-lg'>
        <h1 className='text-xl text-center font-semibold bg-yellow-500 text-white p-2'>กรอกข้อมูลหมวดหมู่ใหม่</h1>
        <CreateCategoryForm />
      </div>
    </div>
  );
};
export default CreateCategoryPage;