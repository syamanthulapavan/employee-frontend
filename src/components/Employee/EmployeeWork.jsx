// src/components/Employee/EmployeeWork.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeList.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [empdata, setEmpdata] = useState([]);
  const [form, setForm] = useState({ eId:'', eName: '', email: '', ePhone: '', eDepartment: '', eDesignation: '',eWork:'',status:'' });
  const [btn,setBtn]=useState([]);
  const fetchEmployees = async () => {
    debugger


  const [employeeRes, departmentRes,designations,empdata] = await Promise.all([
          axios.get('https://localhost:5001/api/Employee/work'),
          axios.get('https://localhost:5001/api/Department'),
          axios.get('https://localhost:5001/api/Designation'),
         axios.get('https://localhost:5001/api/Employee'),
        ]);
        debugger
        setEmployees(employeeRes.data);
        setDepartments(departmentRes.data);
        setDesignations(designations.data);
        setEmpdata(empdata.data);
  };
  const handleSubmit = async () => {
    debugger
    if (btn === 0) {
      await axios.post('https://localhost:5001/api/Employee/work', form);
    } else {
      await axios.put(`https://localhost:5001/api/Employee/work${form.eId}`, form);
    }
    fetchEmployees();
    setForm({ eId:'', eName: '', email: '', ePhone: '', eDepartment: '', eDesignation: '',eWork:'',status:'' });
  };

  const handleEdit = (emp) => {
    debugger
    setForm(emp);
     setBtn(emp.eId);
  };

  const handleDelete = async (eId) => {
    const EId=eId;
  const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      await axios.delete(`https://localhost:5001/api/Employee/work${EId}`).then(fetchEmployees);
      alert("Item deleted!");
    } else {
      // Cancelled
      console.log("Delete cancelled.");
    }  
  };
  const handleClose = () => {
    setForm({ eId:'', eName: '', email: '', ePhone: '', eDepartment: '', eDesignation: '',eWork:'',status:'' });
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
    <div className='emp-main-form'>
      <Link className='emp-home' to="/dashboard">[Home]</Link>
      <h2>  Employee </h2>
      <div className='emp-input'>

      <select value={form.eId} onChange={(e) =>setForm({ ...form, eId: e.target.value })}required>
        <option value="">----- Employee ID -----</option>
        {empdata.map((emp, index) => (
          <option key={index} value={emp.id || emp}>
            {emp.id || emp}
          </option>
        ))}
      </select>
      <select value={form.eName} onChange={(e) =>setForm({ ...form, eName: e.target.value })}required>
        <option value="">----- Employee Name -----</option>
        {empdata.map((emp, index) => (
          <option key={index} value={emp.name || emp}>
            {emp.name || emp}
          </option>
        ))}
      </select>
       <select value={form.email} onChange={(e) =>setForm({ ...form, email: e.target.value })}required>
        <option value="">----- Employee Email -----</option>
        {empdata.map((emp, index) => (
          <option key={index} value={emp.email || emp}>
            {emp.email || emp}
          </option>
        ))}
      </select>

     <select value={form.ePhone} onChange={(e) =>setForm({ ...form, ePhone: e.target.value })}required>
        <option value="">----- Employee Phone Number -----</option>
        {empdata.map((emp, index) => (
          <option key={index} value={emp.phone+(emp.name) || emp}>
            {emp.phone || emp}
          </option>
        ))}
      </select>  
        {/* Department Dropdown */}
       <select value={form.eDepartment} onChange={(e) =>setForm({ ...form, eDepartment: e.target.value })}required>
        <option value="">----- Select Department -----</option>
        {departments.map((dept, index) => (
          <option key={index} value={dept.name || dept}>
            {dept.name || dept}
          </option>
        ))}
      </select>
        {/* Designation Dropdown */}
<select value={form.eDesignation} onChange={(e) => setForm({ ...form, eDesignation: e.target.value })} required>
  <option value="">----- Select Employee Designation -----</option>
  {designations.map((desig, index) => (
    <option key={index} value={desig.title || desig}>
      {desig.title || desig}
    </option>
  ))}
</select>
 <input placeholder=" Work Assngning To Employee"  value={form.eWork} required onChange={(e) => setForm({ ...form, eWork: e.target.value })}  />
         {/* Designation Status */}
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
        <option value="">----- Select Status -----</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Pending">Pending</option>
      </select>
        <button  type="submit" className='btn-sub-up ' onClick={handleSubmit} >{btn == 0? 'Add' : 'Update'} Employee</button>
        <button  type="submit" className='btn-close' onClick={handleClose}>Close</button>
      </div>    
    </div>
    <div className='emp-table'>
    <h2 style={{ marginTop: '2rem' }}>Employee List</h2>
      <table style={{ width: '50%', borderCollapse: 'collapse',justifyContent:"center" }}>
        <thead>
          <tr style={{ background: 'red' }}>
            <th style={cellStyle}>Employee ID</th>
            <th style={cellStyle}>Employee Name</th>
            <th style={cellStyle}>Employee Email</th>
            <th style={cellStyle}>EmployeePhone</th>
            <th style={cellStyle}>Employee Department</th>
            <th style={cellStyle}>Employee Designation</th>
            <th style={cellStyle}>Employee Work</th>
            <th style={cellStyle}>Employee Status</th>
            <th style={cellStyle}>Employee Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
            <td style={cellStyle}>{emp.eId}</td>
              <td style={cellStyle}>{emp.eName}</td>
              <td style={cellStyle}>{emp.email}</td>
              <td style={cellStyle}>{emp.ePhone}</td>
              <td style={cellStyle}>{emp.eDepartment}</td>
              <td style={cellStyle}>{emp.eDesignation}</td>
              <td style={cellStyle}>{emp.eWork}</td>
              <td style={cellStyle}>{emp.status}</td>
              <td style={cellStyle}>
                <FontAwesomeIcon onClick={() => handleEdit(emp)}  icon={faEdit} />
                <FontAwesomeIcon onClick={() => handleDelete(emp.eId)} icon={faTrash} />
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
