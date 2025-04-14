import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import apiService from '../api/apiService';

function EmployeeDashboard({ employeeId }) {
  const navigate = useNavigate(); //

  const [formData, setFormData] = useState({
    employeeId: employeeId || '',
    amount: '',
    description: '',
    category: '',
  });
  const [expenses, setExpenses] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/'); 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.submitExpense(formData);
      alert('Expense submitted');

      const res = await apiService.getAllExpenses();
      const userExpenses = res.data.data.filter(
        (exp) => exp.employeeId === formData.employeeId
      );
      setExpenses(userExpenses);
    } catch (err) {
      alert('Failed to submit');
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await apiService.getAllExpenses();
        const userExpenses = res.data.data.filter(
          (exp) => exp.employeeId === formData.employeeId
        );
        setExpenses(userExpenses);
      } catch (err) {
        alert('Error loading expenses');
        console.error(err);
      }
    };

    fetchExpenses();
  }, [formData.employeeId]);

  return (
    <div className="p-6">
      {/*  Logout Button */}
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
            className="border p-2 w-full"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description:</label>
          <input
            type="text"
            name="description"
            className="border p-2 w-full"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Category:</label>
          <input
            type="text"
            name="category"
            className="border p-2 w-full"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-4"
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
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td className="border p-2">{exp.id}</td>
              <td className="border p-2">₹{exp.amount}</td>
              <td className="border p-2">{exp.description}</td>
              <td className="border p-2">{exp.category}</td>
              <td className="border p-2">{exp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDashboard;
