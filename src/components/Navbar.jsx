import { Link } from "react-router-dom";

export default function Navbar() {
  return (
        <header>
            <nav className="navbar">
                <Link to="/">
                    <h1>Sweat Diary</h1>
                </Link>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </ul>

            </nav>
        </header>
  )
}
