import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserProfile, User } from '../handler/users.handler';
import ThemeToggle from './ThemeToggle';
import ProfilePopup from './ProfilePopup';
import { FaUserCircle } from 'react-icons/fa';

const Navbar: React.FC<{ toggleTheme: () => void; theme: string }> = ({
  toggleTheme,
  theme,
}) => {
  const [search, setSearch] = useState('');
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [userInfo, setUserInfo] = useState<User>();
  const [loadingProfile, setLoadingProfile] = useState(true);
  
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowProfilePopup(false);
    navigate('/auth');
  };

  const isAuthPage = location.pathname === '/auth';

  useEffect(() => {
    if (isAuthPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAuthPage]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        setLoadingProfile(true);
        try {
          const data = await getUserProfile();
          setUserInfo(data.user);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          setUserInfo({
            display_name: 'Bi Doe',
            fullname: 'Bi Doe',
            email: 'example@example.com',
            display_picture: '',
            sustainability_rating: 0,
            role: 'user',
            created_at: new Date().toISOString(),
          });
        } finally {
          setLoadingProfile(false);
        }
      }
    };

    fetchUserProfile();
  }, [token]);

  return (
    <>
      {/* empty div for spacing because header is fixed */}
      <div className="h-14" />
      <header className="fixed left-0 top-0 flex h-14 w-full flex-wrap items-center justify-between bg-tertiary p-4 md:flex-nowrap">
        <div className="flex items-center">
          <div className="ml-2 cursor-pointer select-none rounded-md px-2 py-1 text-xl font-bold text-secondary-700 transition duration-200">
            Admin EcoShopper
          </div>
        </div>
        {!isAuthPage && (
          <form
            onSubmit={handleSearchSubmit}
            className="mx-4 mt-2 hidden w-full max-w-lg md:mt-0 md:flex"
          >
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
              className="flex h-8 w-full items-center justify-center rounded-full bg-tertiary-light px-4 text-text-secondary placeholder-text-secondary transition duration-200 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </form>
        )}
        <div className="mt-2 hidden items-center md:mt-0 md:flex">
          <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
          <button
            onClick={handleProfileClick}
            className="ml-4 flex items-center text-2xl text-secondary-700 transition hover:text-secondary-500"
            title="Profile"
          >
            <FaUserCircle />
          </button>
        </div>
      </header>
      {!isAuthPage && (
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full p-4 md:hidden"
        >
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            className="flex h-8 w-full items-center justify-center rounded-full bg-tertiary px-4 text-text-secondary placeholder-text-secondary shadow focus:outline-none"
          />
        </form>
      )}
      {showProfilePopup && (
        <ProfilePopup
          userInfo={userInfo}
          loadingProfile={loadingProfile}
          handleProfileClick={handleProfileClick}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Navbar;
