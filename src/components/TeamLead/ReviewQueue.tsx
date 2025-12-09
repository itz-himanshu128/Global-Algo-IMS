import React, { useState } from 'react';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  source: string;
  dateAdded: string;
  status: 'pending' | 'approved' | 'rejected';
}

type FilterType = 'all' | 'pending' | 'approved' | 'rejected';

interface ReviewQueueProps {
  customers?: Customer[];
  onApprove?: (id: number, updatedCustomer: Customer) => void;
  onReject?: (id: number) => void;
}

const ReviewQueue: React.FC<ReviewQueueProps> = ({
  customers: initialCustomers = [
    {
      id: 1,
      name: 'Michael Johnson',
      phone: '(555) 123-4567',
      email: 'michael.j@email.com',
      source: 'Web Form',
      dateAdded: '2025-12-08',
      status: 'pending',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      phone: '(555) 234-5678',
      email: 'sarah.w@email.com',
      source: 'Referral',
      dateAdded: '2025-12-08',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Robert Brown',
      phone: '(555) 345-6789',
      email: 'robert.b@email.com',
      source: 'Cold Call',
      dateAdded: '2025-12-07',
      status: 'approved',
    },
    {
      id: 4,
      name: 'Jennifer Davis',
      phone: '(555) 456-7890',
      email: 'jennifer.d@email.com',
      source: 'Web Form',
      dateAdded: '2025-12-07',
      status: 'rejected',
    },
    {
      id: 5,
      name: 'James Miller',
      phone: '(555) 567-8901',
      email: 'james.m@email.com',
      source: 'LinkedIn',
      dateAdded: '2025-12-08',
      status: 'pending',
    },
  ],
  onApprove,
  onReject,
}) => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
    setEditingId(null);
    setEditedCustomer(null);
  };

  const handleEdit = (customer: Customer) => {
    setEditingId(customer.id);
    setEditedCustomer({ ...customer });
  };

  const handleSave = (id: number) => {
    if (editedCustomer) {
      setCustomers(customers.map((c) => (c.id === id ? editedCustomer : c)));
      setEditingId(null);
      setEditedCustomer(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedCustomer(null);
  };

  const handleApprove = (id: number) => {
    const customer = customers.find((c) => c.id === id);
    if (customer) {
      const updatedCustomer = { ...customer, status: 'approved' as const };
      setCustomers(customers.map((c) => (c.id === id ? updatedCustomer : c)));
      if (onApprove) onApprove(id, updatedCustomer);
      setExpandedId(null);
    }
  };

  const handleReject = (id: number) => {
    setCustomers(
      customers.map((c) => (c.id === id ? { ...c, status: 'rejected' as const } : c))
    );
    if (onReject) onReject(id);
    setExpandedId(null);
  };

  const filteredCustomers = customers.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <span className="text-2xl mr-2">📋</span>
          Review Queue
        </h2>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {(['all', 'pending', 'approved', 'rejected'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredCustomers.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No customers found with status: {filter}
          </p>
        ) : (
          filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              {/* Collapsed Header */}
              <div
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => handleExpand(customer.id)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-xl">
                    {expandedId === customer.id ? '▼' : '▶'}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {customer.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {customer.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                      customer.status
                    )}`}
                  >
                    {customer.status.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {customer.dateAdded}
                  </span>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === customer.id && (
                <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  {editingId === customer.id && editedCustomer ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            value={editedCustomer.name}
                            onChange={(e) =>
                              setEditedCustomer({ ...editedCustomer, name: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={editedCustomer.phone}
                            onChange={(e) =>
                              setEditedCustomer({ ...editedCustomer, phone: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={editedCustomer.email}
                            onChange={(e) =>
                              setEditedCustomer({ ...editedCustomer, email: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Source
                          </label>
                          <input
                            type="text"
                            value={editedCustomer.source}
                            onChange={(e) =>
                              setEditedCustomer({ ...editedCustomer, source: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleSave(customer.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Email
                          </p>
                          <p className="text-gray-900 dark:text-white">{customer.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Source
                          </p>
                          <p className="text-gray-900 dark:text-white">{customer.source}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Date Added
                          </p>
                          <p className="text-gray-900 dark:text-white">{customer.dateAdded}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Status
                          </p>
                          <p className="text-gray-900 dark:text-white capitalize">
                            {customer.status}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {customer.status === 'pending' && (
                        <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <button
                            onClick={() => handleEdit(customer)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                          >
                            <span className="mr-2">✏️</span>
                            Edit
                          </button>
                          <button
                            onClick={() => handleApprove(customer.id)}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                          >
                            <span className="mr-2">✅</span>
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(customer.id)}
                            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
                          >
                            <span className="mr-2">❌</span>
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewQueue;
