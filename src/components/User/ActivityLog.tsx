import React, { useState } from 'react';

interface ActivityEntry {
  id: number;
  action: string;
  description: string;
  timestamp: string;
  type: 'login' | 'edit' | 'view' | 'delete' | 'settings' | 'security';
  ipAddress?: string;
  device?: string;
}

interface ActivityLogProps {
  activities?: ActivityEntry[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({
  activities: initialActivities = [
    {
      id: 1,
      action: 'Login',
      description: 'Successfully logged in to the system',
      timestamp: '2025-12-08 14:30:00',
      type: 'login',
      ipAddress: '192.168.1.105',
      device: 'Chrome on Windows',
    },
    {
      id: 2,
      action: 'Profile Update',
      description: 'Updated profile information (Name, Phone, Location)',
      timestamp: '2025-12-08 11:15:00',
      type: 'edit',
      ipAddress: '192.168.1.105',
      device: 'Chrome on Windows',
    },
    {
      id: 3,
      action: 'Password Changed',
      description: 'Successfully changed account password',
      timestamp: '2025-12-07 16:45:00',
      type: 'security',
      ipAddress: '192.168.1.110',
      device: 'Safari on iPhone',
    },
    {
      id: 4,
      action: 'Viewed Dashboard',
      description: 'Accessed user dashboard',
      timestamp: '2025-12-07 09:20:00',
      type: 'view',
      ipAddress: '192.168.1.105',
      device: 'Chrome on Windows',
    },
    {
      id: 5,
      action: 'Settings Modified',
      description: 'Changed notification preferences',
      timestamp: '2025-12-06 18:10:00',
      type: 'settings',
      ipAddress: '192.168.1.105',
      device: 'Chrome on Windows',
    },
    {
      id: 6,
      action: 'Login',
      description: 'Successfully logged in to the system',
      timestamp: '2025-12-06 08:00:00',
      type: 'login',
      ipAddress: '192.168.1.108',
      device: 'Firefox on Windows',
    },
    {
      id: 7,
      action: 'Two-Factor Auth Enabled',
      description: 'Enabled two-factor authentication',
      timestamp: '2025-12-05 14:30:00',
      type: 'security',
      ipAddress: '192.168.1.105',
      device: 'Chrome on Windows',
    },
    {
      id: 8,
      action: 'Login',
      description: 'Successfully logged in to the system',
      timestamp: '2025-12-05 09:15:00',
      type: 'login',
      ipAddress: '192.168.1.105',
      device: 'Chrome on Windows',
    },
  ],
}) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | ActivityEntry['type']>('all');

  const getActivityIcon = (type: ActivityEntry['type']) => {
    switch (type) {
      case 'login':
        return '🔓';
      case 'edit':
        return '✏️';
      case 'view':
        return '👁️';
      case 'delete':
        return '🗑️';
      case 'settings':
        return '⚙️';
      case 'security':
        return '🔒';
      default:
        return '📋';
    }
  };

  const getActivityColor = (type: ActivityEntry['type']) => {
    switch (type) {
      case 'login':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
      case 'edit':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
      case 'view':
        return 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200';
      case 'delete':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
      case 'settings':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200';
      case 'security':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
      default:
        return 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600';
    }
  };

  const filteredActivities =
    filter === 'all'
      ? initialActivities
      : initialActivities.filter(a => a.type === filter);

  const activityTypes: { id: 'all' | ActivityEntry['type']; label: string }[] = [
    { id: 'all', label: 'All Activities' },
    { id: 'login', label: 'Logins' },
    { id: 'edit', label: 'Edits' },
    { id: 'view', label: 'Views' },
    { id: 'settings', label: 'Settings' },
    { id: 'security', label: 'Security' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="mr-2">📜</span>
        Activity Log
      </h2>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {activityTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setFilter(type.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              filter === type.id
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Activities Timeline */}
      <div className="space-y-3">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="text-lg">No activities found</p>
            <p className="text-sm mt-1">Try selecting a different filter</p>
          </div>
        ) : (
          filteredActivities.map((activity, index) => (
            <div
              key={activity.id}
              className="relative"
            >
              {/* Timeline connector */}
              {index !== filteredActivities.length - 1 && (
                <div className="absolute left-5 top-12 h-6 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
              )}

              {/* Activity Item */}
              <div className="flex items-start space-x-4">
                {/* Timeline dot */}
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-lg">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>

                {/* Activity Details */}
                <div
                  className={`flex-1 p-4 rounded-lg border cursor-pointer transition-all ${getActivityColor(activity.type)}`}
                  onClick={() =>
                    setExpandedId(expandedId === activity.id ? null : activity.id)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{activity.action}</h3>
                      <p className="text-sm opacity-80">{activity.description}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {activity.timestamp}
                      </p>
                    </div>
                    <div className="text-xl ml-2">
                      {expandedId === activity.id ? '▼' : '▶'}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedId === activity.id && (
                    <div className="mt-4 pt-4 border-t border-current border-opacity-20 space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="opacity-75">IP Address:</span>
                        <code className="bg-black bg-opacity-20 px-2 py-1 rounded text-xs font-mono">
                          {activity.ipAddress || 'N/A'}
                        </code>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="opacity-75">Device:</span>
                        <span>{activity.device || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="opacity-75">Status:</span>
                        <span className="inline-block px-2 py-1 bg-green-500 bg-opacity-20 rounded text-xs font-semibold">
                          Successful
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200 flex items-start">
          <span className="mr-2">ℹ️</span>
          <span>
            Your activity is logged for security purposes. If you notice any unauthorized activity, 
            please change your password immediately and contact support.
          </span>
        </p>
      </div>
    </div>
  );
};

export default ActivityLog;
