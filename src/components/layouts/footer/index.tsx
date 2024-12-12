import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-gray-100 py-6'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <div className='text-sm text-gray-600'>
            © 2024 Kob E-Commerce สงวนลิขสิทธิ์.
          </div>
          <div className='space-x-4'>
            <Link href='/about' className='text-sm text-gray-600 hover:text-primary'>เกี่ยวกับเรา</Link>
            <Link href='/contact' className='text-sm text-gray-600 hover:text-primary'>ติดต่อเรา</Link>
            <Link href='/terms' className='text-sm text-gray-600 hover:text-primary'>ข้อกำหนดและเงื่อนไข</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;