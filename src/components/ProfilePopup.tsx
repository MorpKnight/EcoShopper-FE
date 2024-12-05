import React from 'react';
import { User } from '../handler/users.handler';

const ProfilePopup: React.FC<{
  userInfo: User | undefined;
  loadingProfile: boolean;
  handleProfileClick: () => void;
  handleLogout: () => void;
}> = ({ userInfo, loadingProfile, handleProfileClick, handleLogout }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-80 rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={handleProfileClick}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
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
              <h2 className="mb-4 text-2xl font-semibold">User Profile</h2>
              <div className="mb-4 flex items-center">
                <img
                  src={
                    userInfo.display_picture ||
                    'https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid'
                  }
                  alt={userInfo.display_name}
                  className="mr-4 h-16 w-16 rounded-full border border-gray-300"
                />
                <div>
                  <p className="text-lg font-medium">{userInfo.fullname}</p>
                  <p className="text-sm text-gray-500">{userInfo.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Display Name:</strong> {userInfo.display_name}
                </p>
                <p>
                  <strong>Role:</strong> {userInfo.role}
                </p>
                <p>
                  <strong>Sustainability Rating:</strong>{' '}
                  {userInfo.sustainability_rating}
                </p>
                <p>
                  <strong>Joined:</strong>{' '}
                  {new Date(userInfo.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={handleProfileClick}
                  className="rounded-full bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                >
                  Close
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default ProfilePopup;
