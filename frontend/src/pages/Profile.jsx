import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import newRequest from "../utils/newRequest";
import Loading from "../components/Loading";
// import { PieChart } from "react-minimal-pie-chart";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Profile() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [verdicts, setVerdicts] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   const checkLoggedIn = async () => { 
  //     try {
  //       const info = await newRequest.get("/isAuth");
  //       if(info.data.isAuthenticated) setLoggedIn(true);        
  //     }
  //     catch (err) {
  //       toast.error(err.response.data.message || "Something went wrong!");
  //       console.error("Error checking if logged in:", err);
  //     }
  //   };
  //   checkLoggedIn();
  // }, []);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await newRequest.get(`/profile`);
        setUser(userResponse.data);

        // console.log("cookie")
        // console.log(document.cookie)
        // const verdictsResponse = await newRequest.get(`/verdictCounts`);
        // setVerdicts(verdictsResponse.data);

        const response = await newRequest.post(`/getSubmissionsByUserId`, { userId: userResponse.data._id });
        const submissionsWithNames = await Promise.all(
          response.data.map(async (submission) => {
            const problemResponse = await newRequest.get(`/eachProblem/${submission.problemId}`);
            return {
              ...submission,
              problemName: problemResponse.data.problemTitle,
            };
          })
        );
        setSubmissions(submissionsWithNames);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error(err.response.data.message || "Something went wrong!");
        console.error("Error fetching data:", err);
      }
    };
    fetchUserData();
  }, []);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser)
    return (
      <div className="message-container">
        <p className="message m-4">
          Sorry, this page is only accessible to logged-in users. Please
          <a href="/login" className="link">
            {" "}
            log in{" "}
          </a>
          or
          <a href="/signup" className="link">
            {" "}
            create an account{" "}
          </a>
          to view this content.
        </p>
      </div>
    );

//   const pieChartData = Object.entries(verdicts).map(([verdict, count]) => ({
//     title: verdict,
//     value: count,
//     color: getColorForVerdict(verdict),
//   }));

//   function getColorForVerdict(verdict) {
//     switch (verdict) {
//       case "Accepted":
//         return "#4caf50";
//       case "Wrong Answer":
//         return "#f44336";
//       case "Time Limit Exceeded":
//         return "#ff9800";
//       case "Compilation Error":
//         return "#2196f3";
//       default:
//         return "#9e9e9e";
//     }
//   }

//   const dummyData = [
//     { title: "Easy", value: 20, color: "#27ae60" }, // Green color for Easy
//     { title: "Medium", value: 30, color: "#f39c12" }, // Orange color for Medium
//     { title: "Hard", value: 50, color: "#e74c3c" }, // Red color for Hard
// ];


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" flex flex-col lg:flex-row justify-normal items-start my-10 px-10 space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="lg:w-1/4  lg:max-w-md bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex bg-blue-200 items-center justify-center p-6">
              <FaUserCircle className="text-6xl text-gray-500" />
            </div>

            {/* User Information */}
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Name: {user.fullName}
              </div>
              <p className="text-gray-700 text-base mb-2">
                Username: {user.username}
              </p>
              <p className="text-gray-700 text-base mb-2">
                Email: {user.email}
              </p>
              <p className="text-gray-700 text-base mb-2">
                No of Problems solved:{" "}
                {user.noOfProblemSolved ? user.noOfProblemSolved : 0}
              </p>
              <p className="text-gray-700 text-base">
                Registered on: {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex w-full lg:w-3/4 flex-col space-y-5">
            {/* <div className="flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4 bg-gray-200 shadow-md rounded-lg overflow-hidden">
              <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
                <div className="px-6 py-4">
                  <h2 className="font-bold text-xl mb-4">
                    Submission Verdicts
                  </h2>
                  <PieChart
                    className="w-48 h-48 mx-auto"
                    data={pieChartData}
                    lineWidth={60}
                    paddingAngle={5}
                    animate
                    animationDuration={1000}
                    label={({ dataEntry }) =>
                      `${Math.round(dataEntry.percentage)}%`
                    }
                    labelPosition={70}
                    labelStyle={{
                      fontSize: "5px",
                      fill: "#fff",
                    }}
                    radius={42}
                    segmentsStyle={{
                      transition: "stroke .3s, transform .3s",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
                <div className="px-6 py-4">
                  <h2 className="font-bold text-xl mb-4">Dummy Data</h2>
                  <PieChart
                    className="w-48 h-48 mx-auto"
                    data={dummyData}
                    lineWidth={60}
                    paddingAngle={5}
                    animate
                    animationDuration={1000}
                    label={({ dataEntry }) =>
                      `${Math.round(dataEntry.percentage)}%`
                    }
                    labelPosition={70}
                    labelStyle={{
                      fontSize: "5px",
                      fill: "#fff",
                    }}
                    radius={42}
                    segmentsStyle={{
                      transition: "stroke .3s, transform .3s",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div> */}
            <div>
              <h2 className="text-lg font-semibold mb-2 text-blue-700">Submissions:</h2>
              <div className="w-full overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verdict</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">When</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problem</th>
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
                          <span className="text-sm">{submission.problemName}</span>
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
                      <button className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSelectedSubmission(null)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
