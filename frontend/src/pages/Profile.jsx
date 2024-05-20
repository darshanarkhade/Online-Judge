import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Profile() {

  const currentUser=JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }
  if(!currentUser) return (
    <div className="message-container">
      <p className="message m-4">
        Sorry, this page is only accessible to logged-in users. Please 
        <a href="/login" className="link"> log in </a> 
        or 
        <a href="/signup" className="link"> create an account </a> 
        to view this content.
      </p>
    </div>

  );
  return (
    <div className="max-w-md  my-10 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* User Image */}
      <div className="flex bg-blue-200 items-center justify-center p-6">
        <FaUserCircle className="text-6xl text-gray-500" />
      </div>
      
      {/* User Information */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Name: {currentUser.fullName}</div>
        <p className="text-gray-700 text-base mb-2">Username: {currentUser.username}</p>
        <p className="text-gray-700 text-base mb-2">Email: {currentUser.email}</p>
        <p className="text-gray-700 text-base mb-2">No of Problems solved: {currentUser.problemsSolved ?currentUser.problemsSolved: 0 }</p>
        <p className="text-gray-700 text-base">Registered on: {formatDate(currentUser.createdAt)}</p>
        
      </div>
    </div>
  );
}
