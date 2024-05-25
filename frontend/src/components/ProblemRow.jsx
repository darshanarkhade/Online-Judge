import React from "react";
import { Link } from "react-router-dom";

export default function ProblemRow({ number, name, difficulty, id }) {
  // function getDifficultyColor(difficulty) {
  //   switch (difficulty.toLowerCase()) {
  //     case "easy":
  //       return "bg-green-500 text-white";
  //     case "medium":
  //       return "bg-orange-500 text-white";
  //     case "hard":
  //       return "bg-red-500 text-white";
  //     default:
  //       return "bg-gray-400 text-gray-800";
  //   }
  // }
  
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {number}
      </th>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {name}
      </td>
      <td className={`px-6 py-4 rounded-full `}>
        {difficulty}
      </td>
      <td className="px-6 py-4 pr-14 text-right">
        <Link to={`/problems/${id}`} className="font-medium text-blue-600 hover:underline">View</Link>
      </td>
    </tr>
  );
}
