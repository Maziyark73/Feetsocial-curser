import React from 'react';

const SimpleFeed: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 gradient-text">FeetSocial</h1>
        <p className="text-gray-400 mb-8">Welcome to FeetSocial!</p>
        <div className="space-y-4">
          <div className="bg-dark-800 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
            <p className="text-gray-300 text-sm mb-4">
              Your social media platform is ready! The app is loading...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleFeed;
