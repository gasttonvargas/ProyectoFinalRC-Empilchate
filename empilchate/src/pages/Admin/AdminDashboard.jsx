import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../firebaseConfig';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const adminsCollection = collection(db, 'users');
    const adminQuery = query(adminsCollection, where("role", "==", "admin"));
    const adminSnapshot = await getDocs(adminQuery);
    const adminList = adminSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAdmins(adminList);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: 'admin'
      });
      setShowModal(false);
      fetchAdmins();
    } catch (error) {
      console.error("Error al agregar admin:", error);
    }
  };

  const handleEditAdmin = async (e) => {
    e.preventDefault();
    if (selectedAdmin) {
      try {
        const adminRef = doc(db, 'users', selectedAdmin.id);
        await updateDoc(adminRef, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email
        });
        setShowModal(false);
        fetchAdmins();
      } catch (error) {
        console.error("Error al editar admin:", error);
      }
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este administrador?')) {
      try {
        await deleteDoc(doc(db, 'users', adminId));
        fetchAdmins();
      } catch (error) {
        console.error("Error al eliminar admin:", error);
      }
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="bg-light sidebar">
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link as={Link} to="/admin-dashboard">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/admin-dashboard/users">Usuarios</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/admin-dashboard/products">Productos</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={9}>
          <h1 className="my-4">Panel de Administración</h1>
          <Row>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Gestión de Usuarios</Card.Title>
                  <Card.Text>
                    Administra los usuarios de la plataforma.
                  </Card.Text>
                  <Link to="/admin-dashboard/users" className="btn btn-primary">Ir a Usuarios</Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Gestión de Productos</Card.Title>
                  <Card.Text>
                    Administra el catálogo de productos.
                  </Card.Text>
                  <Link to="/admin-dashboard/products" className="btn btn-primary">Ir a Productos</Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Estadísticas</Card.Title>
                  <Card.Text>
                    Visualiza estadísticas y métricas.
                  </Card.Text>
                  <Link to="/admin-dashboard/stats" className="btn btn-primary">Ver Estadísticas</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <h2 className="mt-4">Gestión de Administradores</h2>
          <Button variant="success" onClick={() => {
            setSelectedAdmin(null);
            setFormData({ firstName: '', lastName: '', email: '', password: '' });
            setShowModal(true);
          }}>
            Agregar Nuevo Admin
          </Button>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{`${admin.firstName} ${admin.lastName}`}</td>
                  <td>{admin.email}</td>
                  <td>
                    <Button variant="info" size="sm" onClick={() => {
                      setSelectedAdmin(admin);
                      setFormData({ ...admin, password: '' });
                      setShowModal(true);
                    }}>Editar</Button>
                    <Button variant="danger" size="sm" className="ml-2" onClick={() => handleDeleteAdmin(admin.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAdmin ? 'Editar Administrador' : 'Agregar Nuevo Administrador'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={selectedAdmin ? handleEditAdmin : handleAddAdmin}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            {!selectedAdmin && (
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            )}
            <Button variant="primary" type="submit">
              {selectedAdmin ? 'Guardar Cambios' : 'Agregar Administrador'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Admin;