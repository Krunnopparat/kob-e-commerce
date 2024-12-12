import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const SearchProduct = () => {
  return (
    <div className='hidden md:flex items-center space-x-4'>
      <div className='relative'>
        <Input
          type='search'
          placeholder='ค้นหาสินค้า...'
          className='w-64 pl-10'
        />
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
      </div>
      <Button variant='outline'>ค้นหา</Button>
    </div>
  );
};
export default SearchProduct;