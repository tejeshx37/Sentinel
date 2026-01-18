import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Paperclip, Volume2, FileText, Image as ImageIcon, X, Sparkles, History, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  type: string;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

interface AIChatProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function AIChat({ messages, setMessages }: AIChatProps) {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock previous chat sessions
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Spending analysis for December',
      lastMessage: 'Your dining expenses were 18% over budget...',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      messageCount: 12,
    },
    {
      id: '2',
      title: 'Savings plan discussion',
      lastMessage: 'I recommend setting aside 20% of variable spending...',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      messageCount: 8,
    },
    {
      id: '3',
      title: 'Budget optimization tips',
      lastMessage: 'Let me suggest some ways to reduce your fixed costs...',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      messageCount: 15,
    },
    {
      id: '4',
      title: 'Mission streak questions',
      lastMessage: 'Keep up the momentum with your 12-day streak!',
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      messageCount: 6,
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() && attachedFiles.length === 0) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    
    // Show file acknowledgment if files attached
    if (attachedFiles.length > 0) {
      const fileNames = attachedFiles.map(f => f.name).join(', ');
      setTimeout(() => {
        const fileAck: Message = {
          id: (Date.now() + 0.5).toString(),
          type: 'ai',
          content: `I've received your file(s): ${fileNames}. Let me analyze that for you...`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, fileAck]);
      }, 500);
      setAttachedFiles([]);
    }

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('spend') || lowerInput.includes('budget')) {
      return 'Based on your current spending patterns, I notice you have $82/day safe to spend. Your biggest expense category is Fixed Costs at $940. Would you like me to suggest ways to optimize your spending?';
    } else if (lowerInput.includes('save') || lowerInput.includes('saving')) {
      return 'Great question about savings! With your current Sentinel Score of 47 days until shortfall, I recommend setting aside 20% of your variable spending. That could add 9-12 days to your financial runway. Want to create a savings plan?';
    } else if (lowerInput.includes('mission') || lowerInput.includes('streak')) {
      return 'You\'re doing great with your missions! You have a 12-day streak going. Completing daily missions helps build strong financial habits. Keep up the momentum!';
    } else {
      return 'I can help you with budgeting, spending analysis, savings strategies, and understanding your financial health. What specific aspect of your finances would you like to explore?';
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Simulate speech recognition
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputValue('How much did I spend on dining this month?');
      }, 2000);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: AttachedFile[] = Array.from(files).map(file => ({
        id: `${Date.now()}-${file.name}`,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
      }));
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handlePlayAudio = (messageId: string) => {
    if (playingAudio === messageId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(messageId);
      // Simulate audio playback
      setTimeout(() => {
        setPlayingAudio(null);
      }, 3000);
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const loadChatSession = (sessionId: string) => {
    // In a real app, this would load the actual messages from the session
    // For now, we just close the history panel
    setShowChatHistory(false);
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-3">
          {/* AI Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a8ff9e] to-[#34d399] flex items-center justify-center shadow-[0_0_16px_rgba(168,255,158,0.3)]">
            <Sparkles className="w-5 h-5 text-[#0a0a0b]" />
          </div>
          
          {/* Title */}
          <div className="flex-1">
            <h1 className="text-[18px] font-semibold text-white">AI Assistant</h1>
            <p className="text-[12px] text-gray-400">Financial guidance & insights</p>
          </div>

          {/* Chat History Toggle */}
          <button
            onClick={() => setShowChatHistory(!showChatHistory)}
            className={`
              w-9 h-9 rounded-full flex items-center justify-center transition-all relative
              ${showChatHistory 
                ? 'bg-[#a8ff9e] text-[#0a0a0b]' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }
            `}
            title="Chat history"
          >
            <History className="w-4 h-4" />
            {chatSessions.length > 0 && !showChatHistory && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#a8ff9e] rounded-full flex items-center justify-center">
                <span className="text-[9px] font-bold text-[#0a0a0b]">{chatSessions.length}</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Chat History Panel */}
      {showChatHistory && (
        <div className="absolute top-[76px] left-0 right-0 bottom-0 bg-gradient-to-b from-[#0a0a0b] to-[#121214] z-20 overflow-hidden">
          <div className="h-full overflow-y-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold text-white">Previous Conversations</h2>
              <button
                onClick={() => setShowChatHistory(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              {chatSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => loadChatSession(session.id)}
                  className="w-full bg-[#1a1c20] rounded-xl p-4 border border-white/5 hover:border-[#a8ff9e]/30 transition-all group text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#a8ff9e]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#a8ff9e]/20 transition-colors">
                      <MessageSquare className="w-5 h-5 text-[#a8ff9e]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-medium text-white mb-1 truncate group-hover:text-[#a8ff9e] transition-colors">
                        {session.title}
                      </h3>
                      <p className="text-[12px] text-gray-400 line-clamp-2 mb-2">
                        {session.lastMessage}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-gray-500">
                        <span>{formatRelativeTime(session.timestamp)}</span>
                        <span>•</span>
                        <span>{session.messageCount} messages</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {chatSessions.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-[14px] text-gray-500">No previous conversations</p>
                <p className="text-[12px] text-gray-600 mt-1">Start chatting to create your first conversation</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-[85%]">
              {/* Message Bubble */}
              <div
                className={`
                  rounded-2xl px-4 py-3 shadow-lg
                  ${
                    message.type === 'ai'
                      ? 'bg-[#1a1c20] text-gray-100 border border-white/5'
                      : 'bg-[#a8ff9e] text-[#0a0a0b]'
                  }
                  ${message.type === 'ai' ? 'rounded-tl-md' : 'rounded-tr-md'}
                `}
              >
                <p className="text-[14px] leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>

              {/* AI Message Controls */}
              {message.type === 'ai' && (
                <div className="flex items-center gap-2 mt-2 ml-2">
                  <button
                    onClick={() => handlePlayAudio(message.id)}
                    className="flex items-center gap-1.5 text-[#a8ff9e] hover:text-white transition-colors group"
                  >
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center
                      ${playingAudio === message.id ? 'bg-[#a8ff9e]/20' : 'bg-white/5'}
                    `}>
                      <Volume2 className="w-3 h-3" />
                    </div>
                    <span className="text-[11px]">
                      {playingAudio === message.id ? 'Playing...' : 'Listen'}
                    </span>
                  </button>
                  <span className="text-[10px] text-gray-500">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}

              {/* User Message Timestamp */}
              {message.type === 'user' && (
                <div className="flex justify-end mt-1 mr-2">
                  <span className="text-[10px] text-gray-500">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#1a1c20] border border-white/5 rounded-2xl rounded-tl-md px-5 py-4 shadow-lg">
              <div className="flex gap-1.5">
                <div 
                  className="w-2 h-2 bg-[#a8ff9e] rounded-full animate-pulse" 
                  style={{ animationDelay: '0ms', animationDuration: '1s' }} 
                />
                <div 
                  className="w-2 h-2 bg-[#a8ff9e] rounded-full animate-pulse" 
                  style={{ animationDelay: '200ms', animationDuration: '1s' }} 
                />
                <div 
                  className="w-2 h-2 bg-[#a8ff9e] rounded-full animate-pulse" 
                  style={{ animationDelay: '400ms', animationDuration: '1s' }} 
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* File Attachments Preview */}
      {attachedFiles.length > 0 && (
        <div className="px-6 pb-3 space-y-2">
          <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">
            Attached Files ({attachedFiles.length})
          </p>
          {attachedFiles.map((file) => (
            <div
              key={file.id}
              className="bg-[#1a1c20] rounded-xl p-3 flex items-center gap-3 border border-white/5"
            >
              <div className="w-9 h-9 rounded-lg bg-[#a8ff9e]/10 flex items-center justify-center text-[#a8ff9e]">
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-white truncate font-medium">{file.name}</p>
                <p className="text-[11px] text-gray-500">{file.size}</p>
              </div>
              <button
                onClick={() => removeFile(file.id)}
                className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 transition-colors group"
              >
                <X className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <div className="flex-shrink-0 px-6 pb-6 pt-3">
        {/* Voice Listening Indicator */}
        {isListening && (
          <div className="mb-3 flex items-center justify-center gap-2">
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-[#a8ff9e] rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-6 bg-[#a8ff9e] rounded-full animate-pulse" style={{ animationDelay: '100ms' }} />
              <div className="w-1 h-5 bg-[#a8ff9e] rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
              <div className="w-1 h-7 bg-[#a8ff9e] rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              <div className="w-1 h-4 bg-[#a8ff9e] rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
            </div>
            <p className="text-[12px] text-[#a8ff9e]">Listening...</p>
          </div>
        )}

        <div
          className={`
            bg-[#1a1c20] rounded-[24px] px-4 py-3 flex items-center gap-3
            border transition-all
            ${inputValue || attachedFiles.length > 0
              ? 'border-[#a8ff9e]/50 shadow-[0_0_20px_rgba(168,255,158,0.15)]' 
              : 'border-white/5'
            }
          `}
        >
          {/* File Upload */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-[#a8ff9e] transition-all flex-shrink-0 group"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4 text-gray-400 group-hover:text-[#a8ff9e]" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept=".txt,.pdf,.doc,.docx,image/*"
            multiple
          />

          {/* Text Input */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent text-[14px] text-white placeholder-gray-500 outline-none"
          />

          {/* Voice Input */}
          <button
            onClick={handleVoiceInput}
            className={`
              w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 relative
              ${
                isListening
                  ? 'bg-[#a8ff9e] text-[#0a0a0b] shadow-[0_0_20px_rgba(168,255,158,0.5)]'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-[#a8ff9e]'
              }
            `}
            title="Voice input"
          >
            <Mic className="w-4 h-4" />
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-[#a8ff9e] animate-ping opacity-50" />
                <div className="absolute inset-0 rounded-full border border-[#a8ff9e] animate-pulse" />
              </>
            )}
          </button>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() && attachedFiles.length === 0}
            className={`
              w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0
              ${
                inputValue.trim() || attachedFiles.length > 0
                  ? 'bg-[#a8ff9e] text-[#0a0a0b] hover:bg-[#34d399] shadow-[0_0_16px_rgba(168,255,158,0.3)]'
                  : 'bg-white/5 text-gray-600 opacity-50 cursor-not-allowed'
              }
            `}
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}