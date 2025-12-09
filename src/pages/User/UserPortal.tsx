import React, { useState } from 'react';
import UserDashboard from '../../components/User/UserDashboard';
import UserProfile from '../../components/User/UserProfile';

type ActiveSection = 'dashboard' | 'profile';

const UserPortal: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          User Portal
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your profile and account
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8">
        <nav className="flex space-x-1">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`px-6 py-3 font-medium text-sm transition-all border-b-2 ${
              activeSection === 'dashboard'
                ? 'border-teal-600 text-teal-600 bg-teal-50 dark:bg-teal-900/20'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveSection('profile')}
            className={`px-6 py-3 font-medium text-sm transition-all border-b-2 ${
              activeSection === 'profile'
                ? 'border-teal-600 text-teal-600 bg-teal-50 dark:bg-teal-900/20'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Profile
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {activeSection === 'dashboard' && <UserDashboard />}
        {activeSection === 'profile' && (
          <div className="max-w-3xl">
            <UserProfile />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPortal;
