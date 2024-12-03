import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSuccess = (message: string) => {
    toast.success(message);
    navigate(isLogin ? '/' : '/login');
  };

  const handleError = (message: string) => {
    toast.error(message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-tertiary-light">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-secondary-300 bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-text-primary">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        {isLogin ? (
          <LoginForm onSuccess={handleSuccess} onError={handleError} />
        ) : (
          <RegisterForm onSuccess={handleSuccess} onError={handleError} />
        )}
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-secondary-500 hover:underline"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
