import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './AuthContext';
import Home from './components/Home';
import Tools from './components/Tools';
import Alphabets from './components/Alphabets';
import AboutUs from './components/AboutUs';
import LoginRegister from './components/LoginRegister';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/alphabets" element={<Alphabets />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login-register" element={<LoginRegister />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;