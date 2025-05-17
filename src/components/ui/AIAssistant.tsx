
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Maximize, Minimize } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{role: 'user' | 'assistant', content: string}[]>([
    {role: 'assistant', content: 'Hello! I\'m your AI shopping assistant. How can I help you today?'}
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setConversation([...conversation, {role: 'user', content: message}]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you find products that match your preferences. What are you looking for today?",
        "Based on your browsing history, you might be interested in our new tech gadgets collection.",
        "Have you considered checking out our limited-time offers? There are some great deals available now.",
        "Would you like me to recommend products based on your previous purchases?",
        "I can provide more details about any product you're interested in. Just let me know which one!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setConversation(prev => [...prev, {role: 'assistant', content: randomResponse}]);
    }, 1000);
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <>
      {/* Chat button */}
      <button 
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 z-40 p-4 bg-accent hover:bg-accent/90 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        aria-label="Open AI assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        } ${isMinimized ? 'h-14 w-64' : 'h-[500px] w-80 sm:w-96'}`}
      >
        <div className="glass h-full w-full flex flex-col overflow-hidden">
          {/* Header */}
          <div 
            className="bg-accent/90 text-white px-4 py-3 flex justify-between items-center rounded-t-2xl cursor-pointer"
            onClick={isMinimized ? toggleOpen : toggleMinimize}
          >
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <div className="flex space-x-2">
              {isMinimized ? (
                <Maximize className="h-4 w-4" onClick={toggleMinimize} />
              ) : (
                <Minimize className="h-4 w-4" onClick={toggleMinimize} />
              )}
              <X className="h-4 w-4" onClick={(e) => {e.stopPropagation(); setIsOpen(false);}} />
            </div>
          </div>

          {/* Chat content */}
          {!isMinimized && (
            <>
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {conversation.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div 
                      className={`max-w-[80%] px-4 py-2 rounded-xl ${
                        msg.role === 'user' 
                          ? 'bg-accent text-white rounded-tr-none' 
                          : 'bg-white/60 backdrop-blur-sm rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-grow px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button 
                    type="submit" 
                    className="p-2 bg-accent hover:bg-accent/90 text-white rounded-full"
                    disabled={!message.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
