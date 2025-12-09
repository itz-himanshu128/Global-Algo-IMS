import React, { useState } from 'react';
import MyLeadsList from '../../components/Agent/MyLeadsList';
import LiveCallCoPilot from '../../components/Agent/LiveCallCoPilot';
import LogCallForm from '../../components/Agent/LogCallForm';
import WhatsAppConnector from '../../components/Agent/WhatsAppConnector';
import TransitionSimulator from '../../components/Agent/TransitionSimulator';
import TasksToday from '../../components/Agent/TasksToday';

type ActiveSection = 'leads' | 'copilot' | 'log' | 'whatsapp' | 'transition' | 'tasks';

const AgentPortal: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('leads');

  const navItems: { id: ActiveSection; label: string; icon: string }[] = [
    { id: 'leads', label: 'My Leads', icon: '📞' },
    { id: 'copilot', label: 'Call Co-Pilot', icon: '🎯' },
    { id: 'log', label: 'Log Call', icon: '📝' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { id: 'transition', label: 'Stage Transition', icon: '🔄' },
    { id: 'tasks', label: 'Tasks', icon: '✅' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Agent Portal
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Your command center for high-speed sales execution
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8">
        <nav className="flex space-x-1 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`px-6 py-3 font-medium text-sm transition-all border-b-2 whitespace-nowrap ${
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
        {activeSection === 'leads' && (
          <div>
            <MyLeadsList />
          </div>
        )}

        {activeSection === 'copilot' && (
          <div>
            <LiveCallCoPilot />
          </div>
        )}

        {activeSection === 'log' && (
          <div className="max-w-3xl mx-auto">
            <LogCallForm />
          </div>
        )}

        {activeSection === 'whatsapp' && (
          <div className="max-w-3xl mx-auto">
            <WhatsAppConnector />
          </div>
        )}

        {activeSection === 'transition' && (
          <div className="max-w-3xl mx-auto">
            <TransitionSimulator />
          </div>
        )}

        {activeSection === 'tasks' && (
          <div className="max-w-3xl mx-auto">
            <TasksToday />
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentPortal;
