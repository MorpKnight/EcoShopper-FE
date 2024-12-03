import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserProfile, User } from '../handler/users.handler';
import ThemeToggle from './ThemeToggle';
import ProfilePopup from './ProfilePopup';
import HamburgerMenu from './HamburgerMenu';

const Navbar: React.FC<{ toggleTheme: () => void; theme: string }> = ({ toggleTheme, theme }) => {
  const [search, setSearch] = useState('');
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [userInfo, setUserInfo] = useState<User>();
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
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

  const handleHamburgerMenuToggle = () => {
    setShowHamburgerMenu(!showHamburgerMenu);
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
            display_name: 'John Doe',
            fullname: 'John Doe',
            email: 'example@example.com',
            display_picture: '',
            sustainability_rating: 0,
            role: 'user',
            created_at: new Date().toISOString()
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
      <header className="flex h-14 w-full items-center justify-between bg-tertiary p-4 flex-wrap md:flex-nowrap">
        <div className="flex items-center">
          <div className="flex h-8 w-8 flex-col items-center justify-center space-y-0.5 bg-white cursor-pointer md:hidden" onClick={handleHamburgerMenuToggle}>
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
          </div>
          <div
            className="ml-2 text-xl font-bold text-text-primary select-none cursor-pointer"
            onClick={() => navigate('/')}
          >
            EcoShopper
          </div>
        </div>
        {!isAuthPage && (
          <form onSubmit={handleSearchSubmit} className="hidden md:flex w-full max-w-lg mx-4 mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
              className="flex h-8 w-full items-center justify-center rounded-full bg-tertiary px-4 text-text-secondary placeholder-text-secondary shadow focus:outline-none"
            />
          </form>
        )}
        <div className="hidden md:flex items-center mt-2 md:mt-0">
          <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
          {token ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white ml-4" onClick={handleProfileClick}>
              <div className="h-3 w-3 rounded-full border border-text-secondary"></div>
            </div>
          ) : (
            !isAuthPage && (
              <button onClick={() => navigate('/auth')} className="h-8 px-4 rounded-full bg-secondary-500 text-white ml-4">
                Login/Register
              </button>
            )
          )}
        </div>
      </header>
      {!isAuthPage && (
        <form onSubmit={handleSearchSubmit} className="flex md:hidden w-full p-4">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            className="flex h-8 w-full items-center justify-center rounded-full bg-tertiary px-4 text-text-secondary placeholder-text-secondary shadow focus:outline-none"
          />
        </form>
      )}
      {showHamburgerMenu && (
        <HamburgerMenu
          toggleTheme={toggleTheme}
          theme={theme}
          token={token}
          handleProfileClick={handleProfileClick}
          handleLogout={handleLogout}
          navigate={navigate}
          closeMenu={handleHamburgerMenuToggle}
        />
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