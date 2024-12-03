import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DevelopmentPage from './pages/DevelopmentPage';
import Navbar from './components/Navbar';
import FooterNavigation from './components/FooterNavigation';
import AuthPage from './pages/AuthPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/dev" element={<DevelopmentPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <FooterNavigation />
    </Router>
  );
};

export default App;
