import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Plus, Search, MessageCircle, LogIn } from 'lucide-react';
import { useStore } from '../store/useStore';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { auth } = useStore();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/upload', icon: Plus, label: 'Upload' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: auth.isAuthenticated ? '/profile' : '/login', icon: auth.isAuthenticated ? User : LogIn, label: auth.isAuthenticated ? 'Profile' : 'Login' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
