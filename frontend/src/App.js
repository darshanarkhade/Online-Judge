import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/Error.jsx";
import Profile from "./pages/Profile.jsx";
import Submissions from "./pages/Submissions.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import AddProblem from "./pages/AddProblem.jsx";
import AddTestCases from "./pages/AddTestCases.jsx";
import AllProblems from "./pages/AllProblems.jsx";
import UpdateProblem from "./pages/UpdateProblem.jsx";
import UpdateTestCases from "./pages/UpdateTestCases.jsx";
import Loading from "./components/Loading.jsx";

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

  return <RouterProvider router={router} loading={<Loading />} />;
}

export default App;
