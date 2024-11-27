import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">Admin Page</Link>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
