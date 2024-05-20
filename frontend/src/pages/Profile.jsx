import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Profile({ username, fullName, problemsSolved }) {
  return (
    <div className="max-w-md  my-10 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* User Image */}
      <div className="flex bg-blue-200 items-center justify-center p-6">
        <FaUserCircle className="text-6xl text-gray-500" />
      </div>
      
      {/* User Information */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Darshan Arkhade {fullName}</div>
        <p className="text-gray-700 text-base mb-2">@king0203 {username}</p>
        <p className="text-gray-700 text-base">Problems Solved:499 {problemsSolved}</p>
      </div>
    </div>
  );
}
