import React, { useState } from 'react';
import { registerEmail } from '../handler/auth.handler';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// React functional Component:
const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await registerEmail(
        email,
        password,
        displayName,
        fullName,
      );
      toast.success(response.message);
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-tertiary-light">
      <main className="mx-4 w-full max-w-lg rounded-lg border border-secondary-500 bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-text-primary">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-text-secondary">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-full border border-secondary-300 bg-tertiary-light px-4 text-text-secondary focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-text-secondary">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-full border border-secondary-300 bg-tertiary-light px-4 text-text-secondary focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-text-secondary">
              Display Name:
            </label>
            <input
              type="text"
              name="displayname"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="h-12 w-full rounded-full border border-secondary-300 bg-tertiary-light px-4 text-text-secondary focus:outline-none"
              placeholder="Enter your display name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-text-secondary">
              Full Name:
            </label>
            <input
              type="text"
              name="fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 w-full rounded-full border border-secondary-300 bg-tertiary-light px-4 text-text-secondary focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <button
            type="submit"
            className="hover:bg-secondary-800 w-full rounded-full bg-secondary-700 py-2 font-bold text-white"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="cursor-pointer font-semibold text-secondary-700"
          >
            Login
          </span>
        </p>
      </main>
    </div>
  );
};

export default RegisterPage;
