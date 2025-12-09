import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueTime?: string;
}

interface TasksTodayProps {
  tasks?: Task[];
  onTaskToggle?: (taskId: number, completed: boolean) => void;
}

const TasksToday: React.FC<TasksTodayProps> = ({
  tasks: initialTasks = [
    {
      id: 1,
      title: 'Complete Morning Call Blitz',
      description: 'Call at least 20 leads before 12 PM',
      completed: false,
      priority: 'high',
      dueTime: '12:00 PM',
    },
    {
      id: 2,
      title: 'Follow up with Interested Leads',
      description: 'Send WhatsApp to 5 leads who showed interest yesterday',
      completed: false,
      priority: 'high',
      dueTime: '2:00 PM',
    },
    {
      id: 3,
      title: 'Update Lead Statuses',
      description: 'Ensure all calls from yesterday are properly logged',
      completed: true,
      priority: 'medium',
      dueTime: '11:00 AM',
    },
    {
      id: 4,
      title: 'Review KYC Submissions',
      description: 'Check for any new KYC forms submitted by leads',
      completed: false,
      priority: 'medium',
      dueTime: '3:00 PM',
    },
    {
      id: 5,
      title: 'Send Market Updates',
      description: 'Share today\'s market update with 10 active leads',
      completed: false,
      priority: 'low',
      dueTime: '4:00 PM',
    },
    {
      id: 6,
      title: 'Daily Report Submission',
      description: 'Submit end-of-day activity report to team lead',
      completed: false,
      priority: 'high',
      dueTime: '5:30 PM',
    },
  ],
  onTaskToggle,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleToggle = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task && onTaskToggle) {
      onTaskToggle(taskId, !task.completed);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const completionPercentage = (completedCount / totalCount) * 100;

  const highPriorityPending = tasks.filter(t => !t.completed && t.priority === 'high').length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="text-2xl mr-2">✅</span>
        Tasks Today
      </h2>

      {/* Progress Summary */}
      <div className="mb-6 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-2 border-teal-200 dark:border-teal-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Daily Progress</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {completedCount} / {totalCount} Completed
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              {Math.round(completionPercentage)}%
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>

        {highPriorityPending > 0 && (
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            ⚠️ {highPriorityPending} high priority task{highPriorityPending > 1 ? 's' : ''} pending
          </p>
        )}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              task.completed
                ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-75'
                : 'bg-white dark:bg-gray-800 border-teal-200 dark:border-teal-800 hover:shadow-md'
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* Checkbox */}
              <button
                onClick={() => handleToggle(task.id)}
                className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded border-2 transition-all ${
                  task.completed
                    ? 'bg-teal-600 border-teal-600'
                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-teal-500'
                }`}
              >
                {task.completed && (
                  <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </button>

              {/* Task Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`font-semibold text-gray-900 dark:text-white ${
                      task.completed ? 'line-through opacity-60' : ''
                    }`}>
                      {task.title}
                    </h3>
                    <p className={`text-sm text-gray-600 dark:text-gray-400 mt-1 ${
                      task.completed ? 'line-through opacity-60' : ''
                    }`}>
                      {task.description}
                    </p>
                  </div>
                  
                  {/* Priority Badge */}
                  {!task.completed && (
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Due Time */}
                {task.dueTime && (
                  <div className="flex items-center mt-2 text-sm">
                    <span className={`flex items-center ${
                      task.completed 
                        ? 'text-gray-400 dark:text-gray-500' 
                        : getPriorityColor(task.priority)
                    }`}>
                      <span className="mr-1">🕐</span>
                      Due: {task.dueTime}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Motivational Footer */}
      {completedCount === totalCount ? (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-lg text-center">
          <p className="font-bold text-green-800 dark:text-green-200">
            All tasks completed! Great work today!
          </p>
        </div>
      ) : (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Keep going! You're {Math.round(completionPercentage)}% done for the day.
          </p>
        </div>
      )}
    </div>
  );
};

export default TasksToday;
