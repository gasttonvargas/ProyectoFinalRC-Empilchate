import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { getOnlineUsersCount } from '../../services/Users';

const Dashboard = () => {
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      const count = await getOnlineUsersCount();
      setOnlineUsers(count);
    };

    fetchOnlineUsers();
    const interval = setInterval(fetchOnlineUsers, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <DashboardNavbar onlineUsers={onlineUsers} />
      <Container>
        <Row className="mt-4">
          <Col>
            <h1>Bienvenido al Panel de Administración</h1>
            <p>Aquí puedes gestionar productos y usuarios.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;