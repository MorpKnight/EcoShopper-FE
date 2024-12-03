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
}> = ({ toggleTheme, theme, token, handleProfileClick, handleLogout, navigate, closeMenu }) => {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="bg-white p-6 rounded-r-lg shadow-lg w-64 relative transform transition-transform duration-300 ease-in-out translate-x-0 flex flex-col justify-center">
        <button onClick={closeMenu} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
        {token ? (
          <div className="mt-4 flex items-center justify-center" onClick={handleProfileClick}>
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
              <div className="h-3 w-3 rounded-full border border-text-secondary"></div>
            </div>
            <span className="ml-2">Profile</span>
          </div>
        ) : (
          <button onClick={() => navigate('/auth')} className="mt-4 w-full h-8 px-4 rounded-full bg-secondary-500 text-white">
            Login/Register
          </button>
        )}
        {token && (
          <button onClick={handleLogout} className="mt-4 w-full h-8 px-4 rounded-full bg-red-500 text-white">
            Logout
          </button>
        )}
      </div>
      <div className="flex-1 bg-black bg-opacity-50" onClick={closeMenu}></div>
    </div>
  );
};

export default HamburgerMenu;