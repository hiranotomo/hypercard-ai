'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AIAssistant from '@/components/AIAssistant';

interface HistoryCard {
  id: string;
  year: string;
  title: string;
  content: string;
  image?: string;
}

export default function HistoryStack() {
  const router = useRouter();
  const [currentCard, setCurrentCard] = useState(0);
  const [showAI, setShowAI] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');

  const historyCards: HistoryCard[] = [
    {
      id: 'intro',
      year: '1987-2024',
      title: 'The HyperCard Story',
      content: `Welcome to the HyperCard History Stack!
      
Journey through the revolutionary history of HyperCard, 
the software that democratized programming and inspired 
a generation of creators.

Click the arrows to navigate through time, or ask our 
AI assistant about any aspect of HyperCard's legacy.`,
      image: '📚'
    },
    {
      id: 'birth',
      year: '1987',
      title: 'The Birth of HyperCard',
      content: `Bill Atkinson creates HyperCard at Apple Computer.
      
Released with every Macintosh, HyperCard was revolutionary 
- a "software erector set" that let anyone create interactive 
applications without traditional programming.

"I wanted to make something that would empower people to 
use computers in ways they hadn't imagined." - Bill Atkinson`,
      image: '🎂'
    },
    {
      id: 'features',
      year: '1987-1990',
      title: 'Revolutionary Features',
      content: `HyperCard introduced concepts that were decades ahead:

• Stack-based navigation (predating the web)
• Visual programming with buttons and fields  
• HyperTalk scripting language
• Multimedia integration
• Database capabilities

It was the first tool that truly made programming 
accessible to artists, educators, and hobbyists.`,
      image: '⚡'
    },
    {
      id: 'impact',
      year: '1990s',
      title: 'Cultural Impact',
      content: `HyperCard's influence was profound:

• Inspired the creation of the World Wide Web
• Launched careers of countless developers
• Created entirely new genres of software
• Used to create Myst, one of the best-selling games
• Revolutionized education and interactive media

"HyperCard was the first time I felt I could think 
and create directly with a computer." - Many users`,
      image: '🌍'
    },
    {
      id: 'legacy',
      year: '2004-Present',
      title: 'The Legacy Lives On',
      content: `Though discontinued in 2004, HyperCard's spirit endures:

• Influenced modern no-code/low-code platforms
• Inspired tools like LiveCode, Decker, and others
• Its concepts live on in web technologies
• Remembered as one of the most innovative software ever

Today, with AI, we can imagine what HyperCard might 
have become - that's why HyperCard AI exists!`,
      image: '✨'
    },
    {
      id: 'atkinson',
      year: '1951-2024',
      title: 'Remembering Bill Atkinson',
      content: `Bill Atkinson (1951-2024)

Visionary programmer and photographer who gave us:
• HyperCard
• MacPaint  
• QuickDraw
• Major contributions to the original Macintosh

"Bill believed in empowering people through technology. 
He saw the computer as a bicycle for the mind, and 
HyperCard was his greatest gift to humanity."

Rest in peace, Bill. Your vision lives on.`,
      image: '🙏'
    }
  ];

  const askAboutTopic = (topic: string) => {
    setSelectedTopic(topic);
    setShowAI(true);
  };

  const currentHistoryCard = historyCards[currentCard];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="mac-button text-xs"
          >
            ← Home
          </button>
          <span className="text-xs">
            {currentHistoryCard.year} - Card {currentCard + 1} of {historyCards.length}
          </span>
        </div>

        <div className="flex gap-4">
          {/* Main Card */}
          <div className="flex-1">
            <div className="mac-window">
              <div className="mac-title-bar">
                <div className="mac-close-box"></div>
                <span className="text-xs">HyperCard History</span>
              </div>
              <div className="p-8" style={{ minHeight: '400px' }}>
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{currentHistoryCard.image}</div>
                  <h2 className="text-2xl font-bold mb-2">
                    {currentHistoryCard.title}
                  </h2>
                  <p className="text-sm text-gray-600">{currentHistoryCard.year}</p>
                </div>
                
                <div className="text-sm whitespace-pre-line mb-8">
                  {currentHistoryCard.content}
                </div>

                {/* Topic Buttons */}
                <div className="border-t pt-4">
                  <p className="text-xs mb-2">Ask AI about:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentCard === 1 && (
                      <>
                        <button
                          onClick={() => askAboutTopic('Tell me more about Bill Atkinson')}
                          className="mac-button text-xs"
                        >
                          Bill Atkinson
                        </button>
                        <button
                          onClick={() => askAboutTopic('How was HyperCard created?')}
                          className="mac-button text-xs"
                        >
                          Creation Story
                        </button>
                      </>
                    )}
                    {currentCard === 2 && (
                      <>
                        <button
                          onClick={() => askAboutTopic('Explain HyperTalk language')}
                          className="mac-button text-xs"
                        >
                          HyperTalk
                        </button>
                        <button
                          onClick={() => askAboutTopic('What made HyperCard revolutionary?')}
                          className="mac-button text-xs"
                        >
                          Innovation
                        </button>
                      </>
                    )}
                    {currentCard === 3 && (
                      <>
                        <button
                          onClick={() => askAboutTopic('How did HyperCard influence the Web?')}
                          className="mac-button text-xs"
                        >
                          Web Influence
                        </button>
                        <button
                          onClick={() => askAboutTopic('Tell me about Myst and HyperCard')}
                          className="mac-button text-xs"
                        >
                          Myst Game
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setShowAI(!showAI)}
                      className="mac-button text-xs"
                    >
                      {showAI ? 'Hide AI' : 'Ask Custom Question'}
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentCard(0)}
                    disabled={currentCard === 0}
                    className="mac-button text-xs"
                  >
                    |◀ First
                  </button>
                  <button
                    onClick={() => setCurrentCard(Math.max(0, currentCard - 1))}
                    disabled={currentCard === 0}
                    className="mac-button text-xs"
                  >
                    ◀ Prev
                  </button>
                  <button
                    onClick={() => setCurrentCard(Math.min(historyCards.length - 1, currentCard + 1))}
                    disabled={currentCard === historyCards.length - 1}
                    className="mac-button text-xs"
                  >
                    Next ▶
                  </button>
                  <button
                    onClick={() => setCurrentCard(historyCards.length - 1)}
                    disabled={currentCard === historyCards.length - 1}
                    className="mac-button text-xs"
                  >
                    Last ▶|
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Assistant Panel */}
          {showAI && (
            <div className="w-96">
              <AIAssistant />
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="mac-window mt-4">
          <div className="mac-title-bar">
            <div className="mac-close-box"></div>
            <span className="text-xs">Timeline</span>
          </div>
          <div className="p-4 flex justify-between items-center">
            {historyCards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => setCurrentCard(index)}
                className={`text-xs px-3 py-1 rounded ${
                  index === currentCard
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-200'
                }`}
              >
                {card.year.split('-')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}