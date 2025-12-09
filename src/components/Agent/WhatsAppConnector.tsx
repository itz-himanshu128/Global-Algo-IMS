import React, { useState } from 'react';

interface WhatsAppConnectorProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
}

const WhatsAppConnector: React.FC<WhatsAppConnectorProps> = ({
  onConnect,
  onDisconnect,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedNumber, setConnectedNumber] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleConnect = () => {
    setShowQR(true);
  };

  const handleScanComplete = () => {
    // Simulate successful scan
    setIsConnected(true);
    setConnectedNumber('+91 98765 43210');
    setShowQR(false);
    if (onConnect) {
      onConnect();
    }
  };

  const handleDisconnect = () => {
    if (window.confirm('Are you sure you want to disconnect WhatsApp?')) {
      setIsConnected(false);
      setConnectedNumber('');
      if (onDisconnect) {
        onDisconnect();
      }
    }
  };

  const handleCancelQR = () => {
    setShowQR(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        WhatsApp Connector
      </h2>

      {!isConnected ? (
        // Disconnected State
        <div className="text-center py-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-3xl opacity-50">●</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            WhatsApp Not Connected
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Connect your WhatsApp to send automated messages to your leads directly from the portal.
          </p>

          {!showQR ? (
            <button
              onClick={handleConnect}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors inline-flex items-center space-x-2"
            >
              <span>📱</span>
              <span>Connect WhatsApp</span>
            </button>
          ) : (
            // QR Code Display
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-lg p-6 max-w-md mx-auto">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Scan QR Code with WhatsApp
              </h4>
              
              {/* Simulated QR Code */}
              <div className="bg-white p-4 rounded-lg mb-4 inline-block">
                <div className="w-48 h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-2">▓▓▓</div>
                    <div className="text-xs">QR CODE</div>
                    <div className="text-xs">SIMULATION</div>
                  </div>
                </div>
              </div>

              <div className="text-left text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <p className="flex items-start">
                  <span className="mr-2">1️⃣</span>
                  Open WhatsApp on your phone
                </p>
                <p className="flex items-start">
                  <span className="mr-2">2️⃣</span>
                  Tap Menu (⋮) or Settings → Linked Devices
                </p>
                <p className="flex items-start">
                  <span className="mr-2">3️⃣</span>
                  Tap "Link a Device"
                </p>
                <p className="flex items-start">
                  <span className="mr-2">4️⃣</span>
                  Point your phone at this screen to scan
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleScanComplete}
                  className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Complete Scan
                </button>
                <button
                  onClick={handleCancelQR}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                🔒 Your connection is encrypted and secure
              </p>
            </div>
          )}
        </div>
      ) : (
        // Connected State
        <div>
          {/* Status Banner */}
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                    WhatsApp Connected
                    <span className="ml-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Status: <span className="text-green-600 dark:text-green-400 font-semibold">Online</span>
                  </p>
                </div>
              </div>
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm"
              >
                Disconnect
              </button>
            </div>
          </div>

          {/* Connected Number Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Connected Number
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <span className="mr-2">📱</span>
                  {connectedNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Connection Quality
                </p>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-4 bg-green-500 rounded"></div>
                  <div className="w-2 h-5 bg-green-500 rounded"></div>
                  <div className="w-2 h-6 bg-green-500 rounded"></div>
                  <div className="w-2 h-7 bg-green-500 rounded"></div>
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400 font-semibold">
                    Excellent
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">24</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Messages Sent Today
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">18</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Delivered
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Read
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <span className="mr-2">💡</span>
              Quick Tips
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Keep your phone connected to internet for uninterrupted service</li>
              <li>• Messages are sent instantly when you trigger them from the portal</li>
              <li>• Check your phone's battery and data connection regularly</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppConnector;
