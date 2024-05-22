import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import newRequest from '../utils/newRequest';

export default function AddTestCases() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);

  const handleChange = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(testCases);
      await newRequest.post(`/addTestCases/${id}`, testCases);
      // console.log('Test cases have been added successfully');
      // Redirect to some page after successful submission
      navigate('/');
    } catch (err) {
      console.log(err);
      // Handle error
    }
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if(!currentUser || !currentUser.isAdmin) return (
    <div className="message-container">
      <p className="message m-4">
        Sorry, this page is only accessible to Admins.
      </p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Test Cases</h2>
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold mb-2">Enter the Input and Output values </h3>
        {testCases.map((testCase, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={testCase.input}
              onChange={(e) => handleChange(index, 'input', e.target.value)}
              placeholder="Input"
              className="border border-gray-300 rounded-md p-2 mr-2"
            />
            <input
              type="text"
              value={testCase.output}
              onChange={(e) => handleChange(index, 'output', e.target.value)}
              placeholder="Expected Output"
              className="border border-gray-300 rounded-md p-2"
            />
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
          Submit Test Cases
        </button>
      </form>
    </div>
  );
}
