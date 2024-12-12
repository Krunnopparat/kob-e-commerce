import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/footer';

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full flex flex-col'>
      <Navbar />
      <main className='flex-1 container mx-auto px-4 py-8'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;