
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showBack }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: '主頁', icon: 'home', path: '/' },
    { label: '學習', icon: 'school', path: '/grammar' },
    { label: '統計', icon: 'monitoring', path: '/progress' },
    { label: '個人', icon: 'person', path: '/settings' },
  ];

  const activeTab = location.pathname;

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-white max-w-md mx-auto shadow-2xl relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-gray-800 px-4 h-16 flex items-center justify-between">
        {showBack ? (
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
        ) : (
          <div className="p-2"><span className="material-symbols-outlined">menu</span></div>
        )}
        <h1 className="text-lg font-bold flex-1 text-center">{title || '英語時態大師'}</h1>
        <div className="p-2">
          <span className="material-symbols-outlined text-orange-500 fill-1">local_fire_department</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full max-w-md bg-surface-dark/90 backdrop-blur-xl border-t border-gray-800 flex justify-around items-center py-2 px-4 z-50">
        {navItems.map((item) => {
          const isActive = activeTab === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 min-w-[64px] transition-all ${
                isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className={`px-4 py-1 rounded-full transition-colors ${isActive ? 'bg-primary/10' : ''}`}>
                <span className={`material-symbols-outlined text-2xl ${isActive ? 'fill-1' : ''}`}>
                  {item.icon}
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
