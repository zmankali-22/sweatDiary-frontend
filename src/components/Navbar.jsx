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
    <header>
      <nav className="navbar">
        <Link to="/">
          <h1>Sweat Diary</h1>
        </Link>
        <div>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
