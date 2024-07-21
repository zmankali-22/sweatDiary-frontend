import { useState } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Menu, X } from "lucide-react"; // Import icons

export default function Navbar({ openModal }) {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background border-b">
      <nav className="navbar flex justify-between items-center max-w-screen-xl mx-auto px-4 h-16">
        <div className="flex-shrink-0">
          <Link to="/">
            <h1 className="text-xl font-bold">Sweat Diary</h1>
          </Link>
        </div>
        
        {/* Hamburger menu button for mobile */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4">
          {renderNavItems()}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {renderNavItems()}
          </div>
        </div>
      )}
    </header>
  );

  function renderNavItems() {
    return (
      <>
        {user ? (
          <>
            <Link to="/home" className="text-sm font-medium block">
              Home
            </Link>
            <Link to="/statistics" className="text-sm font-medium block">
              Statistics
            </Link>
            <span className="text-sm text-muted-foreground block">
              {user.email}
            </span>
            <button onClick={handleClick} className="text-sm font-medium block">
              Log out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => openModal('login')}
              className="te