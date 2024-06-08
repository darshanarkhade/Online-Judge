import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { useParams } from "react-router-dom";

export default function AddProblem() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    problemTitle: '',
    difficulty: 'easy',
    problemStatement: '',
    sampleInput: '',
    sampleOutput: '',
    memoryLimit: '',
    timeLimit: ''
  });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await newRequest.get(`/problems/${id}`);
        setFormData({
          problemTitle: response.data.problemTitle,
          difficulty: response.data.difficulty,
          problemStatement: response.data.problemStatement,
          sampleInput: response.data.sampleInput,
          sampleOutput: response.data.sampleOutput,
          memoryLimit: response.data.memoryLimit,
          timeLimit: response.data.timeLimit,
          solution: response.data.solution
        });
      } catch (err) {
        console.error("Error fetching problem:", err);
      }
    };

    fetchProblem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("in handleSubmit");
      const response = await newRequest.put(`/updateProblem/${id}`, formData);
        console.log(response);
        //lets navigate to the problem page
      navigate(`/problems`);
    } catch (err) {
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
        <h2 className="text-2xl text-center font-bold text-gray-800 mb-2">Update Problem</h2>
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
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
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
          <label className="text-gray-800 font-semibold mb-2">Sample Input</label>
          <textarea
            placeholder="Sample Input"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            name="sampleInput"
            value={formData.sampleInput}
            onChange={handleChange}
            rows="3"
          />
          <label className="text-gray-800 font-semibold mb-2">Sample Output</label>
          <textarea
            placeholder="Sample Output"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            name="sampleOutput"
            value={formData.sampleOutput}
            onChange={handleChange}
            rows="3"
          />
          <label className="text-gray-800 font-semibold mb-2">Memory Limit (MB)</label>
          <input
            placeholder="Memory Limit"
            className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md p-2 mb-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            name="memoryLimit"
            value={formData.memoryLimit}
            onChange={handleChange}
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
            Update Problem
          </button>
        </form>
      </div>
    </div>
  );
}
