import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

const LoginSignupPage = ({setisLogin}) => {
   
  const [isLoginForm,setIsLoginForm] = useState(true); 

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

       <div>
       {isLoginForm ? <LoginForm setisLogin={setisLogin}/> : <SignupForm setisLogin={setisLogin}/>}
       </div>
       
       
    </div>
         <div className="sm:w-2/5 bg-slate-950">
            <img
              className=""
              src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
    </div>
  )
}

export default LoginSignupPage