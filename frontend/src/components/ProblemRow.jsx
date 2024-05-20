import React from "react";

export default function ProblemRow({ number, name, difficulty, link }) {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {number}
      </th>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {name}
      </td>
      <td className="px-6 py-4">
        {difficulty}
      </td>
      <td className="px-6 py-4 text-right">
        <a href={link} className="font-medium text-blue-600 hover:underline">Solve</a>
      </td>
    </tr>
  );
}
