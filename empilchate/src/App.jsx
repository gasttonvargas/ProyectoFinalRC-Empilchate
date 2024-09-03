import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext'; 
import NavbarComponent from './components/NavbarR';
import NavbarAdmin from './components/NavbarAdmin';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import Footer from './components/Footer';

// Importar componentes del dashboard
import AdminDashboard from './pages/Admin/AdminDashboard';
import Dashboard from './pages/Admin/Dashboard';
import Products from './pages/Admin/Products';
import Users from './pages/Admin/Users';

function App() {
  const [showAdminNav, setShowAdminNav] = useState(false);

  const handleSwitchToAdmin = () => {
    setShowAdminNav(true);
  };

  const handleSwitchToUser = () => {
    setShowAdminNav(false);
  };

  return (
    <CartProvider>
      <FavoritesProvider>
      <Router>
        <div className="App">
          {showAdminNav ? (
            <NavbarAdmin onSwitchToUser={handleSwitchToUser} />
          ) : (
            <NavbarComponent onSwitchToAdmin={handleSwitchToAdmin} />
          )}
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:categoryName" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />

            {/* Rutas de administrador */}
            <Route 
              path="/admin-dashboard/*" 
              element={
                showAdminNav ? (
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="users" element={<Users />} />
                    <Route path="manage" element={<AdminDashboard />} />
                  </Routes>
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          </Routes>
          <Footer />
        </div>
      </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;