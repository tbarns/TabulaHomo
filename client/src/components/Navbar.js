import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEventTabClick = () => {
    navigate('/');
    setIsDropdownOpen(false);
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    // Implement the logic to send the email with the user input
    // Here, you can use libraries like 'nodemailer' to send the email
    // with the user input data
    const subject = e.target.subject.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    const emailContent = `Subject: ${subject}\nEmail: ${email}\nMessage: ${message}`;
    console.log(emailContent);
    // Add your email sending logic here
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Tabula Homo</h1>
        <div className="navbar-links">
          <div id = 'navBtn' className="navbar-menu" onClick={handleDropdownToggle}>
            <div className="navbar-menu-icon" />
            
            <div className="navbar-menu-icon" />
            <div className="navbar-menu-icon" />
          </div>
          {isDropdownOpen && (
            <div className="navbar-dropdown">
              <Link to="/" className="navbar-dropdown-link" onClick={handleEventTabClick}>
                Events
              </Link>
              <Link to="/about" className="navbar-dropdown-link">
                About
              </Link>
              <Link to="/connect" className="navbar-dropdown-link">
                Connect
              </Link>
              <Link to="/shop" className="navbar-dropdown-link">
                Shop
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
