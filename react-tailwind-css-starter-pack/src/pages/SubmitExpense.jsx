import React, { useState } from 'react';
import apiService from '../api/apiService';

function SubmitExpense() {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    employeeId: '', 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await apiService.submitExpense(formData);
      alert('Expense submitted successfully');
      console.log(res.data);
    } catch (err) {
      alert('Submission failed');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Submit Expense</h2>
      <input
        name="employeeId"
        placeholder="Employee ID"
        className="border p-2 mb-2 w-full"
        onChange={handleChange}
      />
      <input
        name="amount"
        placeholder="Amount"
        className="border p-2 mb-2 w-full"
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        className="border p-2 mb-2 w-full"
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        className="border p-2 mb-2 w-full"
        onChange={handleChange}
      />
      <button className="bg-blue-600 text-white px-4 py-2" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default SubmitExpense;
