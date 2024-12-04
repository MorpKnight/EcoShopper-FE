import React, { useState } from "react";
import { loginEmail } from "../handler/auth.handler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginEmail(email, password);
      toast.success(response.message);
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Email or password doesn't match");
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center overflow-x-hidden bg-tertiary-light">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-secondary-300 bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-text-primary">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-secondary-300 px-3 py-2 focus:outline-none focus:ring focus:ring-secondary-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded border border-secondary-300 px-3 py-2 focus:outline-none focus:ring focus:ring-secondary-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-secondary-700 px-4 py-2 text-text-white hover:bg-secondary-500 focus:outline-none focus:ring focus:ring-secondary-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
