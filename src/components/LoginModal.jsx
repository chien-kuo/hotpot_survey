import { useState } from 'react';
import { useAuthActions } from '../hooks/useAuthActions';

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAdmin } = useAuthActions();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('請輸入信箱與密碼');
      return;
    }
    const result = await loginAdmin(email, password);
    if (result.success) {
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        onClose();
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl relative animate-fade-in">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-xl font-bold mb-4">管理者登入</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-amber-600 text-white font-bold py-2 rounded hover:bg-amber-700 transition"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  );
}
