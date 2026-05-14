import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiCheckSquare, FiSettings, FiHelpCircle } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/tasks', icon: FiCheckSquare, label: 'All Tasks' },
    { to: '/settings', icon: FiSettings, label: 'Settings' },
    { to: '/help', icon: FiHelpCircle, label: 'Help' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg h-full">
      <nav className="mt-8 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;