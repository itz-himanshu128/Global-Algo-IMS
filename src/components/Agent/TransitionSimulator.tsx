import React, { useState } from 'react';

interface TransitionSimulatorProps {
  onTransition?: (from: string, to: string, allowed: boolean, reason: string) => void;
}

interface Stage {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface TransitionRule {
  from: string;
  to: string;
  requires: string;
  message: string;
}

const TransitionSimulator: React.FC<TransitionSimulatorProps> = ({ onTransition }) => {
  const [currentStage, setCurrentStage] = useState<string>('');
  const [targetStage, setTargetStage] = useState<string>('');
  const [result, setResult] = useState<{
    allowed: boolean;
    message: string;
    color: string;
  } | null>(null);

  // Define pipeline stages
  const stages: Stage[] = [
    { id: 'new', name: 'New Lead', color: 'bg-gray-500', icon: '●' },
    { id: 'contacted', name: 'Contacted', color: 'bg-blue-500', icon: '▶' },
    { id: 'interested', name: 'Interested', color: 'bg-purple-500', icon: '◆' },
    { id: 'kyc-pending', name: 'KYC Pending', color: 'bg-yellow-500', icon: '◇' },
    { id: 'kyc-completed', name: 'KYC Completed', color: 'bg-teal-500', icon: '✓' },
    { id: 'proposal-sent', name: 'Proposal Sent', color: 'bg-indigo-500', icon: '▢' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-500', icon: '↔' },
    { id: 'closed-won', name: 'Closed Won', color: 'bg-green-600', icon: '✓' },
    { id: 'closed-lost', name: 'Closed Lost', color: 'bg-red-600', icon: '✗' },
  ];

  // Business rules for stage transitions
  const rules: TransitionRule[] = [
    {
      from: 'new',
      to: 'contacted',
      requires: 'call',
      message: 'At least one call must be logged before marking as contacted.',
    },
    {
      from: 'new',
      to: 'interested',
      requires: 'call',
      message: 'Cannot skip to interested without contacting first.',
    },
    {
      from: 'contacted',
      to: 'kyc-pending',
      requires: 'interest',
      message: 'Lead must show interest before sending KYC.',
    },
    {
      from: 'interested',
      to: 'kyc-completed',
      requires: 'kyc-submit',
      message: 'Cannot mark KYC as completed without going through KYC Pending stage.',
    },
    {
      from: 'kyc-pending',
      to: 'proposal-sent',
      requires: 'kyc',
      message: 'KYC must be completed before sending proposal.',
    },
    {
      from: 'new',
      to: 'closed-won',
      requires: 'process',
      message: 'Cannot close deal without following the proper sales process.',
    },
  ];

  const validateTransition = (from: string, to: string): { allowed: boolean; message: string; color: string } => {
    // Allow staying in same stage
    if (from === to) {
      return {
        allowed: false,
        message: '⚠️ Already in this stage. Select a different target stage.',
        color: 'bg-yellow-50 border-yellow-300 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-200',
      };
    }

    // Check for specific rule violations
    const violation = rules.find(rule => rule.from === from && rule.to === to);
    if (violation) {
      return {
        allowed: false,
        message: `❌ Business Rule Violated: ${violation.message}`,
        color: 'bg-red-50 border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-200',
      };
    }

    // Check for backwards movement (except to closed-lost)
    const fromIndex = stages.findIndex(s => s.id === from);
    const toIndex = stages.findIndex(s => s.id === to);
    
    if (to !== 'closed-lost' && toIndex < fromIndex) {
      return {
        allowed: false,
        message: '❌ Business Rule Violated: Cannot move backwards in the pipeline. Use appropriate status updates or contact your supervisor.',
        color: 'bg-red-50 border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-200',
      };
    }

    // Check for stage skipping (moving more than 1-2 stages forward)
    if (toIndex - fromIndex > 2 && to !== 'closed-lost') {
      return {
        allowed: false,
        message: '⚠️ Business Rule Violated: Cannot skip multiple stages. Follow the proper pipeline progression.',
        color: 'bg-red-50 border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-200',
      };
    }

    // Allow transition to closed-lost from any stage
    if (to === 'closed-lost') {
      return {
        allowed: true,
        message: '✅ Transition Allowed: Lead can be marked as lost from any stage. Please add notes explaining the reason.',
        color: 'bg-green-50 border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-200',
      };
    }

    // Default: Allow transition
    return {
      allowed: true,
      message: '✅ Transition Allowed: This stage change follows business rules and can proceed.',
      color: 'bg-green-50 border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-200',
    };
  };

  const handleCheck = () => {
    if (!currentStage || !targetStage) {
      setResult({
        allowed: false,
        message: '⚠️ Please select both current and target stages.',
        color: 'bg-yellow-50 border-yellow-300 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-200',
      });
      return;
    }

    const validationResult = validateTransition(currentStage, targetStage);
    setResult(validationResult);

    if (onTransition) {
      onTransition(currentStage, targetStage, validationResult.allowed, validationResult.message);
    }
  };

  const handleReset = () => {
    setCurrentStage('');
    setTargetStage('');
    setResult(null);
  };

  const getStageInfo = (stageId: string) => {
    return stages.find(s => s.id === stageId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="text-2xl mr-2">🔄</span>
        Stage Transition Simulator
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Test stage transitions to ensure they follow business rules before updating a lead's status.
      </p>

      <div className="space-y-6">
        {/* Current Stage Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Current Stage
          </label>
          <select
            value={currentStage}
            onChange={(e) => {
              setCurrentStage(e.target.value);
              setResult(null);
            }}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">-- Select current stage --</option>
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.icon} {stage.name}
              </option>
            ))}
          </select>
          {currentStage && (
            <div className="mt-2 flex items-center">
              <span className={`${getStageInfo(currentStage)?.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                {getStageInfo(currentStage)?.icon} {getStageInfo(currentStage)?.name}
              </span>
            </div>
          )}
        </div>

        {/* Arrow Indicator */}
        {currentStage && (
          <div className="flex justify-center">
            <div className="text-4xl text-gray-400">↓</div>
          </div>
        )}

        {/* Target Stage Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Target Stage
          </label>
          <select
            value={targetStage}
            onChange={(e) => {
              setTargetStage(e.target.value);
              setResult(null);
            }}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">-- Select target stage --</option>
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.icon} {stage.name}
              </option>
            ))}
          </select>
          {targetStage && (
            <div className="mt-2 flex items-center">
              <span className={`${getStageInfo(targetStage)?.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                {getStageInfo(targetStage)?.icon} {getStageInfo(targetStage)?.name}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCheck}
            disabled={!currentStage || !targetStage}
            className={`flex-1 py-3 font-semibold rounded-lg transition-colors ${
              currentStage && targetStage
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Check Transition
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-semibold rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Result Display */}
        {result && (
          <div className={`p-4 border-2 rounded-lg ${result.color}`}>
            <p className="font-medium">{result.message}</p>
            {result.allowed && (
              <p className="text-sm mt-2 opacity-80">
                You can proceed with this transition. Remember to add appropriate notes when updating the lead status.
              </p>
            )}
          </div>
        )}

        {/* Business Rules Reference */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="mr-2">📚</span>
            Key Business Rules
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Must contact lead (make call) before moving from "New Lead"</li>
            <li>• Cannot send KYC without lead showing interest</li>
            <li>• Cannot send proposal without completed KYC</li>
            <li>• Cannot skip multiple stages in the pipeline</li>
            <li>• Cannot move backwards (except to Closed Lost)</li>
            <li>• Can mark as "Closed Lost" from any stage</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransitionSimulator;
