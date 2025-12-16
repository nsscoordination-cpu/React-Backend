import React, { useState, useEffect } from 'react';
import './EditCordinator.css';
import api from '../../api';

function EditCordinator({ goToPage, data }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: '',
  });

  // Load the selected coordinator values into form
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        phone: data.phone || '',
        department: data.department || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/coordinator/update/${data._id}`, formData);

      // After success → redirect to Manage Coordinators
      goToPage("Coordinators");

    } catch (error) {
      console.error('Error updating coordinator:', error);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="coordinator-form" onSubmit={handleSubmit}>
        <h2>Edit Coordinator</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Update Coordinator
        </button>
      </form>
    </div>
  );
}

export default EditCordinator;
