import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPortfolioItems } from "@/services/contentService";
import SEO from "@/components/common/SEO";
import PortfolioImageFrame from "@/components/portfolio/PortfolioImageFrame";
import PortfolioHighlightStrip from "@/components/portfolio/PortfolioHighlightStrip";
import PortfolioLightbox from "@/components/portfolio/PortfolioLightbox";
import {
  ExternalLink,
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
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

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

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = useCallback((url, title) => {
    setLightbox({ url, title });
  }, []);

  const closeLightbox = useCallback((open) => {
    if (!open) setLightbox(null);
  }, []);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getPortfolioItems();
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
    setIsLoading(false);
  };

  const categories = [
    { value: "all", label: "All Projects", icon: Filter },
    { value: "web_design", label: "Web Design", icon: Code },
    { value: "app_development", label: "App Development", icon: Smartphone },
    { value: "branding", label: "Branding", icon: Palette },
    { value: "smart_home", label: "Smart Home", icon: Home },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleWhatsAppInquiry = () => {
    window.open(
      "https://wa.me/971569520569?text=Hi! I reviewed your case studies and want a similar outcome for my business. Can we discuss?",
      "_blank"
    );
  };

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
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt=""
              className="w-full h-full object-cover"
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
            <div className="mb-12 sticky top-20 z-30 bg-gray-900/80 backdrop-blur-md py-4 rounded-xl border border-white/5">
              <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by project name or outcome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-700 bg-gray-800 text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="flex-shrink-0 flex flex-wrap justify-center gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Button
                        key={category.value}
                        variant={selectedCategory === category.value ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
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
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="mb-8 text-center"
                >
                  <p className="text-gray-400">
                    Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
                    {selectedCategory !== "all" &&
                      ` in ${categories.find((c) => c.value === selectedCategory)?.label}`}
                  </p>
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.08 }}
                >
                  {filteredProjects.map((project, index) => {
                    const CategoryIcon = categoryIcons[project.category];
                    const urlCta = URL_CTA_LABELS[index % URL_CTA_LABELS.length];

                    return (
                      <motion.div key={project.id} variants={scaleIn} className="h-full">
                        <Card className="group h-full flex flex-col overflow-hidden border-gray-700 bg-gray-800 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/10">
                          <CardContent className="p-0 flex flex-col flex-1">
                            <PortfolioImageFrame
                              src={project.image_url}
                              alt={`${project.title} — AxisMind case study`}
                              onMediaClick={
                                project.image_url
                                  ? () => openLightbox(project.image_url, project.title)
                                  : undefined
                              }
                              priority={index < 3}
                              featured={project.featured}
                              placeholder={
                                CategoryIcon ? (
                                  <CategoryIcon className="h-12 w-12 text-blue-400/80" />
                                ) : null
                              }
                            />

                            <PortfolioHighlightStrip project={project} />

                            <div className="flex flex-1 flex-col gap-4 p-6">
                              <Badge className={`w-fit ${categoryColors[project.category]}`}>
                                {CategoryIcon && <CategoryIcon className="mr-1 inline h-3 w-3" />}
                                {String(project.category || "").replace("_", " ")}
                              </Badge>

                              <div className="flex-1 space-y-2">
                                <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-amber-400">
                                  {project.title}
                                </h3>
                                <p className="line-clamp-3 text-sm leading-relaxed text-gray-400">
                                  {project.description}
                                </p>
                              </div>

                              {project.technologies && project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                    <Badge
                                      key={techIndex}
                                      variant="outline"
                                      className="border-gray-600 bg-gray-700 text-xs text-gray-300"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                  {project.technologies.length > 3 && (
                                    <Badge variant="outline" className="border-gray-600 bg-gray-700 text-xs text-gray-300">
                                      +{project.technologies.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              )}

                              <div className="mt-auto pt-2">
                                {project.project_url ? (
                                  <Button
                                    size="sm"
                                    type="button"
                                    onClick={() => window.open(project.project_url, "_blank")}
                                    className="w-full bg-blue-600 font-semibold text-white hover:bg-blue-700"
                                  >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    {urlCta}
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    type="button"
                                    onClick={handleWhatsAppInquiry}
                                    className="w-full bg-green-600 font-semibold text-white hover:bg-green-700"
                                  >
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Discuss This Project
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
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
