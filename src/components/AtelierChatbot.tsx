import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Sparkles,
  Maximize2,
  Minimize2,
  ArrowRight,
  ShieldCheck,
  Ruler,
  Package,
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const N8N_CHAT_WEBHOOK_URL =
  'https://balireddygayathri03.app.n8n.cloud/webhook/d523cb1c-152a-438c-802e-076207e74e53/chat';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'msg-welcome',
  sender: 'assistant',
  text: `Welcome to **ATELIER VÈRSE**.

I am your personal Atelier Concierge, directly connected to our small-batch tailoring archive and client care desk via n8n intelligence.

I am at your service to assist with:
* **Fabric Provenance & Density** (such as our 640 GSM Portuguese Melton or 7-gauge Mongolian Cashmere)
* **Silhouette & Sizing Guidance**
* **Ensemble Styling & Capsule Pairings**
* **Order Tracking & Global Courier Dispatch**
* **Private Boutique Consultations** in Paris, New York, or Tokyo

How may I assist your wardrobe curation today?`,
  timestamp: 'Just now',
  suggestions: [
    'Tell me about the 640 GSM Melton Overcoat',
    'What makes your Mongolian Cashmere unique?',
    'Help me find my size for the Kurabo Denim',
    'Track my order (#AV-8841)',
    'Are there any inaugural privilege codes?'
  ]
};

export const AtelierChatbot: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    pendingChatPrompt,
    setPendingChatPrompt,
    setIsSizeGuideOpen,
    setIsOrderTrackerOpen,
    setIsAppointmentModalOpen
  } = useShop();

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_verse_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return [INITIAL_WELCOME_MESSAGE];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Session ID for n8n multi-turn memory
  const [sessionId, setSessionId] = useState<string>(() => {
    try {
      const existing = localStorage.getItem('atelier_verse_session_id');
      if (existing) return existing;
      const newId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('atelier_verse_session_id', newId);
      return newId;
    } catch {
      return `session-${Date.now()}`;
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Save history on change
  useEffect(() => {
    try {
      localStorage.setItem('atelier_verse_chat_history', JSON.stringify(messages));
    } catch {
      // Ignore
    }
  }, [messages]);

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isChatOpen, messages, isLoading]);

  // Handle incoming pending prompts from other components
  useEffect(() => {
    if (pendingChatPrompt && isChatOpen) {
      const promptToSend = pendingChatPrompt;
      setPendingChatPrompt(null);
      handleSendMessage(promptToSend);
    }
  }, [pendingChatPrompt, isChatOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      // Direct call to n8n webhook with CORS and sessionId
      const response = await fetch(N8N_CHAT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatInput: text,
          message: text,
          sessionId: sessionId,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Atelier service responded with status ${response.status}`);
      }

      const data = await response.json();
      let replyText = '';

      if (typeof data === 'string') {
        replyText = data;
      } else if (data && typeof data === 'object') {
        replyText =
          data.output ||
          data.text ||
          data.message ||
          data.response ||
          (Array.isArray(data) && data[0]?.output) ||
          JSON.stringify(data);
      }

      if (!replyText || replyText.trim() === '') {
        replyText =
          "Thank you for contacting Atelier Vèrse. Our master tailors have received your message. How else may I assist your curation today?";
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (!isChatOpen) {
        setUnreadCount((c) => c + 1);
      }
    } catch (err: unknown) {
      console.error('n8n Chatbot Webhook Error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `*Our concierge network experienced a temporary delay connecting to the atelier hub.*

Please feel free to try again or reach our direct desk at **concierge@ateliverse.com**. You can also browse our sizing matrix or track shipments directly below.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    const newId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setSessionId(newId);
    try {
      localStorage.setItem('atelier_verse_session_id', newId);
    } catch {
      // ignore
    }
    setMessages([INITIAL_WELCOME_MESSAGE]);
  };

  // Helper to format basic markdown (bold, italic, bullet lists, headers)
  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-serif-display font-medium text-sm text-stone-900 mt-2 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="font-serif-display font-medium text-base text-stone-900 mt-2.5 mb-1.5">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (line.startsWith('***') || line.startsWith('---')) {
        return <hr key={idx} className="my-2 border-stone-200" />;
      }

      // Bullet lists
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const itemContent = line.trim().replace(/^[*|-]\s+/, '');
        return (
          <li key={idx} className="ml-4 list-disc text-stone-700 leading-relaxed my-0.5">
            {formatInlineMarkdown(itemContent)}
          </li>
        );
      }

      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p key={idx} className="text-stone-700 leading-relaxed my-0.5">
          {formatInlineMarkdown(line)}
        </p>
      );
    });
  };

  const formatInlineMarkdown = (text: string) => {
    // Basic bold **text** parsing
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-stone-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={index} className="italic text-stone-800">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 bg-white/95 backdrop-blur-md border border-stone-200 shadow-xl text-xs uppercase tracking-wider font-medium text-stone-800 hover:text-black hover:border-stone-400 transition-all rounded-full group cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-serif-display font-medium text-stone-900 tracking-normal normal-case text-sm">
              Atelier Stylist
            </span>
            <span className="text-[11px] text-stone-400 uppercase tracking-widest group-hover:text-stone-600">
              · Online
            </span>
          </button>
        )}

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label={isChatOpen ? 'Close Atelier Concierge' : 'Open Atelier Concierge Chat'}
          className="relative w-14 h-14 rounded-full bg-[#141416] hover:bg-stone-800 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border border-stone-700 cursor-pointer"
        >
          {isChatOpen ? (
            <X className="w-6 h-6 transition-transform" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 stroke-[1.75]" />
              {/* Online pulsing ring */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#141416]" />
              </span>

              {unreadCount > 0 && (
                <span className="absolute -bottom-1 -left-1 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Luxury Chat Window */}
      {isChatOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-[#FBFBFA] shadow-2xl border border-stone-300 ${
            isExpanded
              ? 'inset-4 sm:inset-8 md:inset-12 max-w-4xl mx-auto rounded-none'
              : 'bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[82vh] rounded-xs'
          }`}
          role="dialog"
          aria-label="Atelier Vèrse Concierge Chat"
        >
          {/* Header */}
          <div className="p-4 bg-[#141416] text-[#FBFBFA] flex items-center justify-between border-b border-stone-800 select-none">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-300/90 font-serif-display font-medium text-base">
                AV
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-white">
                    Atelier Concierge
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 rounded-xs uppercase tracking-widest font-mono">
                    Live n8n
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>Curator & Stylist Desk</span>
                </div>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1 text-stone-400">
              <button
                onClick={handleResetChat}
                className="p-1.5 hover:text-white transition-colors"
                title="Start new consultation"
                aria-label="Start new consultation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:block p-1.5 hover:text-white transition-colors"
                title={isExpanded ? 'Restore window size' : 'Expand window'}
                aria-label={isExpanded ? 'Restore window' : 'Expand window'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 hover:text-white transition-colors ml-1"
                aria-label="Close concierge"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Service Short-cuts Bar */}
          <div className="px-4 py-2 bg-stone-100/90 border-b border-stone-200/80 flex items-center justify-between text-[11px] text-stone-600 overflow-x-auto no-scrollbar gap-2">
            <button
              onClick={() => {
                setIsSizeGuideOpen(true);
              }}
              className="flex items-center gap-1 hover:text-stone-950 transition-colors shrink-0"
            >
              <Ruler className="w-3 h-3 text-stone-500" />
              <span>Size Matrix</span>
            </button>
            <span className="text-stone-300">·</span>
            <button
              onClick={() => {
                setIsOrderTrackerOpen(true);
              }}
              className="flex items-center gap-1 hover:text-stone-950 transition-colors shrink-0"
            >
              <Package className="w-3 h-3 text-stone-500" />
              <span>Track Order</span>
            </button>
            <span className="text-stone-300">·</span>
            <button
              onClick={() => {
                setIsAppointmentModalOpen(true);
              }}
              className="flex items-center gap-1 hover:text-stone-950 transition-colors shrink-0"
            >
              <Calendar className="w-3 h-3 text-stone-500" />
              <span>Boutique Fitting</span>
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs font-sans-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 transition-all ${
                    msg.sender === 'user'
                      ? 'bg-[#141416] text-[#FBFBFA] rounded-xs shadow-sm'
                      : 'bg-white text-stone-800 border border-stone-200 shadow-xs'
                  }`}
                >
                  {/* Sender label for assistant */}
                  {msg.sender === 'assistant' && (
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-stone-400 font-semibold mb-1 pb-1 border-b border-stone-100">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Atelier Specialist</span>
                    </div>
                  )}

                  <div className="text-xs">{renderFormattedText(msg.text)}</div>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap gap-1.5">
                      {msg.suggestions.map((suggestion, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSendMessage(suggestion)}
                          className="px-2.5 py-1 bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 text-[11px] text-left transition-colors flex items-center gap-1 group"
                        >
                          <span>{suggestion}</span>
                          <ArrowRight className="w-2.5 h-2.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-stone-400 mt-1 px-1 tabular-nums">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="p-3.5 bg-white border border-stone-200 rounded-xs shadow-xs text-stone-600 flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                    Atelier Stylist is consulting archive
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-stone-900 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-stone-900 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-stone-900 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-stone-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about tailoring, fabrics, sizing, or orders..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 text-xs bg-[#FBFBFA] border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors placeholder:text-stone-400"
              />

              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className={`p-2.5 text-white transition-colors flex items-center justify-center ${
                  isLoading || !inputMessage.trim()
                    ? 'bg-stone-300 cursor-not-allowed'
                    : 'bg-[#141416] hover:bg-stone-800'
                }`}
                aria-label="Send inquiry"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-stone-400 mt-2 px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Connected to Atelier n8n Agent</span>
              </span>
              <span>Encrypted Session</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
