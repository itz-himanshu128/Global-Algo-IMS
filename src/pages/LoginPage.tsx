import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Demo accounts for easy testing
  const demoAccounts = [
    {
      email: 'admin@company.com',
      password: 'admin123',
      role: 'Admin',
      description: 'Full system access',
    },
    {
      email: 'teamlead@company.com',
      password: 'lead123',
      role: 'Team Lead',
      description: 'Team management and review',
    },
    {
      email: 'agent@company.com',
      password: 'agent123',
      role: 'Agent',
      description: 'Call execution and leads',
    },
    {
      email: 'user@company.com',
      password: 'user123',
      role: 'User',
      description: 'Limited access user',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await login(formData.email, formData.password);
      // Redirect to root so RoleBasedRedirect sends user to their dashboard
      navigate('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Login failed. Please try again.'
      );
    }
  };

  const handleDemoLogin = async (email: string, password: string) => {
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Login failed. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to Global Algo IMS
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@company.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  disabled={isLoading}
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                    disabled={isLoading}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                    Demo Accounts
                  </span>
                </div>
              </div>

              {/* Demo Account Shortcuts */}
              <div className="space-y-2">
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      handleDemoLogin(account.email, account.password)
                    }
                    disabled={isLoading}
                    className="w-full py-2 px-3 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {account.role}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {account.email}
                    </div>
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Info Panel */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Global Algo IMS</h2>
              <p className="text-teal-100 mb-6">
                An integrated management system for sales operations, lead management, and team coordination.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Role-Based Access</h3>
                    <p className="text-xs text-teal-100">
                      Auto-detected on login based on your credentials
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Customized UI</h3>
                    <p className="text-xs text-teal-100">
                      Interface tailored to your role and responsibilities
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure Session</h3>
                    <p className="text-xs text-teal-100">
                      Your session is securely stored locally
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Credentials Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                Quick Test Guide
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
                Use any demo account above to explore the application with different roles.
              </p>
              <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                <li>Admin: Full access to all modules</li>
                <li>Team Lead: Lead review and team management</li>
                <li>Agent: Call execution and lead management</li>
                <li>User: Limited access to profile and settings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
