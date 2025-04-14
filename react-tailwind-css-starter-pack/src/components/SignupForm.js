import React, { useState } from 'react';
import apiService from '../api/apiService';

const SignupForm = ({ role, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    [`${role}FullName`]: '',
    [`${role}Email`]: '',
    [`${role}Password`]: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (role === 'admin') {
        await apiService.adminSignup(formData);
      } else if (role === 'manager') {
        await apiService.managerSignup(formData);
      } else {
        await apiService.employeeSignup(formData);
      }

      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} Signup successful`);

      
      if (onSignupSuccess) {
        onSignupSuccess();
      }
    } catch (err) {
      alert('Signup failed');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSignup} className="mt-6 space-y-4">
      <div>
        <label className="text-white block">Full Name:</label>
        <input
          type="text"
          name={`${role}FullName`}
          className="w-full p-2 rounded"
          value={formData[`${role}FullName`]}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="text-white block">Email:</label>
        <input
          type="email"
          name={`${role}Email`}
          className="w-full p-2 rounded"
          value={formData[`${role}Email`]}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="text-white block">Password:</label>
        <input
          type="password"
          name={`${role}Password`}
          className="w-full p-2 rounded"
          value={formData[`${role}Password`]}
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
