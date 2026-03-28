import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, MessageCircle, Search, TrendingUp, Users } from "lucide-react";
import { scaleIn, staggerContainer } from "@/lib/motion";
import { openWhatsApp, WHATSAPP_MESSAGES } from "@/utils";

const bullets = [
  { icon: Search, label: "Website issues" },
  { icon: TrendingUp, label: "SEO gaps" },
  { icon: Users, label: "Missed lead opportunities" },
];

export default function GrowthAuditSection() {
  const sendAudit = () => openWhatsApp(WHATSAPP_MESSAGES.audit);

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="py-28 bg-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0ea5e914,transparent_65%)]" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          variants={scaleIn}
          className="glass border border-white/10 rounded-3xl p-8 md:p-12 md:flex md:items-center md:gap-12 md:justify-between shadow-[0_0_60px_rgba(6,182,212,0.08)]"
        >
          <div className="flex-1 mb-8 md:mb-0">
            <Badge className="mb-4 bg-cyan-500/15 text-cyan-300 border-cyan-500/30">
              <ClipboardCheck className="w-3.5 h-3.5 mr-1.5" />
              Limited-time offer
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Free UAE Business Growth Audit
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
              Let us show you what&apos;s stopping your business from getting customers.
            </p>
            <ul className="space-y-3">
              {bullets.map((b) => {
                const Icon = b.icon;
                return (
                  <li key={b.label} className="flex items-center gap-3 text-gray-300">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] border border-white/10">
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </span>
                    <span className="text-sm md:text-base">{b.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto md:min-w-[240px] shrink-0">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="w-full">
              <Button
                type="button"
                size="lg"
                onClick={sendAudit}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-6 rounded-xl shadow-lg shadow-cyan-500/20"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Check My Website
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="w-full">
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={sendAudit}
                className="w-full border-2 border-white/25 bg-white/[0.04] text-white hover:bg-white/[0.1] hover:text-white py-6 rounded-xl shadow-none"
              >
                Show Me What&apos;s Wrong
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
