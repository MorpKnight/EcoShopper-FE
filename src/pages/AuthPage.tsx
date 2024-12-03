
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold">{isLogin ? 'Login' : 'Register'}</h2>
        {isLogin ? (
          <LoginForm onSuccess={handleSuccess} onError={handleError} />
        ) : (
          <RegisterForm onSuccess={handleSuccess} onError={handleError} />
        )}
        <div className="text-center">
          <p className="text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 hover:underline"
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