import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateTestCases() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const response = await newRequest.get(`/testCases/${id}`);
        setTestCases(response.data);
        // console.log(response.data);
      } catch (err) {
        console.error('Error fetching test cases:', err);
      }
    };

    fetchTestCases();
  }, [id]);

  const handleChange = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const handleSubmit = async (e) => {
    //we have to add only new testcases as we have updated the old ones , so handlesubmitt will call
    //addTestCase for each new testcase
    e.preventDefault();
    try {
      // filter returns only the test cases that don't have an _id and promise.all will wait for all the promises to resolve
      await Promise.all(
        testCases
          .filter((testCase) => !testCase._id)
          .map((testCase) => newRequest.post(`/addTestCase/${id}`, testCase))
      );
      toast.success("Test Cases Updated!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong!");
      console.error('Error updating test cases:', err);
    }
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await newRequest.post(`/updateTestCases/${id}`, { testCases });
  //     navigate('/');
  //   } catch (err) {
  //     console.error('Error updating test cases:', err);
  //   }
  // };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  const handleUpdate = async (index) => {
    try {
      await newRequest.put(`/updateTestCase/${testCases[index]._id}`, {
        input: testCases[index].input,
        output: testCases[index].output,
      });
      toast.success("Test Case Updated!");
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong!");
      console.error('Error updating test case:', err);
    }
  };

  const handleDelete = async (index) => {
    try{
      if(!testCases[index]._id){
        setTestCases(testCases.filter((_, i) => i !== index));
        return;
      }
      await newRequest.delete(`/deleteTestCase/${testCases[index]._id}`);
      //_ is used to ignore the first argument which is the element itself
      setTestCases(testCases.filter((_, i) => i !== index));
      toast.success("Test Case Deleted!");
    }catch(err){
      toast.error(err.response.data.message || "Something went wrong!");
      console.error('Error deleting test case:', err);
    }
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Update Test Cases</h2>
      <form onSubmit={handleSubmit}>
      {testCases.map((testCase, index) => (
        //key is used to uniquely identify each element in the list
        <div key={index} className="mb-4">
          <p>Test Case {index + 1}</p>
          <textarea
            type="text"
            value={testCase.input}
            onChange={(e) => handleChange(index, 'input', e.target.value)}
            placeholder="Input"
            className="border border-gray-300 rounded-md p-2 mr-2"
          />
          <textarea
            type="text"
            value={testCase.output}
            onChange={(e) => handleChange(index, 'output', e.target.value)}
            placeholder="Expected Output"
            className="border border-gray-300 rounded-md p-2"
          />
          {testCase._id && (
            <button
              type="button"
              onClick={() => handleUpdate(index)}
              className="bg-green-500 text-white font-semibold py-2 px-4 m-2 rounded-md hover:bg-green-600"
            >
              Update Test Case
            </button>
          )}
          
          <button
            type="button"
            onClick={() => handleDelete(index)}
            className="bg-red-500 text-white font-semibold py-2 px-3 m-2 rounded-md hover:bg-red-600"
          >
            Delete Test Case
          </button>
          
        </div>
      ))}


        <button
          type="button"
          onClick={addTestCase}
          className="bg-blue-500 text-white font-semibold py-2 px-4 m-2 rounded-md mb-4 hover:bg-blue-600"
        >
          Add Test Case
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white font-semibold py-2 px-4 m-2 rounded-md hover:bg-green-600"
        >
          Add all New Test Cases
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
