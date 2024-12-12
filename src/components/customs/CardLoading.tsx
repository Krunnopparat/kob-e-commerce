import { Skeleton } from '@/components/ui/skeleton';

const CardLoading = () => {
  return (

    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className='h-80 w-60 bg-gray-200' />
      ))}
    </div>

  );
};

export default CardLoading;