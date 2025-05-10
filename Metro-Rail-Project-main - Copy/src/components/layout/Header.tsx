import { Link } from "react-router-dom";
import {
  Menu, X, User, LogOut, Home, LayoutDashboard, CreditCard,
  MessageSquare, FileText, ChevronDown, Shield
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => { 
    const newLang = i18n.language === "en" ? "bn" : "en";
    i18n.changeLanguage(newLang, () => {
      localStorage.setItem("language", newLang);
    });
  };

  return (
    <Button
      variant="outline"
      className="border-metro-blue text-metro-green hover:bg-metro-green hover:text-red-600"
      onClick={toggleLanguage}
    >
      {i18n.language === "en" ? "বাংলা" : "English"}
    </Button>
  );
};

export { LanguageSwitcher };

const Header = ({ isLoggedIn = false }: { isLoggedIn?: boolean }) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [is_admin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const userDataStr = localStorage.getItem('user');
      if (userDataStr) {
        try {
          const parsedUserData = JSON.parse(userDataStr);
          setUserData(parsedUserData);
          setIsAdmin(!!parsedUserData.is_admin);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setIsAdmin(false);
        }
      }
    }
  }, [isLoggedIn]);

  const renderDashboardDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center">
        {t("dashboard")} <ChevronDown className="ml-1 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="w-full text-sm">{t("userDashboard")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/analytics" className="w-full text-sm">{t("metroAnalytics")}</Link>
        </DropdownMenuItem>
        {is_admin && (
          <DropdownMenuItem asChild>
            <Link to="/admin/service-alerts" className="w-full text-sm">{t("serviceAlerts")}</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

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

          <nav className="hidden md:flex space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/" className="text-gray-600 hover:text-gray-900">{t("home")}</Link>
                {renderDashboardDropdown()}
                <Link to="/journeys" className="text-gray-600 hover:text-gray-900">{t("myJourneys")}</Link>
                <Link to="/payments" className="text-gray-600 hover:text-gray-900">{t("payment")}</Link>
                <Link to="/lost-found" className="text-gray-600 hover:text-gray-900">{t("lostFound")}</Link>
                <Link to="/feedback" className="text-gray-600 hover:text-gray-900">{t("feedback")}</Link>
                <Link to="/quiz" className="text-gray-600 hover:text-gray-900">{t("quiz")}</Link>

                {is_admin && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-metro-green hover:text-metro-green-dark font-medium flex items-center">
                      <Shield className="mr-1 h-4 w-4" />
                      {t("admin")} <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>{t("adminControls")}</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/journeys">{t("journeyManagement")}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/lost-found">{t("lostFound")}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/service-alerts">{t("serviceAlerts")}</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-600 hover:text-gray-900">{t("home")}</Link>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">{t("about")}</Link>
                <Link to="/services" className="text-gray-600 hover:text-gray-900">{t("services")}</Link>
                <Link to="/schedule" className="text-gray-600 hover:text-gray-900">{t("schedule")}</Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <>
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
                      <Link to="/"><Home className="mr-2 h-4 w-4" />{t("home")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />{t("dashboard")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/payments"><CreditCard className="mr-2 h-4 w-4" />{t("payment")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/journeys"><FileText className="mr-2 h-4 w-4" />{t("myJourneys")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/feedback"><MessageSquare className="mr-2 h-4 w-4" />{t("feedback")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/quiz"><MessageSquare className="mr-2 h-4 w-4" />{t("quiz")}</Link>
                    </DropdownMenuItem>

                    {is_admin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>{t("adminControls")}</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/journeys"><Shield className="mr-2 h-4 w-4" />{t("journeyManagement")}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/lost-found"><Shield className="mr-2 h-4 w-4" />{t("lostFound")}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/service-alerts"><Shield className="mr-2 h-4 w-4" />{t("serviceAlerts")}</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/logout"><LogOut className="mr-2 h-4 w-4" />{t("logout")}</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <LanguageSwitcher />
              </>
            ) : (
              <div className="space-x-4">
                <Link to="/login">
                  <Button variant="outline" className="border-metro-blue text-metro-blue hover:bg-metro-blue hover:text-white">
                    {t("login")}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-metro-green hover:bg-metro-green/90 text-white">
                    {t("register")}
                  </Button>
                </Link>
                <LanguageSwitcher />
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
