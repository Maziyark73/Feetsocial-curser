import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      <main className="pb-16">
        {children || <Outlet />}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
