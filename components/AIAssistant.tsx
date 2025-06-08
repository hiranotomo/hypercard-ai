'use client';

import { useState, useEffect } from 'react';
import { askAI } from '@/lib/openai';

interface AIAssistantProps {
  onResponse?: (response: string) => void;
  initialQuestion?: string;
}

export default function AIAssistant({ onResponse, initialQuestion }: AIAssistantProps) {
  const [input, setInput] = useState(initialQuestion || '');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Array<{q: string, a: string}>>([]);

  useEffect(() => {
    if (initialQuestion && initialQuestion !== input) {
      setInput(initialQuestion);
      handleAsk(initialQuestion);
    }
  }, [initialQuestion]);

  const handleAsk = async (question?: string) => {
    const q = question || input;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const aiResponse = await askAI(q);
      setResponse(aiResponse);
      setHistory([...history, { q, a: aiResponse }]);
      if (onResponse) {
        onResponse(aiResponse);
      }
      if (!question) {
        setInput('');
      }
    } catch (error) {
      setResponse('Error connecting to AI assistant.');
    }
    setLoading(false);
  };

  return (
    <div className="mac-window h-full flex flex-col">
      <div className="mac-title-bar">
        <div className="mac-close-box"></div>
        <span className="text-xs">AI Assistant - HyperCard Expert</span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-xs mb-4 text-gray-600">
          Ask me anything about HyperCard, Bill Atkinson, or programming history!
        </div>
        
        {/* History */}
        {history.length > 0 && (
          <div className="flex-1 overflow-y-auto mb-4 space-y-3">
            {history.map((item, i) => (
              <div key={i} className="text-xs">
                <div className="font-bold mb-1">Q: {item.q}</div>
                <div className="mac-field p-2 whitespace-pre-wrap">{item.a}</div>
              </div>
            ))}
          </div>
        )}
        
        {/* Current Response */}
        {response && history.length === 0 && (
          <div className="mac-field p-2 text-xs whitespace-pre-wrap mb-4">
            {response}
          </div>
        )}
        
        {/* Input */}
        <div className="mt-auto">
          <div className="mb-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Ask about HyperCard..."
              className="mac-field w-full"
              disabled={loading}
            />
          </div>
          <button
            onClick={() => handleAsk()}
            disabled={loading}
            className="mac-button w-full"
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
      </div>
    </div>
  );
}