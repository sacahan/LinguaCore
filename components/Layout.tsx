
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: '主頁', icon: 'home', path: '/' },
    { label: '學習', icon: 'school', path: '/grammar' },
    { label: '統計', icon: 'monitoring', path: '/progress' },
    { label: '個人', icon: 'person', path: '/settings' },
  ];

  const sidebarItems = [
    { label: '關於我們', icon: 'info', action: () => alert('英語時態大師 v1.0.0') },
    { label: '使用說明', icon: 'help', action: () => alert('請選擇一個時態開始練習！') },
  ];

  const activeTab = location.pathname;

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-white max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Sidebar Overlay */}
      {isMenuOpen && (
        <div className="absolute inset-0 z-[60] flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="relative w-[70%] max-w-[300px] h-full bg-surface-dark border-r border-gray-800 shadow-xl flex flex-col p-6 animate-in slide-in-from-left duration-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">school</span>
              </div>
              <div>
                <h2 className="font-bold text-lg">英語時態大師</h2>
                <p className="text-xs text-gray-500">v1.0.0</p>
              </div>
            </div>

            <nav className="space-y-2 flex-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === item.path ? 'bg-primary/10 text-primary' : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}

              <div className="h-px bg-gray-800 my-4"></div>

              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-800 text-gray-300 transition-colors"
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="border-t border-gray-800 pt-4">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined">logout</span>
                  <span className="font-medium">登出帳號</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/10 text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">login</span>
                  <span className="font-medium">登入</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-gray-800 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center w-10">
          {showBack ? (
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
              <span className="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
          ) : (
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          )}
        </div>

        <h1 className="text-lg font-bold flex-1 text-center truncate px-2">{title || '英語時態大師'}</h1>

        <div className="flex items-center justify-end w-10">
          {user ? (
            <button
              onClick={handleSignOut}
              className="p-2 hover:bg-red-500/10 rounded-full transition-colors text-gray-400 hover:text-red-500"
              title="登出"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          ) : (
            <div className="p-2 text-orange-500">
              <span className="material-symbols-outlined fill-1">local_fire_department</span>
            </div>
          )}
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
