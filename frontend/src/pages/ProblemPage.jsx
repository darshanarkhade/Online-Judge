import React, { useState, useEffect } from "react";
import { FiPlay, FiUpload } from "react-icons/fi";
import { useParams } from "react-router-dom";
import newRequest from "../utils/newRequest";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Problem() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // console.log("in useEffect for selectedLanguage");
    // Set initial code based on selected language
    if (selectedLanguage === "cpp") {
      setCode(`// Include the input/output stream library\n#include <iostream>\nusing namespace std;\n\n// Define the main function\nint main() {\n    // Output "Hello CPP!" to the console\n    cout << "Hello CPP!";\n\n    // Return 0 to indicate successful execution\n    return 0;\n}`);
    } else if (selectedLanguage === "py") {
      setCode(`# Define the main function\ndef main():\n    # Output "Hello Python!" to the console\n    print("Hello Python!")\n\n# Call the main function\nif __name__ == "__main__":\n    main()`);
    } else if (selectedLanguage === "java") {
      setCode(`class Main{\n    public static void main(String args[]){\n        System.out.println("Hello Java");\n    }\n}`);
    }   
  }, [selectedLanguage]);
  

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await newRequest.get(`/problems/${id}`);
        setProblem(response.data);
      } catch (err) {
        console.error("Error fetching problem:", err);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement logic to process code and generate output
    setOutput("Sample output goes here...");
  };

  const handleRunCode = async () => {
    try {
      // console.log(inputValue);
      // console.log(code);
      const response = await newRequest.post("/run", {
        code,
        input: inputValue,
        language: selectedLanguage,
      });
      // console.log("Response from /run: ", response);
      setOutput(response.data.output);
    } catch (err) {
      if(err.response.data===undefined){
        setOutput("Error running code");
      }
      // console.log(err.response.data);
      // console.log(err.response.data.message);
      setOutput(err.response.data.message);
      console.error("Error running code:", err);
    }
  }
  const onChange = (newValue) => {
    setCode(newValue);
  }

  return (
    <div className="container mx-auto px-4 py-4">
      {problem && (
        <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-lg p-6 border border-gray-300">
          <div className="md:w-1/2 pr-4 mb-6 md:mb-0">
            <div className="text-left">
              <h1 className="text-4xl font-extrabold mb-6 text-blue-700">{problem.problemTitle}</h1>
              <div className="text-sm text-gray-600 mb-6">
                <h2 className="text-sm font-semibold mb-2">Memory Limit: {problem.memoryLimit} megabytes</h2>
                <h2 className="text-sm font-semibold mb-2">Time Limit: {problem.timeLimit} seconds</h2>
                {/* <p className="mb-2">Input: Standard Input</p>
                <p className="mb-2">Output: Standard Output</p> */}
              </div>
            </div>
            <h2 className="text-lg font-semibold mb-2 text-blue-700">Problem Difficulty: {problem.difficulty}</h2>
            <h2 className="text-lg font-semibold mb-2 text-blue-700">Problem Description:</h2>
            <p className="mb-6 text-gray-800">{problem.problemStatement}</p>
            <div className="flex mb-6">
              <div className="w-full pr-2">
                <h2 className="text-xl font-semibold mb-2 text-blue-700">Example:</h2>
                <div className="border border-gray-300 rounded-md p-2 mb-4 bg-gray-50 text-gray-800">
                  <h3 className="text-lg font-semibold mb-2">Sample Input:</h3>
                  <p>{problem.sampleInput}</p>
                </div>
                <div className="border border-gray-300 rounded-md p-2 bg-gray-50 text-gray-800">
                  <h3 className="text-lg font-semibold mb-2">Sample Output:</h3>
                  <p>{problem.sampleOutput}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-2 border-gray-300 md:pl-4 "></div>

          <div className="md:w-1/2 pl-4">
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex mb-4">
                <h2 className="text-xl font-semibold mb-2 text-blue-700 mr-4">Language:</h2>
                <select
                  className="w-1/3 border border-gray-300 rounded-md px-4 py-2 bg-gray-50 shadow-inner"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  console.log(selectedLanguage);
                  <option value="cpp">C++</option>
                  <option value="py">Python</option>
                  <option value="java">Java</option>
                </select>
              </div>
              <div className="w-full ">
                <AceEditor
                  mode="java"
                  theme="xcode"
                  value={code}
                  fontSize={14}
                  onChange={onChange}
                  name="UNIQUE_ID_OF_DIV"
                  editorProps={{ $blockScrolling: true }}
                  width="100%"
                  height="400px"
                />
              </div>
              <div className="flex justify-center mb-4">
                <button className="flex items-center justify-center bg-blue-600 text-white font-semibold px-4 py-2 rounded-md mr-2 hover:bg-blue-700 shadow-lg"
                  onClick={handleRunCode} type="button"
                >
                  <FiPlay className="mr-2" />
                  Run
                </button>
                <button className="flex items-center justify-center bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 shadow-lg" type="submit">
                  <FiUpload className="mr-2" />
                  Submit
                </button>
              </div>
            </form>
            <div className="flex">
              <div className="w-1/2 pr-2">
                <h2 className="text-xl font-semibold mb-2 text-blue-700">Input:</h2>
                <textarea
                  className="w-full h-48 border border-gray-300 rounded-md px-4 py-2 mb-4 resize-none text-gray-800 bg-gray-50 shadow-inner"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter input here..."
                  required
                ></textarea>
              </div>
              <div className="w-1/2 pl-2">
                <h2 className="text-xl font-semibold mb-2 text-blue-700">Output:</h2>
                <textarea
                  className="w-full h-48 border border-gray-300 rounded-md px-4 py-2 mb-4 resize-none text-gray-800 bg-gray-50 shadow-inner"
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  placeholder="Output will be displayed here..."
                  readOnly
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
