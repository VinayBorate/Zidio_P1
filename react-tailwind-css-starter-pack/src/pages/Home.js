
import React, { useState, useEffect } from 'react';

const Home = () => {

  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/users'); // Replace with your backend endpoint
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle approve action
  const handleApprove = async (id) => {
    try {
      await fetch(`http://localhost:8080/users/${id}/approve`, { // Replace with your backend endpoint
        method: 'PUT',
      });
      fetchUsers(); // Refresh the list after approval
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  // Handle reject action
  const handleReject = async (id) => {
    try {
      await fetch(`http://localhost:8080/users/${id}/reject`, { // Replace with your backend endpoint
        method: 'PUT',
      });
      fetchUsers(); // Refresh the list after rejection
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };
  


  return (
    <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type of Expense
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Picture
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.typeOfExpense}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={`data:image/jpeg;base64,${user.pic}`} // Assuming the picture is sent as a base64 string
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${user.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => handleApprove(user.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Home;