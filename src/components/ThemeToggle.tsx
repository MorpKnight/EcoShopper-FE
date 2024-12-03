import React from 'react';

const ThemeToggle: React.FC<{ toggleTheme: () => void; theme: string }> = ({ toggleTheme, theme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300 relative w-14 h-8"
      aria-label="Toggle Theme"
    >
      <span
        className={`absolute top-0.5 left-0.5 w-7 h-7 rounded-full transition-transform duration-300 flex items-center justify-center text-lg ${
          theme === 'light' ? 'translate-x-0 bg-yellow-500' : 'translate-x-6 bg-gray-200'
        }`}
      >
        {theme === 'light' ? '☀️' : '🌙'}
      </span>
    </button>
  );
};

export default ThemeToggle;