import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { openWhatsApp, WHATSAPP_MESSAGES } from "@/utils";

const faqs = [
  {
    q: "How do you scope website development projects in UAE?",
    a: "Every project is scoped to your goals, pages, and features. We provide a clear written proposal before work begins—no surprise add-ons, and we explain what drives timeline and complexity."
  },
  {
    q: "How long does SEO take to show results in Dubai?",
    a: "SEO in Dubai typically shows initial improvements within 3–4 months, with significant ranking gains by 6 months. Competitive industries like real estate or hospitality may take longer. Our UAE SEO packages focus on quick wins first — Google Business Profile, local citations, and technical fixes — while building long-term authority."
  },
  {
    q: "What does a digital marketing agency do for UAE businesses?",
    a: "A digital marketing agency like AxisMind helps UAE businesses grow online through SEO (Google ranking), Google Ads, social media marketing, content creation, email campaigns, and analytics. We develop data-driven strategies specifically for the UAE and GCC market to attract local customers and drive measurable ROI."
  },
  {
    q: "How can business automation help UAE companies?",
    a: "Business automation in UAE can reduce operational costs by 30–60%. Automation handles repetitive tasks like customer inquiries (AI chatbots), lead follow-up (CRM workflows), appointment booking, and WhatsApp marketing — freeing your team to focus on growth. Most UAE businesses see ROI within 3 months of implementing automation."
  },
  {
    q: "Do you serve businesses in Abu Dhabi, Sharjah, and other emirates?",
    a: "Yes! AxisMind serves clients across all UAE emirates — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Al Ain. We provide full remote services with on-site visits available in Dubai and Abu Dhabi."
  },
  {
    q: "Can you build a mobile app for my UAE business?",
    a: "Absolutely. We develop iOS and Android mobile apps for UAE businesses with custom UI/UX design, API integrations, push notifications, and App Store / Google Play submission. We've built apps for retail, healthcare, logistics, and hospitality sectors—ask us for a tailored scope."
  },
  {
    q: "How does your smart home installation service work in Dubai?",
    a: "Our smart home service in Dubai covers consultation, product selection (Philips Hue, Yale Smart Locks, Nest, etc.), professional installation, and full setup including mobile app configuration and voice assistant integration. We serve homes and offices across Dubai, with service available in other emirates upon request."
  },
  {
    q: "What makes AxisMind different from other UAE tech agencies?",
    a: "AxisMind combines three capabilities under one roof: digital marketing, technology development, and business automation. We're UAE-based with deep local market knowledge, offer 24/7 WhatsApp support, and take a results-driven approach with transparent reporting. We're a technology partner, not just a vendor."
  }
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="py-28 bg-gray-900 relative"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">FAQ</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Common questions from UAE businesses considering our services.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              variants={fadeUp}
              key={i}
              className={`glass rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === i ? 'border-cyan-400/40' : 'border-white/10 hover:border-white/20'
              }`}
              whileHover={{ y: -2 }}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-white font-medium text-sm md:text-base leading-snug">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180 text-cyan-400' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="text-center mt-14">
          <Button
            type="button"
            size="lg"
            onClick={() => openWhatsApp(WHATSAPP_MESSAGES.audit)}
            className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white px-8 py-6 rounded-xl font-semibold shadow-lg shadow-blue-500/20"
          >
            Still unsure? Let&apos;s fix your business
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}