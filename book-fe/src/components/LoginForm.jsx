import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'

export default function LoginForm() {
  let { contextData } = useContext(AuthContext);
  let { login } = contextData;
  return (
      <div>
          <form onSubmit={login}>
              <input type="text" name="username" placeholder="Enter Username" />
              <input type="password" name="password" placeholder="Enter Password" />
              <input type="submit"/>
          </form>
      </div>
  )
}
