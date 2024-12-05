import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-2xl">Oops! Page not found.</p>
      <Link to="/" className="mt-6 rounded bg-blue-500 px-4 py-2 text-white">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
