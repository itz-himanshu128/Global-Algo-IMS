import React, { useState, useEffect } from 'react';
import { Play, Pause, StopCircle } from 'react-bootstrap-icons';

interface LiveCallCoPilotProps {
  leadName?: string;
  leadPhone?: string;
  onEndCall?: (notes: string, duration: number) => void;
}

const LiveCallCoPilot: React.FC<LiveCallCoPilotProps> = ({
  leadName = 'Rajesh Kumar',
  leadPhone = '+91 98765 43210',
  onEndCall,
}) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [notes, setNotes] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isCallActive && !isPaused) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCallActive, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    setCallDuration(0);
    setNotes('');
    setShowSuggestion(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleEndCall = () => {
    if (onEndCall) {
      onEndCall(notes, callDuration);
    }
    setIsCallActive(false);
    setIsPaused(false);
    setCallDuration(0);
  };

  const handleAISuggestion = () => {
    // Simulate AI suggestion
    const suggestions = [
      "💡 Acknowledge their concern about pricing. Try: 'I understand your budget concerns. Let me show you how this investment pays for itself within 6 months...'",
      "💡 Customer seems interested but hesitant. Suggest: 'Would it help if I shared a case study from a similar client who achieved 40% growth?'",
      "💡 They mentioned competition. Counter with: 'That's great you're doing research! What specific features are you comparing? Let me highlight what makes us unique...'",
      "💡 Build trust by asking: 'What's your biggest challenge right now?' Then connect your solution directly to their pain point.",
      "💡 Try a trial close: 'If we could address [their concern], would you be ready to move forward today?'",
    ];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setAiSuggestion(randomSuggestion);
    setShowSuggestion(true);
  };

  const handleSummarizeNotes = () => {
    if (!notes.trim()) {
      setAiSuggestion('⚠️ Please add some notes first before summarizing.');
      setShowSuggestion(true);
      return;
    }
    
    // Simulate AI summarization
    const summary = `📝 CALL SUMMARY:\n\n` +
      `✓ Connected with ${leadName}\n` +
      `✓ Duration: ${formatTime(callDuration)}\n` +
      `✓ Key Points: ${notes.substring(0, 100)}...\n\n` +
      `Next Steps: Follow up via WhatsApp with KYC link, schedule callback for detailed discussion.`;
    
    setNotes(summary);
  };

  const handleWhatsAppQuickSend = (type: 'greeting' | 'kyc' | 'market-update') => {
    let message = '';
    switch (type) {
      case 'greeting':
        message = `WhatsApp sent: "Hi ${leadName.split(' ')[0]}! This is [Your Name] from [Company]. Great speaking with you today!"`;
        break;
      case 'kyc':
        message = `WhatsApp sent: "Hi ${leadName.split(' ')[0]}, here's the KYC form link: [Link]. Please complete it at your convenience."`;
        break;
      case 'market-update':
        message = `WhatsApp sent: "Hi ${leadName.split(' ')[0]}, sharing today's market update as discussed. [Market Update Link]"`;
        break;
    }
    alert(message);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Live Call Co-Pilot
      </h2>

      {/* Call Status Card */}
      <div className={`mb-6 p-6 rounded-lg ${
        isCallActive 
          ? 'bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-2 border-green-300 dark:border-green-700' 
          : 'bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Lead</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{leadName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
              <span className="mr-1">📱</span>
              {leadPhone}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Call Duration</p>
            <p className={`text-4xl font-bold ${
              isCallActive ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
            }`}>
              {formatTime(callDuration)}
            </p>
            {isPaused && (
              <span className="inline-block px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full mt-1">
                PAUSED
              </span>
            )}
          </div>
        </div>

        {/* Call Control Buttons */}
        <div className="flex gap-3">
          {!isCallActive ? (
            <button
              onClick={handleStartCall}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Start Call</span>
            </button>
          ) : (
            <>
              <button
                onClick={handlePauseResume}
                className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
              <button
                onClick={handleEndCall}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <StopCircle className="w-5 h-5" />
                <span>End Call</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Notes Section */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Call Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Type your notes here during the call...&#10;&#10;• Customer concerns&#10;• Key discussion points&#10;• Next steps&#10;• Follow-up actions"
          rows={8}
          disabled={!isCallActive}
          className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
            isCallActive
              ? 'bg-white dark:bg-gray-700 border-teal-300 dark:border-teal-600'
              : 'bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-600 cursor-not-allowed'
          }`}
        />
      </div>

      {/* AI Assistance Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={handleAISuggestion}
          disabled={!isCallActive}
          className={`py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
            isCallActive
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>🤖</span>
          <span>AI Suggestion</span>
        </button>
        <button
          onClick={handleSummarizeNotes}
          disabled={!isCallActive || !notes.trim()}
          className={`py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
            isCallActive && notes.trim()
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>✨</span>
          <span>Summarize Notes</span>
        </button>
      </div>

      {/* AI Suggestion Display */}
      {showSuggestion && (
        <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg">
          <div className="flex items-start justify-between">
            <p className="text-sm text-purple-900 dark:text-purple-200 flex-1">
              {aiSuggestion}
            </p>
            <button
              onClick={() => setShowSuggestion(false)}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp Quick Buttons */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          WhatsApp Quick Send
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleWhatsAppQuickSend('greeting')}
            disabled={!isCallActive}
            className={`py-3 px-4 rounded-lg font-medium transition-colors ${
              isCallActive
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Greeting
          </button>
          <button
            onClick={() => handleWhatsAppQuickSend('kyc')}
            disabled={!isCallActive}
            className={`py-3 px-4 rounded-lg font-medium transition-colors ${
              isCallActive
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            KYC Link
          </button>
          <button
            onClick={() => handleWhatsAppQuickSend('market-update')}
            disabled={!isCallActive}
            className={`py-3 px-4 rounded-lg font-medium transition-colors ${
              isCallActive
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            📈 Market Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveCallCoPilot;
