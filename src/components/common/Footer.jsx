import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Mail, 
  Phone, 
  MessageCircle,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Clock
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    'Web Design & Development',
    'Mobile App Development',
    'Logo & Brand Identity',
    'Smart Home Setup',
    'Tech Installations',
    'Laptop Repair Services'
  ];

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-3">
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  AxisMind
                </span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Your trusted UAE-based tech partner for web development, mobile apps, 
                smart home solutions, and professional tech services.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">axismind.click</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:hello@axismind.click" className="text-gray-300 hover:text-white transition-colors">
                  hello@axismind.click
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <a href="tel:+971569520569" className="text-gray-300 hover:text-white transition-colors">
                  +971 56 952 0569
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">United Arab Emirates</span>
              </div>
            </div>

            <Button
              onClick={() => window.open('https://wa.me/971569520569?text=Hello! I found you through your website.', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Us
            </Button>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#services');
                    }}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h5 className="font-semibold text-white mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200 group"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Business Hours & CTA */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">
              Business Hours
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Monday - Friday</span>
                <span className="text-white font-medium">9 AM - 9 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Saturday</span>
                <span className="text-white font-medium">10 AM - 6 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Sunday</span>
                <span className="text-white font-medium">Closed</span>
              </div>
              <div className="flex items-center space-x-2 mt-4 p-3 bg-green-900/30 rounded-lg border border-green-500/20">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-xs font-medium">Available on WhatsApp 24/7</span>
              </div>
            </div>

            {/* Newsletter/Updates */}
            <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/20 p-4">
              <div className="text-center">
                <h5 className="font-semibold text-white mb-2">Get Project Updates</h5>
                <p className="text-xs text-gray-400 mb-4">
                  Stay informed about your project progress
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-xs"
                  onClick={() => scrollToSection('#contact')}
                >
                  Contact Us
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} AxisMind. All rights reserved. | UAE-Based Tech Solutions
            </div>
            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <span>Domain: axismind.click</span>
              <span>|</span>
              <span>Made with ❤️ in the UAE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}