// AllProblems.js
import React, { useState, useEffect } from "react";
import ProblemRow from "../components/ProblemRow";
import newRequest from "../utils/newRequest";

export default function AllProblems() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser && currentUser.isAdmin;

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await newRequest.get("/problems");
        setProblems(response.data);
      } catch (err) {
        console.log("Error fetching problems:", err);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="container  mx-auto px-4 py-8">
      <div className="overflow-x-auto">
        <table className="w-full text-m text-left 2xl text-gray-700 rounded-lg border border-gray-300 border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 w-12">#</th>
              <th className="px-6 py-3">Problem Name</th>
              <th className="px-6 py-3">Difficulty</th>
              <th className="px-6 py-3 text-center">Link</th>
              {isAdmin && <th className="px-6 py-3 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <ProblemRow
                key={index}
                number={index + 1}
                name={problem.problemTitle}
                difficulty={problem.difficulty}
                id={problem.problemId}
                isAdmin={isAdmin}
                mongooseId={problem._id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
