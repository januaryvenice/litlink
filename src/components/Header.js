import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation, useParams } from 'react-router-dom';
import bg from '../images/hero0.png';
import { HiMenu, HiX } from 'react-icons/hi';

const Header = ({ isLoggedIn, username, setLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = useParams(); // Access dynamic URL params (e.g., category)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    setLoggedIn(false);
    setIsDropdownOpen(false); // Close dropdown
    navigate('/');
  };

  const handleChangeAccount = () => {
    setLoggedIn(false);
    setIsDropdownOpen(false); // Close dropdown
    navigate('/login');
  };

  const style = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  // Define text for each page
  const bannerTexts = {
    '/': { primary: 'Welcome', secondary: 'Community for All Book Lovers' },
    '/about': { primary: 'About Us', secondary: 'Learn More About Our Mission' },
    '/account': {
      primary: 'Account Settings',
      secondary: 'Manage Your Profile and Preferences',
    },
    '/register': {
      primary: 'Join Us',
      secondary: 'Create Your Account and Start Your Journey',
    },
    '/login': {
      primary: 'Welcome Back',
      secondary: 'Log in to Continue Your Chapter',
    },
    '/books': {
      primary: 'Find Your Next Story',
      secondary: 'Explore our collection of books',
    },
  };

  // Set banner dynamically for `/books-list`
  if (location.pathname.startsWith('/books-list')) {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search') || category || 'Books';

    bannerTexts['/books-list'] = {
      primary: searchTerm.startsWith('#')
        ? `${searchTerm.slice(1)} Books`
        : `${searchTerm}`,
      secondary: 'Discover your next favorite book',
    };
  }

  // Fallback text for undefined routes
  const { primary, secondary } =
    bannerTexts[location.pathname.startsWith('/books-list') ? '/books-list' : location.pathname] ||
    { primary: 'Welcome', secondary: '' };

  return (
    <div className="relative h-[75vh] w-full" style={style}>
      <div className="absolute inset-0 bg-black opacity-30 pointer-events-none"></div>
      <div className="absolute w-full h-[4rem] flex items-center px-6 z-[20]">
        <div className="flex-1">
          <h1 className="text-[#FFFFFF] font-bold text-[1.5rem] cursor-pointer">
            <NavLink to="/" className="text-[#FFFFFF] hover:underline">
              LitLink
            </NavLink>
          </h1>
        </div>
        <button
          onClick={toggleMenu}
          className="sm:hidden text-white text-2xl focus:outline-none"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
        <ul
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } absolute top-[4rem] left-0 w-full bg-black sm:static sm:flex sm:space-x-10 sm:bg-transparent sm:items-center sm:justify-center z-30`}
        >
          <li>
            <NavLink
              to="/"
              className="text-[#FFFFFF] font-bold text-[1.1rem] block p-2 hover:underline"
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="text-[#FFFFFF] font-bold text-[1.1rem] block p-2 hover:underline"
            >
              ABOUT
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink
                to="/books"
                className="text-[#FFFFFF] font-bold text-[1.1rem] block p-2 hover:underline"
              >
                BOOKS
              </NavLink>
            </li>
          )}
          {!isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/register"
                  className="text-[#FFFFFF] font-bold text-[1.1rem] block p-2 hover:underline"
                >
                  REGISTER
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="text-[#FFFFFF] font-bold text-[1.1rem] block p-2 hover:underline"
                >
                  LOGIN
                </NavLink>
              </li>
            </>
          ) : (
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="text-[#FFFFFF] font-bold text-[1.1rem] hover:underline relative"
              >
                {username}
              </button>
              {isDropdownOpen && (
                <ul
                  className="absolute right-0 mt-2 w-[12rem] bg-black rounded-lg shadow-lg text-sm text-white overflow-hidden transition-all duration-200 ease-in-out"
                >
                  <li
                    className="px-4 py-3 hover:bg-gray-800 cursor-pointer"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/account');
                    }}
                  >
                    Account Settings
                  </li>
                  <li
                    className="px-4 py-3 hover:bg-gray-800 cursor-pointer"
                    onClick={handleChangeAccount}
                  >
                    Change Account
                  </li>
                  <li
                    className="px-4 py-3 hover:bg-gray-800 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-[4rem] pointer-events-none">
        <h1 className="text-[#FFFFFF] font-bold text-[5rem]">{primary}</h1>
        {secondary && (
          <h3 className="text-white text-[2rem] font-thin">{secondary}</h3>
        )}
      </div>
    </div>
  );
};

export default Header;
