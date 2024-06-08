import React, { useState } from "react";
import CodeDetails from "./CodeDetails";

export default function SubmissionRow({ number, name, language, time, code, verdict, submiittedBy }) {
  const [isCodeDetailsOpen, setIsCodeDetailsOpen] = useState(false);

  const handleCodeClick = () => {
    setIsCodeDetailsOpen(true);
  };

  const handleClose = () => {
    setIsCodeDetailsOpen(false);
  };

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }
  return (
<tr className={`border-b ${verdict === 'Accepted' ? 'bg-green-100' : 'bg-red-100'}`}>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {number}
      </th>
      <td className="px-6 py-4">
        {formatDate(time)}
      </td>
      <td className="px-6 py-4">
        {submiittedBy}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {name}
      </td>
      <td className="px-6 py-4">
        {language}
      </td>
      
      <td className="px-6 py-4 cursor-pointer text-blue-600 hover:underline" onClick={handleCodeClick}>
        Code
      </td>  
      <td className="px-6 py-4">
        {verdict}
      </td>
      {isCodeDetailsOpen && <CodeDetails code={code} onClose={handleClose} />}
    </tr>

  );
}
