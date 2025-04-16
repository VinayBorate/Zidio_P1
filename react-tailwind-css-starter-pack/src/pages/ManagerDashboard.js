import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';

function ManagerDashboard() {
  const [pendingExpenses, setPendingExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [view, setView] = useState('pending'); // 'pending' or 'all'
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const res = await apiService.getAllExpenses();
      const all = res.data.data;
      const pending = all.filter(exp => exp.status === 'PENDING');
      setPendingExpenses(pending);
      setAllExpenses(all);
    } catch (err) {
      alert('Failed to fetch expenses');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleApprove = async (expense) => {
    if (expense.amount >= 100000) {
      alert("Approval for expenses above ₹1 lakh must be done by Admin.");
      return;
    }

    try {
      await apiService.approveExpense(expense.id);
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

  const handleDelete = async (id) => {
    try {
      await apiService.deleteExpense(id);
      alert('Expense deleted');
      fetchExpenses();
    } catch (err) {
      alert('Delete failed');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/');
  };

  const displayedExpenses = view === 'pending' ? pendingExpenses : allExpenses;

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

      {/* Toggle View Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView('pending')}
          className={`px-4 py-2 rounded ${view === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          View Pending
        </button>
        <button
          onClick={() => setView('all')}
          className={`px-4 py-2 rounded ${view === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          View All
        </button>
      </div>

      <h3 className="text-xl mb-4">
        {view === 'pending' ? 'Pending Expenses' : 'All Expenses'}
      </h3>

      {displayedExpenses.length === 0 ? (
        <p>No {view} expenses.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Submitted By</th>
              {view === 'all' && (
                <th className="border p-2">ApprovedBy / RejectedBy</th>
              )}
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedExpenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border p-2" align="center">{expense.id}</td>
                <td className="border p-2" align="center">₹{expense.amount}</td>
                <td className="border p-2" align="center">{expense.description}</td>
                <td className="border p-2" align="center">{expense.category}</td>
                <td className="border p-2" align="center">{expense.status}</td>
                <td className="border p-2" align="center">{expense.date}</td>
                <td className="border p-2" align="center">{expense.submittedBy}</td>
                {view === 'all' && (
                  <td className="border p-2" align="center">
                    {expense.approvedBy || expense.rejectedBy || '-'}
                  </td>
                )}
                <td className="border p-2 space-x-2" align="center">
                  {expense.status === 'PENDING' && (
                    <>
                      <button
                        className="bg-green-500 text-white px-3 py-1"
                        onClick={() => handleApprove(expense)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1"
                        onClick={() => handleReject(expense.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="bg-yellow-500 text-white px-3 py-1"
                    onClick={() => handleDelete(expense.id)}
                  >
                    Delete
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
