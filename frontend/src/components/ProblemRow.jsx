// ProblemRow.js
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { FaTrash } from 'react-icons/fa';

export default function ProblemRow({ number, name, difficulty, id, isAdmin, mongooseId }) {
  // Function to determine background color based on difficulty
  const getDifficultyColor = (difficulty) => {
    // eslint-disable-next-line default-case
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-orange-500";
      case "hard":
        return "bg-red-500";
    }
  };

  // Capitalize the first letter of the difficulty
  const capitalizedDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  // Apply conditional styling based on difficulty
  const difficultyColor = getDifficultyColor(difficulty);

  // Function to delete a problem
  const deleteProblem = async (id) => {
    try {
      await newRequest.delete(`/deleteProblem/${id}`);
      await newRequest.delete(`/deleteTestCasesOfProblem/${mongooseId}`);
      window.location.reload();
      // console.log(response.data);
      // Update the list of problems
      // I am not sure how to do this
    } catch (err) {
      console.error('Error deleting problem:', err);
    }
  }

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th className="px-4 py-2 font-medium text-gray-900">
        {number}
      </th>
      <td className="px-4 py-2 font-medium text-gray-900">
        {name}
      </td>
      <td className="px-4 py-2">
        <span className={`inline-block ${difficultyColor} text-white rounded-full w-20 text-center px-4 py-2 text-sm font-semibold`}>{capitalizedDifficulty}</span>
      </td>
      <td className="px-4 py-2 pr-12 text-right">
        <Link to={`/problems/${id}`} className="text-blue-600 hover:underline">View</Link>
      </td>
      {isAdmin && (
        <td className="px-4 py-2 pr-4 text-right"> {/* Update links visible to admin only */}
          <Link to={`/updateProblem/${id}`} className="text-blue-500 px-3 hover:text-blue-700 mr-2">Update Problem</Link>
          <Link to={`/updateTestCases/${mongooseId}`} className="text-blue-500 px-3 hover:text-blue-700">Update Test Case</Link>
          {/* Button to delete the problem */}
          <button onClick={() => deleteProblem(id)} className="text-red-500 px-3 hover:text-red-700 focus:outline-none">
            <FaTrash />
          </button>
        </td>
      )}
    </tr>
  );
}
