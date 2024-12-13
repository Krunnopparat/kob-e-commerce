import AdminDashboardLayout from '@/components/AdminLayout';
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
      <AdminDashboardLayout>{children}</AdminDashboardLayout>
    </div>
  );
};
export default AdminLayout;