import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import newRequest from '../utils/newRequest';

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
    e.preventDefault();
    try {
      await newRequest.put(`/updateTestCases/${id}`, { testCases });
      navigate('/');
    } catch (err) {
      console.error('Error updating test cases:', err);
    }
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Update Test Cases</h2>
      <form onSubmit={handleSubmit}>
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
          Update Test Cases
        </button>
      </form>
    </div>
  );
}
