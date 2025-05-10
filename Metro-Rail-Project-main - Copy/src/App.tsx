import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Journeys from "./pages/Journeys";
import LostFound from "./pages/LostFound";
import Feedback from "./pages/Feedback";
import Logout from "./pages/Logout";
import AdminJourneys from "./pages/AdminJourneys";
import AdminLostFound from "./pages/AdminLostFound";
import Schedule from "./pages/Schedule";
import About from "./pages/About";
import Services from "./pages/Services";
import Payments from "./pages/Payments";
import PopQ from "./pages/PopQ";
import Analytics from "./pages/Analytics";
import ServiceAlert from "./pages/ServiceAlert"; // ✅ corrected import!
import AdminAlerts from "./pages/AdminAlerts";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Admin route component
const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = userData?.is_admin || false;
  const isAuthenticated = localStorage.getItem("token") !== null;

  console.log("AdminRoute Check:", { 
    userData, 
    isAdmin, 
    isAuthenticated 
  });
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/schedule" element={<Schedule />} />

          {/* Protected User Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/journeys" element={<ProtectedRoute><Journeys /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
          <Route path="/lost-found" element={<ProtectedRoute><LostFound /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
          <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><PopQ /></ProtectedRoute>} />
          <Route path="/analytics" element={<Analytics />} />

          {/* Admin Routes */}
          <Route path="/admin">
            <Route index element={<Navigate to="/admin/journeys" replace />} />
            <Route path="journeys" element={<AdminRoute><AdminJourneys /></AdminRoute>} />
            <Route path="lost-found" element={<AdminRoute><AdminLostFound /></AdminRoute>} />
            <Route path="alerts" element={<AdminRoute><AdminAlerts /></AdminRoute>} />
            <Route path="service-alerts" element={<AdminRoute><ServiceAlert /></AdminRoute>} />
          </Route>
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
