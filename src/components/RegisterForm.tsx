
import React, { useState } from 'react';
import { registerEmail } from '../handler/auth.handler';

interface RegisterFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [fullName, setFullName] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password: string) => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSequentialNumbers = /(012|123|234|345|456|567|678|789)/.test(password);

    if (!hasLowercase || !hasUppercase || !hasNumber || hasSequentialNumbers) {
      return "Password must contain lowercase, uppercase, and numbers, and should not contain sequential numbers";
    }
    return '';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const error = validatePassword(newPassword);
    if (error) {
      setPasswordError(error);
    } else if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (password && newConfirmPassword !== password) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (passwordError) {
      onError(passwordError);
      return;
    }
    try {
      const response = await registerEmail(email, password, displayName, fullName);
      onSuccess(response.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        onError("Registration failed");
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
          onChange={handlePasswordChange}
          required
          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Confirm Password:
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        {passwordError && (
          <p className="mt-2 text-sm text-red-600">{passwordError}</p>
        )}
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Display Name:
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Full Name:
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;