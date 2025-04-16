import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';

function EmployeeDashboard() {
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem('employeeId'); 

  const [formData, setFormData] = useState({
    submittedBy: storedEmail || '',
    amount: '',
    description: '',
    category: '',
  });

  const [expenses, setExpenses] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('employeeId');
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const fetchExpenses = useCallback(async () => {
    try {
      const res = await apiService.getAllExpenses();
      const userExpenses = res.data.data.filter(
        (exp) => exp.submittedBy === storedEmail
      );
      setExpenses(userExpenses);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  }, [storedEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.submitExpense(formData);
      alert('Expense submitted');
      setFormData({
        submittedBy: storedEmail,
        amount: '',
        description: '',
        category: '',
      });
      fetchExpenses(); 
    } catch (err) {
      console.error('Error submitting expense:', err);
      alert('Failed to submit expense');
    }
  };

  useEffect(() => {
    if (storedEmail) {
      fetchExpenses();
    } else {
      console.warn('No employee email found in localStorage');
    }
  }, [storedEmail, fetchExpenses]); 

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Employee Dashboard</h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block mb-1">Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-2"
        >
          Submit Expense
        </button>
      </form>

      <h3 className="text-xl mb-2">Your Expenses</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">ApprovedBy / RejectedBy </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td className="border p-2" align='center'>{exp.id}</td>
              <td className="border p-2" align='center'>₹{exp.amount}</td>
              <td className="border p-2" align='center'>{exp.description}</td>
              <td className="border p-2" align='center'>{exp.category}</td>
              <td className="border p-2" align='center'>{exp.status}</td>
              <td className="border p-2" align='center'>{exp.date}</td>
              <td className="border p-2" align='center'>{exp.approvedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDashboard;
