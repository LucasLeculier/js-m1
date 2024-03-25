import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Catalogue from './views/Catalogue';
import Register from './views/Register';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Catalogue />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
                
                {/* Ajoutez d'autres routes selon vos besoins */}
            </Routes>
        </Router>
    );
};

export default App;
