import React, { useEffect, useState } from "react";
import SubmissionRow from "../components/SubmissionRow";
import newRequest from "../utils/newRequest";
import ReactPaginate from "react-paginate";
import Loading from "../components/Loading";

export default function Submission() {
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
    
  const submissionsPerPage = 10;

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await newRequest.get("/submissions");
        console.log("response", response.data);
        const submissionsWithNames = await Promise.all(
          response.data.map(async (submission) => {
            const problemResponse = await newRequest.get(`/eachProblem/${submission.problemId}`);
            const userResponse = await newRequest.get(`/users/${submission.userId}`);
            return {
              ...submission,
              problemName: problemResponse.data.problemTitle,
              userName: userResponse.data.username,
            };
          })
        );
        console.log("submissionsWithNames", submissionsWithNames);
        setSubmissions(submissionsWithNames);
        setIsLoading(false); 
      } catch (err) {
        setIsLoading(false); 
        console.error("Error fetching submissions:", err);
      }
    };

    fetchSubmissions();
    console.log("submissions in useeffect ", submissions);  
  }, []);

  console.log("submissions", submissions);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * submissionsPerPage;
  const currentSubmissions = submissions.slice(offset, offset + submissionsPerPage);

  // Conditional rendering based on loading state
  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <Loading /> 
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-m text-left text-gray-700 rounded-lg p-6 border border-gray-300 border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 w-12">#</th>
                  <th className="px-6 py-3">When</th>
                  <th className="px-6 py-3">Who</th>
                  <th className="px-6 py-3">Problem</th>
                  <th className="px-6 py-3">Language</th>
                  <th className="px-6 py-3">Code</th>
                  <th className="px-6 py-3">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {currentSubmissions.map((submission, index) => (
                  <SubmissionRow
                    key={index}
                    number={offset + index + 1}
                    name={submission.problemName}
                    language={submission.language}
                    time={submission.submissionTime}
                    code={submission.submissionCode}
                    verdict={submission.verdict}
                    submiittedBy={submission.userName}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(submissions.length / submissionsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex justify-center mt-4"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link py-2 px-4 border rounded-md text-gray-700"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link py-2 px-4 border rounded-md text-gray-700"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link py-2 px-4 border rounded-md text-gray-700"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link py-2 px-4 border rounded-md text-gray-700"}
            activeClassName={"active"}
            activeLinkClassName={"bg-blue-500 text-white"}
          />
        </div>
      )}
    </div>
  );
}
