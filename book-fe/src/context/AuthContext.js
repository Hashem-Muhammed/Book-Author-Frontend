import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  const [user, setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(authTokens.access) : null);
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  );
  const navigate = useNavigate();
  const [refreshTimeout, setRefreshTimeout] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      localStorage.setItem('authTokens', JSON.stringify(data));
      setUser(jwt_decode(data.access));
      navigate('/');

    } 
    
    return response;
  };

  let getUser = async () => {
    let authTokens = JSON.parse(localStorage.getItem('authTokens'));
    let accessToken = authTokens.access;
    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.get('http://127.0.0.1:8000/getuser/', config);
      const userInfo = response.data;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setUserInfo(userInfo); // update userInfo state with the user information
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem('authTokens');
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    setAuthTokens(null);
  };

  const refreshToken = async () => {
    const refresh = authTokens.refresh;
    const response = await fetch('http://localhost:8000/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }),
    });
    const data = await response.json();
    if (response.status === 200) {
      const newAuthTokens = {
        access: data.access,
        refresh: authTokens.refresh 
      };
      setAuthTokens(newAuthTokens);
      localStorage.setItem('authTokens', JSON.stringify(newAuthTokens));
      setUser(jwt_decode(newAuthTokens.access));
    } else {
      logOut();
    }
  };

  useEffect(()=> {

   

    let fourMinutes = 1000 * 60 * .2

    let interval =  setInterval(()=> {
        if(authTokens){
          refreshToken()
        }
    }, fourMinutes)
    return ()=> clearInterval(interval)

}, [authTokens])

  const contextData = {
    login: login,
    user: user,
    authTokens: authTokens,
    getUser: getUser,
    userInfo: userInfo,
    logOut: logOut
  };

  return <AuthContext.Provider value={{ contextData }}>{children}</AuthContext.Provider>;
};