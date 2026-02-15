import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/lib/auth';
import ScrollAnimate from '@/components/ScrollAnimate';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="main-content">
            <ScrollAnimate threshold={0}>
              {children}
            </ScrollAnimate>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
