import { Link } from "react-router-dom";

export default function Navbar() {
  return (
        <header>
            <nav className="navbar">
                <Link to="/">
                    <h1>Sweat Diary</h1>
                </Link>
            </nav>
        </header>
  )
}
