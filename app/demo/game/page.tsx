'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GameStack() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('entrance');
  const [inventory, setInventory] = useState<string[]>([]);
  const [gameLog, setGameLog] = useState<string[]>([]);

  const locations: Record<string, any> = {
    entrance: {
      description: 'You stand at the entrance of an old Macintosh factory.',
      actions: {
        'Enter': () => {
          setCurrentLocation('lobby');
          addLog('You push open the heavy doors and enter the lobby.');
        },
        'Look around': () => {
          addLog('The building looks abandoned, but you sense history here.');
        },
      },
    },
    lobby: {
      description: 'A dusty lobby with portraits of computing pioneers on the walls.',
      actions: {
        'Examine portraits': () => {
          addLog('You see Bill Atkinson, Steve Jobs, and other legends of computing.');
          if (!inventory.includes('inspiration')) {
            setInventory([...inventory, 'inspiration']);
            addLog('You feel inspired by their vision!');
          }
        },
        'Go to lab': () => {
          setCurrentLocation('lab');
          addLog('You walk down a corridor to the old development lab.');
        },
        'Exit': () => {
          setCurrentLocation('entrance');
          addLog('You return to the entrance.');
        },
      },
    },
    lab: {
      description: 'The legendary lab where HyperCard was born.',
      actions: {
        'Search desk': () => {
          if (!inventory.includes('floppy')) {
            setInventory([...inventory, 'floppy']);
            addLog('You find an old floppy disk labeled "HyperCard 1.0"!');
          } else {
            addLog('The desk has been thoroughly searched.');
          }
        },
        'Use computer': () => {
          if (inventory.includes('floppy')) {
            addLog('You insert the floppy disk...');
            addLog('The screen flickers to life!');
            addLog('CONGRATULATIONS! You\'ve discovered the source of HyperCard!');
            addLog('Bill Atkinson\'s spirit smiles upon you.');
          } else {
            addLog('The old Mac Plus needs a system disk to boot.');
          }
        },
        'Return to lobby': () => {
          setCurrentLocation('lobby');
          addLog('You return to the lobby.');
        },
      },
    },
  };

  const addLog = (message: string) => {
    setGameLog((prev) => [...prev, message]);
  };

  const startGame = () => {
    if (!playerName.trim()) {
      addLog('Please enter your name to begin.');
      return;
    }
    setGameStarted(true);
    addLog(`Welcome, ${playerName}!`);
    addLog('Your quest: Find the original HyperCard source code.');
    addLog(locations[currentLocation].description);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-4">
          <button
            onClick={() => router.push('/')}
            className="mac-button text-xs"
          >
            ← Home
          </button>
        </div>

        {/* Game Window */}
        <div className="mac-window">
          <div className="mac-title-bar">
            <div className="mac-close-box"></div>
            <span className="text-xs">Adventure: Quest for HyperCard</span>
          </div>
          <div className="p-6">
            {!gameStarted ? (
              <div className="text-center">
                <h2 className="text-xl mb-4">Quest for HyperCard</h2>
                <p className="text-sm mb-4">
                  An adventure game in the style of classic HyperCard games
                </p>
                <div className="mb-4">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name"
                    className="mac-field"
                  />
                </div>
                <button onClick={startGame} className="mac-button">
                  Start Adventure
                </button>
              </div>
            ) : (
              <div>
                {/* Game Display */}
                <div className="mb-4 p-4 border border-black" style={{ minHeight: '200px' }}>
                  <div className="text-sm mb-4">
                    <strong>Location:</strong> {currentLocation.toUpperCase()}
                  </div>
                  <div className="text-xs mb-4">
                    {locations[currentLocation].description}
                  </div>
                  <div className="text-xs">
                    <strong>Inventory:</strong>{' '}
                    {inventory.length > 0 ? inventory.join(', ') : 'empty'}
                  </div>
                </div>

                {/* Actions */}
                <div className="mb-4">
                  <div className="text-xs mb-2">Available actions:</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(locations[currentLocation].actions).map(([action, handler]) => (
                      <button
                        key={action}
                        onClick={handler as () => void}
                        className="mac-button text-xs"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Game Log */}
                <div className="mac-field p-2 text-xs" style={{ height: '100px', overflowY: 'auto' }}>
                  {gameLog.map((log, i) => (
                    <div key={i}>{'>'} {log}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}