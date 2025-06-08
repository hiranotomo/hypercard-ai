'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConnectStackStatic() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    skills: '',
    contact: '',
    message: '',
  });

  // Static demo data
  const staticConnections = [
    {
      id: '1',
      name: 'Demo User',
      role: 'engineer',
      skills: 'React, TypeScript, AI',
      contact: 'demo@example.com',
      message: 'Excited to work on HyperCard AI!',
    },
  ];

  const handleSubmit = () => {
    alert('Thank you for your interest! In the live version, this would be saved to the database.');
    setFormData({ name: '', role: '', skills: '', contact: '', message: '' });
    setShowForm(false);
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
            <span className="text-xs">Connect Board - Find Collaborators</span>
          </div>
          <div className="p-6">
            <h2 className="text-xl mb-4">Join the HyperCard AI Project</h2>
            <div className="text-sm mb-6">
              <p className="mb-2">
                Looking for passionate developers and designers to build the future!
              </p>
              <p className="text-xs text-gray-600">
                生成AI時代のHyperCardを一緒に作りませんか？
                <br />
                テレポートプロジェクトで次世代のツールを開発中です。
              </p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="mac-button mb-4"
            >
              {showForm ? 'Hide Form' : 'Post Your Interest'}
            </button>

            {showForm && (
              <div className="mb-6 p-4 border border-black">
                <div className="mb-3">
                  <label className="text-xs block mb-1">Name / 名前:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mac-field w-full"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-xs block mb-1">Role / 役割:</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="mac-field w-full"
                  >
                    <option value="">Select...</option>
                    <option value="engineer">Full-stack Engineer</option>
                    <option value="designer">Designer</option>
                    <option value="ai-engineer">AI Engineer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="text-xs block mb-1">Skills / スキル:</label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="mac-field w-full"
                    placeholder="e.g., React, AI, Design"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-xs block mb-1">Contact / 連絡先:</label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="mac-field w-full"
                    placeholder="Email or Twitter"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-xs block mb-1">Message / メッセージ:</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mac-field w-full"
                    rows={3}
                    placeholder="Why do you want to join?"
                  />
                </div>
                <button onClick={handleSubmit} className="mac-button">
                  Submit
                </button>
              </div>
            )}

            {/* Connections List */}
            <div className="space-y-4">
              {staticConnections.map((connection) => (
                <div key={connection.id} className="p-4 border border-black">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold">{connection.name}</span>
                    <span className="text-xs">{connection.role}</span>
                  </div>
                  {connection.skills && (
                    <p className="text-xs mb-2">Skills: {connection.skills}</p>
                  )}
                  <p className="text-xs mb-2">{connection.message}</p>
                  <p className="text-xs text-gray-600">Contact: {connection.contact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Window */}
        <div className="mac-window">
          <div className="mac-title-bar">
            <div className="mac-close-box"></div>
            <span className="text-xs">About Teleport Project</span>
          </div>
          <div className="p-4 text-xs">
            <p className="mb-2">
              Teleport is the next evolution of HyperCard for the AI era.
            </p>
            <p>
              テレポートは、生成AI時代のための新しいHyperCardです。
              誰もがAIを使ってアプリケーションを作れる世界を目指しています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}