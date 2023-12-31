import Navbar from '../components/Navbar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
        <Navbar />
      <span >{children}</span>
      
    </div>
  );
}
