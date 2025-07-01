// src/components/Employee/EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeList.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { wait } from '@testing-library/user-event/dist/utils';
function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
   const [designations, setDesignations] = useState([]);
  const [form, setForm] = useState({ id: 0, name: '', email: '', phone: '', department: '', designation: '' });

  const fetchEmployees = async () => {
  const [employeeRes, departmentRes,designations] = await Promise.all([
          axios.get('https://localhost:5001/api/Employee'),
          axios.get('https://localhost:5001/api/Department'),
          axios.get('https://localhost:5001/api/Designation'),
        ]);
        setEmployees(employeeRes.data);
        setDepartments(departmentRes.data);
        setDesignations(designations.data);
  };
  const handleSubmit = async () => {
    if (form.id === 0) {
      await axios.post('https://localhost:5001/api/Employee', form);
    } else {
      await axios.put(`https://localhost:5001/api/Employee/${form.id}`, form);
    }
    fetchEmployees();
    setForm({ id: 0, name: '', email: '', phone: '', department: '', designation: '' });
  };

  const handleEdit = (emp) => {
    setForm(emp);
  };

  const handleDelete = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      await axios.delete(`https://localhost:5001/api/Employee/${id}`).then(fetchEmployees);
      alert("Item deleted!");
    } else {
      // Cancelled
      console.log("Delete cancelled.");
    }  
  };
  const handleClose = () => {
    setForm({ id: 0, name: '', email: '', phone: '', department: '', designation: '' });
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
    <div className='emp-main-form'>
      <Link className='emp-home' to="/dashboard">[Home]</Link>
      <h2> Add Employee </h2>
      <div className='emp-input'>
        <input placeholder=" Enter Name"  value={form.name} required onChange={(e) => setForm({ ...form, name: e.target.value })}  />
        <input placeholder=" Enter Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
        <input placeholder=" Enter Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}/>
        
        {/* Department Dropdown */}
       <select value={form.department} onChange={(e) =>setForm({ ...form, department: e.target.value })}required>
        <option value="">Select Department</option>
        {departments.map((dept, index) => (
          <option key={index} value={dept.name || dept}>
            {dept.name || dept}
          </option>
        ))}
      </select>
        {/* Designation Dropdown */}
<select value={form.designations} onChange={(e) => setForm({ ...form, designation: e.target.value })} required>
  <option value="">Select Designation</option>
  {designations.map((desig, index) => (
    <option key={index} value={desig.title || desig}>
      {desig.title || desig}
    </option>
  ))}
</select>
        <button  type="submit" className='btn-sub-up ' onClick={handleSubmit} >{form.id === 0 ? 'Add' : 'Update'} Employee</button>
        <button  type="submit" className='btn-close' onClick={handleClose}>Close</button>
      </div>    
    </div>
    <div className='emp-table'>
    <h2 style={{ marginTop: '2rem' }}>Employee List</h2>
      <table style={{ width: '50%', borderCollapse: 'collapse',justifyContent:"center" }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Email</th>
            <th style={cellStyle}>Phone</th>
            <th style={cellStyle}>Department</th>
            <th style={cellStyle}>Designation</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td style={cellStyle}>{emp.name}</td>
              <td style={cellStyle}>{emp.email}</td>
              <td style={cellStyle}>{emp.phone}</td>
              <td style={cellStyle}>{emp.department}</td>
              <td style={cellStyle}>{emp.designation}</td>
              <td style={cellStyle}>
                <FontAwesomeIcon onClick={() => handleEdit(emp)}  icon={faEdit} />
                 <FontAwesomeIcon onClick={() => handleDelete(emp.id)} icon={faTrash} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </>
  );
}
// Inline styles for table
const cellStyle = {
  border: '1px solid #ddd',
  padding: '0.5rem',
  textAlign: 'left'
};

const actionBtn = {
  padding: '0.3rem 0.6rem',
  marginRight: '0.5rem',
  background: '#4f46e5',
  color: 'white',
  border: 'none',
  cursor: 'pointer'
};
export default EmployeeList;
