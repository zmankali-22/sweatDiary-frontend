import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="bg-background border-b">
      <NavigationMenu className="max-w-screen-xl mx-auto px-4">
        <NavigationMenuList className="flex items-center justify-between h-16">
          <NavigationMenuItem>
            <Link to="/" className="text-xl font-bold">
              Sweat Diary
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <Button onClick={handleClick} variant="outline">Log out</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <NavigationMenuLink asChild>
                  <Link to="/login" className="text-sm font-medium">
                    Login
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="/signup" className="text-sm font-medium">
                    Signup
                  </Link>
                </NavigationMenuLink>
              </div>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}