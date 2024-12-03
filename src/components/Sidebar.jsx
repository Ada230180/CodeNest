import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import useStore from '../store/useStore';
import { signOut } from '../services/firebase';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const navigationItems = [
    { name: 'Home', icon: HomeIcon, path: '/home' },
    { name: 'Profile', icon: UserCircleIcon, path: '/profile' },
    { name: 'Chats', icon: ChatBubbleLeftRightIcon, path: '/chats' },
    { name: 'Communities', icon: UsersIcon, path: '/communities' },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <span className="text-xl font-bold text-primary">CodeNest</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-medium">
                {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">
              {user?.displayName || user?.email?.split('@')[0] || 'User'}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
