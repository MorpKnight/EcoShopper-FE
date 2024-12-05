import React from 'react';

const ThemeToggle: React.FC<{ toggleTheme: () => void; theme: string }> = ({
  toggleTheme,
  theme,
}) => {
  return (
    <button
      onClick={toggleTheme}
      className="relative ml-4 h-8 w-14 rounded-full bg-gray-200 p-2 transition-colors duration-300 dark:bg-gray-800"
      aria-label="Toggle Theme"
    >
      <span
        className={`absolute left-0.5 top-0.5 flex h-7 w-7 items-center justify-center rounded-full text-lg transition-transform duration-300 ${
          theme === 'light'
            ? 'translate-x-0 bg-yellow-500'
            : 'translate-x-6 bg-gray-200'
        }`}
      >
        {theme === 'light' ? '☀️' : '🌙'}
      </span>
    </button>
  );
};

export default ThemeToggle;
