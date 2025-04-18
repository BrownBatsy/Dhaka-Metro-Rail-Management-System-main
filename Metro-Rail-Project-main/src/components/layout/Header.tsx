import { Link } from "react-router-dom";
import { Menu, X, User, LogOut, Home, LayoutDashboard, CreditCard, MessageSquare, FileText, ChevronDown, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel 
} from "@/components/ui/dropdown-menu";

const Header = ({ isLoggedIn = false }: { isLoggedIn?: boolean }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    if (isLoggedIn) {
      const userDataStr = localStorage.getItem('user');
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          setUserData(userData);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, [isLoggedIn]);

  const isAdmin = userData?.is_admin || false;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 bg-metro-green rounded-md flex items-center justify-center mr-2">
                <span className="text-white font-bold">DM</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Dhaka Metro Rail Management System</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {isLoggedIn ? (
              /* Logged-in Navigation Links */
              <>
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link to="/journeys" className="text-gray-600 hover:text-gray-900">My Journeys</Link>
                <Link to="/payments" className="text-gray-600 hover:text-gray-900">Payments</Link>
                <Link to="/lost-found" className="text-gray-600 hover:text-gray-900">Lost & Found</Link>
                <Link to="/feedback" className="text-gray-600 hover:text-gray-900">Feedback</Link>
                {isAdmin && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-metro-green hover:text-metro-green-dark font-medium flex items-center">
                      <Shield className="mr-1 h-4 w-4" />
                      Admin
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Admin Panel</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/journeys" className="w-full">Journey Management</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/lost-found" className="w-full">Lost & Found</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            ) : (
              /* Logged-out Navigation Links */
              <>
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
                <Link to="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
                <Link to="/schedule" className="text-gray-600 hover:text-gray-900">Schedule</Link>
              </>
            )}
          </nav>
          
          {/* User Actions Area */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              /* Logged-in User Menu */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 border-b">
                    <p className="text-sm font-medium">{userData?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground truncate">{userData?.email || ''}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/" className="flex items-center">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Home</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/payments" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Payments</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/journeys" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>My Journeys</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/feedback" className="flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Feedback</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Admin Controls</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/journeys" className="flex items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Journey Management</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/lost-found" className="flex items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Lost & Found Management</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/logout" className="flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Logged-out Action Buttons */
              <div className="space-x-4">
                <Link to="/login">
                  <Button variant="outline" className="border-metro-blue text-metro-blue hover:bg-metro-blue hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-metro-green hover:bg-metro-green/90 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggedIn ? (
              /* Logged-in Mobile Links */
              <>
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/journeys"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Journeys
                </Link>
                <Link
                  to="/payments"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Payments
                </Link>
                <Link
                  to="/lost-found"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Lost & Found
                </Link>
                <Link
                  to="/feedback"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Feedback
                </Link>
                {isAdmin && (
                  <>
                    <div className="pt-1 border-t border-gray-200">
                      <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Admin Controls
                      </p>
                    </div>
                    <Link
                      to="/admin/journeys"
                      className="block px-3 py-2 rounded-md text-base font-medium text-metro-green hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Journey Management
                    </Link>
                    <Link
                      to="/admin/lost-found"
                      className="block px-3 py-2 rounded-md text-base font-medium text-metro-green hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Lost & Found Management
                    </Link>
                  </>
                )}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <Link
                    to="/logout"
                    className="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log out
                  </Link>
                </div>
              </>
            ) : (
              /* Logged-out Mobile Links */
              <>
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/services"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  to="/schedule"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Schedule
                </Link>
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-metro-blue text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-metro-green text-white mt-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
