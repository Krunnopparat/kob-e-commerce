import Logo from './Logo';

const Navbar = () => {
  return (
    <div
      className='flex justify-between items-center p-4 shadow-md'
    >
      <Logo />
    </div>
  );
};
export default Navbar;