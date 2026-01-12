import React, { useState } from 'react';
import axios from 'axios';
import './RoleForm.css';

function RoleForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError('Role name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await axios.post('/roles', formData);

      setSuccess(true);
      setFormData({
        name: ''
      });

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add role');
      console.error('Error adding role:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card role-form shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">➕ Add New Role</h5>
      </div>
      <div className="card-body">
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

        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            ✅ Role added successfully!
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccess(false)}
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Role Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter role name"
              disabled={loading}
            />
          </div>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleForm;