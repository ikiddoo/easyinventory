import React, { useState } from 'react';
import type { User } from '../../types/user';

const Navbar: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  const [navCollapsed, setNavCollapsed] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleNav = () => setNavCollapsed(!navCollapsed);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">
          📦 Easy Inventory
        </a>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={!navCollapsed}
          aria-label="Toggle navigation"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${!navCollapsed ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact/Support
              </a>
            </li>
            
          </ul>
          
          {/* Search Form */}
          <div className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              🔍
            </button>
          </div>
          
          {/* User Dropdown */}
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={dropdownOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(!dropdownOpen);
                }}
              >
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle bg-light text-primary d-flex align-items-center justify-content-center me-2"
                    style={{ width: '32px', height: '32px', fontSize: '14px', fontWeight: 'bold' }}
                  >
                    {user.fullname.charAt(0).toUpperCase()}
                  </div>
                  <span className="d-none d-md-inline">{user.fullname}</span>
                </div>
              </a>
              <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}>
                <li>
                  <div className="dropdown-item-text">
                    <div className="fw-semibold">{user.fullname}</div>
                    <small className="text-muted">{user.email}</small>
                  </div>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a className="dropdown-item" href="#">
                    👤 My Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    ⚙️ Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    💡 Help
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item text-danger"
                    onClick={onLogout}
                  >
                    🚪 Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;