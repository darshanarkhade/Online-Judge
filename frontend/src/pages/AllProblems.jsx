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
    <div className="relative overflow-x-auto">
      <table className="w-full text-s text-left text-gray-500">
        <thead className="text-m text-gray-700 uppercase bg-gray-300">
          <tr>
            <th className="px-5 py-3 w-12 ">No.</th>
            <th className="px-4 py-3 min-w-30% max-w-50%">Problem Name</th>
            <th className="px-4 py-3" style={{ width: "15%" }}>Difficulty</th>
            <th className="px-4 py-3 pr-12 text-right" style={{ width: "15%" }}>Link</th>
            {isAdmin && <th className="px-4 py-3 pr-4 text-center" style={{ width: "30%" }}>Actions</th>}
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
  );
}
