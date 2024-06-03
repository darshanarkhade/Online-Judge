import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl text-red-600 font-bold mb-4">Uh-oh!</h1>
        <p className="text-gray-800 mb-2">Oops! Something went wrong.</p>
        <p className="text-gray-800 mb-6"><i>{error.statusText || error.message}</i></p>
        <Link to="/" className="inline-block">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
}
