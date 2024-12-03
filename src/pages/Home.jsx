import React from 'react';
import useStore from '../store/useStore';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const user = useStore((state) => state.user);

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-gray-900 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">Welcome to CodeNest</h1>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Welcome section */}
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-gray-900 rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'User'}!
              </h2>
              <p className="text-gray-300 mb-4">
                CodeNest is your space to connect with fellow developers, share knowledge, and grow together.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">Join Communities</h3>
                  <p className="text-gray-300 text-sm">
                    Connect with developers who share your interests
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">Share Knowledge</h3>
                  <p className="text-gray-300 text-sm">
                    Post questions, answers, and code snippets
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">Stay Updated</h3>
                  <p className="text-gray-300 text-sm">
                    Follow topics and get notified about new discussions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 px-4 sm:px-0">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
              <div className="divide-y divide-gray-800">
                {/* Activity items */}
                <div className="p-4 hover:bg-gray-800 transition-colors">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white font-medium">JS</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-white">
                        New discussion in JavaScript Community
                      </p>
                      <p className="text-sm text-gray-400">
                        "Best practices for React hooks" - 5 minutes ago
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-800 transition-colors">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                        <span className="text-white font-medium">PY</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-white">
                        New post in Python Community
                      </p>
                      <p className="text-sm text-gray-400">
                        "Understanding async/await in Python" - 1 hour ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
