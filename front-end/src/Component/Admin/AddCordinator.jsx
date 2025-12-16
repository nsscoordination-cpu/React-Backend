import React, { useState } from 'react';
import './Cordinator.css';
import api from '../../api';

function AddCordinator({ goToPage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/coordinator/add', formData);

      // Clear fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        password: ''
      });

      // 🔥 Go to Manage Coordinators Page
      goToPage("Coordinators"); 
      alert(res.data.message || "registration successfull")
      

    } catch (error) {
      console.error('Error adding coordinator:', error);
      alert(error.response.data.message || "coordinator registration failed")
    }
  };

  return (
    <div className="form-wrapper">
      <form className="coordinator-form" onSubmit={handleSubmit}>
        <h2>Add Coordinator</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter department"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Coordinator</button>
      </form>
    </div>
  );
}

export default AddCordinator;
