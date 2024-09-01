import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;