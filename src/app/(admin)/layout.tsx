import Navbar from '@/components/layouts/navbar/(admin)';
import Sidebar from '@/components/layouts/sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard',
    template: '%s | Admin Dashboard',
  },
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full flex flex-col'>
      <Navbar />
      <div className='flex-1 flex'>
        <Sidebar />
        <div className='flex-1 px-4 py-6'>
          {children}
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;