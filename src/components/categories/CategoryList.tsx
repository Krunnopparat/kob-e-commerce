import Link from 'next/link';
import Image from 'next/image';
import { Edit2 } from 'lucide-react';
import { getCategories } from '@/hooks/use-data';

const CategoryList = async () => {
  
  const categories = await getCategories();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24">
      {categories?.map((category, index) => (
        <Link
          key={index}
          href={`/admin/categories/edit/${category.id}`}
          className="group flex flex-col overflow-hidden bg-white shadow-md hover:shadow-xl rounded-lg transition-all duration-300 ease-in-out"
        >
          <div className="relative h-64 w-full">
            <Image
              alt={category.name}
              src={category.imageUrl || '/logo.png'}
              fill
              className="transition-transform duration-300 group-hover:scale-105 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
              <Edit2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
            </div>
          </div>
          <div className="p-4 flex justify-between items-center">
            <h2 className="inline text-lg px-3 py-1 font-semibold text-gray-200 group-hover:text-gray-800 group-hover:bg-yellow-400 bg-black rounded-full transition-colors duration-300">
              {category.name}
            </h2>
            <p className='text-sm'>มีสินค้าอยู่ {category.products.length} ชิ้น</p>
          </div>
        </Link> 
      ))}
    </div>
  );
};
export default CategoryList;