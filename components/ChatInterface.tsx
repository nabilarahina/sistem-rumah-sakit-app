import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Link as LinkIcon } from 'lucide-react';
import { AgentType, ChatMessage } from '../types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (msg: string) => void;
  isLoading: boolean;
  currentAgent: AgentType;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading, currentAgent }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-slate-200 shadow-inner">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 bg-white z-10 flex justify-between items-center">
        <h3 className="font-semibold text-slate-700">
          Chat Session 
        </h3>
        <span className="text-xs font-medium text-teal-700 px-3 py-1 bg-teal-50 rounded-full border border-teal-100">
            {currentAgent} Active
        </span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[90%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-700'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className="flex flex-col gap-1 min-w-0">
                <div className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-teal-600 text-white rounded-tr-none' 
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                }`}>
                  {msg.content}
                </div>
                
                {/* Sources Section */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs">
                    <div className="font-semibold text-slate-500 mb-1 flex items-center gap-1">
                      <LinkIcon size={10} /> Sources
                    </div>
                    <div className="space-y-1">
                      {msg.sources.map((source, idx) => (
                        <a 
                          key={idx} 
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block text-teal-600 hover:underline truncate"
                        >
                          {source.title || source.uri}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`text-[10px] px-1 ${msg.role === 'user' ? 'text-right text-slate-400' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex w-full justify-start">
                <div className="flex max-w-[80%] gap-3">
                     <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mt-1">
                        <Bot size={16} />
                     </div>
                     <div className="p-4 bg-slate-50 rounded-2xl rounded-tl-none border border-slate-100">
                        <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                     </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${currentAgent}...`}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;