import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserProfile, User } from '../handler/users.handler';

const Navbar: React.FC = () => {
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
    navigate('/');
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
      {/* Navbar */}
      <header className="flex h-14 w-screen items-center justify-between bg-tertiary p-4 transition duration-200 hover:bg-beige">
        <div className="flex items-center">
          {/* Menu Icon */}
          <div className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center space-y-0.5 rounded-md bg-white transition duration-200">
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
          </div>
          {/* EcoShopper Text */}
          <div
            className="ml-2 cursor-pointer select-none rounded-md px-2 py-1 text-xl font-bold text-secondary-700 transition duration-200"
            onClick={() => navigate('/')}
          >
            EcoShopper
          </div>
        </div>
        {/* Search Bar */}
        {!isAuthPage && (
          <form
            onSubmit={handleSearchSubmit}
            className="mx-4 flex w-full max-w-lg"
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
        {/* Profile or Login/Register */}
        <div className="flex items-center space-x-4">
          {token ? (
            <div
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white transition duration-200"
              onClick={handleProfileClick}
            >
              <div className="h-3 w-3 rounded-full border border-text-secondary"></div>
            </div>
          ) : (
            !isAuthPage && (
              <button
                onClick={() => navigate('/auth')}
                className="h-8 rounded-full bg-secondary-700 px-4 text-white transition duration-200"
              >
                Login/Register
              </button>
            )
          )}
        </div>
      </header>
      {/* Profile Popup */}
      {showProfilePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-96 rounded-xl bg-text-white p-8 shadow-lg">
            <button
              onClick={handleProfileClick}
              className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            {loadingProfile ? (
              <div className="flex h-40 items-center justify-center">
                <div className="loader"></div>
              </div>
            ) : (
              userInfo && (
                <>
                  <h2 className="mb-6 text-3xl font-semibold text-text-primary">
                    User Profile
                  </h2>
                  {/* Profile Details */}
                  <div className="mb-6 flex items-center">
                    <img
                      src={
                        userInfo.display_picture ||
                        'https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid'
                      }
                      alt={userInfo.display_name}
                      className="mr-6 h-20 w-20 rounded-full border border-gray-300"
                    />
                    <div>
                      <p className="text-lg font-medium text-text-primary">
                        {userInfo.fullname}
                      </p>
                      <p className="text-sm text-gray-500">{userInfo.email}</p>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end space-x-4">
                    <button
                      onClick={handleProfileClick}
                      className="rounded-full bg-secondary-300 px-6 py-2 text-text-secondary transition duration-200 hover:bg-secondary-500"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleLogout}
                      className="rounded-full bg-secondary-700 px-6 py-2 text-text-white transition duration-200 hover:bg-black"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;