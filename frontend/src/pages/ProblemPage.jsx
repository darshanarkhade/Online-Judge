import React, { useState, useEffect } from "react";
import { FiPlay, FiUpload } from "react-icons/fi";
import { useParams } from "react-router-dom";
import newRequest from "../utils/newRequest.js";
import newRequest2 from "../utils/newRequest2.js";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

import { FiBook, FiCode, FiClipboard } from "react-icons/fi";
import { FiEdit, FiMonitor, FiCheckCircle } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Description from "../components/Description.jsx";
import Loading from "../components/Loading.jsx";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Problem() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [verdict, setVerdict] = useState("");
  const [selectedOption, setSelectedOption] = useState("description");
  const [selectedSection, setSelectedSection] = useState("input");
  const [submissions, setSubmissions] = useState([]);
  const [submissionCount, setSubmissionCount] = useState(0);

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const currUser = JSON.parse(localStorage.getItem("currentUser"));
  
  useEffect(() => {
    // console.log("in useEffect for selectedLanguage");
    // Set initial code based on selected language
    if (selectedLanguage === "cpp") {
      setCode(`#include <iostream>\nusing namespace std;\n\nint main() {\n\n   cout << "Hello CPP!";\n\n   return 0;\n}`);
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
        setIsLoading(false);                                     
      } catch (err) {
        toast.error(err.response.data.message || "Something went wrong!");
        console.error("Error fetching problem:", err);
      }
    };
  
    fetchProblem();
  }, [id]);
  
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (problem && problem._id) {
        try {
        
          const response = await newRequest.post("/getSubmissionsByProblemId", {
            problemId: problem._id
          });
          const submissionsWithNames = await Promise.all(
            response.data.map(async (submission) => {
              const userResponse = await newRequest.get(`/users/${submission.userId}`);
              return {
                ...submission,
                userName: userResponse.data.username,
              };
            })
          );
          setSubmissions(submissionsWithNames);
        } catch (err) {
          toast.error(err.response.data.message || "Error fetching submissions");
          console.error("Error fetching submissions:", err);
        }
      }
    };

    fetchSubmissions();
  }, [problem, submissionCount]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        if(!currUser){
          toast.error("Please login to submit the code");
          return;
        }
        
        const response = await newRequest2.post("/submit", {
          code,
          language: selectedLanguage,
          problemId: problem._id,
          timeLimit: problem.timeLimit,
          userId: currUser._id,
        });
        
        console.log("Response from /submit: ", response);
            
        setSubmissionCount(prevCount => prevCount += 1);

        const { verdict, index } = response.data;

        // console.log("Response from /submit: ", response);
        // Check the verdict in the response data and update the output accordingly
        if (verdict === "Accepted") {
            setVerdict("Submission accepted");
        } else {
            setVerdict(`${verdict} on test case ${index}`);
        }
    } catch (err) {
        console.error("Error submitting code:", err);
    }
};

  
  const handleRunCode = async () => {
    try {
      // console.log(inputValue);
      // console.log(code);
      const response = await newRequest2.post("/run", {
        code,
        input: inputValue,
        language: selectedLanguage,
        timeLimit: problem.timeLimit,
      });
      console.log("Response from /run: ", response);
      setOutput(response.data.output);
    } catch (err) {
      console.error("Error running code:", err);
    }
  }
  const onChange = (newValue) => {
    setCode(newValue);
  }
  
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  }

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }
  return (
    <>
    {isLoading ? (
        <Loading />
      ) : (
    <div className="container mx-auto px-4 py-4">
      {problem && (
        <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-lg p-6 border border-gray-300">
          <div className="md:w-1/2 pr-4 mb-6 md:mb-0">
            <div className="flex justify-between items-center mb-4">
              <button 
                className={`flex items-center font-semibold text-blue-700 relative px-4 py-2 
                            ${selectedOption === 'description' ? 'bg-blue-100' : ''}
                            ${selectedOption === 'description' ? 'border-b-4 border-blue-500' : ''}
                          `}
                onClick={() => handleOptionChange('description')}
              >
                <FiBook className="mr-2" />
                <span>Description</span>
              </button>
              <button 
                className={`flex items-center font-semibold text-blue-700 relative px-4 py-2  
                            ${selectedOption === 'solution' ? 'bg-blue-100' : ''}
                            ${selectedOption === 'solution' ? 'border-b-4 border-blue-500' : ''}
                          `}
                onClick={() => handleOptionChange('solution')}
              >
                <FiCode className="mr-2" />
                <span>Solution</span>
              </button>
              <button 
                className={`flex items-center font-semibold text-blue-700 relative px-4 py-2 
                            ${selectedOption === 'submissions' ? 'bg-blue-100' : ''}
                            ${selectedOption === 'submissions' ? 'border-b-4 border-blue-500' : ''}
                          `}
                onClick={() => handleOptionChange('submissions')}
              >
                <FiClipboard className="mr-2" />
                <span>Submissions</span>
              </button>
            </div>



            {selectedOption === 'description' && (
              <Description  problem={problem} />
            )}

            {selectedOption === 'solution' && (
              <>
                {problem.solution ? (
                  <>
                    <h2 className="text-lg font-semibold mb-2 text-blue-700">Problem Solution:</h2>
                    <SyntaxHighlighter language="cpp" style={nord} showLineNumbers wrapLines>
                      {problem.solution}
                    </SyntaxHighlighter>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold mb-2 text-blue-700">Solution:</h2>
                    <p className="mb-6 text-gray-800">Solution not available</p>
                  </>
                )}
              </>
            )}



              {selectedOption === 'submissions' && (
              <>
                <h2 className="text-lg font-semibold mb-2 text-blue-700">Submissions:</h2>
                <div className="w-full overflow-x-auto">
                  <table className="w-full border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verdict</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">When</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Who</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                        </tr>
                      </thead>
                    <tbody>
                      {submissions.map((submission) => (
                        <tr 
                        key={submission._id} className={`cursor-pointer border-b ${submission.verdict === 'Accepted' ? 'bg-green-100' : 'bg-red-100'}`}
                        onClick={() => setSelectedSubmission(submission)}
                        style={{ borderBottomWidth: "1px", borderBottomColor: "rgba(0, 0, 0, 0.1)" }}

                        >
                          <td className="px-4 py-4">
                            <span className="text-sm font-semibold">{submission.verdict}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm">{formatDate(submission.submissionTime)}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm">{submission.userName}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm">{submission.language}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {selectedSubmission && (
                    <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm z-50 p-10">
                        <div className="fixed inset-10 w-70% max-h-80vh overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-7">
                            <h1 className="text-lg font-semibold mb-4 text-white">Submission Code</h1>
                                <SyntaxHighlighter language="c++" style={nord} showLineNumbers wrapLines>
                                {selectedSubmission.submissionCode}
                                </SyntaxHighlighter>
                            </div>
                            <button className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSelectedSubmission(null)}  >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                  )}
                </div>
              </>
            )}

          </div>

          <div className="border-l-2 border-gray-300 md:pl-4"></div>

          <div className="md:w-1/2 pl-4">
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex mb-4">
                <h2 className="text-xl font-semibold mb-2 text-blue-700 mr-4">Language:</h2>
                <select
                  className="w-1/3 border border-gray-300 rounded-md px-4 py-2 bg-gray-50 shadow-inner"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="cpp">C++</option>
                  <option value="py">Python</option>
                  <option value="java">Java</option>
                </select>
              </div>
              <div className="w-full">
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
                  z-index="0"
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
            <div className="flex justify-between items-center mb-4">
              <button 
                className={`flex items-center font-semibold text-blue-700 ${selectedSection === 'input' ? 'underline' : ''}`}
                onClick={() => handleSectionChange('input')}
              >
                <FiEdit className="mr-1" />
                <span>Input</span>
              </button>
              <button 
                className={`flex items-center font-semibold text-blue-700 ${selectedSection === 'output' ? 'underline' : ''}`}
                onClick={() => handleSectionChange('output')}
              >
                <FiMonitor className="mr-1" />
                <span>Output</span>
              </button>
              <button 
                className={`flex items-center font-semibold text-blue-700 ${selectedSection === 'verdict' ? 'underline' : ''}`}
                onClick={() => handleSectionChange('verdict')}
              >
                <FiCheckCircle className="mr-1" />
                <span>Verdict</span>
              </button>
            </div>

            {selectedSection === 'input' && (
              <textarea
                className="w-full min-h-40 border border-gray-300 rounded-md px-4 py-2 mb-4 resize-none text-gray-800 bg-gray-100 focus:outline-none focus:ring focus:border-blue-500"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter input here..."
                required
              ></textarea>
            )}

            {selectedSection === 'output' && (
              <textarea
                className="w-full min-h-40 border border-gray-300 rounded-md px-4 py-2 mb-4 resize-none text-gray-800 bg-gray-100 focus:outline-none focus:ring focus:border-blue-500"
                value={output}
                placeholder="Output will be displayed here..."
                readOnly
              ></textarea>
            )}

            {selectedSection === 'verdict' && (
              <div className="flex min-h-40 items-center justify-center border border-gray-300 rounded-md p-4 bg-gray-100">
                <span className={`font-semibold text-lg ${verdict === 'Submission accepted' ? 'text-green-600' : 'text-red-600'}`}>{verdict}</span>
              </div>
            )}




          </div>
          <ToastContainer />
        </div>
      )}
    </div>
      )}
    </>
  );
}
