import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600">
      <div className="flex flex-col items-center">
        
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-transparent border-white"></div>
          <div className="absolute inset-2 animate-spin-slow rounded-full border-4 border-t-transparent border-purple-200"></div>
        </div>
        
        <p className="mt-4 text-white text-lg font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
