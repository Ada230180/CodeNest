import React from 'react';
import { useParams } from 'react-router-dom';

const Channel = () => {
  const { id: communityId, channelId } = useParams();

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Messages will go here */}
        <div className="space-y-4">
          <p className="text-center text-text-secondary">
            Welcome to the channel! Messages will appear here.
          </p>
        </div>
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t border-gray-200 dark:border-dark-400">
        <div className="flex space-x-4">
          <textarea
            className="flex-1 min-h-[100px] p-3 rounded-lg border border-gray-300 dark:border-dark-400 bg-white dark:bg-dark-400 text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Type your message..."
          />
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>

  );
};

export default Channel;
