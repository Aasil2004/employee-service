import React, { useState } from 'react';
import EditRoleForm from './EditRoleForm';
import './RoleCard.css';

function RoleCard({ role, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async (updatedRole) => {
    await onUpdate(role.id, updatedRole);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditRoleForm
        role={role}
        onSave={handleSaveEdit}
        onCancel={handleEditClose}
      />
    );
  }

  return (
    <div className="card role-card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">
          🏷️ {role.name}
        </h5>
        <p className="card-text text-muted">
          <strong>ID:</strong> {role.id}
        </p>
      </div>
      <div className="card-footer bg-light">
        <button
          className="btn btn-sm btn-warning me-2"
          onClick={handleEditClick}
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(role.id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default RoleCard;