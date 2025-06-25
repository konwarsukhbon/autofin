// /app/components/BondhuChat.jsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';

export default function BondhuChat() {
  const { user, isLoaded } = useUser();
  const userId = user?.id;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-suggest finance queries
  const suggestions = [
    "Show my monthly budget",
    "How much did I spend on food?",
    "Suggest ways to save more",
    "Show my top 3 expense categories",
    "How's my savings rate?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (userId && !hasGreeted) {
      setHasGreeted(true);
      setMessages([{
        user: null,
        ai: `Hello ${user?.firstName || 'there'}! 👋 I'm Bondhu, your personal financial assistant. I'm here to help you track your expenses, achieve your financial goals, and make smart money decisions. How can I assist you today?`,
        timestamp: new Date()
      }]);
    }
  }, [userId, hasGreeted, user?.firstName]);

  const sendMessage = async (msg) => {
    const userMessage = msg || input.trim();
    if (!userMessage || !userId || loading) return;
    setLoading(true);
    const timestamp = new Date();
    setMessages((prev) => [...prev, { user: userMessage, ai: null, timestamp, loading: true }]);
    setInput('');
    try {
      const res = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: userMessage, userId, conversationHistory: messages.slice(-5) })
      });
      let data;
      try { data = await res.json(); } catch (error) { throw new Error('Invalid response from server'); }
      if (!res.ok) throw new Error(data?.error || 'Failed to get response');
      if (!data || !data.reply) throw new Error('Invalid response format');
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], ai: data.reply, insights: data.insights, loading: false };
        return updated;
      });
    } catch (error) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], ai: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.", loading: false, error: true };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isLoaded) return null;
  if (!userId) return null;

  return (
    <div className="w-full min-h-[600px] flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden font-[Inter,sans-serif]" style={{background: "linear-gradient(120deg, #6366F1 0%, #8b5cf6 100%)"}}>
      {/* Chat Area (Left) */}
      <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-xl p-0 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 py-4 px-6 border-b border-indigo-100">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M3 17V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" stroke="#fff" strokeWidth="1.5"/><path d="M8 10h8M8 14h5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div>
            <div className="font-bold text-lg tracking-tight text-gray-900">Bondhu AI</div>
            <div className="text-xs opacity-80 font-medium text-gray-500">Your Financial Assistant</div>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto max-h-[400px] md:max-h-[500px] p-4 md:p-6 space-y-6 transition-all duration-500">
          {messages.map((msg, i) => (
            <div key={i} className="space-y-2 animate-fade-in">
              {msg.user && (
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-2xl max-w-[80%] break-words shadow-md font-medium text-base">
                    {msg.user}
                  </div>
                </div>
              )}
              {(msg.ai || msg.loading) && (
                <div className="flex justify-start">
                  <div className="bg-white/90 border border-indigo-100 px-4 py-2 rounded-2xl max-w-[80%] break-words shadow-md text-gray-900 font-medium text-base relative">
                    {msg.loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-gray-500 text-xs">Bondhu is thinking...</span>
                      </div>
                    ) : (
                      <div>
                        <div className="text-gray-800 whitespace-pre-wrap transition-all duration-300">{msg.ai}</div>
                        {msg.insights && (
                          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                            <div className="flex justify-between">
                              <span>Budget: {msg.insights.budgetUsage || 'N/A'}</span>
                              <span>Savings: {msg.insights.savingsRate}%</span>
                              <span className={msg.insights.isOnTrack ? 'text-green-600' : 'text-orange-600'}>
                                {msg.insights.isOnTrack ? '✅ On track' : '⚠️ Over budget'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Auto-suggest buttons */}
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              className="bg-indigo-100 text-indigo-700 font-medium px-3 py-1 rounded-full shadow-sm hover:bg-indigo-200 transition-all text-sm"
              onClick={() => sendMessage(s)}
              disabled={loading}
            >
              {s}
            </button>
          ))}
        </div>
        {/* Input */}
        <div className="border-t bg-white/80 p-4 flex items-center gap-3">
          <textarea
            className="flex-1 text-base p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none shadow-sm font-medium transition-all"
            placeholder="Ask me anything—except for a loan 😄"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            disabled={loading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-600 hover:to-indigo-600 disabled:bg-gray-400 px-6 py-2 rounded-xl text-base font-semibold shadow-md transition-all flex items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Assistant Profile/Summary Panel (Right) */}
      <div className="hidden md:flex flex-col justify-between w-full max-w-xs bg-gradient-to-br from-indigo-100/80 via-purple-100/80 to-white/80 p-8 border-l border-indigo-100 shadow-inner">
        {/* Assistant Profile */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center shadow-lg mb-2">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff" opacity=".2"/><path d="M8 10a4 4 0 1 1 8 0v2a4 4 0 1 1-8 0v-2Z" stroke="#fff" strokeWidth="1.5"/><path d="M12 18v-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div className="text-xl font-bold text-gray-900">Bondhu</div>
          <div className="text-sm text-gray-600 font-medium">AI Finance Assistant</div>
        </div>
        {/* Financial Summary/Insights */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white/80 rounded-2xl shadow p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M3 17V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" stroke="#6366F1" strokeWidth="1.5"/><path d="M8 10h8M8 14h5" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Recent Insights
            </div>
            {messages.filter(m => m.insights).length === 0 ? (
              <div className="text-gray-500 text-xs">No insights yet. Ask about your budget or spending!</div>
            ) : (
              messages.filter(m => m.insights).slice(-3).map((m, idx) => (
                <div key={idx} className="text-xs text-gray-700 bg-indigo-50/60 rounded p-2 mb-1">
                  <div>Budget: {m.insights.budgetUsage || 'N/A'}</div>
                  <div>Savings: {m.insights.savingsRate}%</div>
                  <div className={m.insights.isOnTrack ? 'text-green-600' : 'text-orange-600'}>
                    {m.insights.isOnTrack ? '✅ On track' : '⚠️ Over budget'}
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Minimalist visual flourish */}
          <div className="flex justify-center mt-6">
            <svg width="60" height="24" fill="none" viewBox="0 0 60 24"><path d="M2 22 Q15 2 30 22 T58 22" stroke="#a5b4fc" strokeWidth="2" fill="none"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}