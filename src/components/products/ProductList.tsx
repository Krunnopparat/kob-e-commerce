import { getProducts } from '@/hooks/use-data';
import Link from 'next/link';
import Image from 'next/image';
import { Edit2 } from 'lucide-react';
import { thb } from '@/utils/formatNumber';

const ProductList = async () => {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
      {products?.map((product, index) => (
        <Link
          key={index}
          href={`/admin/products/edit/${product.id}`}
          className="group flex flex-col overflow-hidden bg-white shadow-md hover:shadow-xl rounded-lg transition-all duration-300 ease-in-out"
        >
          <div className="relative h-64 w-full">
            <Image
              alt={product.name}
              src={product.imageUrl ?? '/logo.png'}
              fill
              className="transition-transform duration-300 group-hover:scale-105 object-contain"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
              <Edit2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
            </div>
          </div>
          <div className="flex justify-between items-center py-8 px-4">
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-yellow-400 transition-colors duration-300">
              {product.name}
            </h2>
            <p className='text-sm'>ราคาเริ่มต้น {thb.format(product.price ?? 0)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ProductList;