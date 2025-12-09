import React from 'react';

interface StatBoxProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  subtitle?: string;
}

const StatBox: React.FC<StatBoxProps> = ({ title, value, icon, color, subtitle }) => {
  return (
    <div className={`${color} rounded-lg p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {subtitle && <p className="text-sm mt-1 opacity-80">{subtitle}</p>}
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

interface TeamMember {
  name: string;
  leadsAssigned: number;
  callsCompleted: number;
  approvalRate: number;
}

interface DashboardStatsProps {
  pendingReviews?: number;
  approvedToday?: number;
  rejectedToday?: number;
  totalLeadsAssigned?: number;
  activeAgents?: number;
  teamMembers?: TeamMember[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  pendingReviews = 12,
  approvedToday = 45,
  rejectedToday = 8,
  totalLeadsAssigned = 350,
  activeAgents = 7,
  teamMembers = [
    { name: 'John Smith', leadsAssigned: 150, callsCompleted: 142, approvalRate: 94.7 },
    { name: 'Sarah Johnson', leadsAssigned: 145, callsCompleted: 138, approvalRate: 95.2 },
    { name: 'Mike Davis', leadsAssigned: 140, callsCompleted: 135, approvalRate: 96.4 },
    { name: 'Emily Chen', leadsAssigned: 138, callsCompleted: 130, approvalRate: 94.2 },
    { name: 'David Wilson', leadsAssigned: 135, callsCompleted: 128, approvalRate: 94.8 },
  ],
}) => {
  return (
    <div className="space-y-6">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBox
          title="Pending Reviews"
          value={pendingReviews}
          icon="📋"
          color="bg-amber-500"
          subtitle="Awaiting approval"
        />
        <StatBox
          title="Approved Today"
          value={approvedToday}
          icon="✅"
          color="bg-green-500"
          subtitle="Sent to agents"
        />
        <StatBox
          title="Total Leads Assigned"
          value={totalLeadsAssigned}
          icon="📊"
          color="bg-blue-500"
          subtitle={`${activeAgents} active agents`}
        />
        <StatBox
          title="Rejected Today"
          value={rejectedToday}
          icon="❌"
          color="bg-red-500"
          subtitle="Quality checks"
        />
      </div>

      {/* Team Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="text-2xl mr-2">🏆</span>
          Team Leaderboard
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Rank
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Agent Name
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Leads Assigned
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Calls Completed
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Approval Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <tr
                  key={member.name}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                        index === 0
                          ? 'bg-yellow-400 text-yellow-900'
                          : index === 1
                          ? 'bg-gray-300 text-gray-800'
                          : index === 2
                          ? 'bg-orange-400 text-orange-900'
                          : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                    {member.name}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">
                    {member.leadsAssigned}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">
                    {member.callsCompleted}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        member.approvalRate >= 95
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}
                    >
                      {member.approvalRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
