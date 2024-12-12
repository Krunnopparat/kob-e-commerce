import MenuLink from './MenuLink';

const Sidebar = () => {
  return (
    <div className='max-sm:hidden flex flex-col gap-4 w-64 border-r shadow-md px-3 my-4 text-sm'>
      <MenuLink />
    </div>
  );
};
export default Sidebar;