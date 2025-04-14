import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';

function ManagerDashboard() {
  const [pendingExpenses, setPendingExpenses] = useState([]);
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const res = await apiService.getPendingExpenses();
      setPendingExpenses(res.data);
    } catch (err) {
      alert('Failed to fetch expenses');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleApprove = async (id) => {
    try {
      await apiService.approveExpense(id);
      alert('Expense approved');
      fetchExpenses();
    } catch (err) {
      alert('Approval failed');
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await apiService.rejectExpense(id);
      alert('Expense rejected');
      fetchExpenses();
    } catch (err) {
      alert('Rejection failed');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/');
  };

  return (
    <div className="p-6">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manager Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h3 className="text-xl mb-4">Pending Expenses</h3>
      {pendingExpenses.length === 0 ? (
        <p>No pending expenses.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingExpenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border p-2">{expense.id}</td>
                <td className="border p-2">₹{expense.amount}</td>
                <td className="border p-2">{expense.description}</td>
                <td className="border p-2">{expense.category}</td>
                <td className="border p-2 space-x-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1"
                    onClick={() => handleApprove(expense.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1"
                    onClick={() => handleReject(expense.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManagerDashboard;
