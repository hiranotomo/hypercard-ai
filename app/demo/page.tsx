'use client';

import { useState } from 'react';
import { Card, CardElement } from '@/types/hypercard';

export default function DemoPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});

  const demoCards: Card[] = [
    {
      id: '1',
      stackId: 'demo',
      name: 'Welcome Card',
      background: { type: 'color', value: '#f0f9ff' },
      elements: [
        {
          id: 'title',
          type: 'text',
          x: 50,
          y: 50,
          width: 300,
          height: 40,
          content: 'Welcome to HyperCard Web',
          style: { fontSize: 24, fontFamily: 'Arial', color: '#1e40af' },
          handlers: [],
        },
        {
          id: 'desc',
          type: 'text',
          x: 50,
          y: 100,
          width: 400,
          height: 60,
          content: 'This is a demo of the HyperCard Web system. Click the buttons to navigate between cards.',
          style: { fontSize: 16, color: '#374151' },
          handlers: [],
        },
        {
          id: 'next-btn',
          type: 'button',
          x: 50,
          y: 180,
          width: 120,
          height: 40,
          content: 'Next Card →',
          style: {
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            borderRadius: 8,
            fontSize: 16,
          },
          handlers: [{ event: 'click', script: 'nextCard' }],
        },
      ],
      scripts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      stackId: 'demo',
      name: 'Interactive Card',
      background: { type: 'color', value: '#fef3c7' },
      elements: [
        {
          id: 'title2',
          type: 'text',
          x: 50,
          y: 50,
          width: 300,
          height: 40,
          content: 'Interactive Elements',
          style: { fontSize: 24, fontFamily: 'Arial', color: '#92400e' },
          handlers: [],
        },
        {
          id: 'field-label',
          type: 'text',
          x: 50,
          y: 100,
          width: 100,
          height: 30,
          content: 'Your Name:',
          style: { fontSize: 16, color: '#374151' },
          handlers: [],
        },
        {
          id: 'name-field',
          type: 'field',
          x: 160,
          y: 100,
          width: 200,
          height: 30,
          content: 'Enter your name',
          style: { fontSize: 16, borderWidth: 1, borderColor: '#d1d5db' },
          handlers: [],
        },
        {
          id: 'greeting',
          type: 'text',
          x: 50,
          y: 150,
          width: 400,
          height: 30,
          content: fieldValues['name-field'] ? `Hello, ${fieldValues['name-field']}!` : '',
          style: { fontSize: 18, color: '#059669' },
          handlers: [],
        },
        {
          id: 'prev-btn',
          type: 'button',
          x: 50,
          y: 200,
          width: 120,
          height: 40,
          content: '← Previous',
          style: {
            backgroundColor: '#6b7280',
            color: '#ffffff',
            borderRadius: 8,
            fontSize: 16,
          },
          handlers: [{ event: 'click', script: 'prevCard' }],
        },
        {
          id: 'home-btn',
          type: 'button',
          x: 180,
          y: 200,
          width: 120,
          height: 40,
          content: 'First Card',
          style: {
            backgroundColor: '#10b981',
            color: '#ffffff',
            borderRadius: 8,
            fontSize: 16,
          },
          handlers: [{ event: 'click', script: 'firstCard' }],
        },
      ],
      scripts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const handleElementClick = (element: CardElement) => {
    if (element.type === 'button' && element.handlers.length > 0) {
      const handler = element.handlers.find((h) => h.event === 'click');
      if (handler) {
        switch (handler.script) {
          case 'nextCard':
            setCurrentCardIndex((prev) => Math.min(prev + 1, demoCards.length - 1));
            break;
          case 'prevCard':
            setCurrentCardIndex((prev) => Math.max(prev - 1, 0));
            break;
          case 'firstCard':
            setCurrentCardIndex(0);
            break;
        }
      }
    }
  };

  const handleFieldChange = (elementId: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [elementId]: value }));
  };

  const currentCard = demoCards[currentCardIndex];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">HyperCard Web Demo</h1>
          <a href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </a>
        </div>

        <div
          className="relative bg-white rounded-lg shadow-xl overflow-hidden"
          style={{
            width: '600px',
            height: '400px',
            backgroundColor: currentCard.background.value,
          }}
        >
          {currentCard.elements.map((element) => {
            const updatedElement = { ...element };
            if (element.id === 'greeting' && fieldValues['name-field']) {
              updatedElement.content = `Hello, ${fieldValues['name-field']}!`;
            }

            return (
              <div
                key={element.id}
                className="absolute"
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  ...element.style,
                }}
              >
                {element.type === 'text' && (
                  <div style={{ fontSize: element.style.fontSize }}>
                    {updatedElement.content}
                  </div>
                )}
                {element.type === 'button' && (
                  <button
                    className="w-full h-full flex items-center justify-center hover:opacity-90 transition"
                    style={element.style}
                    onClick={() => handleElementClick(element)}
                  >
                    {element.content}
                  </button>
                )}
                {element.type === 'field' && (
                  <input
                    type="text"
                    placeholder={element.content}
                    className="w-full h-full px-2 border rounded"
                    style={element.style}
                    onChange={(e) => handleFieldChange(element.id, e.target.value)}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center text-gray-600">
          Card {currentCardIndex + 1} of {demoCards.length}
        </div>
      </div>
    </div>
  );
}