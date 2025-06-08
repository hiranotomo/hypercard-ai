import Link from 'next/link';
import AccessCounter from './AccessCounter';

export default function FooterText() {
  return (
    <div className="text-center space-y-4 p-6">
      <div className="text-sm">
        <p className="mb-2">
          <span className="font-bold">Created by Tomoyasu Hirano (平野友康)</span>
        </p>
        <p className="text-xs text-gray-600 mb-3">
          私は若い頃、HyperCardに出会い、その革新性に感動してソフトウェア開発の道を歩み始めました。
          <br />
          Bill Atkinsonの「誰もがプログラミングできる」というビジョンは、今も私の中で生き続けています。
        </p>
        <p className="text-xs text-gray-600 mb-3">
          As a young person, I was deeply inspired by HyperCard's revolutionary approach.
          <br />
          Bill Atkinson's vision of "programming for everyone" changed my life forever.
        </p>
      </div>
      
      <div className="border-t border-gray-400 pt-4">
        <p className="text-sm mb-2">
          現在、生成AI時代のHyperCardとして「テレポート」を開発中。
          <br />
          Currently developing "Teleport" - HyperCard for the Generative AI era.
        </p>
        <p className="text-xs font-bold mb-1">
          Join us! / 一緒に作りませんか？
        </p>
        <p className="text-xs text-gray-600 mb-3">
          生成AIフルスタックエンジニア、デザイナー募集中
          <br />
          Looking for Generative AI Full-stack Engineers and Designers
        </p>
        
        {/* Connect Button */}
        <Link href="/demo/connect">
          <div className="inline-flex items-center gap-2 mac-button px-4 py-2 hover:bg-gray-100">
            <span className="text-2xl">🤝</span>
            <span className="text-sm font-bold">Connect</span>
          </div>
        </Link>
      </div>
      
      <div className="border-t border-gray-400 pt-4">
        <p className="text-xs text-gray-500 italic">
          "The computer should be doing the hard work. People should be doing the creative work."
          <br />
          - Bill Atkinson
        </p>
      </div>
      
      {/* Access Counter */}
      <AccessCounter />
    </div>
  );
}