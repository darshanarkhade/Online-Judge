import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import Cookies library or any other library you use for managing cookies
import Navbar from "../components/Navbar";

export default function ProtectedRoutes() {
  const accessToken = Cookies.get("accessToken"); // Get access token from cookies or any other storage mechanism
  const navigate = useNavigate();
  console.log('access token',accessToken);

  return (
    <>
      {accessToken ? (
        <Outlet />
      ) : (
        <div className="message-container">
          <p className="message m-4">
            You need to be logged in to access this page.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}
    </>
  );
}
