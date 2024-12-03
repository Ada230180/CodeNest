import React from 'react';
import Sidebar from '../components/Sidebar';

const Communities = () => {
  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <header className="bg-gray-900 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">Communities</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-lg shadow-xl p-6">
            <p className="text-gray-300">Communities feature coming soon!</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Communities;
