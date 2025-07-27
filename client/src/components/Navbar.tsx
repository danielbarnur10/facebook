import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  }
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className="text-xl font-bold">{user ? "Hello " + user.name : "Auth App"}</h1>
      <div className="space-x-2">
        {pathname == "/register" && (
          <Link to="/">
            <Button variant="outline">Login</Button>
          </Link>
        )}
        {pathname == "/" && (
          <Link to="/register">
            <Button variant="outline">Register</Button>
          </Link>
        )}{pathname !== "/register" && pathname !== "/" && (

          <Button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
          >Logout</Button>
        )

        }
      </div>
    </nav>
  );
}