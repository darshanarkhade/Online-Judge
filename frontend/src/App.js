import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/Error";
import Profile from "./pages/Profile";
import Submissions from "./pages/Submissions";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Problem from "./pages/Problem";
import Navbar from "./components/Navbar";

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
          element: <Home />,
        },
        {
          path: "problems/:problemId",
          element: <Problem />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/submissions",
          element: <Submissions />,
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
