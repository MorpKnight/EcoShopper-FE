import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import DevelopmentPage from './pages/DevelopmentPage';
import Navbar from './components/Navbar';
import FooterNavigation from './components/FooterNavigation';
import AuthPage from './pages/AuthPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminMainPage from './pages/AdminMainPage';
import NavbarAdmin from './components/NavbarAdmin';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminEditPage from './pages/AdminEditPage';
import AlternativePage from './pages/AlternativePage';

const App: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const Layout = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
      <>
        {isAdminRoute ? (
          <NavbarAdmin toggleTheme={toggleTheme} theme={theme} />
        ) : (
          <Navbar toggleTheme={toggleTheme} theme={theme} />
        )}
        <div className="flex min-h-screen flex-col">
          <Routes>
            {/* Public Routes */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/dev" element={<DevelopmentPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminMainPage />} />
            <Route
              path="/admin/product/:id"
              element={<AdminProductDetailPage />}
            />
            <Route path="/alternatives/:id" element={<AlternativePage />} />
            <Route path="/admin/product/:id/edit" element={<AdminEditPage />} />
          </Routes>
        </div>
        <FooterNavigation />
      </>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
