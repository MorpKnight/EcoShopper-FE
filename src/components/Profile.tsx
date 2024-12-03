import React from "react";

interface ProfileProps {
  profile: {
    display_name: string;
    created_at: string;
    sustainability_rating: number;
  } | null;
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, onClose }) => {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-tertiary-light w-full max-w-md rounded-lg p-6 shadow-lg">
        {/* Close Button */}
        <button
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center border-2 border-text-secondary rounded-full"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Profile Details */}
        <div className="flex flex-col items-center">
          {/* Profile Icon */}
          <div className="relative w-16 h-16 rounded-full border-2 border-text-secondary flex items-center justify-center">
            <div className="absolute top-[15%] w-6 h-6 bg-text-secondary rounded-full"></div>
            <div className="absolute bottom-[15%] w-8 h-4 bg-text-secondary rounded-t-md"></div>
          </div>

          {/* Username */}
          <h2 className="text-lg font-bold text-text-primary mt-4">
            {profile.display_name || "Unknown User"}
          </h2>

          {/* Created Date */}
          <p className="text-sm text-text-tertiary mt-4 mb-8">
            {profile.created_at
              ? new Date(profile.created_at).toLocaleDateString()
              : "Unknown Date"}
          </p>

          {/* Sustainability Score */}
          <div className="bg-text-white rounded-lg shadow mt-4 p-4 border border-secondary-700">
            <h3 className="text-sm font-medium text-text-secondary">
              Average Score
            </h3>
            <div className="flex flex-col items-center mt-3">
              <span className="text-lg font-bold text-text-tertiary mt-1">
                {profile.sustainability_rating
                  ? `${profile.sustainability_rating.toFixed(1)}★`
                  : "No Score"}
              </span>
            </div>
          </div>

          {/* Close Profile Button */}
          <button
            className="bg-secondary-700 text-text-white py-2 px-10 rounded-xl font-bold mt-6"
            onClick={onClose}
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
