'use client';

import Form from 'next/form';
import InputForm from '@/components/form/InputForm';
import SubmitForm from '../form/SubmitForm';
import Link from 'next/link';
import { HandleForm } from '@/hooks/use-form';
import { SignupAction } from '@/hooks/use-auth';
import { User , Mail, Lock } from 'lucide-react';

const SignupForm = () => {

  const { state, formAction, isPending } = HandleForm(SignupAction, '/');

  return (
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
          type='email'
          name='email'
          label='Email'
          placeholder='kobdemy@gmail.com'
          required
          icon={Mail}
          sizeIcon={20}
          styleIcon='text-yellow-500'
          styleLabel='text-gray-500'
        />
        {state.errors?.email && (
          <p className='text-red-500'>
            {state.errors.email[0] === 'Only Gmail or Outlook email addresses are allowed'
              ? 'กรุณาใช้อีเมล Gmail หรือ Outlook เท่านั้น'
              : state.errors.email[0]}
          </p>
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
          <SubmitForm name='Sign Up' size='lg' pending={isPending} className='rounded-full w-32 text-gray-100 bg-opacity-55' />
          <Link href='/sign-in' className='text-sm hover:underline text-gray-400'>มีบัญชีผู้ใช้แล้ว เข้าสู่ระบบ</Link>
        </div>
    </Form>
  );
};
export default SignupForm;