import Logo from './Logo';
import SearchProduct from './SearchProduct';
import Menu from './Menu';
import { headers } from 'next/headers';

const Navbar = async () => {

  const headerStore = await headers();
  const userInfo = headerStore.get('X-USER-INFO') as string;

  return (
    <nav className='shadow-lg'>
      <div className='max-w-7xl mx-auto h-16 flex items-center justify-between px-6 2xl:px-0'>
        <Logo />
        <SearchProduct />
        <Menu userInfo={JSON.parse(userInfo)} />
      </div>
    </nav>
  );
};

export default Navbar;