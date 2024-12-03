import { FaUser, FaInfoCircle, FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function FooterNavigation() {
  const navigate = useNavigate();
  return (
    <footer className="flex w-full justify-around items-center bg-tertiary h-14 fixed bottom-0 z-50 border-t border-secondary-300 shadow-lg">
      {/* Profile Icon */}
      <button
        className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary-500 text-text-white hover:bg-secondary-700 transition-colors duration-300"
        aria-label="Profile"
      >
        <FaUser className="h-5 w-5" />
      </button>

      {/* Home Icon */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary-500 text-text-white hover:bg-secondary-700 transition-transform transform hover:scale-110"
        aria-label="Home"
      >
        <FaHome className="h-6 w-6" />
      </button>

      {/* Info Icon */}
      <button
        className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary-500 text-text-white hover:bg-secondary-700 transition-colors duration-300"
        aria-label="Info"
      >
        <FaInfoCircle className="h-5 w-5" />
      </button>
    </footer>
  );
}
