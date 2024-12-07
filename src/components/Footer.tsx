import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">CrispyCo</h3>
            <p className="mb-4">Crafting the perfect potato chips since 1970.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="hover:text-white">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                123 Crisp Street, Idaho 83702
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                (800) CRISPY-1
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                hello@crispyco.com
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Visit Our Factory</h3>
            <div className="rounded-lg overflow-hidden h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.6279494454587!2d-116.2064340842081!3d43.61499797912247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8e98d3269c3%3A0x9b6f75e26d9a8e!2sBoise%2C%20ID!5e0!3m2!1sen!2sus!4v1647904894713!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} CrispyCo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}