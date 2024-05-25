import React, { useState, useEffect } from "react";
import { FiPlay, FiUpload } from "react-icons/fi";
import { useParams } from "react-router-dom";
import newRequest from "../utils/newRequest";

export default function Problem() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await newRequest.get(`/problems/${id}`);
        setProblem(response.data);
      } catch (err) {
        console.error("Error fetching problem:", err);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement logic to process code and generate output
    setOutput("Sample output goes here...");
  };

  return (
    <div className="container px-12 py-8">
      {problem && (
        <div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{problem.problemTitle} </h1>
            <div className="text-sm text-gray-600 mb-4">
              <h2 className="text-sm font-semibold mb-2">Memory Limit: {problem.memoryLimit} megabytes </h2>
              <h2 className="text-sm font-semibold mb-2">Time Limit: {problem.timeLimit} seconds</h2>
              <p className="mb-2">Input: Standard Input</p>
              <p className="mb-2">Output: Standard Output</p>
            </div>
          </div>
          <h2 className="text-m font-semibold mb-2">Problem Difficulty:  {problem.difficulty}</h2>
          <p className="mb-6">{problem.problemStatement}.</p>
          <div className="flex mb-6">
            <div className="w-1/2 pr-2">
              <h2 className="text-xl font-semibold mb-2">Sample Input:</h2>
              <p className="border border-gray-300 rounded-md p-2 h-32 overflow-auto text-gray-800">{problem.sampleInput}</p>
            </div>
            <div className="w-1/2 pl-2">
              <h2 className="text-xl font-semibold mb-2">Sample Output:</h2>
              <p className="border border-gray-300 rounded-md p-2 h-32 overflow-auto text-gray-800">{problem.sampleOutput}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Code:</h2>
            <textarea
              className="w-full h-64 border border-gray-300 rounded-md px-4 py-2 mb-4 resize-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your code here..."
              required
            ></textarea>
            <div className="flex justify-center">
              <button className="flex items-center justify-center bg-blue-500 text-white font-semibold px-6 py-3 rounded-md mr-4 hover:bg-blue-600">
                <FiPlay className="mr-2" />
                Run
              </button>
              <button className="flex items-center justify-center bg-green-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600" type="submit">
                <FiUpload className="mr-2" />
                Submit
              </button>
            </div>
          </form>          
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl font-semibold mb-2">Input:</h2>
              <textarea
                className="w-full h-48 border border-gray-300 rounded-md px-4 py-2 mb-4 resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input here..."
                required
              ></textarea>
            </div>
            <div className="w-1/2 pl-4">
              <h2 className="text-xl font-semibold mb-2">Output:</h2>
              <div className="border border-gray-300 rounded-md p-4 h-48 overflow-auto">
                {output}
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
