import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import MainPage from './pages/MainPage';
import DevelopmentPage from './pages/DevelopmentPage';
import RegisterPage from './pages/register';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/dev" element={<DevelopmentPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
