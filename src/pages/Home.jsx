import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEO from "@/components/common/SEO";
import { getPortfolioItems, getTestimonials } from '@/services/contentService';
import TrustedBy from '@/components/home/TrustedBy';
import PortfolioImageFrame from '@/components/portfolio/PortfolioImageFrame';
import PortfolioHighlightStrip from '@/components/portfolio/PortfolioHighlightStrip';
import ServicesOverview from '@/components/home/ServicesOverview';
import HowWeWork from '@/components/home/HowWeWork';
import IndustriesServed from '@/components/home/IndustriesServed';
import PricingAnchors from '@/components/home/PricingAnchors';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import GrowthAuditSection from '@/components/home/GrowthAuditSection';
import { openWhatsApp, WHATSAPP_MESSAGES } from '@/utils';
import {
  MessageCircle,
  Eye,
  Star,
  MapPin,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Bot,
  Globe
} from 'lucide-react';
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

export default function Home() {
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);
  const [featuredPortfolio, setFeaturedPortfolio] = useState([]);

  useEffect(() => {
    const loadFeatured = async () => {
      const [testimonials, portfolio] = await Promise.all([
        getTestimonials({ featured: true }),
        getPortfolioItems({ featured: true })
      ]);
      setFeaturedTestimonials(testimonials.slice(0, 3));
      setFeaturedPortfolio(portfolio.slice(0, 3));
    };
    loadFeatured();
  }, []);

  const scrollToHowWeWork = () => {
    document.getElementById('how-we-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO
        title="AxisMind — Technology & Digital Growth Agency UAE | Web, SEO, Apps & Automation"
        description="AxisMind is a UAE-based technology and digital growth agency helping businesses grow through web development, SEO, Google Ads, mobile apps, and business automation. Serving Dubai, Abu Dhabi, Sharjah."
        keywords="digital marketing agency UAE, web development Dubai, SEO services UAE, mobile app development Dubai, business automation UAE, Google Ads UAE, technology agency Dubai, IT solutions UAE"
        url="https://axismind.click"
      />

      <div className="bg-gray-900 min-h-screen">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            >
              <source src="https://cdn.coverr.co/videos/coverr-modern-digital-technology-network-9142/1080p.mp4" type="video/mp4" />
            </video>
          </div>
          <motion.div
            className="absolute inset-0 z-[1]"
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -top-10 -left-10 w-[30rem] h-[30rem] bg-blue-500/20 rounded-full blur-[120px]" />
            <div className="absolute top-20 -right-20 w-[28rem] h-[28rem] bg-violet-500/20 rounded-full blur-[120px]" />
            <div className="absolute -bottom-20 left-1/4 w-[26rem] h-[26rem] bg-cyan-500/10 rounded-full blur-[110px]" />
          </motion.div>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-950/90 via-gray-900/85 to-gray-900" />

          <motion.div
            className="relative z-20 w-full max-w-7xl mx-auto px-6 py-24 md:py-32"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.div variants={fadeUp}>
                <Badge className="mb-6 bg-blue-500/15 border border-blue-400/30 text-blue-200 px-4 py-2">
                  <MapPin className="w-3.5 h-3.5 mr-2" />
                  UAE Digital Growth & Technology Partner
                </Badge>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.03] tracking-tight text-white">
                Scale Faster With a
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Premium Growth Stack
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-7 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                AxisMind helps UAE businesses convert more leads with high-performance websites, growth marketing, and AI automation designed for measurable ROI.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
                {[{ icon: Globe, label: "Web & Apps" }, { icon: TrendingUp, label: "SEO + Paid Growth" }, { icon: Bot, label: "AI Automation" }, { icon: Sparkles, label: "Conversion Design" }].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-200 text-sm flex items-center gap-2 backdrop-blur-sm"
                    >
                      <Icon className="w-4 h-4 text-cyan-300" />
                      {item.label}
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                {[
                  { title: "5.0 Google Rating", icon: Star, note: "Trusted by UAE businesses" },
                  { title: "50+ Projects", note: "Delivered across key industries" },
                  { title: "24/7 WhatsApp", note: "Fast support and execution" },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.title} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                      <p className="text-white font-semibold text-sm flex items-center justify-center gap-1.5">
                        {Icon ? <Icon className="w-4 h-4 text-cyan-300 fill-current" /> : null}
                        {stat.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{stat.note}</p>
                    </div>
                  );
                })}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    type="button"
                    onClick={() => openWhatsApp(WHATSAPP_MESSAGES.heroLeads)}
                    className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white px-10 py-6 rounded-xl shadow-[0_0_40px_rgba(59,130,246,0.35)]"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Get More Leads 🚀
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={scrollToHowWeWork}
                    className="border-white/20 bg-white/[0.03] hover:bg-white/[0.08] text-white px-10 py-6 rounded-xl"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    See How It Works
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ─── TRUSTED ACROSS UAE ───────────────────────────── */}
        <TrustedBy />

        {/* ─── CASE STUDIES (FEATURED PROJECTS) ───────────── */}
        {featuredPortfolio.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="py-24 bg-gray-900 relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#8b5cf615,transparent_50%)]" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <motion.div variants={fadeUp} className="text-center mb-16">
                <Badge className="mb-4 glass border-amber-500/30 text-amber-400">Case Studies</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Real results for real UAE businesses.</p>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredPortfolio.map((project, i) => (
                  <motion.div key={project.id} variants={scaleIn} transition={{ delay: i * 0.08 }}>
                    <Card className="glass border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 transform group overflow-hidden h-full">
                      <CardContent className="p-0 flex flex-col h-full">
                        <PortfolioImageFrame
                          src={project.image_url}
                          alt={project.title}
                          featured={project.featured}
                          placeholder={
                            <span className="text-4xl font-bold text-white/20">{project.title?.charAt(0)}</span>
                          }
                          roundedClassName="rounded-t-xl"
                        />
                        <PortfolioHighlightStrip project={project} compact />
                        <div className="p-6">
                          <h3 className="font-bold text-white text-lg mb-2 group-hover:text-amber-400 transition-colors">{project.title}</h3>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
                          {project.technologies?.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.slice(0, 3).map((t, ti) => (
                                <span key={ti} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-700/60 text-gray-400 border border-gray-600/50">{t}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={fadeUp} className="text-center mt-12">
                <Link to={createPageUrl('Portfolio')}>
                  <Button size="lg" className="glass border-white/10 hover:bg-white/5 text-white px-8 py-4 rounded-xl">
                    View All Case Studies <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* ─── FREE UAE BUSINESS GROWTH AUDIT ────────────── */}
        <GrowthAuditSection />

        {/* ─── OUR SOLUTIONS ─────────────────────────────────── */}
        <ServicesOverview />

        {/* ─── HOW WE WORK ─────────────────────────────────── */}
        <HowWeWork />

        {/* ─── INDUSTRIES ──────────────────────────────────── */}
        <IndustriesServed />

        {/* ─── ENGAGEMENT / PACKAGE HIGHLIGHTS ───────────── */}
        <PricingAnchors />

        {/* ─── TESTIMONIALS ────────────────────────────────── */}
        {featuredTestimonials.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="py-24 bg-gray-900/50 relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#3b82f615,transparent_50%)]" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <motion.div variants={fadeUp} className="text-center mb-16">
                <Badge className="mb-4 glass border-yellow-500/30 text-yellow-400">Client Reviews</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What UAE Businesses Say</h2>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredTestimonials.map((t, i) => (
                  <motion.div key={t.id} variants={scaleIn} transition={{ delay: i * 0.08 }}>
                    <Card className="glass border-white/10 hover:border-yellow-500/20 transition-all duration-500 hover:-translate-y-1 transform h-full">
                      <CardContent className="p-8">
                        <div className="flex mb-4">
                          {[...Array(t.rating || 5)].map((_, si) => (
                            <Star key={si} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-300 italic mb-6 leading-relaxed">"{t.text}"</p>
                        <div className="flex items-center gap-3">
                          {t.image_url ? (
                            <img src={t.image_url} alt={t.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                              {t.name?.charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="text-white font-semibold text-sm">{t.name}</p>
                            <p className="text-gray-500 text-xs">{t.position}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={fadeUp} className="text-center mt-12">
                <Link to={createPageUrl('Testimonials')}>
                  <Button size="lg" className="glass border-white/10 hover:bg-white/5 text-white px-8 py-4 rounded-xl">
                    Read All Reviews <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* ─── FAQ ─────────────────────────────────────────── */}
        <FAQSection />

        {/* ─── FINAL CTA ───────────────────────────────────── */}
        <CTASection />
      </div>
    </>
  );
}