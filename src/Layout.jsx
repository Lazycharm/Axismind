import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { 
  Menu, 
  X, 
  MessageCircle, 
  ChevronUp,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { backend } from "@/api/backendClient";

const DEFAULT_LOGO_URL = "/logo.png";
const DEFAULT_FAVICON_URL = "/logo.png";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [brandLogoUrl, setBrandLogoUrl] = useState("");
  const [userLoaded, setUserLoaded] = useState(false);

  const baseNavigationItems = [
    { name: 'Home', url: createPageUrl('Home') },
    { name: 'About', url: createPageUrl('About') },
    { name: 'Services', url: createPageUrl('Services') },
    { name: 'Portfolio', url: createPageUrl('Portfolio') },
    { name: 'Testimonials', url: createPageUrl('Testimonials') },
    { name: 'Contact', url: createPageUrl('Contact') }
  ];

  // Check if user is admin
  useEffect(() => {
    checkAdminStatus();
    loadBranding();
  }, []);

  const applyFavicon = (faviconUrl) => {
    const targetUrl = faviconUrl || DEFAULT_FAVICON_URL;
    const cacheBustedUrl = `${targetUrl}${targetUrl.includes("?") ? "&" : "?"}v=${Date.now()}`;
    const links = document.querySelectorAll("link[rel*='icon']");
    links.forEach((node) => node.remove());

    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = cacheBustedUrl;
    document.head.appendChild(link);
  };

  const loadBranding = async () => {
    try {
      const settings = await backend.entities.SiteSettings.list();
      const logoSetting = settings.find((item) => item.key === "brand_logo_url");
      const faviconSetting = settings.find((item) => item.key === "brand_favicon_url");
      setBrandLogoUrl(logoSetting?.value || DEFAULT_LOGO_URL);
      applyFavicon(faviconSetting?.value || "");
    } catch {
      setBrandLogoUrl(DEFAULT_LOGO_URL);
      applyFavicon("");
    }
  };

  useEffect(() => {
    const handleSettingsUpdated = () => {
      loadBranding();
    };
    window.addEventListener("site-settings-updated", handleSettingsUpdated);
    return () => window.removeEventListener("site-settings-updated", handleSettingsUpdated);
  }, []);

  const checkAdminStatus = async () => {
    try {
      const user = await backend.auth.me();
      if (user && user.role === 'admin') {
        setIsAdmin(true);
      }
    } catch (error) {
      // User not logged in or not admin
      setIsAdmin(false);
    }
    setUserLoaded(true);
  };

  // Add Admin link only if user is admin
  const navigationItems = isAdmin 
    ? [...baseNavigationItems, { name: 'Admin', url: createPageUrl('Admin'), icon: Shield }]
    : baseNavigationItems;

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      setIsScrolled(window.scrollY > 24);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/971569520569?text=Hello! I\'m interested in AxisMind\'s services.', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        :root {
          --primary: #0F172A;
          --secondary: #1E293B;
          --accent: #3B82F6;
          --accent-dark: #2563EB;
          --surface: #0F172A;
          --surface-light: #1E293B;
          --text-primary: #F8FAFC;
          --text-secondary: #CBD5E1;
          --border: #334155;
          --gradient-start: #3B82F6;
          --gradient-end: #8B5CF6;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.7;
          background-color: #0F172A;
          color: #F8FAFC;
          letter-spacing: -0.01em;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .fade-in {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .fade-in-delay-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-in-delay-2 { animation-delay: 0.2s; opacity: 0; }
        .fade-in-delay-3 { animation-delay: 0.3s; opacity: 0; }
        .fade-in-delay-4 { animation-delay: 0.4s; opacity: 0; }

        /* Glass morphism */
        .glass {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(148, 163, 184, 0.1);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Performance optimizations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        img {
          content-visibility: auto;
        }

        /* Button hover effects */
        .btn-glow:hover {
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.4);
        }

        /* Blob animation */
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes headline-glow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.04); }
        }

        .headline-glow {
          animation: headline-glow 4s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        /* Cyan accent utilities */
        .text-cyan { color: #22D3EE; }
        .border-cyan { border-color: rgba(34,211,238,0.35); }
        .bg-cyan-glow { background: rgba(34,211,238,0.12); }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Sticky Navigation - Modern Glass Effect */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? "bg-gray-950/80 backdrop-blur-xl border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
            : "glass border-white/5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16" : "h-[4.5rem]"}`}>
            {/* Logo - Modern Minimal */}
            <Link 
              to={createPageUrl('Home')} 
              className="flex items-center gap-2.5 group shrink-0"
            >
              <img
                src={brandLogoUrl || DEFAULT_LOGO_URL}
                alt="AxisMind logo"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-xl ring-1 ring-white/10 bg-white/[0.03] p-1.5 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex items-center min-w-0">
                <span className="text-lg sm:text-[1.35rem] font-extrabold tracking-[0.08em] leading-none whitespace-nowrap uppercase bg-gradient-to-b from-cyan-200 via-blue-200 to-slate-100 bg-clip-text text-transparent [text-shadow:0_1px_10px_rgba(59,130,246,0.28)]">
                  AXISMIND
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-6">
              {navigationItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.url}
                    className={`text-sm font-medium transition-all duration-300 relative group flex items-center gap-1.5 px-2 xl:px-3 py-2 rounded-lg whitespace-nowrap ${
                      location.pathname === item.url 
                        ? 'text-blue-400 bg-blue-500/10' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {ItemIcon && <ItemIcon className="w-4 h-4" />}
                    {item.name}
                  </Link>
                );
              })}
              
              <Button
                onClick={handleWhatsAppClick}
                className="hidden xl:inline-flex bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20 btn-glow whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-300" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden py-4 border-t border-gray-700 bg-gray-900 overflow-hidden"
            >
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.url}
                      className={`flex items-center gap-2 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                        location.pathname === item.url 
                          ? 'text-amber-400 bg-gray-800' 
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {ItemIcon && <ItemIcon className="w-4 h-4" />}
                      {item.name}
                    </Link>
                  );
                })}
                <div className="px-4 pt-4">
                  <Button
                    onClick={() => {
                      handleWhatsAppClick();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact on WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Modern Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img
                  src={brandLogoUrl || DEFAULT_LOGO_URL}
                  alt="AxisMind logo"
                  className="w-12 h-12 object-contain rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">AxisMind</h3>
                  <p className="text-xs text-gray-500">Digital Growth Agency · UAE</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Technology & Digital Growth Agency helping UAE businesses grow through web development, SEO, Google Ads, and business automation.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                {navigationItems.filter(item => item.name !== 'Admin').map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.url}
                      className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Services</h4>
              <ul className="space-y-3">
                {[
                  "SEO Services UAE",
                  "Google Ads Management",
                  "Web Development Dubai",
                  "Mobile App Development",
                  "Business Automation UAE",
                  "AI Chatbots for Business",
                  "Smart Home Installation",
                  "Laptop & Tech Repair",
                ].map((s, i) => (
                  <li key={i}>
                    <Link to={createPageUrl('Services')} className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Contact Info</h4>
              <div className="space-y-4 text-sm">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  <a href="https://wa.me/971569520569" className="text-gray-400 hover:text-white transition-colors">
                    +971 56 952 0569
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <a href="mailto:info@axismind.click" className="text-gray-400 hover:text-white transition-colors">
                    info@axismind.click
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span className="text-gray-400">UAE</span>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center transition-colors group"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} AxisMind. All rights reserved. | Serving Dubai, Abu Dhabi, Sharjah & beyond.
            </p>
          </div>
        </div>
      </footer>

      {/* Modern Floating Contact Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-2xl shadow-2xl shadow-blue-500/30 transform hover:scale-110 transition-all duration-300 group btn-glow"
        aria-label="Contact Us"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute inset-0 bg-blue-400 rounded-2xl animate-ping opacity-20"></div>
      </button>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-50 glass hover:bg-white/10 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-white/10"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}