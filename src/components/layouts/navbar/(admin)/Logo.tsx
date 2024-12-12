import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href='/admin' className='flex items-center'>
      <Image
        alt=''
        src='/logo.png'
        width={100}
        height={100}
        priority
      />

      <h2 className='text-lg font-semibold'>{process.env.APP_NAME} V{process.env.APP_VERSION}</h2>
    </Link>
  );
};
export default Logo;