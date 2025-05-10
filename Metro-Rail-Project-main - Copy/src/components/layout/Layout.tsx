import { ReactNode, useEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./Header";
import Footer from "./Footer";
import { AlertCircle } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  isLoggedIn?: boolean;
}

interface AlertData {
  id: number;
  title: string;
  message: string;
  is_active: boolean;
}

const Layout = ({ children, isLoggedIn = false }: LayoutProps) => {
  const [activeAlert, setActiveAlert] = useState<AlertData | null>(null);

  useEffect(() => {
    const fetchActiveAlert = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:8000/api/service-alerts/", {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch alerts");
          return;
        }

        const data: AlertData[] = await response.json();
        const active = data.find((alert) => alert.is_active);

        if (active) {
          setActiveAlert(active);
        } else {
          setActiveAlert(null);
        }
      } catch (error) {
        console.error("Failed to fetch active alert:", error);
        setActiveAlert(null);
      }
    };

    fetchActiveAlert(); // Fetch once immediately

    const interval = setInterval(fetchActiveAlert, 10000); // 🔁 Poll every 10 sec (reduced frequency for better perf)

    const checkStorage = () => {
      // If ServiceAlerts.tsx updated anything, this triggers instant refetch
      const lastUpdate = localStorage.getItem("alerts_last_update");
      if (lastUpdate) {
        fetchActiveAlert();
        localStorage.removeItem("alerts_last_update"); // Clean after react
      }
    };

    window.addEventListener("storage", checkStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkStorage);
    };
  }, []);

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <Header isLoggedIn={isLoggedIn} />

        {/* 🚨 Alert Banner if Active */}
        {activeAlert && (
          <div className="bg-red-100 text-red-800 text-center py-3 font-semibold flex justify-center items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>{activeAlert.title}: {activeAlert.message}</span>
          </div>
        )}

        <main className="flex-grow">{children}</main>

        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default Layout;
