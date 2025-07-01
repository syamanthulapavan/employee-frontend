// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import  './Dashboard.css';
function Dashboard() {
  return (
    <>
   <div className='db-navber-all'>
    <div className='db-group-item'>
      <button className='Log-out'><Link to="/">LogOut</Link></button>
      <h2 style={{color:"white"}}> Wel Come To Employee ManageMent</h2>
    </div>
   </div>
    <div className='db-main'>
      <div className='db-navbar'>
        <h2 style={{color:"white"}}>Dashboard</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li><Link to="/employeework" style={{ textDecoration: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Manage Employees Work</Link></li>
          <li className='bi bi-envelope-fill'><Link to="/employees" style={{ textDecoration: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Manage Employees</Link></li>
          <li><Link to="/departments" style={{ textDecoration: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Manage Departments</Link></li>
          <li><Link to="/designations" style={{ textDecoration: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Manage Designations</Link></li>
        </ul>
      </div>
    </div>
     </>
  );
}
export default Dashboard;