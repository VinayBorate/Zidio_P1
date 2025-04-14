import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import apiService from '../api/apiService';

function AdminDashboard() {
  const navigate = useNavigate(); 

  const [expenses, setExpenses] = useState([]);
  const [aboveOneLakh, setAboveOneLakh] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/');
  };

  const fetchExpenses = async () => {
    try {
      const res = await apiService.getAllExpenses();
      setExpenses(res.data);
    } catch (err) {
      alert('Failed to fetch all expenses');
      console.error(err);
    }
  };

  const fetchAboveOneLakh = async () => {
    try {
      const res = await apiService.getExpensesAboveOneLakh();
      setAboveOneLakh(res.data);
    } catch (err) {
      alert('Failed to fetch high-value expenses');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteExpense(id);
      alert('Expense deleted');
      fetchExpenses();
      fetchAboveOneLakh();
    } catch (err) {
      alert('Delete failed');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchAboveOneLakh();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-xl mb-2">All Expenses</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Employee ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td className="border p-2">{exp.id}</td>
                <td className="border p-2">{exp.employeeId}</td>
                <td className="border p-2">₹{exp.amount}</td>
                <td className="border p-2">{exp.description}</td>
                <td className="border p-2">{exp.category}</td>
                <td className="border p-2">{exp.status}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-600 text-white px-3 py-1"
                    onClick={() => handleDelete(exp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-xl mb-2">Expenses Above ₹1 Lakh</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Employee ID</th>
              <th className="border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {aboveOneLakh.map((exp) => (
              <tr key={exp.id}>
                <td className="border p-2">{exp.id}</td>
                <td className="border p-2">₹{exp.amount}</td>
                <td className="border p-2">{exp.employeeId}</td>
                <td className="border p-2">{exp.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
