// ProblemRow.js
import React from "react";
import { Link } from "react-router-dom";

export default function ProblemRow({ number, name, difficulty, id, isAdmin }) {
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
          <Link to={`/updateTestCase/${id}`} className="text-blue-500 px-3 hover:text-blue-700">Update Test Case</Link>
        </td>
      )}
    </tr>
  );
}
