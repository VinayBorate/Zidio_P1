import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navebar from './components/Navebar';
import LoginSignupPage from './pages/LoginSignupPage';
import Privateroute from './components/Privateroute';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashbord from './pages/EmployeeDashbord';
import ManagerDashboard from './pages/ManagerDashboard';
import DisableBackButton from './components/DisableBackButton';


const App = () => {
  const[isLogin,setisLogin] = useState(false);
  return (
    <div className=' w-screen min-h-screen flex flex-col'>
   
    
      <Router>
      <DisableBackButton/>
      <Routes>
        <Route path='/' element={<LoginSignupPage setisLogin={setisLogin}/>} />
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
