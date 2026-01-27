import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: import.meta.env.VITE_AUTH_REDIRECT_URL || window.location.origin,
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: '登入連結已發送到您的電子信箱！' });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-dark px-4">
      <div className="w-full max-w-md bg-gray-900/50 p-8 rounded-2xl border border-gray-800 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 p-2 rounded-2xl mb-4">
            <img src="/favicon.png" alt="LinguaCore Logo" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-white text-2xl font-bold">LinguaCore</h1>
          <p className="text-gray-400 text-sm mt-2">使用電子郵件接收登入連結</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
              電子郵件地址
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark'
            }`}
          >
            {loading ? '發送中...' : '發送登入連結'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-xl text-sm ${
            message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}>
            {message.text}
          </div>
        )}
      </div>

      <p className="mt-8 text-gray-500 text-xs text-center max-w-xs">
        Magic Link 是一種無密碼登入方式，您將在收件匣收到一封包含登入按鈕的電子郵件。
      </p>
    </div>
  );
};

export default Login;
