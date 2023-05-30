import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEventTabClick = () => {
    navigate('/');
    setIsDropdownOpen(false);
  };

  const handleHeaderClick = () => {
    navigate('/about');
  };

  const handleDocumentClick = (e) => {
    if (menuRef.current && dropdownRef.current && !menuRef.current.contains(e.target) && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title" style={{ fontFamily: 'Rampart One' }} onClick={handleHeaderClick}>
          Tabula Homo
        </h1>
        <div className="navbar-links">
          <div
            id="navBtn"
            className={`navbar-menu ${isDropdownOpen ? 'is-dropdown-open' : ''}`}
            onClick={handleDropdownToggle}
            ref={menuRef}
          >
            <div className="navbar-menu-icon smallPercent" />
            <div className="navbar-menu-icon largePercent" />
            <div className="navbar-menu-icon" />
            <div className="navbar-menu-icon verticalIcon" />
            <div className="navbar-menu-icon largePercent" />
            <div className="navbar-menu-icon smallPercent" />
          </div>
          {isDropdownOpen && (
            <div className="navbar-dropdown" ref={dropdownRef}>
              <Link
                to="/"
                className="navbar-dropdown-link"
                onClick={() => {
                  handleEventTabClick();
                  setIsDropdownOpen(false);
                }}
              >
                Events
              </Link>
              <Link to="/about" className="navbar-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                About
              </Link>
              <Link to="/connect" className="navbar-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                Connect
              </Link>
              <Link to="/artists" className="navbar-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                Artist
              </Link>
              <Link to="/shop" className="navbar-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
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
