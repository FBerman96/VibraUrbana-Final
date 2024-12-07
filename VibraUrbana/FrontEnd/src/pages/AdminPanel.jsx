import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importamos íconos
import 'react-toastify/dist/ReactToastify.css';
import { Circles } from 'react-loader-spinner'; // Loader animado

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
      setTimeout(() => { // Simulamos un retraso de 2 segundos
        setUsers(response.data);
        setLoading(false); // Detenemos el loading después de 2 segundos
      }, 1400);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error('Error al obtener usuarios:', err);
    }
  };

  const deleteUser = async (userId) => {
    const authToken = localStorage.getItem('authToken');
    console.log('Token de autenticación:', authToken); // Conservamos el console.log del token
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsers(users.filter((user) => user.id !== userId));
      // Cambiar el tipo de toast a error (rojo) cuando se elimina un usuario
      toast.error('Usuario eliminado con éxito', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: {
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          textAlign: "center",
          borderRadius: "10px",
        },
      });
    } catch (err) {
      toast.error('Error al eliminar el usuario', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: {
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          textAlign: "center",
          borderRadius: "10px",
        },
      });
      console.error('Error al eliminar usuario:', err);
    }
  };

  const handleEdit = async () => {
    if (selectedUser) {
      const authToken = localStorage.getItem('authToken');
      console.log('Token de autenticación:', authToken); // Conservamos el console.log del token
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
          toast.success('Usuario actualizado con éxito', {
            position: "top-center", // Posición centrada en la parte superior
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            style: {
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center",
              borderRadius: "10px",
            },
          });
          closeModal();
        } else {
          toast.error('Error al actualizar el usuario', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            style: {
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center",
              borderRadius: "10px",
            },
          });
        }
      } catch (err) {
        toast.error('Error al actualizar el usuario', {
          position: "top-center", // Posición centrada en la parte superior
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          style: {
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            borderRadius: "10px",
          },
        });
        console.error('Error al actualizar usuario:', err);
      }
    }
  };
  

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Username',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Role',
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div>
          <Button
            variant="outline-primary"
            className="me-2"
            onClick={() => handleModal('editar', row)}
          >
            <FaEdit size={18} />
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => handleModal('eliminar', row)}
          >
            <FaTrashAlt size={18} />
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

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Circles color="#4caf50" height={80} width={80} />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Admin Panel</h2>
      <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        customStyles={{
          headCells: {
            style: {
              background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '14px',
            },
          },
          rows: {
            style: {
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              },
            },
          },
          pagination: {
            style: {
              background: '#f4f4f4',
              color: '#333',
            },
            pageButtonsStyle: {
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#2575fc',
                color: '#ffffff',
              },
            },
          },
        }}
      />
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === 'eliminar'
              ? 'Confirmar eliminación'
              : 'Editar Usuario'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === 'eliminar' ? (
            <p>
              ¿Estás seguro de que deseas eliminar al usuario{' '}
              {selectedUser?.username}?
            </p>
          ) : (
            <div>
              <form>
                <div className="mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedUser?.username || ''}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={selectedUser?.email || ''}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label>Role</label>
                  <select
                    className="form-control"
                    value={selectedUser?.role || ''}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, role: e.target.value })
                    }
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
