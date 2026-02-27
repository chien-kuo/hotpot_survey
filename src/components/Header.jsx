import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAuthActions } from '../hooks/useAuthActions';

export default function Header({ onShowLogin }) {
  const { isAdmin } = useAuthStore();
  const { logout } = useAuthActions();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-amber-600 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold flex items-center hover:text-amber-100 transition">
          <i className="fas fa-city mr-3"></i>學生食材調查
        </Link>
        
        <div className="flex gap-2">
          {isAdmin ? (
            <>
              <Link 
                to="/admin" 
                className="text-sm px-4 py-2 rounded bg-amber-700 hover:bg-amber-800 transition flex items-center"
              >
                <i className="fas fa-tools mr-2"></i>後台
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition flex items-center"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>登出
              </button>
            </>
          ) : (
            <button 
              onClick={onShowLogin}
              className="text-sm px-4 py-2 rounded bg-amber-600 hover:bg-amber-700 border border-amber-300 transition flex items-center"
            >
              <i className="fas fa-user-shield mr-2"></i>管理者登入
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
