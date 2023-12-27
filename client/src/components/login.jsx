import React, { useState } from 'react';
import './login.css';
const login = () => {
  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" >
          <input
            type="text"
            placeholder="Username"
          />
          <input
            type="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
          <p className="message">
            Not registered? <a href="/Signup">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default login;