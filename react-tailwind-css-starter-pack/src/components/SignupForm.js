import React, { useEffect, useState } from 'react';
import apiService from '../api/apiService';

const SignupForm = ({ role, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  
  useEffect(() => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
    });
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const payload = {
      [`${role}FullName`]: formData.fullName,
      [`${role}Email`]: formData.email,
      [`${role}Password`]: formData.password,
    };

    try {
      if (role === 'admin') {
        await apiService.adminSignup(payload);
      } else if (role === 'manager') {
        await apiService.managerSignup(payload);
      } else {
        await apiService.employeeSignup(payload);
      }

      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} Signup successful`);

      if (onSignupSuccess) {
        onSignupSuccess();
      }
    } catch (err) {
      alert('email already present');
    }
  };

  return (
    <form onSubmit={handleSignup} className="mt-6 space-y-4">
      <div>
        <label className="text-white block">Full Name:</label>
        <input
          type="text"
          name="fullName"
          className="w-full p-2 rounded"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="text-white block">Email:</label>
        <input
          type="email"
          name="email"
          className="w-full p-2 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="text-white block">Password:</label>
        <input
          type="password"
          name="password"
          className="w-full p-2 rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Signup as {role.charAt(0).toUpperCase() + role.slice(1)}
      </button>
    </form>
  );
};

export default SignupForm;
