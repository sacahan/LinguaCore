
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { TenseCategory, TenseStatus, TenseInfo } from '../types';
import { syncService } from '../syncService';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tenses, setTenses] = useState<TenseInfo[]>(syncService.getLocalProgress());

  useEffect(() => {
    if (user) {
      syncService.syncWithCloud(user.id).then(updatedTenses => {
        setTenses(updatedTenses);
      });
    }
  }, [user]);

  const renderTenseItem = (tense: TenseInfo) => {
    const isLocked = tense.status === TenseStatus.LOCKED;
    const isMastered = tense.status === TenseStatus.MASTERED;
    const isInProgress = tense.status === TenseStatus.IN_PROGRESS;

    return (
      <div
        key={tense.id}
        onClick={() => !isLocked && navigate(`/quiz/${tense.id}`)}
        className={`flex gap-4 px-4 py-3 justify-between items-center rounded-xl mx-2 transition-all ${
          isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5 cursor-pointer'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`flex items-center justify-center rounded-xl shrink-0 size-12 shadow-lg transition-colors ${
            isMastered ? 'bg-green-500/10 text-green-500' :
            isInProgress ? 'bg-primary text-white shadow-primary/20' :
            isLocked ? 'bg-gray-800 text-gray-500' : 'bg-primary/10 text-primary'
          }`}>
            <span className="material-symbols-outlined">
              {isMastered ? 'check' : isLocked ? 'lock' : isInProgress ? 'play_arrow' : 'menu_book'}
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-white text-base font-medium leading-normal">{tense.name}</p>
            <p className="text-gray-400 text-sm font-normal leading-normal font-english">{tense.englishName}: {tense.example}</p>
          </div>
        </div>

        <div className="shrink-0 flex items-center">
          {isMastered ? (
             <span className="text-green-500 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full">已精通</span>
          ) : isInProgress ? (
            <div className="flex flex-col items-end gap-1">
              <span className="text-primary text-xs font-bold">{tense.progress}%</span>
              <div className="w-[60px] overflow-hidden rounded-full bg-gray-800 h-1.5">
                <div className="h-full rounded-full bg-primary" style={{ width: `${tense.progress}%` }}></div>
              </div>
            </div>
          ) : isLocked ? (
            <span className="material-symbols-outlined text-gray-500">lock</span>
          ) : (
            <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-primary/20">
              開始
            </button>
          )}
        </div>
      </div>
    );
  };

  const categories = [TenseCategory.PRESENT, TenseCategory.PAST, TenseCategory.FUTURE];

  return (
    <Layout title="英語時態大師">
      <div className="w-full relative overflow-hidden group">
        <div className="w-full h-48 md:h-56 relative">
          <img
            src="/assets/banner-home.png"
            alt="LinguaCore Nebula Banner"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-6 md:px-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-orange-400 text-xl">temp_preferences_custom</span>
              <span className="text-orange-400 font-bold tracking-wider text-xs uppercase">Premium Learning</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight drop-shadow-lg font-english">
              LinguaCore:<br />The Nebula Scholar's Path
            </h2>
            <p className="text-gray-200 text-xs md:text-sm font-light max-w-[80%] md:max-w-[60%] font-english">
              Master Languages with Deep Focus and Intelligent Learning
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 px-4 py-2">
        <div className="flex-1 rounded-xl bg-surface-dark border border-gray-800 p-4 items-center text-center shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-orange-500 text-xl">bolt</span>
            <p className="text-white text-2xl font-bold font-english">12</p>
          </div>
          <p className="text-gray-400 text-xs mt-1">連續天數</p>
        </div>
        <div className="flex-1 rounded-xl bg-surface-dark border border-gray-800 p-4 items-center text-center shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">auto_graph</span>
            <p className="text-white text-2xl font-bold font-english">85%</p>
          </div>
          <p className="text-gray-400 text-xs mt-1">語法掌握度</p>
        </div>
      </div>

      {categories.map((cat) => (
        <div key={cat} className="flex flex-col mt-2">
          <h3 className="text-white text-lg font-bold px-4 py-3">{cat} Tenses</h3>
          <div className="space-y-1">
            {tenses.filter(t => t.category === cat).map(renderTenseItem)}
          </div>
          <div className="h-px bg-gray-800 mx-4 my-4 opacity-50"></div>
        </div>
      ))}
    </Layout>
  );
};

export default Dashboard;
