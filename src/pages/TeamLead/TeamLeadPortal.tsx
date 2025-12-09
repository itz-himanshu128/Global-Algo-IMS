import React, { useState } from 'react';
import DashboardStats from '../../components/TeamLead/DashboardStats';
import ReviewQueue from '../../components/TeamLead/ReviewQueue';
import AssignLeads from '../../components/TeamLead/AssignLeads';
import CallReviews from '../../components/TeamLead/CallReviews';

type ActiveSection = 'dashboard' | 'review' | 'assign' | 'calls';

const TeamLeadPortal: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');

  const navItems: { id: ActiveSection; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'review', label: 'Review Queue', icon: '📋' },
    { id: 'assign', label: 'Assign Leads', icon: '📤' },
    { id: 'calls', label: 'Call Reviews', icon: '🎧' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Team Lead Portal
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Validate leads, assign to agents, review calls, and monitor team performance
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8">
        <nav className="flex space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`px-6 py-3 font-medium text-sm transition-all border-b-2 ${
                activeSection === item.id
                  ? 'border-teal-600 text-teal-600 bg-teal-50 dark:bg-teal-900/20'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {activeSection === 'dashboard' && (
          <div>
            <DashboardStats />
          </div>
        )}

        {activeSection === 'review' && (
          <div>
            <ReviewQueue />
          </div>
        )}

        {activeSection === 'assign' && (
          <div>
            <AssignLeads />
          </div>
        )}

        {activeSection === 'calls' && (
          <div>
            <CallReviews />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamLeadPortal;
