import React, { useState } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [refreshEmployees, setRefreshEmployees] = useState(0);

  const handleAddEmployee = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setRefreshEmployees(prev => prev + 1);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            💼 Payroll Management System
          </span>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-12">
            <button 
              className="btn btn-success btn-lg"
              onClick={handleAddEmployee}
            >
              ➕ Add New Employee
            </button>
          </div>
        </div>

        {showForm && (
          <div className="row mb-4">
            <div className="col-lg-6">
              <EmployeeForm onClose={handleFormClose} />
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12">
            <EmployeeList key={refreshEmployees} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
