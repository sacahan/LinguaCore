
import React from 'react';
import Layout from '../components/Layout';

const Progress: React.FC = () => {
  return (
    <Layout title="學習進度">
      <div className="flex p-4 items-center gap-4">
        <div
          className="size-20 rounded-full border-2 border-primary bg-center bg-cover shrink-0"
          style={{ backgroundImage: 'url("https://picsum.photos/200")' }}
        ></div>
        <div className="flex-1">
          <p className="text-xl font-bold">Alex Johnson</p>
          <p className="text-gray-400 text-sm">等級 12 • 中級</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            <span className="material-symbols-outlined text-orange-500 text-[20px] fill-1">local_fire_department</span>
            <span className="text-orange-500 font-bold text-sm">12</span>
          </div>
          <span className="text-[10px] text-gray-500 mt-1">連續天數</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-4 mb-6">
        {[
          { label: '完成練習', value: '124', icon: 'fitness_center', color: 'text-blue-500', bg: 'bg-blue-500/20' },
          { label: '平均正確率', value: '85%', icon: 'check_circle', color: 'text-green-500', bg: 'bg-green-500/20' },
          { label: '累積時間', value: '4時 12分', icon: 'schedule', color: 'text-purple-500', bg: 'bg-purple-500/20' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-highlight p-3 rounded-xl flex flex-col items-center text-center shadow-sm">
            <div className={`size-8 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-1`}>
              <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
            </div>
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-[10px] text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="px-4 mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold">時態掌握度</h2>
          <span className="text-primary text-xs font-semibold cursor-pointer">查看詳情</span>
        </div>
        <div className="bg-surface-highlight rounded-2xl p-6 flex flex-col items-center">
          <svg className="w-full h-full max-w-[240px]" viewBox="0 0 200 200">
            {/* Hexagon grid */}
            <polygon points="100,20 176,64 176,152 100,196 24,152 24,64" fill="none" stroke="#3b4754" strokeWidth="1" />
            <polygon points="100,60 138,82 138,126 100,148 62,126 62,82" fill="none" stroke="#3b4754" strokeWidth="1" strokeDasharray="4 2" />
            {/* Axes */}
            <line x1="100" y1="100" x2="100" y2="20" stroke="#3b4754" />
            <line x1="100" y1="100" x2="176" y2="64" stroke="#3b4754" />
            <line x1="100" y1="100" x2="176" y2="152" stroke="#3b4754" />
            <line x1="100" y1="100" x2="100" y2="196" stroke="#3b4754" />
            <line x1="100" y1="100" x2="24" y2="152" stroke="#3b4754" />
            <line x1="100" y1="100" x2="24" y2="64" stroke="#3b4754" />
            {/* Data shape */}
            <polygon
              points="100,40 160,75 145,135 100,185 50,140 45,80"
              fill="rgba(19, 127, 236, 0.3)"
              stroke="#137fec"
              strokeWidth="2"
            />
          </svg>
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-primary"></div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wide">當前水平</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full border border-gray-500 border-dashed"></div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wide">目標水平</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mb-4">
        <h2 className="text-lg font-bold mb-4">重點加強</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
          {[
            { tag: '待改進', title: '過去完成進行式', rate: '45%', color: 'text-red-500' },
            { tag: '弱點', title: '未來完成式', rate: '58%', color: 'text-orange-500' },
          ].map((item, i) => (
            <div key={i} className="min-w-[240px] bg-surface-highlight rounded-xl p-5 relative overflow-hidden">
               <span className="material-symbols-outlined text-[64px] absolute top-0 right-0 opacity-10">warning</span>
               <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${item.color}`}>{item.tag}</p>
               <h3 className="font-bold mb-1">{item.title}</h3>
               <p className="text-sm text-gray-400 mb-4">正確率: <span className={`${item.color} font-bold`}>{item.rate}</span></p>
               <button className="w-full bg-primary text-white text-xs font-bold py-2 rounded-lg">立即練習</button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
