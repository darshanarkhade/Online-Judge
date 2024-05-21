import React from "react";
import ProblemRow from "../components/ProblemRow";
import { useState,useEffect } from "react";
import newRequest from "../utils/newRequest";

export default function Home() {
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


  // const problems2 = [
  //   { name: "Problem 1", difficulty: "Easy", link: "/problems/2" },
  //   { name: "Problem 2", difficulty: "Medium", link: "#" },
  //   { name: "Problem 3", difficulty: "Hard", link: "#" },
  //   { name: "Problem 1", difficulty: "Easy", link: "#" },
  //   { name: "Problem 2", difficulty: "Medium", link: "#" },
  //   { name: "Problem 3", difficulty: "Hard", link: "#" },
  //   { name: "Problem 1", difficulty: "Easy", link: "#" },
  //   { name: "Problem 2", difficulty: "Medium", link: "#" },
  //   { name: "Problem 3", difficulty: "Hard", link: "#" },
  //   { name: "Problem 1", difficulty: "Easy", link: "#" },
  //   { name: "Problem 2", difficulty: "Medium", link: "#" },
  //   { name: "Problem 3", difficulty: "Hard", link: "#" },
  //   { name: "Problem 1", difficulty: "Easy", link: "#" },
  //   { name: "Problem 2", difficulty: "Medium", link: "#" },
  //   { name: "Problem 3", difficulty: "Hard", link: "#" },
  //   { name: "Problem 1", difficulty: "Easy", link: "#" },
  //   { name: "Problem 2", difficulty: "Medium", link: "#" },
  //   { name: "Problem 3", difficulty: "Hard", link: "#" },
  // ];

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-s text-left text-gray-500">
        <thead className="text-m text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-3 py-3 w-12 text-center">
              No.
            </th>
            <th scope="col" className="px-6 py-3">
              Problem Name
            </th>
            <th scope="col" className="px-6 py-3">
              Difficulty
            </th>
            <th scope="col" className="px-6 py-3 pr-14 text-right">
              Link
            </th>
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
