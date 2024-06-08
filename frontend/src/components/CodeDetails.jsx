import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeDetails({ code, onClose }) {
  return (
    <div className="fixed inset-20 flex items-center justify-center bg-gray-200 dark:bg-gray-800 p-10">
      <div className="fixed inset-20 w-70% max-h-80vh overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="p-7">
          <SyntaxHighlighter language="c++" style={nord} showLineNumbers wrapLines>
            {code}
          </SyntaxHighlighter>
        </div>
        <button className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
