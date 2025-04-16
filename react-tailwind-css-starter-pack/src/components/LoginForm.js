import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';

const LoginForm = ({ role, setisLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminEmail: '',
    adminPassword: '',
    managerEmail: '',
    managerPassword: '',
    employeeEmail: '',
    employeePassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailField = `${role}Email`;
    const passwordField = `${role}Password`;

    const payload = {
      [emailField]: formData[emailField],
      [passwordField]: formData[passwordField],
    };

    try {
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

      if (role === 'employee') {
        localStorage.setItem('employeeId', payload.employeeEmail); 
      }

      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} login successful`);
      setisLogin(true);
      navigate(`/${role}`);
    } catch (err) {
      const message = err.response?.data?.message?.toLowerCase() || 'unknown error';

      if (message.includes('email')) {
        setErrorMessage('Incorrect email.');
      } else if (message.includes('password')) {
        setErrorMessage('Incorrect password.');
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }

    }
  };

  const emailField = `${role}Email`;
  const passwordField = `${role}Password`;

  return (
    <form onSubmit={handleLogin} className="mt-6 space-y-4">
      {errorMessage && (
        <div className="text-red-500 bg-red-100 px-4 py-2 rounded">{errorMessage}</div>
      )}
      <div>
        <label className="text-white block">Email:</label>
        <input
          type="email"
          name={emailField}
          className="w-full p-2 rounded"
          value={formData[emailField]}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="text-white block">Password:</label>
        <input
          type="password"
          name={passwordField}
          className="w-full p-2 rounded"
          value={formData[passwordField]}
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
