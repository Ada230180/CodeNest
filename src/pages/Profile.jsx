import React from 'react';
import useStore from '../store/useStore';

const Profile = () => {
  const user = useStore((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-dark-400 shadow rounded-lg">
          {/* Profile header */}
          <div className="p-6 border-b border-gray-200 dark:border-dark-400">
            <div className="flex items-center space-x-4">
              <img
                src={user?.photoURL || '/default-avatar.png'}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-text-primary">
                  {user?.displayName || 'User'}
                </h1>
                <p className="text-gray-600 dark:text-text-secondary">
                  {user?.email || 'email@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Profile content */}
          <div className="p-6">
            <div className="space-y-8">
              {/* Bio section */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-text-primary mb-4">
                  About
                </h2>
                <textarea
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-dark-400 bg-white dark:bg-dark-400 text-gray-900 dark:text-text-primary"
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Skills section */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-text-primary mb-4">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'React', 'Node.js'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 dark:bg-dark-300 text-gray-800 dark:text-text-primary rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  <button className="px-3 py-1 bg-primary text-white rounded-full text-sm">
                    + Add skill
                  </button>
                </div>
              </div>

              {/* Settings section */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-text-primary mb-4">
                  Settings
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-text-secondary">Email notifications</span>
                    <button className="px-3 py-1 bg-gray-100 dark:bg-dark-300 text-gray-800 dark:text-text-primary rounded-lg">
                      Enabled
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-text-secondary">Profile visibility</span>
                    <button className="px-3 py-1 bg-gray-100 dark:bg-dark-300 text-gray-800 dark:text-text-primary rounded-lg">
                      Public
                    </button>
                  </div>
                </div>
              </div>

              {/* Save button */}
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
