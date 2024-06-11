// AllProblems.js
import React, { useState, useEffect } from "react";
import ProblemRow from "../components/ProblemRow";
import newRequest from "../utils/newRequest";
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";

export default function AllProblems() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser && currentUser.isAdmin;

  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        console.log("env ", process.env.REACT_APP_API_PORT_1);

        const response = await newRequest.get("/problems");
        setProblems(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error(err.response.data.message || "Something went wrong!");
        console.log("Error fetching problems:", err);
      }
    };

    fetchProblems();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  const submissionsPerPage = 10;
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const offset = currentPage * submissionsPerPage;
  const currentProblems = problems.slice(offset, offset + submissionsPerPage);

  return (
    <div className="container  mx-auto px-6 py-6">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-m text-left 2xl text-gray-700 rounded-lg border border-gray-300 border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 w-12">#</th>
                  <th className="px-6 py-3">Problem Name</th>
                  <th className="px-6 py-3">Difficulty</th>
                  <th className="px-6 py-3 pr-12 text-right">Link</th>

                  {isAdmin && (
                    <th className="px-6 py-3 text-center">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentProblems.map((problem, index) => (
                  <ProblemRow
                    key={index}
                    number={index + 1}
                    name={problem.problemTitle}
                    difficulty={problem.difficulty}
                    id={problem.problemId}
                    isAdmin={isAdmin}
                    mongooseId={problem._id}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(problems.length / submissionsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex justify-center mt-4"}
            pageClassName={"page-item"}
            pageLinkClassName={
              "page-link py-2 px-4 border rounded-md text-gray-700"
            }
            previousClassName={"page-item"}
            previousLinkClassName={
              "page-link py-2 px-4 border rounded-md text-gray-700"
            }
            nextClassName={"page-item"}
            nextLinkClassName={
              "page-link py-2 px-4 border rounded-md text-gray-700"
            }
            breakClassName={"page-item"}
            breakLinkClassName={
              "page-link py-2 px-4 border rounded-md text-gray-700"
            }
            activeClassName={"active"}
            activeLinkClassName={"bg-blue-500 text-white"}
          />
          <ToastContainer />
        </div>
      )}
    </div>
  );
}
