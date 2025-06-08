'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AIAssistant from '@/components/AIAssistant';

export default function WelcomeStack() {
  const router = useRouter();
  const [currentCard, setCurrentCard] = useState(0);
  const [userName, setUserName] = useState('');
  const [showAI, setShowAI] = useState(false);

  const cards = [
    {
      id: 'welcome',
      title: 'Welcome to HyperCard AI',
      content: (
        <div className="text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🖥️</div>
            <p className="text-sm mb-4">
              Welcome to HyperCard AI
              <br />
              A tribute to Bill Atkinson
            </p>
          </div>
          <button
            onClick={() => setCurrentCard(1)}
            className="mac-button"
          >
            Next →
          </button>
        </div>
      ),
    },
    {
      id: 'intro',
      title: 'What is HyperCard AI?',
      content: (
        <div>
          <p className="text-sm mb-4">
            HyperCard AI reimagines the classic HyperCard experience
            with modern AI capabilities.
          </p>
          <p className="text-xs mb-4">
            もし1987年にAIがあったら、HyperCardはどうなっていたでしょう？
          </p>
          <div className="mb-4">
            <label className="text-xs block mb-2">Your name / お名前:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mac-field w-full"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentCard(0)}
              className="mac-button"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentCard(2)}
              className="mac-button"
            >
              Next →
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'ai-demo',
      title: 'AI Assistant',
      content: (
        <div>
          <p className="text-sm mb-4">
            {userName ? `Hello, ${userName}!` : 'Hello!'} 
            {' '}Try our AI assistant - ask about HyperCard history!
          </p>
          <button
            onClick={() => setShowAI(!showAI)}
            className="mac-button mb-4"
          >
            {showAI ? 'Hide AI' : 'Show AI Assistant'}
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentCard(1)}
              className="mac-button"
            >
              ← Back
            </button>
            <button
              onClick={() => router.push('/demo/game')}
              className="mac-button"
            >
              Try Game →
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="mac-button text-xs"
          >
            ← Home
          </button>
          <span className="text-xs">Card {currentCard + 1} of {cards.length}</span>
        </div>

        {/* Main Card */}
        <div className="mac-window mb-4">
          <div className="mac-title-bar">
            <div className="mac-close-box"></div>
            <span className="text-xs">{cards[currentCard].title}</span>
          </div>
          <div className="p-8" style={{ minHeight: '300px' }}>
            {cards[currentCard].content}
          </div>
        </div>

        {/* AI Assistant */}
        {showAI && currentCard === 2 && (
          <AIAssistant />
        )}

        {/* Classic Menu Bar */}
        <div className="mac-window">
          <div className="p-2 flex gap-4 text-xs">
            <span>File</span>
            <span>Edit</span>
            <span>Go</span>
            <span>Tools</span>
            <span>Objects</span>
          </div>
        </div>
      </div>
    </div>
  );
}