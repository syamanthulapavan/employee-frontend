// src/components/Department/DepartmentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ id: 0, name: '' });

  const fetchDepartments = () => {
    axios.get('https://localhost:5001/api/Department').then(res => setDepartments(res.data));
  };

  const handleSubmit = () => {
    if (form.id === 0) {
      axios.post('https://localhost:5001/api/Department', { name: form.name }).then(() => {
        fetchDepartments();
        setForm({ id: 0, name: '' });
      });
    } 
    else {
      axios.put(`https://localhost:5001/api/Department/${form.id}`, form).then(() => {
        fetchDepartments();
        setForm({ id: 0, name: '' });
      });
    }
  };

  const handleEdit = (dept) => {
    setForm(dept);
  };

  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
          axios.delete(`https://localhost:5001/api/Department/${id}`).then(fetchDepartments);
      // Proceed with delete
      alert("Item deleted!");
    } else {
      // Cancelled
      console.log("Delete cancelled.");
    }
  };
  const handleClose = () => {
    setForm({ id: 0, name: ''});
  };
  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <>
    <div className='emp-main-form'>
      <Link className='emp-home' to="/dashboard">[Home]</Link>
      <h2>Department List</h2>
      <div className='emp-input'>
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Department Name" />
           <button className='btn-sub-up' onClick={handleSubmit} >{form.id === 0 ? 'Add' : 'Update'} Department</button>
        <button className='btn-close' onClick={handleClose}>Close</button>
   </div>
   </div>
 <div className='emp-table'>
    <h2 style={{ marginTop: '2rem' }}>Department List</h2>
      <table style={{ width: '50%', borderCollapse: 'collapse',justifyContent:"center" }}>
        <thead>
          <tr style={{ background: 'red' }}>
            <th style={cellStyle}>Department ID</th>
            <th style={cellStyle}>Department Name</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(dept=> (
            <tr key={dept.id}>
               <td style={cellStyle}>{dept.id}</td>
              <td style={cellStyle}>{dept.name}</td>
              <td style={cellStyle}>
                <FontAwesomeIcon onClick={() => handleEdit(dept)}  icon={faEdit} />
                 <FontAwesomeIcon onClick={() => handleDelete(dept.id)} icon={faTrash} />
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
export default DepartmentList;
