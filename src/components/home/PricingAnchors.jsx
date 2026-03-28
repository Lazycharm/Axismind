import React from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Check } from 'lucide-react';
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const packages = [
  {
    category: "Website Packages",
    badge: "Web Development",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    highlight: false,
    features: [
      "Professional responsive design",
      "SEO-optimized structure",
      "Contact & lead capture forms",
      "Mobile-first development",
      "1 year free maintenance",
      "SSL & security setup"
    ],
    cta: "Choose This Plan",
    msg: "Hello! I'm interested in your website package — let's get customers flowing in."
  },
  {
    category: "SEO & Marketing",
    badge: "Most Popular",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    highlight: true,
    features: [
      "Google UAE keyword targeting",
      "On-page & technical SEO",
      "Google Business Profile optimization",
      "Monthly performance reports",
      "Content creation & publishing",
      "Local UAE SEO for 5 cities"
    ],
    cta: "Start Getting Customers",
    msg: "Hello! I want SEO & marketing that brings in real leads — let's talk."
  },
  {
    category: "Business Automation",
    badge: "High Value",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    highlight: false,
    features: [
      "AI chatbot for your website",
      "CRM system setup & training",
      "WhatsApp automation flows",
      "Lead capture & nurturing",
      "Workflow automation",
      "30-day post-launch support"
    ],
    cta: "Choose This Plan",
    msg: "Hello! I want automation that saves time and captures more leads."
  },
];

export default function PricingAnchors() {
  const handleWhatsApp = (msg) => {
    window.open(`https://wa.me/971569520569?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="py-28 bg-gray-900/50 relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#8b5cf610,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">How We Engage</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Clear scopes for
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Every UAE Business
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Flexible engagement with straightforward proposals—tell us your goals and we&apos;ll map the right package.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg, i) => (
            <motion.div key={i} variants={scaleIn} transition={{ delay: i * 0.08 }}>
            <Card
              key={i}
              className={`relative flex flex-col transition-all duration-300 ${
                pkg.highlight
                  ? 'bg-gray-800 border-cyan-400/50 shadow-2xl shadow-cyan-400/10'
                  : 'glass border-white/10 hover:border-white/20'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-6 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                    ⭐ Most Recommended
                  </span>
                </div>
              )}
              <CardContent className="p-6 md:p-8 flex flex-col flex-1">
                <Badge className={`${pkg.badgeColor} mb-4 text-xs w-fit`}>{pkg.badge}</Badge>
                <h3 className="text-lg md:text-xl font-bold text-white mb-6">{pkg.category}</h3>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  type="button"
                  onClick={() => handleWhatsApp(pkg.msg)}
                  className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 ${
                    pkg.highlight
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/30'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {pkg.cta}
                </Button>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} className="text-center text-gray-500 text-sm mt-8">
          Need a tailored or enterprise rollout?{" "}
          <button
            type="button"
            onClick={() => handleWhatsApp("Hello! I need a custom enterprise package. Please share details.")}
            className="text-blue-400 hover:underline"
          >
            Message us on WhatsApp →
          </button>
        </motion.p>
      </div>
    </motion.section>
  );
}