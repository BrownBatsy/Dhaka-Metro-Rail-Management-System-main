import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { 
  Train, 
  CreditCard, 
  Clock, 
  Wifi, 
  ShieldCheck, 
  MapPin, 
  Ticket, 
  CalendarDays,
  Accessibility,
  Coffee,
  Phone,
  ParkingSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-primary md:text-5xl">Our Services</h1>
            <p className="mt-6 text-lg text-gray-600">
              Discover the comprehensive range of services designed to make your journey comfortable, convenient, and enjoyable.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Core Transit Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our primary services focused on providing efficient and reliable transportation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-primary/10 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Train className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl text-center">Regular Train Service</CardTitle>
                <CardDescription className="text-center">
                  Daily operations connecting key locations across Dhaka
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-gray-600">
                  <li>Operating Hours: 7:00 AM - 10:00 PM</li>
                  <li>Frequency: Every 10 minutes during peak hours</li>
                  <li>16 stations across 20.1 kilometers</li>
                  <li>Modern air-conditioned trains</li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center pt-4">
                <Button asChild variant="outline">
                  <Link to="/schedule">View Schedule</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-primary/10 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <CreditCard className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl text-center">Metro Cards & Passes</CardTitle>
                <CardDescription className="text-center">
                  Convenient payment options for regular commuters
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-gray-600">
                  <li>Reloadable smart cards with discounts</li>
                  <li>Weekly, monthly, and quarterly passes</li>
                  <li>Student and senior citizen discounts</li>
                  <li>Corporate packages for businesses</li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center pt-4">
                <Button asChild variant="outline">
                  <Link to="/fares">View Fare Details</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-primary/10 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl text-center">Express Service</CardTitle>
                <CardDescription className="text-center">
                  Fast connections between major stations
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-gray-600">
                  <li>Limited stops for faster travel</li>
                  <li>Special morning and evening peak hour service</li>
                  <li>Premium seating available</li>
                  <li>Pre-booking option for guaranteed seats</li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center pt-4">
                <Button asChild variant="outline">
                  <Link to="/express">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Station Amenities</h2>
            <p className="mt-4 text-lg text-gray-600">
              Facilities and services available at our metro stations
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Wifi className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Free Wi-Fi</h3>
              <p className="mt-2 text-gray-600">
                High-speed internet at all stations and on trains
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Security Services</h3>
              <p className="mt-2 text-gray-600">
                24/7 surveillance and security personnel
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Coffee className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Food & Beverages</h3>
              <p className="mt-2 text-gray-600">
                Cafes and convenience stores at major stations
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Accessibility className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Accessibility</h3>
              <p className="mt-2 text-gray-600">
                Elevators, ramps, and assistance for all passengers
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <ParkingSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Park & Ride</h3>
              <p className="mt-2 text-gray-600">
                Secure parking facilities at terminal stations
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Information Kiosks</h3>
              <p className="mt-2 text-gray-600">
                Customer service points for assistance and information
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Digital Maps</h3>
              <p className="mt-2 text-gray-600">
                Interactive maps and navigation assistance
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Ticket className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Automated Ticketing</h3>
              <p className="mt-2 text-gray-600">
                Self-service ticket machines for quick purchasing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Special Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Additional offerings to enhance your metro experience
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-white p-8 rounded-xl shadow-md overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary/10 rounded-full mr-4">
                    <CalendarDays className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Educational Tours</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  We offer guided educational tours for schools and universities, providing insights into the metro rail system's operations, technology, and impact on urban transportation.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Group bookings available for educational institutions</li>
                  <li>• Behind-the-scenes look at operations control center</li>
                  <li>• Interactive sessions with engineers and staff</li>
                  <li>• Special rates for student groups</li>
                </ul>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/educational-tours">Book a Tour</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary/10 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Transportation Consulting</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Leveraging our expertise in urban transportation, we offer consulting services to other cities and organizations looking to develop or improve their public transit systems.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Feasibility studies for new transit systems</li>
                  <li>• Operational efficiency analysis</li>
                  <li>• Technology implementation guidance</li>
                  <li>• Training and capacity building programs</li>
                </ul>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/consulting">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Request */}
      <section className="py-16 bg-primary">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white">Need Assistance?</h2>
            <p className="mt-4 text-lg text-white/80">
              Our customer service team is available to help with any questions or special service requests.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button asChild variant="secondary" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary" size="lg">
                <Link to="/faq">View FAQs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services; 