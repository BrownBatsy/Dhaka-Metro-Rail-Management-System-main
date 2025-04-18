
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 bg-metro-green rounded-md flex items-center justify-center mr-2">
                <span className="text-white font-bold">DM</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Dhaka Metro</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Connecting Dhaka with modern, efficient, and reliable metro rail service.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-metro-green">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-metro-green">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-metro-green">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h3>
            <div className="mt-4 space-y-2">
              <Link to="/" className="block text-gray-600 hover:text-metro-green">Home</Link>
              <Link to="/about" className="block text-gray-600 hover:text-metro-green">About</Link>
              <Link to="/services" className="block text-gray-600 hover:text-metro-green">Services</Link>
              <Link to="/contact" className="block text-gray-600 hover:text-metro-green">Contact</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Passenger Info</h3>
            <div className="mt-4 space-y-2">
              <Link to="/fares" className="block text-gray-600 hover:text-metro-green">Fares & Tickets</Link>
              <Link to="/routes" className="block text-gray-600 hover:text-metro-green">Routes & Maps</Link>
              <Link to="/schedule" className="block text-gray-600 hover:text-metro-green">Train Schedule</Link>
              <Link to="/lost-found" className="block text-gray-600 hover:text-metro-green">Lost & Found</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact</h3>
            <div className="mt-4 space-y-2 text-gray-600">
              <p>1234 Metro Station</p>
              <p>Dhaka, Bangladesh</p>
              <p>Phone: +880 1234-567890</p>
              <p>Email: info@dhakametro.com</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-6">
          <p className="text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Dhaka Metro Rail. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
