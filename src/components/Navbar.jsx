import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="bg-background border-b">
      <nav className="navbar flex justify-between items-center max-w-screen-xl mx-auto px-4 h-16">
        <div className="flex-shrink-0">
          <Link to={user ? "/home" : "/"}>
            <h1 className="text-xl font-bold">Sweat Diary</h1>
          </Link>
        </div>
        <div className="flex space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <button
                onClick={handleClick}
                className="text-sm font-medium"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="text-sm font-medium">
                Login
              </Link>
              <Link to="/signup" className="text-sm font-medium">
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
