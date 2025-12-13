import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from './EmployeeCard';
import './EmployeeList.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/employees');
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees. Make sure the backend is running on http://localhost:8080');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`/employees/${id}`);
        setEmployees(employees.filter(emp => emp.id !== id));
      } catch (err) {
        setError('Failed to delete employee');
        console.error('Error deleting employee:', err);
      }
    }
  };

  const handleUpdate = async (id, updatedEmployee) => {
    try {
      const response = await axios.put(`/employees/${id}`, updatedEmployee);
      setEmployees(employees.map(emp => emp.id === id ? response.data : emp));
    } catch (err) {
      setError('Failed to update employee');
      console.error('Error updating employee:', err);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="employee-list">
      <h2 className="mb-4">
        👥 Employees ({employees.length})
      </h2>
      
      {employees.length === 0 ? (
        <div className="alert alert-info">
          No employees found. Click "Add New Employee" to get started!
        </div>
      ) : (
        <div className="row">
          {employees.map(employee => (
            <div key={employee.id} className="col-md-6 col-lg-4 mb-4">
              <EmployeeCard 
                employee={employee}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
