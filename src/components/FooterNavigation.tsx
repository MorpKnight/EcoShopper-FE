import { FaUser, FaInfoCircle, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function FooterNavigation() {
  const navigate = useNavigate();
  return (
    <footer className="fixed bottom-0 z-50 flex h-14 w-full items-center justify-around border-t border-secondary-300 bg-tertiary shadow-lg">
      {/* Profile Icon */}
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-500 text-text-white transition-colors duration-300 hover:bg-secondary-700"
        aria-label="Profile"
      >
        <FaUser className="h-5 w-5" />
      </button>

      {/* Home Icon */}
      <button
        onClick={() => navigate('/')}
        className="flex h-12 w-12 transform items-center justify-center rounded-full bg-secondary-500 text-text-white transition-transform hover:scale-110 hover:bg-secondary-700"
        aria-label="Home"
      >
        <FaHome className="h-6 w-6" />
      </button>

      {/* Info Icon */}
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-500 text-text-white transition-colors duration-300 hover:bg-secondary-700"
        aria-label="Info"
      >
        <FaInfoCircle className="h-5 w-5" />
      </button>
    </footer>
  );
}
