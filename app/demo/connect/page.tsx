'use client';

import { useRouter } from 'next/navigation';

export default function ConnectStack() {
  const router = useRouter();

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
            <span className="text-xs">Connect - Join the Project</span>
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

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded border border-black mb-6 text-center">
              <div className="mb-4">
                <p className="text-base font-bold mb-2">
                  Please send us an email
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  メールでお問い合わせください
                </p>
              </div>
              
              <div className="mb-4">
                <a 
                  href="mailto:contact@teleport.jp?subject=HyperCard AI Collaboration Interest"
                  className="text-xl font-mono text-blue-600 hover:text-blue-800 underline"
                >
                  contact@teleport.jp
                </a>
              </div>
              
              <div className="text-xs text-gray-600">
                <p className="mb-2">
                  Please include in your email:
                  <br />
                  • Your name and background
                  <br />
                  • Skills and experience
                  <br />
                  • Why you're interested in the project
                </p>
                <p>
                  メールには以下をご記載ください：
                  <br />
                  • お名前とバックグラウンド
                  <br />
                  • スキルと経験
                  <br />
                  • プロジェクトに興味を持った理由
                </p>
              </div>
            </div>

            {/* What we're looking for */}
            <div className="space-y-4">
              <p className="text-sm font-bold">We're looking for / 募集中:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-black">
                  <h3 className="font-bold text-sm mb-2">🧑‍💻 Full-stack Engineers</h3>
                  <p className="text-xs">
                    • React/Next.js experience
                    <br />
                    • AI/ML integration skills
                    <br />
                    • Firebase/Cloud platforms
                  </p>
                </div>
                <div className="p-4 border border-black">
                  <h3 className="font-bold text-sm mb-2">🎨 UI/UX Designers</h3>
                  <p className="text-xs">
                    • Retro/Classic UI design
                    <br />
                    • Interactive experiences
                    <br />
                    • Visual programming interfaces
                  </p>
                </div>
              </div>
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