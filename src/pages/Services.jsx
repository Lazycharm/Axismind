import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SEO from "@/components/common/SEO";
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Home, 
  Settings, 
  Laptop,
  MessageCircle,
  Star,
  CheckCircle,
  Clock
} from 'lucide-react';


export default function Services() {
  const services = [
    {
      icon: Globe,
      title: "Web Design & Development",
      description: "Professional responsive websites that convert visitors into customers. Built with modern technologies and SEO optimized for maximum online visibility.",
      features: [
        "Responsive Design (Mobile, Tablet, Desktop)",
        "SEO Optimization for Google Rankings",
        "Content Management System (CMS)",
        "Contact Forms & Lead Capture",
        "SSL Security Certificate",
        "1 Year Free Support & Maintenance",
        "Google Analytics Integration",
        "Social Media Integration"
      ],
      technologies: ["React", "WordPress", "HTML5", "CSS3", "JavaScript"],
      popular: true,
      color: "blue",
      deliveryTime: "5-7 days",
      revisions: "Unlimited"
    },
    {
      icon: Smartphone,
      title: "App Development",
      description: "Custom mobile apps for iOS and Android. User-friendly interfaces with powerful backend systems and modern features that users love.",
      features: [
        "Native iOS & Android Development",
        "Cross-Platform Solutions (React Native)",
        "Custom UI/UX Design", 
        "API Integration & Backend Development",
        "Push Notifications",
        "App Store & Google Play Submission",
        "Analytics & Performance Tracking",
        "3 Months Free Support"
      ],
      technologies: ["React Native", "Swift", "Kotlin", "Firebase", "Node.js"],
      color: "purple",
      deliveryTime: "3-4 weeks",
      revisions: "5 rounds"
    },
    {
      icon: Palette,
      title: "Logo & Brand Identity",
      description: "Complete branding solutions including logo design, business cards, and brand guidelines that make your business memorable and professional.",
      features: [
        "Custom Logo Design (3 Concepts)",
        "Business Card Design",
        "Letterhead Design", 
        "Brand Color Palette",
        "Typography Guidelines",
        "Social Media Kit",
        "Brand Guidelines Document",
        "High-Resolution Files (AI, PNG, JPG)"
      ],
      technologies: ["Adobe Illustrator", "Photoshop", "Figma", "Canva Pro"],
      color: "orange",
      deliveryTime: "3-5 days",
      revisions: "Unlimited"
    },
    {
      icon: Home,
      title: "Smart Home Setup",
      description: "Transform your home with intelligent automation systems for lighting, security, climate control, and entertainment with voice control integration.",
      features: [
        "Smart Lighting Control (Philips Hue, etc.)",
        "Climate Control Automation",
        "Security Camera Installation",
        "Smart Door Locks & Access Control",
        "Voice Assistant Integration (Alexa, Google)",
        "Mobile App Control",
        "Energy Monitoring & Optimization",
        "Professional Installation & Setup"
      ],
      technologies: ["Home Assistant", "Alexa Skills", "Google Home", "IoT Sensors"],
      color: "green",
      deliveryTime: "1-2 days",
      revisions: "Configuration tweaks"
    },
    {
      icon: Settings,
      title: "Tech Installations",
      description: "Professional installation and setup of networking equipment, security cameras, printers, and smart devices with complete configuration.",
      features: [
        "WiFi Router Setup & Optimization",
        "CCTV Camera Installation",
        "Network Configuration",
        "Printer & Scanner Setup",
        "Smart TV & Entertainment Systems",
        "Computer & Laptop Setup",
        "Data Transfer & Backup",
        "Troubleshooting & Maintenance"
      ],
      technologies: ["Networking", "IP Cameras", "Wireless Config", "Hardware Setup"],
      color: "indigo",
      deliveryTime: "Same day",
      revisions: "Follow-up support"
    },
    {
      icon: Laptop,
      title: "Laptop Repair",
      description: "Expert laptop repair services with genuine parts and warranty. Quick turnaround time for all major brands including Apple, Dell, HP, Lenovo.",
      features: [
        "Hardware Repair (Screen, Keyboard, etc.)",
        "Software Issues & Virus Removal",
        "Data Recovery Services",
        "Performance Optimization",
        "Battery Replacement",
        "Cooling System Cleaning",
        "RAM & SSD Upgrades",
        "30-Day Service Warranty"
      ],
      technologies: ["Hardware Diagnostics", "Software Tools", "Genuine Parts"],
      color: "red",
      deliveryTime: "24-48 hours",
      revisions: "Warranty coverage"
    }
  ];

  const colorClasses = {
    blue: {
      gradient: "from-blue-800/30 to-blue-900/30",
      border: "border-blue-700",
      text: "text-blue-400",
      bg: "bg-blue-600",
      badge: "bg-blue-900 text-blue-300 border-blue-700"
    },
    purple: {
      gradient: "from-purple-800/30 to-purple-900/30",
      border: "border-purple-700", 
      text: "text-purple-400",
      bg: "bg-purple-600",
      badge: "bg-purple-900 text-purple-300 border-purple-700"
    },
    orange: {
      gradient: "from-orange-800/30 to-orange-900/30",
      border: "border-orange-700",
      text: "text-orange-400", 
      bg: "bg-orange-600",
      badge: "bg-orange-900 text-orange-300 border-orange-700"
    },
    green: {
      gradient: "from-green-800/30 to-green-900/30",
      border: "border-green-700",
      text: "text-green-400",
      bg: "bg-green-600",
      badge: "bg-green-900 text-green-300 border-green-700"
    },
    indigo: {
      gradient: "from-indigo-800/30 to-indigo-900/30",
      border: "border-indigo-700",
      text: "text-indigo-400",
      bg: "bg-indigo-600",
      badge: "bg-indigo-900 text-indigo-300 border-indigo-700"
    },
    red: {
      gradient: "from-red-800/30 to-red-900/30",
      border: "border-red-700",
      text: "text-red-400",
      bg: "bg-red-600",
      badge: "bg-red-900 text-red-300 border-red-700"
    }
  };

  const handleWhatsAppInquiry = (service) => {
    const message = `Hello! I'm interested in ${service.title}. Can you provide more details and a custom quote?`;
    window.open(`https://wa.me/971569520569?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <SEO 
        title="Our Services - Web Development, Apps, Branding & More | AxisMind UAE"
        description="AxisMind UAE services: Web development from AED 699, mobile apps, logo design, smart home setup, tech installations, laptop repair. Professional tech solutions in Dubai with 5-star rating."
        keywords="web development services UAE, mobile app development Dubai, logo design UAE, smart home installation Dubai, tech services UAE, laptop repair Dubai, website design services"
        url="https://axismind.click/services"
      />
      
      <div className="bg-gray-900 text-white">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Technology Services"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
                Our Services
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Complete Tech Solutions
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  for Your Business
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From web development to smart home automation, we provide comprehensive 
                technology solutions tailored to your needs with professional service.
              </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                const colors = colorClasses[service.color];
                
                return (
                  <Card
                    key={index}
                    className={`relative group transition-all duration-500 border bg-gray-800 ${colors.border} hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 transform`}
                  >
                    {service.popular && (
                      <Badge className="absolute -top-3 left-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 border-0">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Most Popular
                      </Badge>
                    )}
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-start mb-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`w-8 h-8 ${colors.text}`} />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">Delivery: {service.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-300">Revisions: {service.revisions}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-white mb-3">What's Included:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-200">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-white mb-3">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className={`text-xs ${colors.badge}`}>
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={() => handleWhatsAppInquiry(service)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 group-hover:scale-105 shadow-lg shadow-blue-500/20"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Get Quote on WhatsApp
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-20 text-center bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need Something Custom?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                We create tailored tech solutions for unique requirements. 
                Let's discuss your specific needs and build something amazing together.
              </p>
              
              <Button
                size="lg"
                onClick={() => window.open('https://wa.me/971569520569?text=Hi! I need a custom tech solution. Can we discuss my requirements?', '_blank')}
                className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Discuss Custom Solutions
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}