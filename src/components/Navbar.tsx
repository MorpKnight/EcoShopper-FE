import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/search?query=${search}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    navigate(`/?query=${event.target.value}`);
  };

  const handleProfileClick = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  useEffect(() => {
    if (isLoginPage || isRegisterPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoginPage, isRegisterPage]);

  return (
    <>
      <header className="flex h-14 w-full items-center justify-between bg-tertiary p-4">
        <div className="flex items-center">
          {/* Menu Icon */}
          <div className="flex h-8 w-8 flex-col items-center justify-center space-y-0.5 bg-white">
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
          </div>
          {/* EcoShopper Text */}
          <div
            className="ml-2 text-xl font-bold text-text-primary select-none cursor-pointer"
            onClick={() => navigate('/')}
          >
            EcoShopper
          </div>
        </div>
        {/* Search Bar */}
        {!isLoginPage && !isRegisterPage && (
          <form onSubmit={handleSearchSubmit} className="flex w-full max-w-lg mx-4">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
              className="flex h-8 w-full items-center justify-center rounded-full bg-tertiary px-4 text-text-secondary placeholder-text-secondary shadow focus:outline-none"
            />
          </form>
        )}
        {/* Profile or Login/Register */}
        {token ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white" onClick={handleProfileClick}>
            <div className="h-3 w-3 rounded-full border border-text-secondary"></div>
          </div>
        ) : (
          <div className="flex space-x-2">
            {!isLoginPage && <button onClick={() => navigate('/login')} className="h-8 px-4 rounded-full bg-secondary-500 text-white">Login</button>}
            {!isRegisterPage && <button onClick={() => navigate('/register')} className="h-8 px-4 rounded-full bg-secondary-500 text-white">Register</button>}
          </div>
        )}
      </header>
      {showProfilePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold">User Profile</h2>
            <p>Name: John Doe</p>
            <p>Email: john.doe@example.com</p>
            <button onClick={handleProfileClick} className="mt-4 px-4 py-2 bg-primary text-white rounded-full">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;