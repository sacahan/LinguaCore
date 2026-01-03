
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { INITIAL_TENSES } from '../constants';
import { TenseCategory } from '../types';

const Grammar: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TenseCategory.PRESENT);

  return (
    <Layout title="文法總結">
      <div className="p-4">
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          英語時態由「時間」與「狀態」組成，共有 12 種基本變化。掌握這些原則，能幫助你更精準地表達語意。
        </p>

        <div className="flex bg-surface-dark p-1 rounded-xl mb-8">
          {[TenseCategory.PRESENT, TenseCategory.PAST, TenseCategory.FUTURE].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === cat ? 'bg-primary text-white shadow-sm' : 'text-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          {activeTab}規則
        </h2>

        <div className="space-y-4">
          {INITIAL_TENSES.filter(t => t.category === activeTab).map((tense) => (
            <details key={tense.id} className="bg-surface-dark border border-gray-800 rounded-xl overflow-hidden group">
              <summary className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors list-none">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">light_mode</span>
                  </div>
                  <div>
                    <p className="font-bold">{tense.name}</p>
                    <p className="text-[10px] text-gray-500 font-english uppercase tracking-wider">{tense.englishName}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-500 group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-4 pb-4 pt-2 border-t border-gray-800">
                <div className="mb-4">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">定義</p>
                  <p className="text-sm text-gray-300">{tense.definition}</p>
                </div>
                <div className="mb-4">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">公式</p>
                  <code className="inline-block bg-black/30 text-primary px-3 py-1 rounded-lg font-mono text-sm border border-gray-700">
                    {tense.formula}
                  </code>
                </div>
                <div className="p-3 bg-black/20 rounded-lg border border-gray-800">
                  <p className="text-sm">
                    Example: <span className="text-primary font-bold">{tense.example}</span> ...
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex gap-3">
          <span className="material-symbols-outlined text-orange-500">lightbulb</span>
          <div>
            <p className="text-orange-500 font-bold text-sm">學習小撇步</p>
            <p className="text-xs text-orange-200/70 leading-relaxed">
              母語者常犯錯誤：在現在簡單式中，當主詞是第三人稱單數（He, She, It）時，別忘了動詞要加 s/es 喔！
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-24 right-6">
        <button
           onClick={() => setActiveTab(TenseCategory.PRESENT)}
           className="bg-primary hover:bg-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-primary/30 flex items-center gap-2 group transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">edit_square</span>
          <span className="font-bold text-sm">立即練習</span>
        </button>
      </div>
    </Layout>
  );
};

export default Grammar;
