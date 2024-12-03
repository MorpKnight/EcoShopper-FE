
import React from 'react';
import { User } from '../handler/users.handler';

const ProfilePopup: React.FC<{
  userInfo: User | undefined;
  loadingProfile: boolean;
  handleProfileClick: () => void;
  handleLogout: () => void;
}> = ({ userInfo, loadingProfile, handleProfileClick, handleLogout }) => {
  return (
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
  );
};

export default ProfilePopup;