// Submission.js
import React from "react";
import SubmissionRow from "../components/SubmissionRow";

export default function Submission() {
  const submissions = [
    {
      name: "Problem 1",
      language: "C++",
      time: "Easy",
      code: `#include<stdio.h>
          int main() {
          printf("Hello, World!");
          return 0;
      }`,
      verdict: "WA",
    },
    {
      name: "Problem 2",
      language: "Java",
      time: "Medium",
      code: "fadsdfe",
      verdict: "TLE",
    },
    {
      name: "Problem 3",
      language: "Python",
      time: "Hard",
      code: "asfdawerfawfsdf",
      verdict: "SHi hai",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto">
        <table className="w-full text-m text-left text-gray-700 rounded-lg p-6 border border-gray-300 border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 w-12">#</th>
              <th className="px-6 py-3">Problem Name</th>
              <th className="px-6 py-3">Language</th>
              <th className="px-6 py-3">Submission Time</th>
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <SubmissionRow
                key={index}
                number={index + 1}
                name={submission.name}
                language={submission.language}
                time={submission.time}
                code={submission.code}
                verdict={submission.verdict}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
