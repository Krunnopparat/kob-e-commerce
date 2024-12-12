import SigninForm from '@/components/users/SigninForm';
import { UserRoundCog } from 'lucide-react';

const SigninPage = () => {
  return (
    <div className='w-[500px] border rounded-md p-6 space-y-6 shadow-xl'>
      <div className='flex flex-col items-center justify-center gap-y-3'>
        <UserRoundCog
          size={100}
          className='text-yellow-400 bg-gray-50 p-2 rounded-xl' 
        />
        <h1 className='text-3xl text-gray-600 font-bold capitalize'>sign in</h1>
      </div>
      <SigninForm />
    </div>
  );
};
export default SigninPage;