import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { Kanit } from 'next/font/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Kob-ECommerce',
    template: '%s | Kob-ECommerce',
  },
};

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={`${kanit.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
};
export default RootLayout;