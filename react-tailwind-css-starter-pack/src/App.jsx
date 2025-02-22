import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navebar from './components/Navebar';
import LoginSignupPage from './pages/LoginSignupPage';
import  Home  from './pages/Home';
import Privateroute from './components/Privateroute';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashbord from './pages/EmployeeDashbord';
import ManagerDashboard from './pages/ManagerDashboard';


const App = () => {
  const[isLogin,setisLogin] = useState(false);
  return (
    <div className=' w-screen min-h-screen flex flex-col'>
   
    
      <Router>
      
      <Routes>
        <Route path='/' element={<LoginSignupPage setisLogin={setisLogin}/>} />
        
        <Route path='/home' element={
           <Privateroute isLogin={isLogin}>
            <Navebar />
           <Home/>
          </Privateroute>
        }/>
        <Route path='/admin' element={
           <Privateroute isLogin={isLogin}>
            <Navebar />
            <AdminDashboard/>
          </Privateroute>
        }/>
        <Route path='/manager' element={
           <Privateroute isLogin={isLogin}>
            <Navebar />
          <ManagerDashboard />
          </Privateroute>
        }/>
        <Route path='/employee' element={
           <Privateroute isLogin={isLogin}>
            <Navebar />
            <EmployeeDashbord />
          </Privateroute>
        }/>
      </Routes>
    </Router>
    </div>
  );
};

export default App;
