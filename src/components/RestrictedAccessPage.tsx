import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestrictedAccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/user');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        {/* Restricted Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20">
            <span className="text-5xl">🔒</span>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Access Denied
        </h1>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          You do not have permission to view this page.
        </p>

        {/* Additional Info */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Your account has limited access. To use CRM features, please contact an Administrator.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleGoToDashboard}
          className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors mb-3"
        >
          Go to Dashboard
        </button>

        {/* Support Info */}
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Need help? Contact support at support@company.com
        </p>
      </div>
    </div>
  );
};

export default RestrictedAccessPage;
