import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import Home from './components/Home';
import Shop from './components/Shop'
import './styles/app.css'

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/shop" element={<Shop />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
