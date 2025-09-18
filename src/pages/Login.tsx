import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import { useStore } from '../store/useStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useStore();

  const handleLogin = useCallback((user: any) => {
    login(user);
    navigate('/');
  }, [login, navigate]);

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <LoginModal isOpen onClose={() => {}} onLogin={handleLogin} />
    </div>
  );
};

export default Login;


