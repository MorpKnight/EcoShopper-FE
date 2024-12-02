import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={
                    <React.Fragment>
                        <h1 className="text-3xl font-bold underline">
                            Hello world!
                        </h1>
                    </React.Fragment>
                } />
            </Routes>
        </Router>
    );
};

export default App;