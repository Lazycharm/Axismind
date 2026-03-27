import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Home, 
  Settings, 
  Laptop,
  MessageCircle,
  Star
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: "Web Design & Development",
    price: "AED 699",
    description: "Professional responsive websites that convert visitors into customers. Built with modern technologies and SEO optimized.",
    features: ["Responsive Design", "SEO Optimized", "Admin Panel", "1 Year Support"],
    popular: true,
    color: "blue"
  },
  {
    icon: Smartphone,
    title: "App Development",
    price: "Starting AED 2,999",
    description: "Custom mobile apps for iOS and Android. User-friendly interfaces with powerful backend systems.",
    features: ["iOS & Android", "Custom Features", "API Integration", "App Store Submission"],
    color: "purple"
  },
  {
    icon: Palette,
    title: "Logo & Brand Identity",
    price: "Starting AED 499",
    description: "Complete branding solutions including logo design, business cards, and brand guidelines.",
    features: ["Logo Design", "Brand Guidelines", "Business Cards", "Social Media Kit"],
    color: "orange"
  },
  {
    icon: Home,
    title: "Smart Home Setup",
    price: "Starting AED 1,299",
    description: "Transform your home with intelligent automation systems for lighting, security, and climate control.",
    features: ["Home Automation", "Security Systems", "Voice Control", "Mobile App Control"],
    color: "green"
  },
  {
    icon: Settings,
    title: "Tech Installations",
    price: "Starting AED 199",
    description: "Professional installation and setup of networking equipment, security cameras, and smart devices.",
    features: ["Network Setup", "CCTV Installation", "Device Configuration", "Maintenance"],
    color: "indigo"
  },
  {
    icon: Laptop,
    title: "Laptop Repair",
    price: "Starting AED 149",
    description: "Expert laptop repair services with genuine parts and warranty. Quick turnaround time.",
    features: ["Hardware Repair", "Software Issues", "Data Recovery", "30-Day Warranty"],
    color: "red"
  }
];

const colorClasses = {
  blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
  purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
  orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
  green: "from-green-500/20 to-green-600/20 border-green-500/30",
  indigo: "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30",
  red: "from-red-500/20 to-red-600/20 border-red-500/30"
};

export default function ServicesSection() {
  const handleWhatsAppInquiry = (service) => {
    const message = `Hello! I'm interested in ${service.title}. Can you provide more details?`;
    window.open(`https://wa.me/971569520569?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="services">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            Our Services
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Complete Tech Solutions
            <span className="block text-orange-500">for Your Business</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From web development to smart home automation, we provide comprehensive 
            technology solutions tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className={`relative group hover:shadow-2xl transition-all duration-300 border-2 bg-gradient-to-br ${colorClasses[service.color]} hover:scale-105 transform`}
              >
                {service.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${colorClasses[service.color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 text-${service.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    {service.price}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-center">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <div className={`w-2 h-2 rounded-full bg-${service.color}-500 mr-3 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleWhatsAppInquiry(service)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Get Quote on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Need a custom solution? We create tailored tech solutions for your unique requirements.
          </p>
          <Button
            size="lg"
            onClick={() => window.open('https://wa.me/971569520569?text=Hi! I need a custom tech solution. Can we discuss?', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Discuss Custom Solutions
          </Button>
        </div>
      </div>
    </section>
  );
}