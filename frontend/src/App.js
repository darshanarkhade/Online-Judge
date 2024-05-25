import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/Error";
import Profile from "./pages/Profile";
import Submissions from "./pages/Submissions";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProblemPage from "./pages/ProblemPage";
import Navbar from "./components/Navbar";
import Leaderboard from "./pages/Leaderboard";
import AddProblem from "./pages/AddProblem";
import AddTestCases from "./pages/AddTestCases";
import AllProblems from "./pages/AllProblems";
import UpdateProblem from "./pages/UpdateProblem";
import UpdateTestCases from "./pages/UpdateTestCases";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/problems",
          element: <AllProblems />,
        },
        {
          path: "/problems/:id",
          element: <ProblemPage />,
        },
        {
          path: "/addProblem",
          element: <AddProblem />,
        },
        {
          path: "/updateProblem/:id",
          element: <UpdateProblem />,
        },
        {
          path: "/updateTestCases/:id",
          element: <UpdateTestCases />,
        },
        {
          path: "/addTestCases/:id",
          element: <AddTestCases />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/submissions",
          element: <Submissions />,
        },
        {
          path: "/leaderboard",
          element: <Leaderboard />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
