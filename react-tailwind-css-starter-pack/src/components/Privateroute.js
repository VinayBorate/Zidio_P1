import React from 'react'
import { Navigate } from 'react-router-dom';

const Privateroute = ({isLogin,children}) => {
    if(isLogin){
        return children;
    }
    else{
        return <Navigate to='/' replace/>
    }
}

export default Privateroute