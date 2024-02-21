// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
const Navbar = () => {
  return (
    <nav>
      <div className='navbar'>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
            <Link to="/login">Login</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;
