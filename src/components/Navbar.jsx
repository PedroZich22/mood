import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Heart, BarChart3, Menu, X, LogOut } from "lucide-react";
import { Button } from "./ui/Button";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Mood Tracker", href: "/mood", icon: Heart },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-cream-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-brown-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-brown-800">Mood</h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? "bg-brown-100 text-brown-800"
                      : "text-brown-600 hover:text-brown-800 hover:bg-brown-50"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}

            <div className="flex items-center space-x-4">
              <Link
                to={"/user"}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive("/user")
                    ? "bg-brown-100 text-brown-800"
                    : "text-brown-600 hover:text-brown-800 hover:bg-brown-50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-brown-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-brown-800 font-medium">
                    {user.name}
                  </span>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                title="Logout"
              >
                <LogOut size={20} />
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-brown-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? "bg-brown-100 text-brown-800"
                      : "text-brown-600 hover:text-brown-800 hover:bg-brown-50"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
            <div className="border-t border-brown-200 pt-4">
              <Link
                to={"/user"}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive("/user")
                    ? "bg-brown-100 text-brown-800"
                    : "text-brown-600 hover:text-brown-800 hover:bg-brown-50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-brown-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-brown-800 font-medium">
                    {user.name}
                  </span>
                </div>
              </Link>
              <Button
                variant="ghost"
                onClick={logout}
                className="flex items-center space-x-3 px-3 py-2 w-full justify-start"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
