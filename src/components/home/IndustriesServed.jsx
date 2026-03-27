import React from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const industries = [
  {
    icon: "🏢",
    name: "Real Estate",
    desc: "Property websites, lead gen systems, CRM automation for Dubai & UAE agents.",
    tags: ["Lead Generation", "CRM", "Property Portals"]
  },
  {
    icon: "🛒",
    name: "Retail & E-commerce",
    desc: "Online stores, inventory management, Google Shopping campaigns for UAE retailers.",
    tags: ["Shopify", "WooCommerce", "Google Ads"]
  },
  {
    icon: "🏨",
    name: "Hospitality",
    desc: "Hotel websites, booking systems, review management, and local SEO for UAE hospitality.",
    tags: ["Booking Systems", "Local SEO", "Reviews"]
  },
  {
    icon: "🏗️",
    name: "Construction & Contracting",
    desc: "Corporate websites, tender management tools, and Google Ads for contractors in UAE.",
    tags: ["Corporate Sites", "Lead Capture", "Ads"]
  },
  {
    icon: "💊",
    name: "Healthcare & Clinics",
    desc: "Patient portals, appointment booking, local SEO for UAE clinics and medical centres.",
    tags: ["Booking Systems", "HIPAA", "Local SEO"]
  },
  {
    icon: "🎓",
    name: "Education & Training",
    desc: "LMS platforms, course websites, student management systems for UAE institutes.",
    tags: ["LMS", "Student Portals", "Marketing"]
  },
  {
    icon: "🚀",
    name: "Startups & SMEs",
    desc: "MVP development, brand identity, digital marketing to launch and grow fast in UAE.",
    tags: ["MVP", "Branding", "Growth Marketing"]
  },
  {
    icon: "🏭",
    name: "Logistics & Supply Chain",
    desc: "Tracking systems, driver apps, operational dashboards for UAE logistics companies.",
    tags: ["Mobile Apps", "Dashboards", "Automation"]
  },
];

export default function IndustriesServed() {
  const handleWhatsApp = (industry) => {
    window.open(`https://wa.me/971569520569?text=Hello! I'm in the ${industry} industry and I'd like to discuss solutions for my business.`, '_blank');
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="py-28 bg-gray-900 relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#3b82f608,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">Industries</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tailored Solutions for
            <span className="block mt-2 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Your Industry
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We understand the unique challenges of each sector. Our solutions are built around your industry's needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {industries.map((ind, i) => (
            <motion.div key={i} variants={scaleIn}>
            <Card
              key={i}
              className="glass border-white/10 hover:border-amber-500/30 transition-all duration-300 group cursor-pointer"
              onClick={() => handleWhatsApp(ind.name)}
            >
              <CardContent className="p-6">
                <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform duration-300">
                  {ind.icon}
                </span>
                <h3 className="text-white font-bold mb-2 group-hover:text-amber-400 transition-colors">
                  {ind.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{ind.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {ind.tags.map((tag, ti) => (
                    <span key={ti} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-400 border border-gray-600/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="text-center glass rounded-2xl p-8 border border-white/10">
          <p className="text-gray-300 mb-4 text-lg">
            Don't see your industry? <span className="text-blue-400 font-semibold">We work with all UAE businesses.</span>
          </p>
          <Button
            onClick={() => handleWhatsApp('my')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Discuss Your Industry
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}