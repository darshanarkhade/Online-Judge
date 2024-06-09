export default function Description({problem}) {
    function toUpperFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <>
        <div className="text-left">
            <h1 className="text-4xl font-extrabold mb-2 text-blue-700">{problem.problemTitle}</h1>
            <p className={`py-1 text-xl font-semibold 
                            ${problem.difficulty === 'easy' ? 'text-green-500' : ''}
                            ${problem.difficulty === 'medium' ? 'text-orange-500' : ''}
                            ${problem.difficulty === 'hard' ? 'text-red-500' : ''}
                            `}
            >
                {toUpperFirst(problem.difficulty)}
            </p>
            <div className="text-sm text-gray-600 mb-4">
            <h2 className="text-sm font-semibold mb-2">Memory Limit: {problem.memoryLimit} megabytes</h2>
            <h2 className="text-sm font-semibold mb-2">Time Limit: {problem.timeLimit} seconds</h2>
            </div>
            <hr className="border-b-2 border-gray-300 mb-4" />
        </div>
        <h2 className="text-lg font-semibold mb-2 text-blue-700">Problem Description:</h2>
        <p className="mb-6 text-gray-800 whitespace-pre-wrap">{problem.problemStatement}</p>
        <div className="flex mb-6">
            <div className="w-full pr-2">
            <h2 className="text-xl font-semibold mb-2 text-blue-700">Example:</h2>
            <div className="border border-gray-300 rounded-md p-2 mb-4 bg-gray-50 text-gray-800">
                <h3 className="text-lg font-semibold mb-2 ">Sample Input:</h3>
                <p className="whitespace-pre-wrap">{problem.sampleInput}</p>
            </div>
            <div className="border border-gray-300 rounded-md p-2 bg-gray-50 text-gray-800">
                <h3 className="text-lg font-semibold mb-2">Sample Output:</h3>
                <p className="whitespace-pre-wrap">{problem.sampleOutput}</p>
            </div>
            </div>
        </div>
        </>
    );
}
