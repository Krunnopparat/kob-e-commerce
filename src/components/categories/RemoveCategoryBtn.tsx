'use client';

import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { removeCategory } from '@/hooks/use-category';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const RemoveCategoryBtn = ({ id }: { id: string }) => {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const handleRemoveCategory = () => {
    startTransition(async () => {
      const response = await removeCategory(id);
      if (response.message) {
        toast({
          title: response.message,
          variant: response.status === 'success' ? 'default' : 'destructive',
        });
        router.push('/admin/categories');
      };
    });
  };

  return (
    <Button
      disabled={isPending}
      variant={'destructive'}
      onClick={handleRemoveCategory}
    >
      <span>{isPending ? 'กำลังลบ...' : 'ลบ'}</span>
    </Button>
  );
};
export default RemoveCategoryBtn;