import React, { useState } from 'react';
import { Telephone, TelephoneFill } from 'react-bootstrap-icons';

interface Lead {
  id: number;
  name: string;
  phone: string;
  source: string;
  priority: 'High' | 'Medium' | 'Low';
  called: boolean;
  lastCallDate?: string;
}

interface MyLeadsListProps {
  leads?: Lead[];
  onCallLead?: (leadId: number) => void;
  onToggleCalled?: (leadId: number, called: boolean) => void;
}

const MyLeadsList: React.FC<MyLeadsListProps> = ({
  leads: initialLeads = [
    { id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210', source: 'Web Form', priority: 'High', called: false },
    { id: 2, name: 'Priya Sharma', phone: '+91 98765 43211', source: 'Referral', priority: 'High', called: true, lastCallDate: '2025-12-08 10:30' },
    { id: 3, name: 'Amit Patel', phone: '+91 98765 43212', source: 'Cold Call', priority: 'Medium', called: false },
    { id: 4, name: 'Sneha Gupta', phone: '+91 98765 43213', source: 'LinkedIn', priority: 'Medium', called: false },
    { id: 5, name: 'Vikram Singh', phone: '+91 98765 43214', source: 'Web Form', priority: 'High', called: false },
    { id: 6, name: 'Anjali Reddy', phone: '+91 98765 43215', source: 'Referral', priority: 'Low', called: true, lastCallDate: '2025-12-07 15:20' },
    { id: 7, name: 'Rahul Mehta', phone: '+91 98765 43216', source: 'Cold Call', priority: 'Medium', called: false },
    { id: 8, name: 'Neha Joshi', phone: '+91 98765 43217', source: 'Web Form', priority: 'High', called: false },
  ],
  onCallLead,
  onToggleCalled,
}) => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filter, setFilter] = useState<'all' | 'called' | 'not-called'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleCalled = (leadId: number) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, called: !lead.called, lastCallDate: !lead.called ? new Date().toLocaleString() : lead.lastCallDate }
        : lead
    ));
    const lead = leads.find(l => l.id === leadId);
    if (lead && onToggleCalled) {
      onToggleCalled(leadId, !lead.called);
    }
  };

  const handleCallLead = (leadId: number) => {
    if (onCallLead) {
      onCallLead(leadId);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'called' ? lead.called :
      !lead.called;
    
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);
    
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const notCalledCount = leads.filter(l => !l.called).length;
  const calledCount = leads.filter(l => l.called).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            My Leads
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {notCalledCount} pending • {calledCount} completed • {leads.length} total
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('not-called')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'not-called'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Not Called
          </button>
          <button
            onClick={() => setFilter('called')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'called'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Called
          </button>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-2">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-lg">No leads found</p>
            <p className="text-sm mt-2">Try adjusting your filters or search</p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                lead.called
                  ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                  : 'bg-white dark:bg-gray-800 border-teal-200 dark:border-teal-800'
              }`}
            >
              <div className="flex items-center space-x-4 flex-1">
                {/* Called Toggle */}
                <button
                  onClick={() => handleToggleCalled(lead.id)}
                  className={`p-3 rounded-full transition-all ${
                    lead.called
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 hover:bg-teal-100 dark:hover:bg-teal-900'
                  }`}
                  title={lead.called ? 'Mark as not called' : 'Mark as called'}
                >
                  {lead.called ? (
                    <TelephoneFill className="w-5 h-5" />
                  ) : (
                    <Telephone className="w-5 h-5" />
                  )}
                </button>

                {/* Lead Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {lead.name}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getPriorityColor(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center">
                      {lead.phone}
                    </span>
                    <span className="flex items-center">
                      {lead.source}
                    </span>
                    {lead.called && lead.lastCallDate && (
                      <span className="flex items-center text-green-600 dark:text-green-400">
                        Called: {lead.lastCallDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Call Button */}
              <button
                onClick={() => handleCallLead(lead.id)}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg"
              >
                <Telephone className="w-5 h-5" />
                <span>Call Now</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyLeadsList;
