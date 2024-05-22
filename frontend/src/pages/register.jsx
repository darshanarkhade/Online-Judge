import React from "react";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.post("/register", user);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <a href="/" className="text-3xl font-bold text-blue-500 mt-4 mb-8 cursor-pointer">
        Online Judge
      </a>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Register</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <input
            placeholder="Full Name"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
          />
          <input
            placeholder="Email"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <input
            placeholder="Password"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <div className="flex items-center justify-between flex-wrap">
            <p className="text-gray-800 mt-4">
              Already have an account?{" "}
              <a className="text-sm text-blue-500 hover:underline" href="/login">
                Login
              </a>
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
