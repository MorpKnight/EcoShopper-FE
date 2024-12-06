import { FaArrowLeft, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function FooterNavigation() {
  const navigate = useNavigate();
  return (
    <footer className="fixed bottom-0 z-50 flex h-16 w-full items-center justify-center border-t border-secondary-300 bg-tertiary shadow-lg">
      <div className="flex items-center justify-center gap-10">
        {/* Back Icon */}
        <button
          onClick={() => navigate(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-500 text-text-white transition-transform duration-300 hover:scale-110 hover:bg-secondary-700"
          aria-label="Back"
        >
          <FaArrowLeft className="h-6 w-6" />
        </button>

        {/* Home Icon */}
        <button
          onClick={() => navigate('/')}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-500 text-text-white transition-transform duration-300 hover:scale-110 hover:bg-secondary-700"
          aria-label="Home"
        >
          <FaHome className="h-6 w-6" />
        </button>
      </div>
    </footer>
  );
}
