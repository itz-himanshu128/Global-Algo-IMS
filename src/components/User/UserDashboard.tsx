import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface UserDashboardProps {
  onThemeToggle?: (isDark: boolean) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  onThemeToggle,
}) => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const userName = user.name || 'User';
  const userEmail = user.email || 'user@example.com';

  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Toggle dark mode in the document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    if (onThemeToggle) {
      onThemeToggle(newDarkMode);
    }
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const userInitials = userName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-6">
      {/* Welcome Header with Theme Toggle */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg shadow-lg p-8 text-white flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {getCurrentGreeting()}, {userName.split(' ')[0]}!
          </h1>
          <p className="text-teal-100 text-base">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        
        {/* Theme Toggle Button */}
        <button
          onClick={handleThemeToggle}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <span className="text-2xl">{isDarkMode ? '☀' : '☽'}</span>
        </button>
      </div>

      {/* User Details Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white shadow-lg">
              <span className="text-4xl font-bold">{userInitials}</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {userName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Username
                </label>
                <p className="text-lg text-gray-900 dark:text-white mt-1">
                  {userName.toLowerCase().replace(/\s+/g, '.')}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <p className="text-lg text-gray-900 dark:text-white mt-1">
                  {userEmail}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Role
                </label>
                <p className="text-lg text-gray-900 dark:text-white mt-1">
                  {user.role}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Last Login
                </label>
                <p className="text-lg text-gray-900 dark:text-white mt-1">
                  Today, 2 hours ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Status Message */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
          Account Status
        </h3>
        <p className="text-yellow-800 dark:text-yellow-300">
          Your account has limited access. Please contact an Admin to enable CRM features.
        </p>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Permissions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Current Permissions
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="text-green-600 dark:text-green-400 font-bold mr-3">✓</span>
              View and edit profile
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="text-green-600 dark:text-green-400 font-bold mr-3">✓</span>
              Change password
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="text-green-600 dark:text-green-400 font-bold mr-3">✓</span>
              View account activity
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="text-green-600 dark:text-green-400 font-bold mr-3">✓</span>
              Access support resources
            </li>
          </ul>
        </div>

        {/* No CRM Access */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Not Available
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="text-red-600 dark:text-red-400 font-bold mr-3">✗</span>
              Admin modules
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="text-red-600 dark:text-red-400 font-bold mr-3">✗</span>
              Team Lead features
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="text-red-600 dark:text-red-400 font-bold mr-3">✗</span>
              Agent call tools
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="text-red-600 dark:text-red-400 font-bold mr-3">✗</span>
              Lead management
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
