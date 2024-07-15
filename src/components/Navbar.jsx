import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

export default function Navbar() {
  const { logout } = useLogout();

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
          <div>
            <button onClick={handleClick}>Log out</button>
          </div>

          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
