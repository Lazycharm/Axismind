import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl, openWhatsApp, WHATSAPP_MESSAGES } from '@/utils';
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function CTASection() {
  const handleWhatsApp = () => openWhatsApp(WHATSAPP_MESSAGES.audit);

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,#ffffff20,transparent_60%)]" />

      {/* Animated blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8 text-white text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Available Now — UAE Business Hours & Beyond
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Let&apos;s Grow Your Business
          <span className="block mt-1 bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            Starting Today
          </span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
          Get a clear read on what&apos;s blocking leads—then we map the fastest fixes for your UAE market.
          No fluff. No hard sell.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="button"
            size="lg"
            onClick={handleWhatsApp}
            className="bg-white hover:bg-gray-100 text-blue-700 px-10 py-6 text-lg font-bold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Get Free Audit Now
          </Button>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
          <Link to={createPageUrl('Contact')} className="w-full sm:w-auto">
            <Button
              type="button"
              size="lg"
              className="w-full sm:w-auto border-2 border-white/30 bg-white/[0.04] text-white hover:bg-white/[0.14] hover:text-white shadow-none px-10 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm"
            >
              <Mail className="w-5 h-5 mr-2" />
              Talk to Our Team
            </Button>
          </Link>
          </motion.div>
        </motion.div>

        {/* Contact info strip */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-8 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <a href="tel:+971569520569" className="hover:text-white transition-colors">+971 56 952 0569</a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a href="mailto:info@axismind.click" className="hover:text-white transition-colors">info@axismind.click</a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}