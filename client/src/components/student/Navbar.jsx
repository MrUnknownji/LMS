import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton, useUser, useClerk } from "@clerk/clerk-react";
import { useState } from "react";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-8 w-auto" src={assets.logo} alt="Edemy" />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/course-list" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Courses
            </Link>
            {isSignedIn && (
              <Link to="/my-enrollments" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                My Enrollments
              </Link>
            )}
            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">Hi, {user.firstName}</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <button 
                onClick={() => openSignIn()} 
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/course-list" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
              Courses
            </Link>
            {isSignedIn && (
              <Link to="/my-enrollments" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                My Enrollments
              </Link>
            )}
            {isSignedIn ? (
              <div className="flex items-center space-x-3 px-3 py-2">
                <span className="text-sm text-gray-700">Hi, {user.firstName}</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <button 
                onClick={() => openSignIn()} 
                className="bg-blue-600 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
