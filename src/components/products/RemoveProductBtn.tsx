'use client';

import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { removeProduct } from '@/hooks/use-product';

const RemoveProductBtn = ({ id }: { id: string }) => {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      disabled={isPending}
      variant={'destructive'}
      onClick={() => startTransition(() => {
        removeProduct(id);
        router.push('/admin/products');
      })}
    >
      <span>{isPending ? 'กำลังลบ...' : 'ลบ'}</span>
    </Button>
  );
};
export default RemoveProductBtn;