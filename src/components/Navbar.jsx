import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Menu, X } from "lucide-react";

export default function Navbar({ openModal }) {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    closeMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  const handleModalOpen = (modalType) => {
    openModal(modalType);
    closeMenu();
  };

  return (
    <header className="bg-background border-b">
      <nav className="navbar flex justify-between items-center max-w-screen-xl mx-auto px-4 h-16">
        <div className="flex-shrink-0">
          <Link to="/" onClick={closeMenu}>
            <h1 className="text-xl font-bold">Sweat Diary</h1>
          </Link>
        </div>
        
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex space-x-4">
          {renderNavItems()}
        </div>
      </nav>

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
            <button onClick={() => handleNavigation('/home')} className="text-sm font-medium block">
              Home
            </button>
            <button onClick={() => handleNavigation('/statistics')} className="text-sm font-medium block">
              Statistics
            </button>
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
              onClick={() => handleModalOpen('login')}
              className="text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded block"
            >
              Login
            </button>
            <button
              onClick={() => handleModalOpen('signup')}
              className="text-sm font-medium bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded block"
            >
              Signup
            </button>
          </>
        )}
      </>
    );
  }
}