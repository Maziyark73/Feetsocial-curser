import React from 'react';

const Test: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 gradient-text">FeetSocial</h1>
        <p className="text-gray-400 mb-8">App is working! 🎉</p>
        <div className="space-y-4">
          <div className="bg-dark-800 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">✅ React is working</h2>
            <p className="text-gray-300 text-sm mb-4">
              The app has loaded successfully without errors.
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">✅ Tailwind CSS is working</h2>
            <p className="text-gray-300 text-sm mb-4">
              Styling is applied correctly.
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">✅ TypeScript is working</h2>
            <p className="text-gray-300 text-sm mb-4">
              Type checking is enabled and working.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
