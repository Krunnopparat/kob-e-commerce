import Link from 'next/link';
import Image from 'next/image';
import { Edit2, Package2, ChevronRight } from 'lucide-react';
import { getCategories } from '@/hooks/use-data';
import { Category } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const CategoryList = async () => {
  const categories: Category[] = await getCategories();
  
  if (!categories || categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg">
        <Package2 className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-600">ไม่พบข้อมูลหมวดหมู่สินค้า</h3>
        <p className="text-gray-500">กรุณาเพิ่มหมวดหมู่สินค้าใหม่</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category: Category, index: number) => (
        <Link
          key={index}
          href={`/admin/categories/edit/${category.id}`}
        >
          <Card className="group cursor-pointer overflow-hidden border-2 hover:border-yellow-400 transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                {/* Image Container */}
                <div className="relative h-48 w-full">
                  <Image
                    alt={category.name}
                    src={category.imageUrl || '/logo.png'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                {/* Category Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-xl font-semibold text-white -mb-2">
                    {category.name}
                  </h2>
                </div>

                {/* Edit Badge */}
                <Badge 
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  variant="secondary"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  แก้ไข
                </Badge>
              </div>

              {/* Footer Content */}
              <div className="p-4 bg-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Package2 className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">
                    สินค้า {category.products.length} รายการ
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors duration-300" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;