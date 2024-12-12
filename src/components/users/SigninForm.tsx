'use client';

import Form from 'next/form';
import InputForm from '@/components/form/InputForm';
import SubmitForm from '../form/SubmitForm';
import { HandleForm } from '@/hooks/use-form';
import { SigninAction } from '@/hooks/use-auth';
import Link from 'next/link';
import { User, Lock } from 'lucide-react';

const SigninForm = () => {
  const { state, formAction, isPending } = HandleForm(SigninAction, '/');

  return (
    <div className='flex flex-col '>
      <Form
        action={formAction}
        className='space-y-4'
      >
        <div className='flex flex-col gap-2'>
          <InputForm
            type='text'
            name='username'
            label='Username'
            placeholder='Kobdemy'
            required
            icon={User}
            sizeIcon={20}
            styleIcon='text-yellow-500'
            styleLabel='text-gray-500'
          />
          {state.errors?.username && (
            <p className='text-red-500'>{state.errors.username[0]}</p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <InputForm
            type='password'
            name='password'
            label='Password'
            placeholder='**********'
            required
            icon={Lock}
            sizeIcon={20}
            styleIcon='text-yellow-500'
            styleLabel='text-gray-500'
          />
          {state.errors?.password && (
            <p className='text-red-500'>{state.errors.password[0]}</p>
          )}
        </div>

        <div className='flex flex-col items-center gap-4'>
          <SubmitForm name='Sign In' size='lg' pending={isPending} className='rounded-full w-32 text-gray-100 bg-opacity-55' />
          <Link href='/sign-up' className='text-sm hover:underline text-gray-400'>ยังไม่มีบัญชี? ลงทะเบียน</Link>
        </div>
      </Form>
    </div>
  );
};
export default SigninForm