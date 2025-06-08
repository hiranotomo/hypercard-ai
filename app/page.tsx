'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FooterText from '@/components/FooterText';

export default function HomePage() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  if (isDesktop) {
    return <DesktopHome />;
  }

  return <MobileHome />;
}

function DesktopHome() {
  const [currentStack, setCurrentStack] = useState('home');

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-8">
      {/* Classic Mac Desktop */}
      <div className="relative">
        {/* Menu Bar */}
        <div className="absolute -top-8 left-0 right-0 h-6 bg-white border-b-2 border-black flex items-center px-2 text-xs">
          <span className="font-bold mr-6">🍎 File</span>
          <span className="mr-6">Edit</span>
          <span className="mr-6">Go</span>
          <span className="mr-6">Tools</span>
          <span className="mr-6">Objects</span>
        </div>

        {/* Main Stack Window */}
        <div className="mac-window" style={{ width: '800px', height: '600px' }}>
          <div className="mac-title-bar">
            <div className="mac-close-box"></div>
            <span className="text-xs flex-1 text-center">HyperCard AI - Home</span>
          </div>
          
          {/* Stack Content */}
          <div className="bg-white h-full flex flex-col">
            {/* Stack Card */}
            <div className="flex-1 p-8 flex flex-col items-center justify-between">
              {/* Header Section */}
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'Chicago, monospace' }}>
                  HyperCard AI
                </h1>
                <p className="text-base mb-1">A tribute to Bill Atkinson's revolutionary vision</p>
                <p className="text-sm text-gray-600 mb-1">In Memory of Bill Atkinson (1951 - 2024)</p>
                <p className="text-xs text-gray-600 italic">
                  もし1987年に生成AIがあったら... / What if Generative AI existed in 1987...
                </p>
              </div>

              {/* Stack Icons Grid */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <Link href="/demo/welcome">
                  <div className="text-center cursor-pointer hover:bg-gray-100 p-3 rounded">
                    <div className="text-5xl mb-1">📚</div>
                    <div className="text-xs font-bold">Welcome</div>
                  </div>
                </Link>
                
                <Link href="/demo/history">
                  <div className="text-center cursor-pointer hover:bg-gray-100 p-3 rounded">
                    <div className="text-5xl mb-1">📜</div>
                    <div className="text-xs font-bold">History</div>
                  </div>
                </Link>
                
                <Link href="/demo/game">
                  <div className="text-center cursor-pointer hover:bg-gray-100 p-3 rounded">
                    <div className="text-5xl mb-1">🎮</div>
                    <div className="text-xs font-bold">Adventure</div>
                  </div>
                </Link>
                
                <Link href="/demo/memories">
                  <div className="text-center cursor-pointer hover:bg-gray-100 p-3 rounded">
                    <div className="text-5xl mb-1">💭</div>
                    <div className="text-xs font-bold">Memories</div>
                  </div>
                </Link>
                
                <Link href="/demo/connect">
                  <div className="text-center cursor-pointer hover:bg-gray-100 p-3 rounded">
                    <div className="text-5xl mb-1">🤝</div>
                    <div className="text-xs font-bold">Connect</div>
                  </div>
                </Link>
                
                <Link href="/login">
                  <div className="text-center cursor-pointer hover:bg-gray-100 p-3 rounded">
                    <div className="text-5xl mb-1">✏️</div>
                    <div className="text-xs font-bold">Create</div>
                  </div>
                </Link>
                
                <div 
                  onClick={() => setCurrentStack('about')}
                  className="text-center cursor-pointer hover:bg-gray-100 p-3 rounded"
                >
                  <div className="text-5xl mb-1">ℹ️</div>
                  <div className="text-xs font-bold">About</div>
                </div>
                
                <div 
                  onClick={() => setCurrentStack('teleport')}
                  className="text-center cursor-pointer hover:bg-gray-100 p-3 rounded"
                >
                  <div className="text-5xl mb-1">🚀</div>
                  <div className="text-xs font-bold">Teleport</div>
                </div>
              </div>
              
              {/* About Section */}
              {currentStack === 'about' && (
                <div className="bg-gray-50 p-6 rounded border border-gray-300 mb-6 text-sm">
                  <h3 className="font-bold mb-3">About HyperCard AI</h3>
                  <p className="mb-3">
                    Created by <strong>Tomoyasu Hirano (平野友康)</strong> as a homage to HyperCard.
                  </p>
                  <p className="mb-3 text-xs text-gray-600">
                    私は若い頃、HyperCardに出会い、その革新性に感動してソフトウェア開発の道を歩み始めました。
                    Bill Atkinsonの「誰もがプログラミングできる」というビジョンは、今も私の中で生き続けています。
                  </p>
                  <p className="mb-3 text-xs text-gray-600">
                    As a young person, I was deeply inspired by HyperCard's revolutionary approach. 
                    Bill Atkinson's vision of "programming for everyone" changed my life forever.
                  </p>
                  <button onClick={() => setCurrentStack('home')} className="mac-button text-xs">
                    Close
                  </button>
                </div>
              )}
              
              {/* Teleport Section */}
              {currentStack === 'teleport' && (
                <div className="bg-gray-50 p-6 rounded border border-gray-300 mb-6 text-sm">
                  <h3 className="font-bold mb-3">Teleport Project</h3>
                  <p className="mb-3">
                    現在、生成AI時代のHyperCardとして「テレポート」を開発中。<br />
                    Currently developing "Teleport" - HyperCard for the Generative AI era.
                  </p>
                  <div className="border-t border-gray-400 pt-3">
                    <p className="font-bold mb-2">Join us! / 一緒に作りませんか？</p>
                    <p className="text-xs">
                      生成AIフルスタックエンジニア、デザイナー募集中<br />
                      Looking for Generative AI Full-stack Engineers and Designers
                    </p>
                  </div>
                  <button onClick={() => setCurrentStack('home')} className="mac-button text-xs mt-3">
                    Close
                  </button>
                </div>
              )}

              {/* Navigation Arrows */}
              <div className="flex items-center gap-4 mt-auto">
                <button className="mac-button px-4 py-1 text-xs" disabled>
                  ◀ First
                </button>
                <button className="mac-button px-4 py-1 text-xs" disabled>
                  ◀◀ Prev
                </button>
                <span className="text-xs">Card 1 of 1</span>
                <button className="mac-button px-4 py-1 text-xs" disabled>
                  Next ▶▶
                </button>
                <button className="mac-button px-4 py-1 text-xs" disabled>
                  Last ▶
                </button>
              </div>
            </div>

            {/* Tool Palette */}
            <div className="border-t-2 border-black p-2 flex gap-2">
              <div className="grid grid-cols-4 gap-1">
                {['👆', '✏️', '🔲', '⭕', '📝', '🔍', '🪣', '✂️'].map((tool, i) => (
                  <button key={i} className="w-8 h-8 border border-black text-sm hover:bg-gray-200">
                    {tool}
                  </button>
                ))}
              </div>
              <div className="ml-auto text-xs flex items-center">
                <span className="mr-4">Pattern:</span>
                <div className="grid grid-cols-4 gap-1">
                  {Array(8).fill(0).map((_, i) => (
                    <div key={i} className={`w-4 h-4 border border-black ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Text for Desktop */}
        <div className="mac-window mt-4" style={{ width: '800px' }}>
          <div className="mac-title-bar">
            <div className="mac-close-box"></div>
            <span className="text-xs">About the Creator</span>
          </div>
          <FooterText />
        </div>
      </div>
    </div>
  );
}

function MobileHome() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Memorial Header */}
        <div className="mac-window mb-8">
          <div className="mac-title-bar">
            <div className="mac-close-box"></div>
            <span className="text-xs">In Memory of Bill Atkinson (1951-2024)</span>
          </div>
          <div className="p-8 text-center">
            <h1 className="text-2xl md:text-4xl mb-4 font-bold">HyperCard AI</h1>
            <p className="text-sm md:text-base mb-4">
              A tribute to Bill Atkinson&apos;s revolutionary vision
            </p>
            <p className="text-xs md:text-sm text-gray-600 mb-4">
              もし1987年に生成AIがあったら... / What if Generative AI existed in 1987...
            </p>
          </div>
        </div>


        {/* Stack Selection */}
        <div className="mac-window">
          <div className="mac-title-bar">
            <div className="mac-close-box"></div>
            <span className="text-xs">Stacks</span>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/demo/welcome" className="block">
              <div className="mac-button p-4 hover:bg-gray-100">
                <h3 className="font-bold mb-1">Welcome Stack</h3>
                <p className="text-xs">Classic HyperCard experience with AI</p>
              </div>
            </Link>
            
            <Link href="/demo/history" className="block">
              <div className="mac-button p-4 hover:bg-gray-100">
                <h3 className="font-bold mb-1">HyperCard History</h3>
                <p className="text-xs">Learn the story with AI guide</p>
              </div>
            </Link>
            
            <Link href="/demo/game" className="block">
              <div className="mac-button p-4 hover:bg-gray-100">
                <h3 className="font-bold mb-1">Adventure Game</h3>
                <p className="text-xs">Text adventure with AI narrator</p>
              </div>
            </Link>
            
            <Link href="/demo/memories" className="block">
              <div className="mac-button p-4 hover:bg-gray-100">
                <h3 className="font-bold mb-1">HyperCard Memories</h3>
                <p className="text-xs">Share your HyperCard stories</p>
              </div>
            </Link>
            
            <Link href="/demo/connect" className="block">
              <div className="mac-button p-4 hover:bg-gray-100">
                <h3 className="font-bold mb-1">Connect Board</h3>
                <p className="text-xs">Find collaborators</p>
              </div>
            </Link>
            
            <Link href="/login" className="block">
              <div className="mac-button p-4 hover:bg-gray-100">
                <h3 className="font-bold mb-1">Create Your Stack</h3>
                <p className="text-xs">Build with AI assistance</p>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Footer Text for Mobile */}
        <div className="mac-window mt-8">
          <div className="mac-title-bar">
            <div className="mac-close-box"></div>
            <span className="text-xs">About the Creator</span>
          </div>
          <FooterText />
        </div>
      </div>
    </div>
  );
}