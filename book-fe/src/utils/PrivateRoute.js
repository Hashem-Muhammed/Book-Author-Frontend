import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export const PrivateRoute = () => {
    let { contextData } = useContext(AuthContext);
let { authTokens } = contextData;
    const auth = authTokens; // determine if authorized, from context or however you're doing it
    console.log(authTokens)
    
    return auth ? <Outlet /> : <Navigate to="/login" />;
}
  
// export const getUser = ()=>
// {   
//     let { contextData } = useContext(AuthContext);
//     let { authTokens } = contextData;
//     let user = jwt_decode(authTokens.access)
//     return user

// }