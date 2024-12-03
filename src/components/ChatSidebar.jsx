import React, { useState, useEffect } from 'react';
import { supabase } from '../services/firebase';
import useStore from '../store/useStore';

const ChatSidebar = ({ onSelectChat }) => {
  const { user } = useStore();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  const handleItemClick = (chat) => {
    console.log('Chat item clicked:', chat);
    if (onSelectChat) {
      onSelectChat(chat);
    }
  };

  const fetchChats = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('user_chats')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

      if (error) throw error;

      setChats(data);
    } catch (err) {
      console.error('Error fetching chats:', err);
      setError('Failed to load chats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
      {loading ? (
        <div className="p-4 text-gray-400">Loading chats...</div>
      ) : error ? (
        <div className="p-4 text-red-500">{error}</div>
      ) : (
        chats.map((chat) => (
          <div 
            key={chat.id} 
            onClick={() => handleItemClick(chat)}
            className="p-4 hover:bg-gray-800 cursor-pointer border-b border-gray-800 flex items-center"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-4">
              <span className="text-white font-medium">
                {chat.otherUser?.email?.charAt(0).toUpperCase() || chat.receiver_email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium">
                {chat.otherUser?.email || chat.receiver_email}
              </h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatSidebar;