import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoleCard from './RoleCard';
import './RoleList.css';

function RoleList() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/roles');
      setRoles(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch roles. Make sure the backend is running on http://localhost:8080');
      console.error('Error fetching roles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await axios.delete(`/roles/${id}`);
        setRoles(roles.filter(role => role.id !== id));
      } catch (err) {
        setError('Failed to delete role');
        console.error('Error deleting role:', err);
      }
    }
  };

  const handleUpdate = async (id, updatedRole) => {
    try {
      const response = await axios.put(`/roles/${id}`, updatedRole);
      setRoles(roles.map(role => role.id === id ? response.data : role));
    } catch (err) {
      setError('Failed to update role');
      console.error('Error updating role:', err);
    }
  };

  const handleAddRole = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchRoles(); // Refresh the list after adding/editing
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading roles...</p>
      </div>
    );
  }

  return (
    <div className="role-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🏷️ Role Management</h2>
        <button
          className="btn btn-success btn-lg"
          onClick={handleAddRole}
        >
          ➕ Add New Role
        </button>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
          ></button>
        </div>
      )}

      {showForm && (
        <div className="row mb-4">
          <div className="col-lg-6">
            <RoleForm onClose={handleFormClose} />
          </div>
        </div>
      )}

      <div className="row">
        {roles.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info text-center">
              <h5>No roles found</h5>
              <p>Get started by adding your first role!</p>
            </div>
          </div>
        ) : (
          roles.map(role => (
            <div key={role.id} className="col-lg-4 col-md-6 mb-4">
              <RoleCard
                role={role}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RoleList;