import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Search, Bell, User, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

const Header: React.FC = () => {
  const { auth, logout } = useStore();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-dark-950/80 backdrop-blur-sm border-b border-dark-700 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-fuchsia-500 rounded-md flex items-center justify-center shadow-md shadow-primary-500/20">
            <Camera size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-extrabold gradient-text tracking-tight">FeetSocial</h1>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos, users, hashtags..."
              className="w-full pl-10 pr-4 py-2 bg-dark-900/70 border border-dark-700 rounded-full focus:ring-2 focus:ring-primary-500/60 focus:border-transparent outline-none text-sm placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-dark-900/60 rounded-full transition-colors">
            <Bell size={20} className="text-gray-400" />
          </button>
          
          {auth.isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <img
                src={auth.user?.avatar || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNlZjQ0NDQiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlU8L3RleHQ+PC9zdmc+'}
                alt={auth.user?.username || 'User'}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden sm:inline text-sm font-medium text-white">
                {auth.user?.username || 'User'}
              </span>
              <button
                title="Logout"
                aria-label="Logout"
                onClick={() => { logout(); navigate('/login'); }}
                className="p-2 hover:bg-dark-900/60 rounded-full border border-dark-700 text-gray-200 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-full transition-colors shadow-sm shadow-primary-500/20"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
