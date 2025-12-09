import React, { useState } from 'react';

interface Agent {
  id: number;
  name: string;
  currentLeads: number;
  maxLeads: number;
}

interface Lead {
  id: number;
  name: string;
  phone: string;
  source: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface AssignLeadsProps {
  agents?: Agent[];
  leads?: Lead[];
  onAssign?: (agentId: number, leadIds: number[]) => void;
}

const AssignLeads: React.FC<AssignLeadsProps> = ({
  agents: initialAgents = [
    { id: 1, name: 'John Smith', currentLeads: 150, maxLeads: 200 },
    { id: 2, name: 'Sarah Johnson', currentLeads: 145, maxLeads: 200 },
    { id: 3, name: 'Mike Davis', currentLeads: 140, maxLeads: 200 },
    { id: 4, name: 'Emily Chen', currentLeads: 138, maxLeads: 200 },
    { id: 5, name: 'David Wilson', currentLeads: 135, maxLeads: 200 },
    { id: 6, name: 'Lisa Anderson', currentLeads: 95, maxLeads: 150 },
    { id: 7, name: 'Tom Harris', currentLeads: 82, maxLeads: 150 },
  ],
  leads: initialLeads = [
    { id: 1, name: 'Alex Thompson', phone: '(555) 111-2222', source: 'Web Form', priority: 'High' },
    { id: 2, name: 'Maria Garcia', phone: '(555) 222-3333', source: 'Referral', priority: 'High' },
    { id: 3, name: 'Kevin Lee', phone: '(555) 333-4444', source: 'Cold Call', priority: 'Medium' },
    { id: 4, name: 'Rachel White', phone: '(555) 444-5555', source: 'LinkedIn', priority: 'Medium' },
    { id: 5, name: 'Chris Martin', phone: '(555) 555-6666', source: 'Web Form', priority: 'Low' },
    { id: 6, name: 'Amanda Clark', phone: '(555) 666-7777', source: 'Referral', priority: 'High' },
    { id: 7, name: 'Daniel Moore', phone: '(555) 777-8888', source: 'Cold Call', priority: 'Medium' },
    { id: 8, name: 'Jessica Taylor', phone: '(555) 888-9999', source: 'Web Form', priority: 'Low' },
  ],
  onAssign,
}) => {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [availableLeads, setAvailableLeads] = useState<Lead[]>(initialLeads);
  const [validationError, setValidationError] = useState<string>('');

  const selectedAgentData = agents.find((a) => a.id === selectedAgent);

  const handleLeadToggle = (leadId: number) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]
    );
    setValidationError('');
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === availableLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(availableLeads.map((l) => l.id));
    }
    setValidationError('');
  };

  const validateAssignment = (): string | null => {
    if (!selectedAgent) {
      return 'Please select an agent';
    }

    if (selectedLeads.length === 0) {
      return 'Please select at least one lead';
    }

    if (!selectedAgentData) {
      return 'Selected agent not found';
    }

    const remainingCapacity = selectedAgentData.maxLeads - selectedAgentData.currentLeads;

    if (selectedLeads.length > remainingCapacity) {
      return `Agent ${selectedAgentData.name} can only accept ${remainingCapacity} more leads`;
    }

    if (selectedLeads.length < 35) {
      return 'You must assign at least 35 leads at a time';
    }

    if (selectedLeads.length > 50) {
      return 'You cannot assign more than 50 leads at a time';
    }

    return null;
  };

  const handleAssign = () => {
    const error = validateAssignment();

    if (error) {
      setValidationError(error);
      return;
    }

    if (selectedAgent && selectedAgentData) {
      // Update agent's current leads
      setAgents(
        agents.map((a) =>
          a.id === selectedAgent
            ? { ...a, currentLeads: a.currentLeads + selectedLeads.length }
            : a
        )
      );

      // Remove assigned leads from available leads
      setAvailableLeads(availableLeads.filter((l) => !selectedLeads.includes(l.id)));

      // Call parent callback if provided
      if (onAssign) {
        onAssign(selectedAgent, selectedLeads);
      }

      // Reset selections
      setSelectedLeads([]);
      setValidationError('');

      // Show success message (you could use a toast notification here)
      alert(
        `Successfully assigned ${selectedLeads.length} leads to ${selectedAgentData.name}!`
      );
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCapacityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="text-2xl mr-2">📤</span>
        Assign Leads to Agent
      </h2>

      {/* Agent Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Agent
        </label>
        <select
          value={selectedAgent || ''}
          onChange={(e) => {
            setSelectedAgent(Number(e.target.value) || null);
            setValidationError('');
          }}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="">-- Choose an agent --</option>
          {agents.map((agent) => {
            const capacity = agent.maxLeads - agent.currentLeads;
            return (
              <option key={agent.id} value={agent.id}>
                {agent.name} ({agent.currentLeads}/{agent.maxLeads}) - {capacity} slots available
              </option>
            );
          })}
        </select>

        {/* Agent Capacity Display */}
        {selectedAgentData && (
          <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Capacity Usage
              </span>
              <span
                className={`text-sm font-bold ${getCapacityColor(
                  selectedAgentData.currentLeads,
                  selectedAgentData.maxLeads
                )}`}
              >
                {selectedAgentData.currentLeads} / {selectedAgentData.maxLeads}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  (selectedAgentData.currentLeads / selectedAgentData.maxLeads) * 100 >= 90
                    ? 'bg-red-600'
                    : (selectedAgentData.currentLeads / selectedAgentData.maxLeads) * 100 >= 75
                    ? 'bg-yellow-500'
                    : 'bg-green-600'
                }`}
                style={{
                  width: `${(selectedAgentData.currentLeads / selectedAgentData.maxLeads) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {selectedAgentData.maxLeads - selectedAgentData.currentLeads} leads can still be
              assigned
            </p>
          </div>
        )}
      </div>

      {/* Lead Selection */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Leads ({selectedLeads.length} selected)
          </label>
          <button
            onClick={handleSelectAll}
            className="text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 font-medium"
          >
            {selectedLeads.length === availableLeads.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        {availableLeads.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
            No leads available for assignment
          </p>
        ) : (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                    Select
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                    Source
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {availableLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                      selectedLeads.includes(lead.id) ? 'bg-teal-50 dark:bg-teal-900/20' : ''
                    }`}
                    onClick={() => handleLeadToggle(lead.id)}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => handleLeadToggle(lead.id)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {lead.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {lead.phone}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {lead.source}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                          lead.priority
                        )}`}
                      >
                        {lead.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Validation Error */}
      {validationError && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-800 dark:text-red-300 flex items-center">
            <span className="mr-2">⚠️</span>
            {validationError}
          </p>
        </div>
      )}

      {/* Assignment Info */}
      {selectedLeads.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            ℹ️ You must assign between 35-50 leads at a time. Currently selected:{' '}
            <strong>{selectedLeads.length}</strong>
          </p>
        </div>
      )}

      {/* Assign Button */}
      <button
        onClick={handleAssign}
        disabled={selectedLeads.length === 0 || !selectedAgent}
        className={`w-full py-3 px-6 rounded-md font-semibold text-white transition-colors ${
          selectedLeads.length === 0 || !selectedAgent
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-teal-600 hover:bg-teal-700 active:bg-teal-800'
        }`}
      >
        Assign {selectedLeads.length} Lead{selectedLeads.length !== 1 ? 's' : ''}
        {selectedAgentData && ` to ${selectedAgentData.name}`}
      </button>
    </div>
  );
};

export default AssignLeads;
