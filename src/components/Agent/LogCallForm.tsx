import React, { useState } from 'react';

interface LogCallFormProps {
  onLogCall?: (data: CallLogData) => void;
}

export interface CallLogData {
  leadId: number;
  leadName: string;
  outcome: string;
  notes: string;
  sendWhatsApp: boolean;
  duration?: number;
}

const LogCallForm: React.FC<LogCallFormProps> = ({ onLogCall }) => {
  const [leadId, setLeadId] = useState('');
  const [leadName, setLeadName] = useState('');
  const [outcome, setOutcome] = useState('');
  const [notes, setNotes] = useState('');
  const [sendWhatsApp, setSendWhatsApp] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState('greeting');

  // Sample leads for dropdown
  const leads = [
    { id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210' },
    { id: 2, name: 'Priya Sharma', phone: '+91 98765 43211' },
    { id: 3, name: 'Amit Patel', phone: '+91 98765 43212' },
    { id: 4, name: 'Sneha Gupta', phone: '+91 98765 43213' },
    { id: 5, name: 'Vikram Singh', phone: '+91 98765 43214' },
  ];

  const outcomes = [
    { value: 'connected', label: 'Connected - Interested', color: 'text-green-600' },
    { value: 'connected-callback', label: 'Connected - Call Back Later', color: 'text-blue-600' },
    { value: 'connected-not-interested', label: 'Connected - Not Interested', color: 'text-orange-600' },
    { value: 'busy', label: 'Busy/Did Not Answer', color: 'text-yellow-600' },
    { value: 'invalid', label: 'Invalid Number', color: 'text-red-600' },
    { value: 'switched-off', label: 'Phone Switched Off', color: 'text-gray-600' },
    { value: 'voicemail', label: 'Voicemail', color: 'text-purple-600' },
  ];

  const whatsappTemplates = [
    { value: 'greeting', label: 'Greeting Message' },
    { value: 'kyc', label: 'KYC Form Link' },
    { value: 'market-update', label: 'Market Update' },
    { value: 'callback-reminder', label: 'Callback Reminder' },
    { value: 'thank-you', label: 'Thank You Message' },
  ];

  const handleLeadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setLeadId(selectedId);
    const selectedLead = leads.find(l => l.id.toString() === selectedId);
    if (selectedLead) {
      setLeadName(selectedLead.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leadId || !outcome) {
      alert('Please select a lead and outcome');
      return;
    }

    const logData: CallLogData = {
      leadId: parseInt(leadId),
      leadName,
      outcome,
      notes,
      sendWhatsApp,
    };

    if (onLogCall) {
      onLogCall(logData);
    }

    // Show success message
    alert(
      `Call logged successfully!${
        sendWhatsApp ? '\n✅ WhatsApp message will be sent shortly.' : ''
      }`
    );

    // Reset form
    setLeadId('');
    setLeadName('');
    setOutcome('');
    setNotes('');
    setSendWhatsApp(false);
    setWhatsappMessage('greeting');
  };

  const handleClear = () => {
    setLeadId('');
    setLeadName('');
    setOutcome('');
    setNotes('');
    setSendWhatsApp(false);
    setWhatsappMessage('greeting');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="text-2xl mr-2">📝</span>
        Log Call
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Lead Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Select Lead <span className="text-red-500">*</span>
          </label>
          <select
            value={leadId}
            onChange={handleLeadChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">-- Choose a lead --</option>
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.name} - {lead.phone}
              </option>
            ))}
          </select>
        </div>

        {/* Call Outcome */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Call Outcome <span className="text-red-500">*</span>
          </label>
          <select
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">-- Select outcome --</option>
            {outcomes.map((o) => (
              <option key={o.value} value={o.value} className={o.color}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Outcome Badge Display */}
        {outcome && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Selected:
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              outcome.includes('connected') && !outcome.includes('not-interested')
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : outcome.includes('not-interested') || outcome.includes('invalid')
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {outcomes.find(o => o.value === outcome)?.label}
            </span>
          </div>
        )}

        {/* Call Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Call Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any important details from the call...&#10;&#10;• Customer concerns or questions&#10;• Commitments made&#10;• Next steps&#10;• Follow-up date"
            rows={6}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* WhatsApp Follow-up */}
        <div className="border-2 border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50 dark:bg-green-900/10">
          <div className="flex items-center space-x-3 mb-3">
            <input
              type="checkbox"
              id="sendWhatsApp"
              checked={sendWhatsApp}
              onChange={(e) => setSendWhatsApp(e.target.checked)}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="sendWhatsApp" className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
              Send WhatsApp Follow-up
            </label>
          </div>

          {sendWhatsApp && (
            <div className="ml-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Message Template
              </label>
              <select
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
              >
                {whatsappTemplates.map((template) => (
                  <option key={template.value} value={template.value}>
                    {template.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Message will be sent automatically after logging the call
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span className="text-sm font-bold">✓</span>
            <span>Log Call</span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-semibold rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogCallForm;
