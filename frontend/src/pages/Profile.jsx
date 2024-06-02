import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import newRequest from "../utils/newRequest";

export default function Profile() {

  const [user , setUser] = useState({});

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const response = await newRequest.get(`/profile`);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    fetchUser();   

  })

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }
  if(!user) return (
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
      <div className="flex bg-blue-200 items-center justify-center p-6">
        <FaUserCircle className="text-6xl text-gray-500" />
      </div>
      
      {/* User Information */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Name: {user.fullName}</div>
        <p className="text-gray-700 text-base mb-2">Username: {user.username}</p>
        <p className="text-gray-700 text-base mb-2">Email: {user.email}</p>
        <p className="text-gray-700 text-base mb-2">No of Problems solved: {user.problemsSolved ?user.problemsSolved: 0 }</p>
        <p className="text-gray-700 text-base">Registered on: {formatDate(user.createdAt)}</p>
        
      </div>
    </div>
  );
}
