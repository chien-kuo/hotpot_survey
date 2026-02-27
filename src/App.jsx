import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth as useAuthListener } from './hooks/useAuthListener';
import { useSurveyData } from './hooks/useSurveyData';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginModal from './components/LoginModal';

function App() {
  // Initialize Listeners
  const { loading, error } = useAuthListener();
  useSurveyData();
  
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
      setShowLogin(false);
      navigate('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <i className="fas fa-spinner fa-spin fa-3x text-amber-500"></i>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 px-4 text-center">
        <div>
          <i className="fas fa-exclamation-triangle fa-3x mb-4"></i>
          <p className="text-xl font-bold">連線失敗</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12 bg-gray-50 text-gray-800 font-sans relative flex flex-col">
      <Header onShowLogin={() => setShowLogin(true)} />
      
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default App;
