// src/components/Designation/DesignationList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
function DesignationList() {
  const [designations, setDesignations] = useState([]);
  const [form, setForm] = useState({ id: 0, title: '' });

  const fetchDesignations = () => {
    axios.get('https://localhost:5001/api/Designation').then(res => setDesignations(res.data));
  };

  const handleSubmit = () => {
    if (form.id === 0) {
      axios.post('https://localhost:5001/api/Designation', { title: form.title }).then(() => {
        fetchDesignations();
        setForm({ id: 0, title: '' });
      });
    } else {
      axios.put(`https://localhost:5001/api/Designation/${form.id}`, form).then(() => {
        fetchDesignations();
        setForm({ id: 0, title: '' });
      });
    }
  };

  const handleEdit = (des) => {
    setForm(des);
  };

  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
        axios.delete(`https://localhost:5001/api/Designation/${id}`).then(fetchDesignations);
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
    fetchDesignations();
  }, []);

  return (
    <>
    <div className='emp-main-form'>
       <Link className='emp-home' to="/dashboard">[Home]</Link>
      <h2>Designation List</h2>
      <div className='emp-input'> 
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Designation Title" />
        <button className='btn-sub-up' onClick={handleSubmit} >{form.id === 0 ? 'Add' : 'Update'} Designation</button>
        <button className='btn-close' onClick={handleClose}>Close</button>
      </div>
  </div>
 <div className='emp-table'>
    <h2 style={{ marginTop: '2rem' }}>Designation List</h2>
      <table style={{ width: '50%', borderCollapse: 'collapse',justifyContent:"center" }}>
        <thead>
          <tr style={{ background: 'red' }}>
            <th style={cellStyle}>Designation ID</th>
            <th style={cellStyle}>Designation Name</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {designations.map(des=> (
            <tr key={des.id}>
               <td style={cellStyle}>{des.id}</td>
              <td style={cellStyle}>{des.title}</td>
              <td style={cellStyle}>
                <FontAwesomeIcon onClick={() => handleEdit(des)}  icon={faEdit} />
                 <FontAwesomeIcon onClick={() => handleDelete(des.id)} icon={faTrash} />
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
export default DesignationList;
