import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalAction, setModalAction] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error('Error al obtener usuarios:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    const authToken = localStorage.getItem('authToken');
    console.log('Token de autenticación:', authToken); // Verifica el token aquí
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsers(users.filter((user) => user.id !== userId));
      toast.success('Usuario eliminado con éxito');
    } catch (err) {
      toast.error('Error al eliminar el usuario');
      console.error('Error al eliminar usuario:', err);
    }
  };
  

  const handleEdit = async () => {
    if (selectedUser) {
      const authToken = localStorage.getItem('authToken');
      console.log('Token de autenticación:', authToken); // Verifica el token aquí
      try {
        const response = await axios.put(
          `http://localhost:5000/api/users/${selectedUser.id}`,
          selectedUser,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status === 200) {
          setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
          toast.success('Usuario actualizado con éxito');
          closeModal();
        } else {
          toast.error('Error al actualizar el usuario');
        }
      } catch (err) {
        toast.error('Error al actualizar el usuario');
        console.error('Error al actualizar usuario:', err);
      }
    }
  };
  

  

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Username',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div>
          <Button variant="primary" onClick={() => handleModal('editar', row)}>
            Editar
          </Button>
          <Button variant="danger" onClick={() => handleModal('eliminar', row)}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  const handleModal = (action, user) => {
    setModalAction(action);
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      closeModal();
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Admin Panel</h2>
      
      <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
      />

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalAction === 'eliminar' ? 'Confirmar eliminación' : 'Editar Usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === 'eliminar' ? (
            <p>¿Estás seguro de que deseas eliminar al usuario {selectedUser?.username}?</p>
          ) : (
            <div>
              <form>
                <div className="mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedUser?.username || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={selectedUser?.email || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Role</label>
                  <select
                    className="form-control"
                    value={selectedUser?.role || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  >
                    <option value="cliente">Cliente</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          {modalAction === 'eliminar' ? (
            <Button variant="danger" onClick={confirmDelete}>
              Eliminar
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEdit}>
              Guardar cambios
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default AdminPanel;
