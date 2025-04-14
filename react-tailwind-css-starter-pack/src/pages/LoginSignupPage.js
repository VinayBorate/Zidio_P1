import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const LoginSignupPage = ({ setisLogin }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [selectedRole, setSelectedRole] = useState('employee');

  return (
    <div className='bg-black sm:flex sm:flex-row sm:items-center sm:justify-center sm:h-screen'>
      <div className='mx-11 px-11'>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded ${isLoginForm ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            onClick={() => setIsLoginForm(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded ${!isLoginForm ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            onClick={() => setIsLoginForm(false)}
          >
            Signup
          </button>
        </div>

        <div className="mt-4 text-white">
          <label className="mr-2">Select Role:</label>
          <select
            className="text-black px-2 py-1"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <div className="mt-4">
          {isLoginForm ? (
            <LoginForm role={selectedRole} setisLogin={setisLogin} />
          ) : (
            <SignupForm
              role={selectedRole}
              setisLogin={setisLogin}
              onSignupSuccess={() => setIsLoginForm(true)} 
            />
          )}
        </div>
      </div>

      <div className="sm:w-2/5 bg-slate-950">
        <img
          src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg"
          alt=""
        />
      </div>
    </div>
  );
};

export default LoginSignupPage;
