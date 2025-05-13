// components/Navbar.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaList,
  FaCalendarAlt,
  FaFilm,
  FaTags,
  FaStar,
  FaBell,
  FaCog,
  FaSearch,
} from 'react-icons/fa';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome />, path: '/Home' },
    {
      id: 'completed',
      label: 'Completed',
      icon: <FaStar />,
      path: '/completed',
    },
    { id: 'ongoing', label: 'OnGoing', icon: <FaFilm />, path: '/ongoing' },
    {
      id: 'jadwal',
      label: 'Jadwal Rilis',
      icon: <FaCalendarAlt />,
      path: '/schedule',
    },
    {
      id: 'anime-list',
      label: 'Anime List',
      icon: <FaList />,
      path: '/anime-list',
    },
    { id: 'genre', label: 'Genre', icon: <FaTags />, path: '/genre' },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex flex-col bg-gray-900 text-white overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="fixed top-0 left-0 w-full h-16 bg-gray-800 border-b border-gray-700 z-50">
          <div className="flex items-center h-16 px-6 justify-between">
            {/* Left: Logo and Nav Links */}
            <div className="flex items-center space-x-8">
              {/* App Logo */}
              <div className="flex items-center">
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  NimeFlow
                </h1>
              </div>

              {/* Navigation Links */}
              <nav>
                <ul className="flex space-x-1">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                          location.pathname === item.path
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'hover:bg-gray-700 text-gray-300'
                        }`}>
                        <span className="mr-2">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Right: Search and Tools */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Anime..."
                  className="pl-9 pr-4 py-2 bg-gray-700/70 text-gray-100 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition-all w-64"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Notifications */}
              <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors relative">
                <FaBell />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Settings */}
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <FaCog />
              </button>
              {showDropdown && (
                <div className="absolute right-10 top-12 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <ul className="py-2 text-sm text-gray-700">
                    <li className="border-b">
                      <Link to={'/history'}>
                        <button
                          onClick={() => {
                            console.log('History clicked');
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          History
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to={'/'}>
                        <button
                          onClick={() => {
                            console.log('Logout clicked');
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          Logout
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
