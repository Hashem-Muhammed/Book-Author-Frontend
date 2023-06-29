import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Register() {
  const [errors, setErrors] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    is_author: false,
    bio: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      await axios.post('http://127.0.0.1:8000/register/', formData)
      .then((response) => {
        navigate('/login/');
      }) 
      .catch((error) => {
        if (error.response.status == 400)
        {
          setErrors(error.response.data.username);
        }            }
      );
      

  };

  return (
    <div className="login-container">
      <div className="register-form-container">
        <form onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="first_name">First name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="last_name">Last name</label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div >
            <input
              id="is_author"
              type="checkbox"
              name="is_author"
              checked={formData.is_author}
              onChange={(e) =>
                setFormData({ ...formData, is_author: e.target.checked })
              }
              />
                          <label htmlFor="is_author">Are you an author?</label>

          </div>
          {formData.is_author && (
            <div className="register-form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
              />
            </div>
          )}
        <div className="register-form-group">

          <button type="submit">Register</button>
          </div>
        </form>
        {errors && <p className="error">{JSON.stringify(errors)}</p>}

      </div>
    </div>
  );
}