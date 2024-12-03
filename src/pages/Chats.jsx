import React, { useState, useEffect } from 'react';
import { supabase } from '../services/firebase';
import useStore from '../store/useStore';
import ChatSidebar from '../components/ChatSidebar';

const Chats = () => {
  const { user } = useStore();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [codeContent, setCodeContent] = useState('// Write your code here');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id);
      const messageSubscription = supabase
        .from(`messages:chat_id=eq.${selectedChat.id}`)
        .on('INSERT', payload => {
          setMessages(prevMessages => [...prevMessages, payload.new]);
        })
        .subscribe();

      return () => {
        supabase.removeSubscription(messageSubscription);
      };
    }
  }, [selectedChat]);

  const handleSelectChat = (chat) => {
    console.log('Selected chat:', chat);
    setSelectedChat(chat);
  };

  const fetchMessages = async (chatId) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId);

      if (error) throw error;

      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    setIsSendingMessage(true);

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          chat_id: selectedChat.id,
          sender_id: user.id,
          content: newMessage,
          type: 'text',
          created_at: new Date()
        });

      if (error) throw error;

      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    } finally {
      setIsSendingMessage(false);
    }
  };

  const sendCode = async () => {
    if (!codeContent.trim()) return;
    setIsSendingMessage(true);

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          chat_id: selectedChat.id,
          sender_id: user.id,
          content: codeContent,
          type: 'code',
          created_at: new Date()
        });

      if (error) throw error;

      setCodeContent('// Write your code here');
    } catch (err) {
      console.error('Error sending code:', err);
      setError('Failed to send code');
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar onSelectChat={handleSelectChat} />
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="text-gray-400">Loading messages...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'} mb-2`}
                  >
                    <div 
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.sender_id === user.id 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-700 text-white'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t border-gray-800">
              <textarea 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full bg-gray-700 text-white p-2 rounded"
                placeholder="Type a message..."
                rows="3"
              />
              <button 
                onClick={sendMessage}
                disabled={isSendingMessage}
                className="mt-2 bg-primary text-white px-4 py-2 rounded"
              >
                {isSendingMessage ? 'Sending...' : 'Send'}
              </button>
            </div>
            <div className="p-4 border-t border-gray-800">
              <textarea 
                value={codeContent}
                onChange={(e) => setCodeContent(e.target.value)}
                className="w-full bg-gray-700 text-white p-2 rounded font-mono"
                placeholder="Write your code here..."
                rows="10"
              />
              <button 
                onClick={sendCode}
                disabled={isSendingMessage}
                className="mt-2 bg-primary text-white px-4 py-2 rounded"
              >
                {isSendingMessage ? 'Sending...' : 'Send Code'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;