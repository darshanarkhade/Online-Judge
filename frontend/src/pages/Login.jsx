import React from "react";
import { useState } from "react";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res= await newRequest.post("/login", {
        username,
        password,
      });
      //stores the user info in local storage
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error(err.response.data.message || "Login Failed!");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <a href="/" className="text-3xl font-bold text-blue-500 mt-4 mb-8 cursor-pointer ">CodeQuest</a>      
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between flex-wrap">
            {/* <label className="text-sm text-gray-800 cursor-pointer" htmlFor="remember-me">
              <input className="mr-2" id="remember-me" type="checkbox" />
              Remember me
            </label>
            <a className="text-sm text-blue-500 hover:underline mb-0.5" href="#">
              Forgot password?
            </a> */}
            <p className="text-gray-800 mt-4">
              Don't have an account?{" "}
              <a className="text-sm text-blue-500 hover:underline" href="/register">
                Signup
              </a>
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
