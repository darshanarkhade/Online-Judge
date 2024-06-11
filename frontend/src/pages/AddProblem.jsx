import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProblem() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [formData, setFormData] = useState({
    problemTitle: '',
    difficulty: 'easy',
    problemStatement: '',
    sampleInput: '',
    sampleOutput: '',
    timeLimit: '',
    solution: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await newRequest.post("/addProblem", formData);
      const id = response.data; // Extract problemId from response
      toast.success("Problem Added successfully!");
      setTimeout(() => {
        navigate(`/addTestCases/${id}`);
      }, 1000);
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong!");
      console.log(err);
    }
  };

  if (!currentUser || !currentUser.isAdmin) return (
    <div className="message-container">
      <p className="message m-4">
        Sorry, this page is only accessible to Admins.
      </p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md mt-4 mb-3 p-6">
        <h2 className="text-2xl text-center font-bold text-gray-800 mb-2">Add Problem</h2>
        <form className="flex flex-col" onSubmit={handleSubmit} >
          <label className="text-gray-800 font-semibold mb-2">Problem Title</label>
          <input
            placeholder="Problem Title"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            name="problemTitle"
            value={formData.problemTitle}
            onChange={handleChange}
          />
          <label className="text-gray-800 font-semibold mb-2">Problem Difficulty</label>
          <select
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <label className="text-gray-800 font-semibold mb-2">Problem Statement</label>
          <textarea
            placeholder="Problem Statement"
            className="bg-gray-200 whitespace-pre-wrap text-gray-800 border border-gray-300 rounded-md p-2 mb-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            name="problemStatement"
            value={formData.problemStatement}
            onChange={handleChange}
            rows="6"
          />
          <label className="text-gray-800 font-semibold mb-2">Solution</label>
          <textarea
            placeholder="Solution"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            rows="6"
          />
          <label className="text-gray-800 font-semibold mb-2 whitespace-pre-wrap">Sample Input</label>
          <textarea
            placeholder="Sample Input"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            name="sampleInput"
            value={formData.sampleInput}
            onChange={handleChange}
            rows="3"
          />
          <label className="text-gray-800 font-semibold mb-2 whitespace-pre-wrap">Sample Output</label>
          <textarea
            placeholder="Sample Output"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            name="sampleOutput"
            value={formData.sampleOutput}
            onChange={handleChange}
            rows="3"
          />
          <label className="text-gray-800 font-semibold mb-2">Time Limit (sec)</label>
          <input
            placeholder="Time Limit"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            name="timeLimit"
            value={formData.timeLimit}
            onChange={handleChange}
          />
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Add Problem
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
