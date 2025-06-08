'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardElement } from '@/types/hypercard';

interface CardEditorProps {
  card: Card;
  onUpdate: (card: Card) => void;
}

export default function CardEditor({ card, onUpdate }: CardEditorProps) {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isAddingElement, setIsAddingElement] = useState(false);
  const [elementType, setElementType] = useState<CardElement['type']>('text');
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!isAddingElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement: CardElement = {
      id: `element-${Date.now()}`,
      type: elementType,
      x,
      y,
      width: elementType === 'button' ? 100 : 200,
      height: elementType === 'text' ? 30 : 40,
      content: elementType === 'text' ? 'New Text' : 'Button',
      style: {
        fontSize: 16,
        color: '#000000',
        backgroundColor: elementType === 'button' ? '#e5e7eb' : 'transparent',
        borderRadius: elementType === 'button' ? 4 : 0,
      },
      handlers: [],
    };

    onUpdate({
      ...card,
      elements: [...card.elements, newElement],
    });

    setIsAddingElement(false);
  };

  const handleElementUpdate = (elementId: string, updates: Partial<CardElement>) => {
    onUpdate({
      ...card,
      elements: card.elements.map((el) =>
        el.id === elementId ? { ...el, ...updates } : el
      ),
    });
  };

  const handleElementDelete = (elementId: string) => {
    onUpdate({
      ...card,
      elements: card.elements.filter((el) => el.id !== elementId),
    });
    setSelectedElement(null);
  };

  return (
    <div className="flex h-full">
      <div className="w-64 bg-gray-100 p-4 border-r">
        <h3 className="font-semibold mb-4">Tools</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              setIsAddingElement(true);
              setElementType('text');
            }}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-200"
          >
            Add Text
          </button>
          <button
            onClick={() => {
              setIsAddingElement(true);
              setElementType('button');
            }}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-200"
          >
            Add Button
          </button>
          <button
            onClick={() => {
              setIsAddingElement(true);
              setElementType('field');
            }}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-200"
          >
            Add Field
          </button>
        </div>

        {selectedElement && (
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Properties</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleElementDelete(selectedElement)}
                className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete Element
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-8 bg-gray-50">
        <div
          ref={canvasRef}
          className="relative w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundColor: card.background.type === 'color' ? card.background.value : 'white',
            cursor: isAddingElement ? 'crosshair' : 'default',
          }}
          onClick={handleCanvasClick}
        >
          {card.elements.map((element) => (
            <div
              key={element.id}
              className={`absolute ${
                selectedElement === element.id ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{
                left: element.x,
                top: element.y,
                width: element.width,
                height: element.height,
                ...element.style,
                cursor: 'move',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedElement(element.id);
              }}
            >
              {element.type === 'text' && (
                <div className="p-1">{element.content}</div>
              )}
              {element.type === 'button' && (
                <button className="w-full h-full px-3 py-1 border">
                  {element.content}
                </button>
              )}
              {element.type === 'field' && (
                <input
                  type="text"
                  placeholder={element.content}
                  className="w-full h-full px-2 border"
                  readOnly
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}