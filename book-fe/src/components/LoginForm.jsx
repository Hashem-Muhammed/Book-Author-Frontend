import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import '../css/LoginForm.css';
import bgImage from '../css/Images/bg2.jpg';

export default function LoginForm() {
  const { contextData } = useContext(AuthContext);
  const { login } = contextData;
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(event);
    if (response.status === 401) {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="bg-container" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" placeholder="Enter Username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Enter Password" required />
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </div>
  );
}