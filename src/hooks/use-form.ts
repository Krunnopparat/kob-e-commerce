import { formState, FormState } from '@/utils/initial-state';
import { useActionState, useEffect } from 'react';
import { useToast } from './use-toast';
import { useRouter } from 'next/navigation';

type FormAction = (
  prevState: FormState,
  formData: FormData
) => Promise<FormState>;


const HandleForm = (action: FormAction, route: string) => {
  const [state, formAction, isPending] = useActionState(action, formState);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.message,
        variant: state.status === 'success' ? 'default' : 'destructive',
      });
    };

    if (state.status === 'success') {
      router.push(route);
    }
  }, [state, toast, router, route]);

  return { state, formAction, isPending };
};

export { HandleForm };