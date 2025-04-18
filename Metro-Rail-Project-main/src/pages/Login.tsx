import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Debug log
    console.log("Attempting login with:", { email, password });
    
    try {
      // Debug the full request URL and parameters
      console.log("Sending request to:", 'http://localhost:8000/api/auth/login/');
      console.log("With payload:", JSON.stringify({ email, password }));
      
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password 
        }),
      });
      
      // Debug response status
      console.log("Response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful, received data:", data);
        
        // Ensure user data is properly formatted
        const userData = {
          ...data.user,
          // Ensure consistent property naming for admin status
          isAdmin: data.user.is_admin || false
        };
        
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast({
          title: "Login successful",
          description: "Welcome back to Dhaka Metro Rail",
        });
        navigate('/dashboard');
      } else {
        // For debugging: print the error response
        const errorText = await response.text();
        console.error("Login error status:", response.status);
        console.error("Login error response:", errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          console.error("Parsed error data:", errorData);
          toast({
            title: "Login failed",
            description: errorData.detail || "Invalid email or password. Please try again.",
            variant: "destructive",
          });
        } catch (e) {
          toast({
            title: "Login failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      toast({
        title: "Login failed",
        description: "Network error. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
            <p className="mt-2 text-gray-600">Enter your credentials to access your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="metro-input"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-metro-blue hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="metro-input"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-metro-green hover:bg-opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-metro-green hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
