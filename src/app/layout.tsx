import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import QueryProvider from '@/context/QueryProvider';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Library App',
  description: 'Library app from Udemy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <UserProvider>
          <QueryProvider>
            <body className={inter.className}>
              <Navbar></Navbar>
              {children}
              <Footer></Footer>
              <ReactQueryDevtools />
            </body>
          </QueryProvider>
        </UserProvider>
      </StoreProvider>
    </html>
  );
}
