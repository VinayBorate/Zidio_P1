import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ Import navigate
import apiService from '../api/apiService';

const LoginForm = ({ role, setisLogin }) => {
  const navigate = useNavigate(); // ⬅️ Initialize navigate
  const [formData, setFormData] = useState({
    [`${role}Email`]: '',
    [`${role}Password`]: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let payload;

      if (role === 'admin') {
        payload = {
          adminEmail: formData.adminEmail,
          adminPassword: formData.adminPassword,
        };
      } else if (role === 'manager') {
        payload = {
          managerEmail: formData.managerEmail,
          managerPassword: formData.managerPassword,
        };
      } else {
        payload = {
          employeeEmail: formData.employeeEmail,
          employeePassword: formData.employeePassword,
        };
      }

      let res;

      if (role === 'admin') {
        res = await apiService.adminLogin(payload);
      } else if (role === 'manager') {
        res = await apiService.managerLogin(payload);
      } else {
        res = await apiService.employeeLogin(payload);
      }

      const token = res.data.token;
      localStorage.setItem('jwtToken', token);

      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} Login successful`);
      setisLogin(true);
      console.log('Token:', token);

      // ⬇️ Navigate to the correct dashboard
      navigate(`/${role}`);

    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
        Login as {role.charAt(0).toUpperCase() + role.slice(1)}
      </button>
    </form>
  );
};

export default LoginForm;
