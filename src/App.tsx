import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DevelopmentPage from './pages/DevelopmentPage';
import RegisterPage from './pages/register';
import Navbar from './components/Navbar';
import FooterNavigation from './components/FooterNavigation';
import AuthPage from './pages/AuthPage';
import ProductDetailPage from './pages/ProductDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="flex min-h-screen flex-col">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/dev" element={<DevelopmentPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
      <FooterNavigation />
    </Router>
  );
};

export default App;
