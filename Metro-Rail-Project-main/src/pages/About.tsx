import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarClock, MapPin, Train, Users, Shield, Award, HeartHandshake } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout isLoggedIn={false}>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-metro-green md:text-5xl">About Dhaka Metro Rail</h1>
            <p className="mt-6 text-lg text-gray-600">
              Transforming urban transportation in Bangladesh with modern, efficient, and sustainable public transit solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <p className="mt-4 text-gray-600">
                Dhaka Metro Rail represents a significant milestone in Bangladesh's transportation infrastructure. Launched in 2022, it was conceived as a solution to the capital city's growing traffic congestion and environmental concerns.
              </p>
              <p className="mt-4 text-gray-600">
                The project began with the MRT Line-6, connecting Uttara to Motijheel, spanning 20.1 kilometers with 16 stations. This marked the first step in an ambitious plan to develop a comprehensive metro network across Dhaka by 2030.
              </p>
              <p className="mt-4 text-gray-600">
                Today, Dhaka Metro Rail serves thousands of commuters daily, providing a reliable, safe, and efficient alternative to road transportation, while reducing carbon emissions and improving the quality of urban life.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-96 w-full overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="https://tfe-bd.sgp1.cdn.digitaloceanspaces.com/posts/30756/metro.jpg" 
                  alt="Dhaka Metro Train" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission & Vision</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="p-8 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-metro-green">Our Mission</h3>
              <p className="mt-4 text-gray-600">
                To provide a safe, efficient, and sustainable mass transit system that enhances mobility, reduces traffic congestion, and improves the quality of life for the citizens of Dhaka.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-metro-green">Our Vision</h3>
              <p className="mt-4 text-gray-600">
                To become the backbone of Dhaka's public transportation system, connecting all key areas of the city with an environmentally friendly, technologically advanced, and accessible metro network by 2030.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            <p className="mt-4 text-gray-600">
              The principles that guide our operations and services.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-metro-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Safety</h3>
              <p className="mt-2 text-gray-600">
                Ensuring the highest standards of safety for all passengers and staff.
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <CalendarClock className="w-12 h-12 text-metro-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Reliability</h3>
              <p className="mt-2 text-gray-600">
                Maintaining punctual and consistent service that our customers can depend on.
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Award className="w-12 h-12 text-metro-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Excellence</h3>
              <p className="mt-2 text-gray-600">
                Striving for the highest quality in all aspects of our service and operations.
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <HeartHandshake className="w-12 h-12 text-metro-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Inclusivity</h3>
              <p className="mt-2 text-gray-600">
                Creating an accessible system that serves all members of our community.
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Train className="w-12 h-12 text-metro-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Innovation</h3>
              <p className="mt-2 text-gray-600">
                Embracing new technologies and ideas to improve our service continuously.
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-metro-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Community</h3>
              <p className="mt-2 text-gray-600">
                Contributing positively to the communities we serve and the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Milestones */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Key Milestones</h2>
            <p className="mt-4 text-gray-600">
              Our journey of growth and development.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm md:flex-row">
                <div className="flex-shrink-0 w-24 h-24 mb-4 mr-0 md:mr-6 md:mb-0">
                  <div className="flex items-center justify-center w-full h-full text-xl font-bold text-white bg-metro-green rounded-full">
                    2011
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Project Approval</h3>
                  <p className="mt-2 text-gray-600">
                    The government of Bangladesh approved the Dhaka Metro Rail Project, marking the beginning of a new era in public transportation.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm md:flex-row">
                <div className="flex-shrink-0 w-24 h-24 mb-4 mr-0 md:mr-6 md:mb-0">
                  <div className="flex items-center justify-center w-full h-full text-xl font-bold text-white bg-metro-green rounded-full">
                    2016
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Construction Begins</h3>
                  <p className="mt-2 text-gray-600">
                    Construction of the MRT Line-6 officially began, with the goal of connecting Uttara to Motijheel.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm md:flex-row">
                <div className="flex-shrink-0 w-24 h-24 mb-4 mr-0 md:mr-6 md:mb-0">
                  <div className="flex items-center justify-center w-full h-full text-xl font-bold text-white bg-metro-green rounded-full">
                    2022
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Partial Opening</h3>
                  <p className="mt-2 text-gray-600">
                    The Uttara North to Agargaon section of MRT Line-6 opened for commercial operation, serving thousands of commuters daily.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm md:flex-row">
                <div className="flex-shrink-0 w-24 h-24 mb-4 mr-0 md:mr-6 md:mb-0">
                  <div className="flex items-center justify-center w-full h-full text-xl font-bold text-white bg-metro-green rounded-full">
                    2023
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Full Line Operation</h3>
                  <p className="mt-2 text-gray-600">
                    The complete MRT Line-6 from Uttara to Motijheel began operations, marking a significant milestone in Dhaka's transportation history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-metro-green">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white">Experience the Future of Urban Transit</h2>
            <p className="mt-4 text-white/80">
              Join thousands of commuters who have made Dhaka Metro Rail their preferred mode of transportation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button asChild variant="secondary" size="lg">
                <Link to="/services">Our Services</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-metro-green" size="lg">
                <Link to="/schedule">View Schedules</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About; 