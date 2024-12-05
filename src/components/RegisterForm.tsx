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
    const hasSequentialNumbers = /(012|123|234|345|456|567|678|789)/.test(
      password,
    );

    if (!hasLowercase || !hasUppercase || !hasNumber || hasSequentialNumbers) {
      return 'Password must contain lowercase, uppercase, and numbers, and should not contain sequential numbers';
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

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
      const response = await registerEmail(
        email,
        password,
        displayName,
        fullName,
      );
      onSuccess(response.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        onError('Registration failed');
      } else {
        onError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-secondary-300 bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-secondary-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full rounded border border-secondary-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full rounded border border-secondary-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
              placeholder="Confirm your password"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Display Name:
            </label>
            <input
              type="text"
              name="displayname"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded border border-secondary-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
              placeholder="Enter your display name"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Full Name:
            </label>
            <input
              type="text"
              name="fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded border border-secondary-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
              placeholder="Enter your full name"
            />
          </div>
          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}
          <button
            type="submit"
            className="w-full rounded bg-secondary-700 px-4 py-2 text-white hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
