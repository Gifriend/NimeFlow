// components/Navbar.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaList,
  FaCalendarAlt,
  FaFilm,
  FaTags,
  FaStar,
  FaCog,
  FaSearch,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome />, path: '/home' },
    { id: 'completed', label: 'Completed', icon: <FaStar />, path: '/completed' },
    { id: 'ongoing', label: 'OnGoing', icon: <FaFilm />, path: '/ongoing' },
    { id: 'jadwal', label: 'Jadwal Rilis', icon: <FaCalendarAlt />, path: '/schedule' },
    { id: 'animelist', label: 'Anime List', icon: <FaList />, path: '/animelist' },
    { id: 'genre', label: 'Genre', icon: <FaTags />, path: '/genre' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col bg-gray-900 text-white overflow-hidden">
      <header className="fixed top-0 left-0 w-full h-16 bg-gray-800 border-b border-gray-700 z-50">
        <div className="flex items-center h-16 px-6 justify-between">
          {/* Logo & Hamburger */}
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              NimeFlow
            </h1>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white text-2xl md:hidden focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Search & Settings */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search Anime..."
                className="pl-9 pr-4 py-2 bg-gray-700/70 text-gray-100 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition-all w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchQuery('');
                  }
                }}
              />
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchQuery('');
                  }
                }}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white hover:cursor-pointer"
              >
                <FaSearch />
              </button>
            </div>

            {/* Settings Dropdown */}
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <FaCog />
            </button>

            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-10 top-12 mt-2 w-40 bg-white rounded-md shadow-lg z-10"
              >
                <ul className="py-2 text-sm text-gray-700">
                  <li className="border-b">
                    <Link to="/history">
                      <button
                        onClick={() => setShowDropdown(false)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        History
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                        navigate('/');
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-gray-800 px-6 pb-4">
            <ul className="flex flex-col space-y-2 pt-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li className="relative">
                {/* Mobile Search */}
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="Search Anime..."
                    className="w-full pl-9 pr-4 py-2 bg-gray-700/70 text-gray-100 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                        setSearchQuery('');
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (searchQuery.trim()) {
                        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                        setSearchQuery('');
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <FaSearch />
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
};

export default Navbar;
