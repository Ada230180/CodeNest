import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';

const Community = () => {
  const { id } = useParams();

  // Dummy data for channels
  const channels = [
    { id: '1', name: 'general', description: 'General discussion' },
    { id: '2', name: 'help', description: 'Get help with coding' },
    { id: '3', name: 'projects', description: 'Share your projects' },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-dark-400">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-text-primary">
          Community Name
        </h1>
        <p className="text-gray-600 dark:text-text-secondary">
          Community description goes here
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
              Channels
            </h2>
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-dark-400 rounded-lg">
              <PlusIcon className="w-5 h-5 text-gray-600 dark:text-text-secondary" />
            </button>
          </div>

          {channels.map((channel) => (
            <Link
              key={channel.id}
              to={`/community/${id}/channel/${channel.id}`}
              className="block p-3 hover:bg-gray-100 dark:hover:bg-dark-400 rounded-lg transition-colors"
            >
              <div className="flex items-start">
                <span className="text-gray-900 dark:text-text-primary font-medium">
                  # {channel.name}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-text-secondary mt-1">
                {channel.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
