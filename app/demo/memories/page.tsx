'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Memory {
  id: string;
  name: string;
  memory: string;
  year: string;
  createdAt: Date;
}

export default function MemoriesStack() {
  const router = useRouter();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    memory: '',
    year: '',
  });

  useEffect(() => {
    const q = query(collection(db, 'hypercard-memories'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const memoriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Memory[];
      setMemories(memoriesData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.memory) return;

    try {
      await addDoc(collection(db, 'hypercard-memories'), {
        ...formData,
        createdAt: new Date(),
      });
      setFormData({ name: '', memory: '', year: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding memory:', error);
    }
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

        {/* Main Window */}
        <div className="mac-window mb-4">
          <div className="mac-title-bar">
            <div className="mac-close-box"></div>
            <span className="text-xs">HyperCard Memories</span>
          </div>
          <div className="p-6">
            <h2 className="text-xl mb-4">Share Your HyperCard Story</h2>
            <p className="text-sm mb-6">
              Remember HyperCard? Share your memories and experiences.
              <br />
              HyperCardの思い出を共有しましょう。
            </p>

            <button
              onClick={() => setShowForm(!showForm)}
              className="mac-button mb-4"
            >
              {showForm ? 'Hide Form' : 'Add Your Memory'}
            </button>

            {showForm && (
              <div className="mb-6 p-4 border border-black">
                <div className="mb-3">
                  <label className="text-xs block mb-1">Your Name / お名前:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mac-field w-full"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-xs block mb-1">Year / 年:</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="mac-field w-32"
                    placeholder="e.g., 1987"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-xs block mb-1">Your Memory / 思い出:</label>
                  <textarea
                    value={formData.memory}
                    onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
                    className="mac-field w-full"
                    rows={4}
                  />
                </div>
                <button onClick={handleSubmit} className="mac-button">
                  Submit
                </button>
              </div>
            )}

            {/* Memories List */}
            <div className="space-y-4">
              {memories.length === 0 ? (
                <p className="text-sm text-gray-600">
                  No memories yet. Be the first to share!
                </p>
              ) : (
                memories.map((memory) => (
                  <div key={memory.id} className="p-4 border border-black">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold">{memory.name}</span>
                      {memory.year && (
                        <span className="text-xs text-gray-600">{memory.year}</span>
                      )}
                    </div>
                    <p className="text-xs whitespace-pre-wrap">{memory.memory}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sample Memories */}
        <div className="mac-window">
          <div className="mac-title-bar">
            <div className="mac-close-box"></div>
            <span className="text-xs">Featured Memory</span>
          </div>
          <div className="p-4 text-xs">
            <p className="italic">
              "I discovered HyperCard in 1988. It changed my life. 
              For the first time, I could create software without being a programmer. 
              Thank you, Bill Atkinson, for believing in the creative power of everyone."
            </p>
            <p className="text-right mt-2">- A HyperCard Fan</p>
          </div>
        </div>
      </div>
    </div>
  );
}