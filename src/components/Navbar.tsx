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
        {!isAuthPage && (
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
          !isAuthPage && (
            <button onClick={() => navigate('/auth')} className="h-8 px-4 rounded-full bg-secondary-500 text-white">
              Login/Register
            </button>
          )
        )}
      </header>
      {showProfilePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
            <button onClick={handleProfileClick} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
            {loadingProfile ? (
              <div className="flex items-center justify-center h-40">
                <div className="loader"></div>
              </div>
            ) : (
              userInfo && (
                <>
                  <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
                  <div className="flex items-center mb-4">
                    <img
                      src={userInfo.display_picture || 'https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid'}
                      alt={userInfo.display_name}
                      className="h-16 w-16 rounded-full mr-4 border border-gray-300"
                    />
                    <div>
                      <p className="text-lg font-medium">{userInfo.fullname}</p>
                      <p className="text-sm text-gray-500">{userInfo.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p><strong>Display Name:</strong> {userInfo.display_name}</p>
                    <p><strong>Role:</strong> {userInfo.role}</p>
                    <p><strong>Sustainability Rating:</strong> {userInfo.sustainability_rating}</p>
                    <p><strong>Joined:</strong> {new Date(userInfo.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-6 flex justify-end space-x-2">
                    <button onClick={handleProfileClick} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400">Close</button>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">Logout</button>
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