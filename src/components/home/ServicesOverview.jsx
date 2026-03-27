import React from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  Search, TrendingUp, Share2, Globe, Smartphone, ShoppingCart,
  Home as HomeIcon, Bot, Workflow, MessageCircle, ArrowRight
} from 'lucide-react';
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const serviceCategories = [
  {
    badge: "Digital Marketing",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    title: "Grow Your Business Online",
    description: "Data-driven digital marketing strategies that bring qualified UAE customers to your business.",
    accentColor: "from-emerald-500/20 to-teal-500/20",
    borderHover: "hover:border-emerald-500/40",
    iconColor: "text-emerald-400",
    services: [
      { icon: Search, name: "SEO Services", desc: "Rank #1 on Google UAE" },
      { icon: TrendingUp, name: "Google Ads", desc: "High-ROI paid campaigns" },
      { icon: Share2, name: "Social Media Marketing", desc: "Build & engage your audience" },
    ],
    cta: "Explore Marketing →",
    href: createPageUrl('Services'),
    pricing: "From AED 1,500/month"
  },
  {
    badge: "Web & App Development",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    title: "Build Your Digital Presence",
    description: "Professional websites and mobile apps that convert visitors into paying customers.",
    accentColor: "from-blue-500/20 to-purple-500/20",
    borderHover: "hover:border-blue-500/40",
    iconColor: "text-blue-400",
    services: [
      { icon: Globe, name: "Web Development", desc: "Fast, SEO-optimised websites" },
      { icon: Smartphone, name: "Mobile Apps", desc: "iOS & Android apps" },
      { icon: ShoppingCart, name: "E-commerce", desc: "Online stores that sell" },
    ],
    cta: "Explore Development →",
    href: createPageUrl('Services'),
    pricing: "From AED 2,500"
  },
  {
    badge: "Business Automation",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    title: "Automate & Scale Faster",
    description: "AI-powered automation systems that save time, reduce costs, and accelerate growth.",
    accentColor: "from-purple-500/20 to-pink-500/20",
    borderHover: "hover:border-purple-500/40",
    iconColor: "text-purple-400",
    services: [
      { icon: Bot, name: "AI Chatbots", desc: "24/7 customer support bots" },
      { icon: Workflow, name: "Workflow Automation", desc: "Streamline operations" },
      { icon: HomeIcon, name: "Smart Home / Office", desc: "IoT & smart installations" },
    ],
    cta: "Explore Automation →",
    href: createPageUrl('Services'),
    pricing: "Custom pricing"
  },
];

export default function ServicesOverview() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/971569520569?text=Hello! I'd like to learn more about AxisMind's services.", '_blank');
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="py-28 bg-gray-900 relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3b82f608,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">Our Solutions</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything Your Business Needs
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              To Grow in 2026
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From SEO to AI automation — we're the only UAE agency you need to dominate your market.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {serviceCategories.map((cat, i) => (
            <motion.div key={i} variants={scaleIn} transition={{ delay: i * 0.08 }}>
            <Card className={`glass border-white/10 ${cat.borderHover} transition-all duration-500 group h-full`}>
              <CardContent className="p-8 flex flex-col h-full">
                <Badge className={`${cat.badgeColor} w-fit mb-4 text-xs`}>{cat.badge}</Badge>
                <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{cat.description}</p>
                
                <div className="space-y-4 mb-6 flex-1">
                  {cat.services.map((svc, j) => {
                    const Icon = svc.icon;
                    return (
                      <motion.div key={j} className="flex items-center gap-3" whileHover={{ x: 3 }}>
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cat.accentColor} flex items-center justify-center flex-shrink-0 border border-white/10`}>
                          <Icon className={`w-4 h-4 ${cat.iconColor}`} />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{svc.name}</p>
                          <p className="text-gray-500 text-xs">{svc.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{cat.pricing}</span>
                    <Link to={cat.href} className={`text-xs font-medium ${cat.iconColor} hover:underline flex items-center gap-1`}>
                      Learn more <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="text-center">
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Button
              onClick={handleWhatsApp}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/20"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Get Free UAE Consultation
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}