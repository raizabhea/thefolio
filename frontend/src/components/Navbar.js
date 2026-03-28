// frontend/src/components/Navbar.js
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="site-header">
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? '☀️' : '🌙'}
      </button>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src="/Images/logo.jpg" alt="RB logo" className="logo-icon" />
          </Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <Link 
                to="/home" 
                className={`nav-link ${isActive('/home') ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              >
                About
              </Link>
            </li>

            {user ? (
              <>
                {/* Contact link – shown only if user is NOT admin */}
                {user.role !== 'admin' && (
                  <li>
                    <Link 
                      to="/contact" 
                      className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                    >
                      Contact
                    </Link>
                  </li>
                )}
                <li>
                  <Link 
                    to="/profile" 
                    className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                  >
                    Profile
                  </Link>
                </li>
                {user.role === 'admin' && (
                  <li>
                    <Link 
                      to="/admin" 
                      className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                    >
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <Link 
                    to="/create-post" 
                    className={`nav-link ${isActive('/create-post') ? 'active' : ''}`}
                  >
                    New Post
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/contact" 
                    className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/login" 
                    className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className={`nav-link ${isActive('/register') ? 'active' : ''}`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;