import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, CreditCard, MessageSquare, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // ✅ ADDED

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const { t } = useTranslation(); // ✅ ADDED

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userDataStr = localStorage.getItem("user");

    if (token && userDataStr) {
      setIsLoggedIn(true);
      try {
        const parsedUserData = JSON.parse(userDataStr);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <Layout isLoggedIn={isLoggedIn}>
      {/* ✅ HERO SECTION */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{t("connectingDhaka")}</h1>
              <p className="text-lg text-gray-700 max-w-md">{t("trackManageAccessShare")}</p>
              <div className="flex flex-wrap gap-4">
                {isLoggedIn ? (
                  <>
                    <Link to="/dashboard">
                      <Button className="bg-metro-green hover:bg-opacity-90 text-lg px-8 py-6">
                        {t("dashboard")}
                      </Button>
                    </Link>
                    <Link to="/schedule">
                      <Button variant="outline" className="text-lg px-8 py-6">
                        {t("schedule")}
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register">
                      <Button className="bg-metro-green hover:bg-opacity-90 text-lg px-8 py-6">
                        {t("getStarted")}
                      </Button>
                    </Link>
                    <Link to="/about">
                      <Button variant="outline" className="text-lg px-8 py-6">
                        {t("learnMore")}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-blue-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-green-100 rounded-full opacity-50"></div>
              <img
                src="https://moneymasterpiece.com/wp-content/uploads/2022/12/1d610de2adab4ef3bd1235eb7e3b45e3.jpg"
                alt={t("heroImageAlt")}
                className="relative z-10 rounded-2xl shadow-2xl object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ FEATURES SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t("keyFeatures")}</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{t("enhanceExperience")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon={<CreditCard className="h-6 w-6 text-metro-green" />}
              title={t("journeyTracking")}
              description={t("journeyTrackingDesc")}
              to={isLoggedIn ? "/journeys" : "/login"}
              iconBg="bg-green-100"
            />
            <Feature
              icon={<MapPin className="h-6 w-6 text-metro-blue" />}
              title={t("lostFound")}
              description={t("lostFoundDesc")}
              to={isLoggedIn ? "/lost-found" : "/login"}
              iconBg="bg-blue-100"
            />
            <Feature
              icon={<MessageSquare className="h-6 w-6 text-metro-green" />}
              title={t("feedbackSystem")}
              description={t("feedbackSystemDesc")}
              to={isLoggedIn ? "/feedback" : "/login"}
              iconBg="bg-green-100"
            />
          </div>
        </div>
      </section>

      {/* ✅ CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isLoggedIn ? t("ctaLoggedInTitle") : t("ctaTitle")}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {isLoggedIn ? t("ctaLoggedInText") : t("ctaText")}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to={isLoggedIn ? "/dashboard" : "/register"}>
              <Button className="bg-white text-metro-green hover:bg-gray-100 text-lg px-8 py-6">
                {isLoggedIn ? t("dashboard") : t("signUpNow")}
              </Button>
            </Link>
            <Link to="/schedule">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-metro-green text-lg px-8 py-6 font-semibold">
                {t("schedule")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const Feature = ({
  icon,
  title,
  description,
  to,
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
  iconBg: string;
}) => (
  <Link to={to} className="block transition-transform hover:scale-105">
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow h-full">
      <div className={`h-12 w-12 ${iconBg} rounded-lg flex items-center justify-center mb-5`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
);

export default Index;
