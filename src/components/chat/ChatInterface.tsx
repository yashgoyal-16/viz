import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowDown, DownloadCloud, ChevronsRight } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_MESSAGES: ChatMessageType[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your IoT assistant. How can I help you build or troubleshoot your IoT project today?',
    timestamp: new Date()
  }
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Suggestions for quick prompts
  const suggestions = [
    "Help me build a smart home system",
    "How do I connect ESP8266 to WiFi?",
    "What sensors do I need for a weather station?",
    "Explain MQTT protocol for beginners"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkScrollPosition = () => {
      const container = chatContainerRef.current;
      if (!container) return;
      
      const isScrolledUp = container.scrollHeight - container.scrollTop - container.clientHeight > 200;
      setShowScrollButton(isScrolledUp);
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessageType = {
      id: uuidv4(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      // Add AI response
      const aiResponse: ChatMessageType = {
        id: uuidv4(),
        role: 'assistant',
        content: generateResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  // Simple response generator (in a real app, this would call an actual API)
  const generateResponse = (input: string): string => {
    if (input.toLowerCase().includes('esp8266')) {
      return `To connect an ESP8266 to WiFi, you'll need to use the following code:

\`\`\`cpp
#include <ESP8266WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Your code here
}
\`\`\`

Make sure to replace "YOUR_WIFI_SSID" and "YOUR_WIFI_PASSWORD" with your actual WiFi credentials. Would you like me to explain any part of this code in more detail?`;
    } else if (input.toLowerCase().includes('weather') || input.toLowerCase().includes('sensors')) {
      return `For a basic DIY weather station, you'll need the following sensors:

1. **Temperature and Humidity**: DHT22 or BME280
2. **Barometric Pressure**: BMP280 or BME280
3. **Rain Gauge**: Tipping bucket rain sensor
4. **Wind Speed**: Anemometer
5. **Wind Direction**: Wind vane

The BME280 is particularly useful as it combines temperature, humidity, and pressure sensing in one package. Would you like me to provide a connection diagram for any of these sensors?`;
    } else if (input.toLowerCase().includes('mqtt')) {
      return `MQTT (Message Queuing Telemetry Transport) is a lightweight messaging protocol designed for IoT devices. Here's a beginner-friendly explanation:

**Core Concepts:**
- **Broker**: Central server that receives all messages and sends them to appropriate clients
- **Client**: Any device that connects to the broker (IoT devices, apps, servers)
- **Topic**: Channel where messages are published (like "home/livingroom/temperature")
- **Publish**: Sending a message to a topic
- **Subscribe**: Receiving messages from a topic

**Why MQTT is great for IoT:**
- Minimal bandwidth usage
- Works well on unreliable networks
- Support for various quality of service levels
- Small code footprint for limited devices

Would you like to see a simple code example of MQTT implementation?`;
    } else if (input.toLowerCase().includes('smart home')) {
      return `Building a smart home system involves several components:

**Core Components:**
1. **Central Hub**: (e.g., Raspberry Pi, Home Assistant)
2. **Smart Devices**: Lights, plugs, sensors, etc.
3. **Communication Protocol**: Zigbee, Z-Wave, WiFi, or Bluetooth
4. **User Interface**: Mobile app, voice control, web dashboard

**Recommended Approach for Beginners:**
1. Start with Home Assistant on a Raspberry Pi
2. Add a few WiFi-enabled smart plugs and lights
3. Install door/window sensors and motion detectors
4. Create automation rules based on time, presence, or triggers

Would you like me to outline a specific project plan with components and connection diagrams?`;
    } else {
      return `Thank you for your question about "${input}". This is an interesting IoT topic.

To help you more effectively, I'd need a bit more information about your specific project goals, the hardware you're working with, and your experience level with IoT development.

Could you provide more details about:
1. What hardware components you're using or planning to use
2. Your specific goal or the problem you're trying to solve
3. Your experience level with programming and electronics

This will help me provide you with tailored guidance for your IoT project.`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-center h-10">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {showScrollButton && (
        <button 
          onClick={scrollToBottom}
          className="absolute bottom-24 right-8 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      )}
      
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        {/* Suggestions */}
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs md:text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-1 px-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center"
            >
              <ChevronsRight className="w-3 h-3 mr-1" />
              {suggestion}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="relative flex-1">
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about IoT projects..."
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none min-h-[60px] max-h-32"
              rows={1}
              style={{ 
                height: Math.min(Math.max(60, (inputValue.split('\n').length * 24) + 36), 128),
                overflowY: inputValue.split('\n').length > 5 ? 'scroll' : 'hidden'
              }}
            />
            <button
              type="submit"
              className="absolute right-2 bottom-2 p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              disabled={inputValue.trim() === ''}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;