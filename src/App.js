// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/Employee/EmployeeList';
import EmployeeWorkList from './components/Employee/EmployeeWork'
import DepartmentList from './components/Department/DepartmentList';
import DesignationList from './components/Designation/DesignationList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employeework" element={<EmployeeWorkList />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/designations" element={<DesignationList />} />
      </Routes>
    </Router>
  );
}

export default App;