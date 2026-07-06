import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

import logo from "../../../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="mt-24 px-4 lg:px-8 pb-6">

      <div className="rounded-[28px] bg-white/5 backdrop-blur-xl border border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-14">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

            {/* Brand */}

            <div className="lg:col-span-2">

              <img
                src={logo}
                alt="DineExpress"
                className="h-14 w-auto"
              />

              <p className="mt-5 text-gray-400 leading-7 max-w-md">
                Discover amazing restaurants, reserve your table,
                order delicious food and enjoy unforgettable dining
                experiences—all from one place.
              </p>

              <div className="flex items-center gap-4 mt-8">

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 transition-all duration-300"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 transition-all duration-300"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 transition-all duration-300"
                >
                  <FaLinkedinIn />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 transition-all duration-300"
                >
                  <FaGithub />
                </a>

              </div>

            </div>

            {/* Company */}

            <div>

              <h3 className="text-lg font-semibold text-white mb-6">
                Company
              </h3>

              <ul className="space-y-4">

                <li><Link to="/about" className="text-gray-400 hover:text-orange-400">About</Link></li>

                <li><Link to="/restaurants" className="text-gray-400 hover:text-orange-400">Restaurants</Link></li>

                <li><Link to="/reservation" className="text-gray-400 hover:text-orange-400">Reservation</Link></li>

                <li><Link to="/contact" className="text-gray-400 hover:text-orange-400">Contact</Link></li>

              </ul>

            </div>

            {/* Support */}

            <div>

              <h3 className="text-lg font-semibold text-white mb-6">
                Support
              </h3>

              <ul className="space-y-4">

                <li><Link to="/">Help Center</Link></li>

                <li><Link to="/">FAQs</Link></li>

                <li><Link to="/">Privacy Policy</Link></li>

                <li><Link to="/">Terms & Conditions</Link></li>

              </ul>

            </div>

            {/* Contact */}

            <div>

              <h3 className="text-lg font-semibold text-white mb-6">
                Contact
              </h3>

              <ul className="space-y-4 text-gray-400">

                <li>📍 Kerala</li>

                <li>📧 support@dineexpress.com</li>

                <li>📞 +91 123456789</li>

              </ul>

            </div>

          </div>

          {/* Divider */}

          <div className="my-10 border-t border-white/10"></div>

          {/* Bottom */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-gray-500 text-sm">
              © 2026 DineExpress. All rights reserved.
            </p>

            <p className="text-gray-500 text-sm">
              Crafted with ❤️ using React & Tailwind CSS.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;