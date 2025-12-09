import React, { useState } from 'react';

interface CallReview {
  id: number;
  agentName: string;
  customerName: string;
  callLength: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  date: string;
  audioUrl: string;
  agentNotes: string;
  aiSummary: string;
  feedback?: string;
}

interface CallReviewsProps {
  reviews?: CallReview[];
  onSubmitFeedback?: (reviewId: number, feedback: string) => void;
}

const CallReviews: React.FC<CallReviewsProps> = ({
  reviews: initialReviews = [
    {
      id: 1,
      agentName: 'John Smith',
      customerName: 'Michael Johnson',
      callLength: '12:34',
      sentiment: 'Positive',
      date: '2025-12-08 14:30',
      audioUrl: '#',
      agentNotes:
        'Customer was interested in the premium package. Discussed pricing and features. Scheduled follow-up for next Tuesday.',
      aiSummary:
        'Agent successfully engaged customer with product information. Customer showed strong interest in premium features. Professional tone maintained throughout. Recommendation: Excellent call handling.',
    },
    {
      id: 2,
      agentName: 'Sarah Johnson',
      customerName: 'Robert Williams',
      callLength: '8:45',
      sentiment: 'Neutral',
      date: '2025-12-08 13:15',
      audioUrl: '#',
      agentNotes:
        'Customer had some concerns about contract terms. Explained the terms clearly. Customer needs time to think.',
      aiSummary:
        'Agent addressed customer concerns professionally. Some hesitation detected in customer responses. Agent could have used more reassurance techniques. Recommendation: Good call, minor improvements needed.',
    },
    {
      id: 3,
      agentName: 'Mike Davis',
      customerName: 'Jennifer Davis',
      callLength: '6:22',
      sentiment: 'Negative',
      date: '2025-12-08 11:45',
      audioUrl: '#',
      agentNotes: 'Customer was not interested. Mentioned they already have a provider.',
      aiSummary:
        'Customer showed no interest early in call. Agent attempted to continue but customer remained firm. Call ended professionally. Recommendation: Consider different approach for similar situations.',
    },
    {
      id: 4,
      agentName: 'Emily Chen',
      customerName: 'James Miller',
      callLength: '15:12',
      sentiment: 'Positive',
      date: '2025-12-08 10:20',
      audioUrl: '#',
      agentNotes:
        'Great conversation! Customer asked many questions about features. Very engaged. Closed the deal!',
      aiSummary:
        'Outstanding performance by agent. Customer highly engaged throughout. All objections handled expertly. Sale successfully closed. Recommendation: Exemplary call - use as training material.',
    },
  ],
  onSubmitFeedback,
}) => {
  const [reviews] = useState<CallReview[]>(initialReviews);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState<{ [key: number]: string }>({});
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleFeedbackChange = (id: number, text: string) => {
    setFeedbackText((prev) => ({ ...prev, [id]: text }));
  };

  const handleSubmitFeedback = (reviewId: number) => {
    const feedback = feedbackText[reviewId];
    if (feedback && feedback.trim()) {
      if (onSubmitFeedback) {
        onSubmitFeedback(reviewId, feedback);
      }
      alert('Feedback submitted successfully!');
      setFeedbackText((prev) => ({ ...prev, [reviewId]: '' }));
    }
  };

  const toggleAudio = (id: number) => {
    setIsPlaying(isPlaying === id ? null : id);
  };

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return '😊';
      case 'Negative':
        return '😞';
      case 'Neutral':
        return '😐';
      default:
        return '😐';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Negative':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Neutral':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="text-2xl mr-2">🎧</span>
        Call Reviews
      </h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all"
          >
            {/* Card Header */}
            <div
              className="p-4 bg-gray-50 dark:bg-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              onClick={() => handleExpand(review.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {review.agentName}
                    </h3>
                    <span className="text-gray-400 dark:text-gray-500">→</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {review.customerName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center">
                      <span className="mr-1">⏱️</span>
                      {review.callLength}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">📅</span>
                      {review.date}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center ${getSentimentColor(
                      review.sentiment
                    )}`}
                  >
                    <span className="mr-1">{getSentimentEmoji(review.sentiment)}</span>
                    {review.sentiment}
                  </span>
                  <span className="text-xl text-gray-400 dark:text-gray-500">
                    {expandedId === review.id ? '▼' : '▶'}
                  </span>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === review.id && (
              <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 space-y-6">
                {/* Audio Player */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="mr-2">🔊</span>
                    Call Recording
                  </h4>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleAudio(review.id)}
                      className={`px-6 py-2 rounded-md font-medium transition-colors ${
                        isPlaying === review.id
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-teal-600 hover:bg-teal-700 text-white'
                      }`}
                    >
                      {isPlaying === review.id ? '⏸️ Pause' : '▶️ Play'}
                    </button>
                    <div className="flex-1 bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-teal-600 h-2 rounded-full transition-all"
                        style={{ width: isPlaying === review.id ? '60%' : '0%' }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {isPlaying === review.id ? '5:23' : '0:00'} / {review.callLength}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Note: This is a simulated audio player. In production, integrate with actual
                    audio controls.
                  </p>
                </div>

                {/* Agent Notes */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="mr-2">📝</span>
                    Agent Notes
                  </h4>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300">{review.agentNotes}</p>
                  </div>
                </div>

                {/* AI Summary */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="mr-2">🤖</span>
                    AI-Generated Summary
                  </h4>
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300">{review.aiSummary}</p>
                  </div>
                </div>

                {/* Feedback Form */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="mr-2">💬</span>
                    Your Feedback for {review.agentName}
                  </h4>
                  <textarea
                    value={feedbackText[review.id] || ''}
                    onChange={(e) => handleFeedbackChange(review.id, e.target.value)}
                    placeholder="Write your feedback for the agent here... Include specific observations, what they did well, and areas for improvement."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Provide constructive feedback to help your team improve
                    </p>
                    <button
                      onClick={() => handleSubmitFeedback(review.id)}
                      disabled={!feedbackText[review.id]?.trim()}
                      className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                        !feedbackText[review.id]?.trim()
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          : 'bg-teal-600 hover:bg-teal-700 text-white'
                      }`}
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallReviews;
