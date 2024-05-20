import React from "react";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <a href="/" className="text-3xl font-bold text-blue-500 mt-4 mb-8 cursor-pointer ">Online Judge</a>      
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Register</h2>
        <form className="flex flex-col">
          <input
            placeholder="Username"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
          />
          <input
            placeholder="Full Name"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
          />
          <input
            placeholder="Email"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
          />
          <input
            placeholder="Password"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
          />
          {/* <input
            placeholder="Confirm Password"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
          /> */}
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

