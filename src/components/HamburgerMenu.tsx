import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const HamburgerMenu: React.FC<{
  toggleTheme: () => void;
  theme: string;
  token: string | null;
  handleProfileClick: () => void;
  handleLogout: () => void;
  navigate: ReturnType<typeof useNavigate>;
  closeMenu: () => void;
}> = ({
  toggleTheme,
  theme,
  token,
  handleProfileClick,
  handleLogout,
  navigate,
  closeMenu,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="relative flex w-64 translate-x-0 transform flex-col justify-center rounded-r-lg bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out">
        <button
          onClick={closeMenu}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
        {token ? (
          <div
            className="mt-4 flex items-center justify-center"
            onClick={handleProfileClick}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <div className="h-3 w-3 rounded-full border border-text-secondary"></div>
            </div>
            <span className="ml-2">Profile</span>
          </div>
        ) : (
          <button
            onClick={() => navigate('/auth')}
            className="mt-4 h-8 w-full rounded-full bg-secondary-500 px-4 text-white"
          >
            Login/Register
          </button>
        )}
        {token && (
          <button
            onClick={handleLogout}
            className="mt-4 h-8 w-full rounded-full bg-red-500 px-4 text-white"
          >
            Logout
          </button>
        )}
      </div>
      <div className="flex-1 bg-black bg-opacity-50" onClick={closeMenu}></div>
    </div>
  );
};

export default HamburgerMenu;
