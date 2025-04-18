
import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  isLoggedIn?: boolean;
}

const Layout = ({ children, isLoggedIn = false }: LayoutProps) => {
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <Header isLoggedIn={isLoggedIn} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default Layout;
