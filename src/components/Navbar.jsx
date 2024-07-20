// components/Navbar.jsx
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar({ openModal }) {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="bg-background border-b">
      <nav className="navbar flex justify-between items-center max-w-screen-xl mx-auto px-4 h-16">
        <div className="flex-shrink-0">
          <Link to="/" >
            <h1 className="text-xl font-bold">Sweat Diary</h1>
          </Link>
        </div>
        <div className="flex space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/home" className="text-sm font-medium">
                Home
              </Link>
              <Link to="/statistics" className="text-sm font-medium">
                Statistics
              </Link>
             
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
              <button 
                onClick={() => openModal('login')} 
                className="text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Login
              </button>
              <button 
                onClick={() => openModal('signup')} 
                className="text-sm font-medium bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}