import React from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We analyse your business, goals, target audience, and competitors to build a clear picture of what success looks like for you.",
    icon: "🔍",
    color: "from-blue-500/20 to-blue-600/20",
    border: "border-blue-500/30"
  },
  {
    number: "02",
    title: "Strategy",
    description: "Our experts craft a tailored strategy — SEO roadmap, tech stack, automation blueprint — aligned to UAE market dynamics.",
    icon: "📋",
    color: "from-purple-500/20 to-purple-600/20",
    border: "border-purple-500/30"
  },
  {
    number: "03",
    title: "Development",
    description: "We build, design, and implement with precision. Every deliverable is reviewed, tested, and quality-checked before handover.",
    icon: "⚙️",
    color: "from-emerald-500/20 to-emerald-600/20",
    border: "border-emerald-500/30"
  },
  {
    number: "04",
    title: "Launch",
    description: "Go-live with full support. We handle deployment, testing, and make sure everything works perfectly from day one.",
    icon: "🚀",
    color: "from-amber-500/20 to-amber-600/20",
    border: "border-amber-500/30"
  },
  {
    number: "05",
    title: "Growth",
    description: "We monitor performance, optimize campaigns, and continuously improve to ensure your investment keeps delivering results.",
    icon: "📈",
    color: "from-rose-500/20 to-rose-600/20",
    border: "border-rose-500/30"
  },
];

export default function HowWeWork() {
  return (
    <motion.section
      id="how-we-work"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="py-28 bg-gray-900/60 relative scroll-mt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#8b5cf615,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div variants={fadeUp}>
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">Our Process</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              A Structured Agency Process
              <span className="block mt-2 text-2xl md:text-3xl font-normal text-gray-400">
                Not a Freelancer's Guess-Work
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every project follows our proven 5-step methodology, ensuring consistency, quality, and measurable results.
            </p>
          </div>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i} variants={scaleIn} transition={{ delay: i * 0.08 }}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`relative glass rounded-2xl p-6 border ${step.border} transition-all duration-300 group h-full`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-xl mb-4 border border-white/10 group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold text-gray-600 mb-1">{step.number}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}