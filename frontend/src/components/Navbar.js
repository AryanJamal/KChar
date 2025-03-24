import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  // Fetch CSRF token from cookies
  useEffect(() => {
    const getCsrfToken = () => {
      const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrftoken='))
        ?.split('=')[1];
      setCsrfToken(cookieValue || '');
    };
    getCsrfToken();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await fetch('http://127.0.0.1:8000/logout/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });
    setIsLoggedIn(false);
    window.location.reload();  // Refresh the page
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white sticky top-0 z-50">
      <div className="container mx-auto relative">
        <div className="flex justify-between items-center">
          {/* Logo or Brand Name */}
          <Link to="/" className="text-2xl font-bold">
            KChar
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="py-2 hover:text-gray-300">
              Home
            </Link>
            <Link to="/tools" className="py-2 hover:text-gray-300">
              Tools
            </Link>
            <Link to="/alphabets" className="py-2 hover:text-gray-300">
              Alphabets
            </Link>
            <Link to="/about-us" className="py-2 hover:text-gray-300">
              About Us
            </Link>
          </div>

          {/* Login/Register or Logout Button for Desktop */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hidden md:block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login-register"
              className="hidden md:block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Login/Register
            </Link>
          )}

          {/* Toggle Button for Small Screens */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-blue-600 shadow-md transition-all duration-1000 ease-in-out md:hidden">
            <div className="flex flex-col px-4 pb-4">
              <Link
                to="/"
                className="py-2 hover:text-gray-300 border-b border-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/tools"
                className="py-2 hover:text-gray-300 border-b border-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Tools
              </Link>
              <Link
                to="/alphabets"
                className="py-2 hover:text-gray-300 border-b border-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Alphabets
              </Link>
              <Link
                to="/about-us"
                className="py-2 hover:text-gray-300 border-b border-blue-500"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="mt-4 bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 text-center"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login-register"
                  className="mt-4 bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login/Register
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
