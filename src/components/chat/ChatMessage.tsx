import React, { useState } from 'react';
import { Bot, User, Copy, Check } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex items-start gap-3 ${isAssistant ? 'bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg' : ''}`}>
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center">
        {isAssistant ? (
          <div className="bg-blue-100 dark:bg-blue-900/30 w-full h-full rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 w-full h-full rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-center">
          <div className="font-medium text-sm">
            {isAssistant ? 'IoTalker AI' : 'You'}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </div>
        </div>
        
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              pre: ({ children }) => {
                return (
                  <div className="relative group">
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
                      {children}
                    </pre>
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-2 right-2 p-1 rounded-md bg-gray-200 dark:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Copy code"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                );
              },
              code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{children}</code>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;