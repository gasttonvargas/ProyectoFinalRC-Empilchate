import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge, Dropdown, Modal, Button, Form, FormControl } from 'react-bootstrap';
import { FaHome, FaShoppingCart, FaBars, FaUser, FaSearch, FaUserShield, FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import LoginModal from '../pages/LoginModal';
import RegisterModal from '../pages/RegisterModal';
import { useCart } from '../contexts/CartContext'; 
import { searchProducts } from '../services/searchService';
import { useFavorites } from '../contexts/FavoritesContext';
import '../assets/NavbarR.css';
import logo from '../assets/img/logo.png';

const NavbarComponent = ({ onSwitchToAdmin }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const navigate = useNavigate();

  const { cart } = useCart();
  const { favorites } = useFavorites();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favorites.length;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          const userData = userDoc.data();
          const isAdmin = userData?.role === 'admin';
          setIsAdmin(isAdmin);
          setUserName(userData?.firstName && userData?.lastName 
            ? `${userData.firstName} ${userData.lastName}`
            : userData?.firstName || userData?.lastName || '');
        } catch (error) {
          console.error("Error al obtener el documento del usuario:", error);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleCartClick = () => {
    if (user) {
      navigate('/cart'); 
    } else {
      setShowCartModal(true);
    }
  };

  const handleFavoritesClick = () => {
    if (user) {
      navigate('/favorites'); 
    } else {
      setShowLoginModal(true);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsSearching(true);
    setSearchError('');
    try {
      const results = await searchProducts(searchTerm);
      console.log('Resultados enviados a la navegación:', results);
      if (results.length === 0) {
        setSearchError('No se encontraron resultados.');
      } else {
        navigate('/search-results', { state: { results } });
      }
    } catch (error) {
      console.error('Error durante la búsqueda:', error);
      setSearchError('Ocurrió un error durante la búsqueda. Por favor, intenta de nuevo.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleAdminClick = () => {
    if (onSwitchToAdmin) {
      onSwitchToAdmin();
    }
  };

  const categories = [
    { name: 'Buzos', path: '/category/buzos' },
    { name: 'Remerones', path: '/category/remerones' },
    { name: 'Remeras y Boxy', path: '/category/remeras-y-boxy' },
    { name: 'Crop', path: '/category/crop' },
    { name: 'Camisas', path: '/category/camisas' },
    { name: 'Camperas', path: '/category/camperas' },
    { name: 'Pantalones', path: '/category/pantalones' },
  ];

  return (
    <>
      <Navbar className="navbar-custom" expand="lg" sticky="top">
        <Container fluid className="d-flex justify-content-between align-items-center">
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </Navbar.Brand>
          
          <Form className="d-flex d-lg-none mx-2 flex-grow-1" onSubmit={handleSearch}>
            <FormControl 
              type="search" 
              placeholder="Buscar" 
              className="mr-2" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isSearching}
            />
            <Button variant="outline-light" type="submit" disabled={isSearching}>
              {isSearching ? 'Buscando...' : <FaSearch />}
            </Button>
          </Form>
          {searchError && <div className="text-danger">{searchError}</div>}
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav className="mx-auto text-center">
              <Nav.Link as={Link} to="/" className="nav-button">
                <FaHome className="me-2"/> <span className="nav-text">Inicio</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-button">
                <span className="nav-text">Contacto</span>
              </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle as="div" id="dropdown-basic" className="nav-button">
                  <FaBars className="me-2" /> <span className="nav-text">Categorías</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((category, index) => (
                    <Dropdown.Item key={index} as={Link} to={category.path}>
                      {category.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {user && (
                <Nav.Link onClick={handleFavoritesClick} className="nav-button">
                  <FaHeart /> {favoritesCount > 0 && <Badge bg="danger">{favoritesCount}</Badge>}
                </Nav.Link>
              )}
              <Nav.Link onClick={handleCartClick} className="nav-button">
                <FaShoppingCart /> {cartCount > 0 && <Badge bg="danger">{cartCount}</Badge>}
              </Nav.Link>
            </Nav>
            
            <div className="d-flex align-items-center">
              {isAdmin && (
                <Button 
                  variant="warning" 
                  className="me-2" 
                  onClick={handleAdminClick}
                >
                  <FaUserShield className="me-1" /> Admin
                </Button>
              )}
              <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-user" className="nav-button" style={{ textDecoration: 'none' }}>
                  <FaUser className="me-2" /> 
                  <span className="nav-text">
                    {user ? (userName || 'Usuario') : 'Iniciar Sesión'}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  {user ? (
                    <>
                      <Dropdown.Item as={Link} to="/profile">Perfil</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item onClick={() => setShowLoginModal(true)}>Iniciar Sesión</Dropdown.Item>
                      <Dropdown.Item onClick={() => setShowRegisterModal(true)}>Registrarse</Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />
      <RegisterModal show={showRegisterModal} handleClose={() => setShowRegisterModal(false)} />

      <Modal show={showCartModal} onHide={() => setShowCartModal(false)} className="cart-modal">
        <Modal.Header closeButton className="cart-modal-header">
          <Modal.Title>Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body className="cart-modal-body">
          Tu carrito de compras está vacío.
          No has iniciado sesión. ¡Compra ya!
        </Modal.Body>
        <Modal.Footer className="cart-modal-footer">
          <Button variant="outline-secondary" onClick={() => setShowCartModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => {
            setShowCartModal(false);
            setShowLoginModal(true);
          }}>
            Iniciar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavbarComponent;