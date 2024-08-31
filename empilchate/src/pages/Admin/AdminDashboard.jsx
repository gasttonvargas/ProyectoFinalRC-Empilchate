import React, { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';

const AdminDashboard = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const functions = getFunctions();
    const addAdminRole = httpsCallable(functions, 'addAdminRole');
    try {
      const result = await addAdminRole({ email });
      setMessage(result.data.message);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Panel de Administración</h2>
      <form onSubmit={handleAddAdmin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email del nuevo admin"
        />
        <button type="submit">Añadir Admin</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminDashboard;