import type { Metadata } from 'next';
import CreateCategoryForm from '@/components/categories/CreateCategoryForm';

export const metadata: Metadata = {
  title: 'เพิ่มหมวดหมู่สินค้าใหม่',
  description: 'เพิ่มหมวดหมู่สินค้าใหม่สำหรับร้านค้าของคุณ'
};

const CreateCategoryPage = () => {
  return (
    <div className="bg-gray-50/50 flex items-center justify-center p-6">
      <CreateCategoryForm />
    </div>
  );
};

export default CreateCategoryPage;