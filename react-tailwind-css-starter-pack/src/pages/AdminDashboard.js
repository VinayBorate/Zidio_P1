import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';

function AdminDashboard() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [aboveOneLakh, setAboveOneLakh] = useState([]);
  const [viewHighValueOnly, setViewHighValueOnly] = useState(false); // Toggle flag

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/');
  };

  const fetchExpenses = async () => {
    try {
      const res = await apiService.getAllExpenses();
      setExpenses(res.data.data);
    } catch (err) {
      alert('Failed to fetch all expenses');
      console.error(err);
    }
  };

  const fetchAboveOneLakh = async () => {
    try {
      const res = await apiService.getExpensesAboveOneLakh();
      setAboveOneLakh(res.data.data);
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

  const handleApprove = async (expenseId) => {
    try {
      await apiService.approveExpense(expenseId);
      alert('Expense approved');
      fetchExpenses();
      fetchAboveOneLakh();
    } catch (err) {
      alert('Approval failed');
      console.error(err);
    }
  };

  const handleReject = async (expenseId) => {
    try {
      await apiService.rejectExpense(expenseId);
      alert('Expense rejected');
      fetchExpenses();
      fetchAboveOneLakh();
    } catch (err) {
      alert('Rejection failed');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchAboveOneLakh();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Toggle Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setViewHighValueOnly(!viewHighValueOnly)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {viewHighValueOnly ? 'Show All Expenses' : 'Show ₹1 Lakh+ Only'}
        </button>
      </div>

      {/* Conditional Table Rendering */}
      {viewHighValueOnly ? (
        <>
          <h3 className="text-xl mb-2">Expenses Above ₹1 Lakh</h3>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Submitted By</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">ApprovedBy / RejectedBy</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {aboveOneLakh.map((exp) => (
                <tr key={exp.id}>
                  <td className="border p-2" align='center'>{exp.id}</td>
                  <td className="border p-2" align='center'>₹{exp.amount}</td>
                  <td className="border p-2" align='center'>{exp.submittedBy || exp.employeeId}</td>
                  <td className="border p-2" align='center'>{exp.description}</td>
                  <td className="border p-2"align='center'>{exp.category}</td>
                  <td className="border p-2"align='center'>{exp.status}</td>
                  <td className="border p-2"align='center'>{exp.date}</td>
                  <td className="border p-2"align='center'>{exp.approvedBy}</td>
                  <td className="border p-2 space-x-2">
                    {exp.status === 'PENDING' && (
                      <>
                        <button
                          className="bg-green-600 text-white px-3 py-1"
                          onClick={() => handleApprove(exp.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1"
                          onClick={() => handleReject(exp.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      className="bg-yellow-500 text-white px-3 py-1"
                      onClick={() => handleDelete(exp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h3 className="text-xl mb-2">All Expenses</h3>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Submitted By</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">ApprovedBy / RejectedBy</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td className="border p-2" align='center'>{exp.id}</td>
                  <td className="border p-2"align='center'>{exp.submittedBy || exp.employeeId}</td>
                  <td className="border p-2"align='center'>₹{exp.amount}</td>
                  <td className="border p-2"align='center'>{exp.description}</td>
                  <td className="border p-2"align='center'>{exp.category}</td>
                  <td className="border p-2"align='center'>{exp.status}</td>
                  <td className="border p-2"align='center'>{exp.date}</td>
                  <td className="border p-2"align='center'>{exp.approvedBy}</td>
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
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
