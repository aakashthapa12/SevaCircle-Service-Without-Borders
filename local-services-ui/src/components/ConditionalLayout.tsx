'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide navbar and footer on login and signup pages
  const hideLayout = pathname === '/login' || pathname === '/signup';

  if (hideLayout) {
    return <main className="flex-grow w-full">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full">
        <div className="container-universal">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
