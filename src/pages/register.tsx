import React, { useState } from "react";
import { registerEmail } from "../handler/auth.handler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// React functional Component:
const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await registerEmail(
        email,
        password,
        displayName,
        fullName
      );
      toast.success(response.message);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-tertiary-light min-h-screen flex items-center justify-center">
      <main className="bg-white w-full max-w-lg rounded-lg shadow-md border border-secondary-500 p-6">
        <h1 className="text-2xl font-bold text-text-primary text-center mb-6">
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
              className="bg-tertiary-light text-text-secondary rounded-full h-12 w-full px-4 focus:outline-none border border-secondary-300"
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
              className="bg-tertiary-light text-text-secondary rounded-full h-12 w-full px-4 focus:outline-none border border-secondary-300"
              placeholder="Enter your email"
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
              className="bg-tertiary-light text-text-secondary rounded-full h-12 w-full px-4 focus:outline-none border border-secondary-300"
              placeholder="Enter your password"
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
              onChange={(e)=>setFullName(e.target.value)}
              className="bg-tertiary-light text-text-secondary rounded-full h-12 w-full px-4 focus:outline-none border border-secondary-300"
              placeholder="Enter your full name"
            />
          </div>

          <button
            type="submit"
            className="bg-secondary-700 text-white font-bold py-2 w-full rounded-full hover:bg-secondary-800"
          >
            Register
          </button>
        </form>

        <p className="text-center text-text-secondary mt-6 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-secondary-700 cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>
      </main>
    </div>
  );
};

export default RegisterPage;
