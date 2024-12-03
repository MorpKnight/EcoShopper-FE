
import React, { useState } from 'react';
import { loginEmail } from '../handler/auth.handler';

interface LoginFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginEmail(email, password);
      onSuccess(response.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        onError("Email or password doesn't match");
      } else {
        onError('An unknown error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Password:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;