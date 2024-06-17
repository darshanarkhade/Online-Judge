import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import newRequest from "../utils/newRequest.js";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await newRequest.post("/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between">
        <div className="flex  ">
        <img src="/logo.png" alt="logo" className="w-8 h-8 mx-1" />
        <a href="/" className="text-2xl font-semibold transition duration-300">CodeQuest</a>
        </div>
        {/* Main navigation */}
        <div className="hidden md:flex md:space-x-8">
          <a href="/problems" className="hover:text-blue-500 transition duration-300">Problems</a>
          <a href="/submissions" className="hover:text-blue-500 transition duration-300">Submissions</a>
          <a href="/leaderboard" className="hover:text-blue-500 transition duration-300">Leaderboard</a>
          {currentUser && currentUser.isAdmin && (
            <a href="/addProblem" className="hover:text-blue-500 transition duration-300">Add Problem</a>
          )}
        </div>

        {/* User actions */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {currentUser ? (
            <>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 hover:text-blue-500 transition duration-300 focus:outline-none"
              >
                <AiOutlineUser size={20} />
                <span>Profile</span>
              </button>
              {menuOpen && (
                <div className="absolute right-3 top-5 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg py-2 transform transition-transform duration-300 ease-in-out origin-top-right scale-95">
                  <a href="/profile" className="block px-4 py-2 hover:bg-gray-200 transition duration-300">Profile</a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-200 transition duration-300"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <a href="/login" className="hover:text-blue-500 transition duration-300">Login</a>
              <a href="/register" className="hover:text-blue-500 transition duration-300">Register</a>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="w-full md:hidden mt-4 space-y-2 bg-gray-800 p-4 rounded-lg shadow-lg">
            <a href="/problems" className="block hover:text-blue-500 transition duration-300">Problems</a>
            <a href="/submissions" className="block hover:text-blue-500 transition duration-300">Submissions</a>
            <a href="/leaderboard" className="block hover:text-blue-500 transition duration-300">Leaderboard</a>
            {currentUser && currentUser.isAdmin && (
              <a href="/addProblem" className="block hover:text-blue-500 transition duration-300">Add Problem</a>
            )}
            {currentUser ? (
              <>
                <a href="/profile" className="block flex items-center space-x-2 hover:text-blue-500 transition duration-300">
                  <AiOutlineUser size={20} />
                  <span>Profile</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block hover:text-blue-500 transition duration-300"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="block hover:text-blue-500 transition duration-300">Login</a>
                <a href="/register" className="block hover:text-blue-500 transition duration-300">Register</a>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
