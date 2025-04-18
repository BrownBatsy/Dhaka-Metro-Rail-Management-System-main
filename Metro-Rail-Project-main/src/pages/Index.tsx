import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, CreditCard, AlertCircle, MessageSquare } from "lucide-react";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userDataStr = localStorage.getItem('user');
    
    if (token && userDataStr) {
      setIsLoggedIn(true);
      try {
        const parsedUserData = JSON.parse(userDataStr);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  return (
    <Layout isLoggedIn={isLoggedIn}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Connecting <span className="text-metro-green">Dhaka</span> Through Modern Rail Transit
              </h1>
              <p className="text-lg text-gray-700 max-w-md">
                Track your journeys, manage payments, access lost & found services, and share your feedback all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                {isLoggedIn ? (
                  <>
                    <Link to="/dashboard">
                      <Button className="bg-metro-green hover:bg-opacity-90 text-lg px-8 py-6">Dashboard</Button>
                    </Link>
                    <Link to="/schedule">
                      <Button variant="outline" className="text-lg px-8 py-6">View Schedule</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register">
                      <Button className="bg-metro-green hover:bg-opacity-90 text-lg px-8 py-6">Get Started</Button>
                    </Link>
                    <Link to="/about">
                      <Button variant="outline" className="text-lg px-8 py-6">Learn More</Button>
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
                alt="Dhaka Metro Rail Management System"
                className="relative z-10 rounded-2xl shadow-2xl object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Designed to enhance your metro rail experience with convenient digital services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to={isLoggedIn ? "/journeys" : "/login"} className="block transition-transform hover:scale-105">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-5">
                  <CreditCard className="h-6 w-6 text-metro-green" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Journey Tracking</h3>
                <p className="text-gray-600">
                  Track all your metro journeys, view detailed history and manage your travel expenses efficiently.
                </p>
              </div>
            </Link>

            <Link to={isLoggedIn ? "/lost-found" : "/login"} className="block transition-transform hover:scale-105">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
                  <MapPin className="h-6 w-6 text-metro-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lost & Found</h3>
                <p className="text-gray-600">
                  Report lost items or browse through found items that have been turned in at metro stations.
                </p>
              </div>
            </Link>

            <Link to={isLoggedIn ? "/feedback" : "/login"} className="block transition-transform hover:scale-105">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-5">
                  <MessageSquare className="h-6 w-6 text-metro-green" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Feedback System</h3>
                <p className="text-gray-600">
                  Share your experience, report issues, or suggest improvements to help us serve you better.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {isLoggedIn ? (
                <>
                  <h2 className="text-3xl font-bold">Explore Metro Services</h2>
                  <p className="text-lg text-gray-300">
                    Access your dashboard to view your journeys, make payments, and more.
                  </p>
                  <Link to="/dashboard">
                    <Button className="bg-metro-green hover:bg-opacity-90 text-lg px-8 py-6">
                      Go to Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold">Ready to Experience Modern Transit?</h2>
                  <p className="text-lg text-gray-300">
                    Join thousands of commuters who are already enjoying the benefits of Dhaka Metro Rail's digital services.
                  </p>
                  <Link to="/register">
                    <Button className="bg-metro-green hover:bg-opacity-90 text-lg px-8 py-6">
                      Create Your Account
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-5 rounded-lg">
                <div className="text-3xl font-bold text-metro-green mb-2">25K+</div>
                <p className="text-gray-300">Daily Passengers</p>
              </div>
              
              <div className="bg-gray-800 p-5 rounded-lg">
                <div className="text-3xl font-bold text-metro-blue mb-2">12</div>
                <p className="text-gray-300">Metro Stations</p>
              </div>
              
              <div className="bg-gray-800 p-5 rounded-lg">
                <div className="text-3xl font-bold text-metro-green mb-2">98%</div>
                <p className="text-gray-300">On-time Rate</p>
              </div>
              
              <div className="bg-gray-800 p-5 rounded-lg">
                <div className="text-3xl font-bold text-metro-blue mb-2">4.8/5</div>
                <p className="text-gray-300">User Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Only show to non-logged in users */}
      {!isLoggedIn && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Getting started with the Dhaka Metro Rail Management System is simple
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 bg-metro-green text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Create Account</h3>
                <p className="text-gray-600">Register with your email and set up your profile</p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 bg-metro-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Link Payment Method</h3>
                <p className="text-gray-600">Connect your preferred payment methods</p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 bg-metro-green text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Use Metro Services</h3>
                <p className="text-gray-600">Take journeys and use your account ID</p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 bg-metro-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Track Everything</h3>
                <p className="text-gray-600">Monitor journeys, payments and more</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from commuters who use Dhaka Metro Rail services every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2787&auto=format&fit=crop" 
                      alt="User" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Ahmed Rahman</h4>
                  <p className="text-sm text-gray-500">Daily Commuter</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The journey tracking feature helps me budget my monthly transportation expenses. The app is intuitive and makes my daily commute much easier."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop" 
                      alt="User" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Fariha Akter</h4>
                  <p className="text-sm text-gray-500">Student</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I recovered my lost laptop thanks to the Lost & Found feature. The notification system works great and customer service was very helpful."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop" 
                      alt="User" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Kamal Hossain</h4>
                  <p className="text-sm text-gray-500">Business Professional</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The payment history helps me track my business travel expenses. Integration with mobile payment systems is seamless and convenient."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-metro-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Dhaka Metro Rail Management System Community</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Experience a smarter way to use public transportation in Dhaka
          </p>
          {isLoggedIn ? (
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/dashboard">
                <Button className="bg-white text-metro-green hover:bg-gray-100 text-lg px-8 py-6">
                  Go to Dashboard
                </Button>
              </Link>
              <Link to="/schedule">
                <Button className="bg-white text-metro-green hover:bg-gray-100 text-lg px-8 py-6">
                  View Schedule
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button className="bg-white text-metro-green hover:bg-gray-100 text-lg px-8 py-6">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/schedule">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-metro-green text-lg px-8 py-6 font-semibold">
                  View Schedule
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
