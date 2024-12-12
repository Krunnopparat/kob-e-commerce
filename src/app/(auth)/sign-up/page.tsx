import SignupForm from '@/components/users/SignupForm';
import { UserPlus } from 'lucide-react';

const SignupPage = () => {
  return (
    <div className='w-[500px] border rounded-md p-6 space-y-6 shadow-xl'>
      <div className='flex flex-col items-center justify-center gap-y-3'>
        <UserPlus
          size={100}
          className='text-yellow-400 bg-gray-50 p-2 rounded-xl'
        />
        <h1 className='text-3xl text-gray-600 font-bold capitalize'>sign up</h1>
      </div>
      <SignupForm />
    </div>
  );
};
export default SignupPage;