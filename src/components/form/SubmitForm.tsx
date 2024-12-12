'use client';

import { Button } from '@/components/ui/button';

type SubmitFormProps = {
  name?: string;
  size?: 'default' | 'icon' | 'sm' | 'lg';
  pending: boolean;
  className?: string;
}

const SubmitForm = ({ name, pending, className, size }: SubmitFormProps) => {
  return (
    <Button
      disabled={pending}
      size={size ?? 'default'}
      className={className}
    >
      {pending ? `${name}...` : name}
    </Button>
  );
};
export default SubmitForm;