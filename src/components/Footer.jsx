import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-10 mt-16 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand section */}
        <div>
          <h3 className="text-2xl font-bold text-white">Mali Naturals</h3>
          <p className="text-gray-400 mt-2">
            Smart shop management — product inventory, shop details and insights.
          </p>

          <p className="text-sm text-gray-500 mt-4">
            © {new Date().getFullYear()} Mali Naturals.
            <br />Built with ❤️ by <span className="text-primary-400 font-semibold">WebVyasa</span>.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
            <li><Link to="/shops/new" className="hover:text-white">Add Shop</Link></li>
            <li><Link to="/profile" className="hover:text-white">My Profile</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <p className="text-gray-400">Email: support@malinaturals.com</p>
          <p className="text-gray-400">Phone: +91-9876543210</p>
          <p className="text-gray-500 text-sm mt-3">
            Follow us for updates, offers and product promotions.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
