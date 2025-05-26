import React from 'react';
import ChatInterface from '../components/chat/ChatInterface';

const ChatPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Chat with IoT Expert
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ask anything about IoT projects, troubleshooting, or components. I'm here to help you build amazing IoT solutions.
          </p>
        </div>
        
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChatPage;