import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge, Dropdown, Button } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaQuestionCircle, FaBars, FaFire, FaUser, FaSignInAlt, FaUserPlus, FaCog } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import LoginModal from '../pages/LoginModal';
import RegisterModal from '../pages/RegisterModal';
import '../assets/NavbarR.css';
import logo from '../assets/img/logo.png';

const NavbarComponent = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          const userData = userDoc.data();
          setIsAdmin(userData?.role === 'admin');
          setCartCount(3); // Ejemplo, deberías obtener el conteo real del carrito
          setFavoritesCount(2); // Ejemplo, deberías obtener el conteo real de favoritos
        } catch (error) {
          console.error("Error al obtener el documento del usuario:", error);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setCartCount(0);
        setFavoritesCount(0);
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

  return (
    <>
      <Navbar className="navbar-custom" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav className="mx-auto">
              <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-basic">
                  <FaBars /> Categorías
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/categoria/camisetas">Camisetas</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/categoria/pantalones">Pantalones</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/categoria/zapatillas">Zapatillas</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/categoria/accesorios">Accesorios</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Nav.Link as={Link} to="/destacado">Lo más <FaFire /></Nav.Link>
              <Nav.Link as={Link} to="/about">Contacto</Nav.Link>
              <Nav.Link as={Link} to="/favoritos">
                <FaHeart /> {favoritesCount > 0 && <Badge bg="danger">{favoritesCount}</Badge>}
              </Nav.Link>
              <Nav.Link as={Link} to="/carrito">
                <FaShoppingCart /> {cartCount > 0 && <Badge bg="danger">{cartCount}</Badge>}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav>
            {user ? (
              <Dropdown>
                <Dropdown.Toggle variant="outline-light" id="dropdown-user">
                  <FaUser /> {user.email}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Perfil</Dropdown.Item>
                  {isAdmin && (
                    <Dropdown.Item as={Link} to="/admin-dashboard">
                      <FaCog /> Panel de Admin
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button variant="outline-light" onClick={() => setShowLoginModal(true)} className="me-2">
                  <FaSignInAlt /> Iniciar Sesión
                </Button>
                <Button variant="light" onClick={() => setShowRegisterModal(true)}>
                  <FaUserPlus /> Registrarse
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />
      <RegisterModal show={showRegisterModal} handleClose={() => setShowRegisterModal(false)} />
    </>
  );
};

export default NavbarComponent;