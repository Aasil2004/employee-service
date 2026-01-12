import React, { useState } from 'react';
import './EditRoleForm.css';

function EditRoleForm({ role, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: role.name
  });
  const [error, setError] = useState(null);
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
      await onSave(formData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card edit-form shadow-sm h-100">
      <div className="card-header bg-warning text-dark">
        <h5 className="mb-0">✏️ Edit Role</h5>
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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="edit-name" className="form-label">
              Role Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="edit-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter role name"
              disabled={loading}
            />
          </div>

          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-warning"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRoleForm;