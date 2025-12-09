import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RoleSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isTeamLead = location.pathname.startsWith('/teamlead');
  const isAdmin = location.pathname.startsWith('/admin');
  const isAgent = location.pathname.startsWith('/agent');
  const isUser = location.pathname.startsWith('/user');

  const switchToAdmin = () => {
    navigate('/admin/users');
  };

  const switchToTeamLead = () => {
    navigate('/teamlead');
  };

  const switchToAgent = () => {
    navigate('/agent');
  };

  const switchToUser = () => {
    navigate('/user');
  };

  return (
    <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <span className="text-xs text-gray-600 dark:text-gray-400">View as:</span>
      <button
        onClick={switchToAdmin}
        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
          isAdmin
            ? 'bg-teal-600 text-white'
            : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500'
        }`}
      >
        Admin
      </button>
      <button
        onClick={switchToTeamLead}
        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
          isTeamLead
            ? 'bg-teal-600 text-white'
            : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500'
        }`}
      >
        Team Lead
      </button>
      <button
        onClick={switchToAgent}
        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
          isAgent
            ? 'bg-teal-600 text-white'
            : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500'
        }`}
      >
        Agent
      </button>
      <button
        onClick={switchToUser}
        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
          isUser
            ? 'bg-teal-600 text-white'
            : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500'
        }`}
      >
        User
      </button>
    </div>
  );
};

export default RoleSwitcher;
