import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DevelopmentPage from './pages/DevelopmentPage';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/dev" element={<DevelopmentPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
