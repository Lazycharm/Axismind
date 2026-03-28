import React, { useState, useEffect, useCallback, useMemo, useDeferredValue } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPortfolioItems } from "@/services/contentService";
import SEO from "@/components/common/SEO";
import PortfolioLightbox from "@/components/portfolio/PortfolioLightbox";
import PortfolioProjectCard from "@/components/portfolio/PortfolioProjectCard";
import {
  Code,
  Palette,
  Smartphone,
  Home,
  MessageCircle,
  Search,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const categoryIcons = {
  web_design: Code,
  app_development: Smartphone,
  branding: Palette,
  smart_home: Home,
};

const categoryColors = {
  web_design: "bg-blue-900/20 text-blue-400 border-blue-900/30",
  app_development: "bg-purple-900/20 text-purple-400 border-purple-900/30",
  branding: "bg-orange-900/20 text-orange-400 border-orange-900/30",
  smart_home: "bg-green-900/20 text-green-400 border-green-900/30",
};

const URL_CTA_LABELS = ["View Case Study", "Explore Project", "See Project"];

const categories = [
  { value: "all", label: "All Projects", icon: Filter },
  { value: "web_design", label: "Web Design", icon: Code },
  { value: "app_development", label: "App Development", icon: Smartphone },
  { value: "branding", label: "Branding", icon: Palette },
  { value: "smart_home", label: "Smart Home", icon: Home },
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = useCallback((url, title) => {
    setLightbox({ url, title });
  }, []);

  const closeLightbox = useCallback((open) => {
    if (!open) setLightbox(null);
  }, []);

  const handleWhatsAppInquiry = useCallback(() => {
    window.open(
      "https://wa.me/971569520569?text=Hi! I reviewed your case studies and want a similar outcome for my business. Can we discuss?",
      "_blank"
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getPortfolioItems();
        if (!cancelled) setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    const q = deferredSearch.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
      const matchesSearch =
        q === "" ||
        project.title.toLowerCase().includes(q) ||
        (project.description || "").toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, deferredSearch]);

  if (isLoading) {
    return (
      <div className="bg-gray-900 min-h-screen">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-700 rounded w-48 mx-auto" />
              <div className="h-12 bg-gray-700 rounded w-96 max-w-full mx-auto" />
              <div className="h-6 bg-gray-700 rounded w-full max-w-3xl mx-auto" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Portfolio & Case Studies | AxisMind UAE"
        description="Explore AxisMind case studies: web, apps, branding, and smart solutions for UAE businesses—built for growth, credibility, and measurable outcomes."
        keywords="UAE portfolio, web development case studies Dubai, app projects UAE, branding work UAE, AxisMind portfolio"
        url="https://axismind.click/portfolio"
      />

      <PortfolioLightbox
        open={Boolean(lightbox)}
        onOpenChange={closeLightbox}
        imageUrl={lightbox?.url}
        title={lightbox?.title}
      />

      <div className="bg-gray-900 text-white min-h-screen">
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75"
              alt=""
              className="w-full h-full object-cover"
              decoding="async"
              fetchPriority="low"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900" />

          <motion.div
            className="relative z-10 max-w-4xl mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge className="mb-6 bg-purple-500/20 text-purple-400 border-purple-500/30">Case Studies</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Work That Drives
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Business Outcomes
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A curated showcase of projects for UAE brands—websites, apps, identity, and installations—each scoped to
              solve a real business problem and support growth.
            </p>
          </motion.div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 sticky top-20 z-30 bg-gray-900/90 backdrop-blur-sm py-4 rounded-xl border border-white/5">
              <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <input
                    type="search"
                    placeholder="Search by project name or outcome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoComplete="off"
                    className="w-full pl-12 pr-4 py-3 border border-gray-700 bg-gray-800 text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="flex-shrink-0 flex flex-wrap justify-center gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Button
                        key={category.value}
                        type="button"
                        variant={selectedCategory === category.value ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                          selectedCategory === category.value
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-blue-900 hover:border-blue-600 hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {category.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>

            {filteredProjects.length > 0 ? (
              <>
                <p className="mb-8 text-center text-gray-400">
                  Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
                  {selectedCategory !== "all" &&
                    ` in ${categories.find((c) => c.value === selectedCategory)?.label}`}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [contain:layout]">
                  {filteredProjects.map((project, index) => {
                    const CategoryIcon = categoryIcons[project.category];
                    const urlCta = URL_CTA_LABELS[index % URL_CTA_LABELS.length];
                    return (
                      <div key={project.id} className="h-full min-h-0">
                        <PortfolioProjectCard
                          project={project}
                          urlCta={urlCta}
                          categoryIcon={CategoryIcon}
                          categoryClass={categoryColors[project.category] || categoryColors.web_design}
                          onOpenLightbox={openLightbox}
                          onWhatsApp={handleWhatsAppInquiry}
                          eagerImage={index < 6}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="py-20 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-800">
                  <Search className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-white">No projects match</h3>
                <p className="mx-auto mb-8 max-w-md text-gray-400">
                  Try another search or category—or contact us for relevant samples for your industry.
                </p>
                <Button type="button" onClick={handleWhatsAppInquiry} className="bg-green-600 hover:bg-green-700">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Request Work Samples
                </Button>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 rounded-2xl bg-gradient-to-r from-blue-700 to-purple-700 p-10 text-center text-white md:p-12"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Want a similar outcome?</h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
                We scope projects around your goals—whether it&apos;s leads, credibility, or operational efficiency—and
                deliver with the same attention you see here.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  type="button"
                  size="lg"
                  onClick={handleWhatsAppInquiry}
                  className="rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Your Project
                </Button>

                <Link to={createPageUrl("Services")} className="w-full sm:w-auto">
                  <Button
                    type="button"
                    size="lg"
                    className="w-full rounded-xl border-2 border-white/30 bg-white/[0.04] px-8 py-4 font-semibold text-white shadow-none backdrop-blur-sm hover:bg-white/[0.14] hover:text-white sm:w-auto"
                  >
                    View Our Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
