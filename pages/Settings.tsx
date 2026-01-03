
import React from 'react';
import Layout from '../components/Layout';

const Settings: React.FC = () => {
  return (
    <Layout title="設定">
      <div className="p-4 space-y-6">
        <div className="bg-surface-dark p-4 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div
              className="size-20 rounded-full ring-2 ring-primary ring-offset-4 ring-offset-surface-dark bg-center bg-cover"
              style={{ backgroundImage: 'url("https://picsum.photos/300")' }}
            ></div>
            <div>
              <p className="text-xl font-bold">Alex Johnson</p>
              <p className="text-primary text-sm font-medium">中級 - 過去式大師</p>
              <p className="text-gray-500 text-sm">alex.j@example.com</p>
            </div>
          </div>
          <button className="w-full bg-primary text-white font-bold py-2 rounded-lg text-sm">編輯個人資料</button>
        </div>

        <div>
          <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest px-2 mb-2">學習偏好</h3>
          <div className="bg-surface-dark rounded-xl overflow-hidden divide-y divide-gray-800">
            {[
              { label: '每日目標', value: '15 分鐘', icon: 'target' },
              { label: '難度等級', value: '初學者', icon: 'bar_chart' },
              { label: '提醒時間', value: '上午 08:00', icon: 'schedule' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </div>
                  <span className="text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="text-xs">{item.value}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward_ios</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest px-2 mb-2">應用程式設定</h3>
          <div className="bg-surface-dark rounded-xl overflow-hidden divide-y divide-gray-800">
            {[
              { label: '通知', active: true, icon: 'notifications' },
              { label: '音效', active: true, icon: 'volume_up' },
              { label: '觸覺回饋', active: false, icon: 'vibration' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </div>
                  <span className="text-sm">{item.label}</span>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${item.active ? 'bg-primary' : 'bg-gray-700'}`}>
                  <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${item.active ? 'left-7' : 'left-1'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-transparent border border-red-500/30 text-red-500 font-bold py-3 rounded-xl hover:bg-red-500/10 transition-colors">
          登出
        </button>
      </div>
    </Layout>
  );
};

export default Settings;
