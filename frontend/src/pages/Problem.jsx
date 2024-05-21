import React, { useState, useEffect } from "react";
import { FiPlay, FiUpload } from "react-icons/fi";
import { useParams } from "react-router-dom";
import newRequest from "../utils/newRequest";

export default function Problem() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

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
    <div className="container mx-auto px-4 py-8">
      {problem && (
        <div>
          <h1 className="text-3xl font-bold mb-4">{problem.problemTitle} </h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{problem.difficulty}</h2>
            <p className="text-gray-800">{problem.problemStatement}.</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Sample Input:</h2>
            <p className="text-gray-800">Sample input goes here...</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Sample Output:</h2>
            <p className="text-gray-800">Sample output goes here...</p>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-96 border border-gray-300 rounded-md px-4 py-2 mb-4 resize-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your code here..."
              required
            ></textarea>
            <div className="flex justify-center mb-6">
              <button className="flex items-center justify-center bg-blue-500 text-white font-semibold px-6 py-3 rounded-md mr-4 hover:bg-blue-600">
                <FiPlay className="mr-2" />
                Run
              </button>
              <button className="flex items-center justify-center bg-green-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600">
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
