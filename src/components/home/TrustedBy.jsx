import React from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const industries = [
  { name: "Real Estate", icon: "🏢" },
  { name: "Retail & E-commerce", icon: "🛒" },
  { name: "Hospitality", icon: "🏨" },
  { name: "Construction", icon: "🏗️" },
  { name: "Healthcare", icon: "🏥" },
  { name: "Finance & Banking", icon: "💼" },
  { name: "Education", icon: "🎓" },
  { name: "Logistics", icon: "🚚" },
];

export default function TrustedBy() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={staggerContainer}
      className="py-20 bg-gray-900/80 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={fadeUp} className="text-center mb-10">
          <Badge className="mb-3 bg-green-500/20 text-green-400 border-green-500/30 text-xs uppercase tracking-widest">
            Trusted Across UAE
          </Badge>
          <p className="text-gray-400 text-sm">
            Serving businesses across Dubai, Abu Dhabi, Sharjah, Ajman & Al Ain
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {industries.map((industry, i) => (
            <motion.div
              variants={scaleIn}
              key={i}
              className="flex flex-col items-center gap-2 p-4 glass rounded-xl border border-white/5 hover:border-cyan-400/30 transition-all duration-300 group"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {industry.icon}
              </span>
              <span className="text-xs text-gray-400 text-center leading-tight group-hover:text-gray-200 transition-colors">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-8 mt-12 border-t border-white/5 pt-10">
          {[
            { label: "50+", sub: "Projects Delivered" },
            { label: "100%", sub: "Client Satisfaction" },
            { label: "24/7", sub: "WhatsApp Support" },
            { label: "5★", sub: "Google Rated" },
            { label: "UAE", sub: "Local Experts" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{stat.label}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}