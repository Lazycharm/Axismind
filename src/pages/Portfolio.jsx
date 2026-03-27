
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPortfolioItems } from '@/services/contentService';
import SEO from "@/components/common/SEO";
import OptimizedImage from "@/components/common/OptimizedImage";
import {
  ExternalLink,
  Code,
  Palette,
  Smartphone,
  Home,
  MessageCircle,
  Search,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';


const categoryIcons = {
  web_design: Code,
  app_development: Smartphone,
  branding: Palette,
  smart_home: Home
};

const categoryColors = {
  web_design: "bg-blue-900/20 text-blue-400 border-blue-900/30",
  app_development: "bg-purple-900/20 text-purple-400 border-purple-900/30",
  branding: "bg-orange-900/20 text-orange-400 border-orange-900/30",
  smart_home: "bg-green-900/20 text-green-400 border-green-900/30"
};

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getPortfolioItems();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
    setIsLoading(false);
  };

  const categories = [
    { value: 'all', label: 'All Projects', icon: Filter },
    { value: 'web_design', label: 'Web Design', icon: Code },
    { value: 'app_development', label: 'App Development', icon: Smartphone },
    { value: 'branding', label: 'Branding', icon: Palette },
    { value: 'smart_home', label: 'Smart Home', icon: Home }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleWhatsAppInquiry = () => {
    window.open('https://wa.me/971569520569?text=Hi! I saw your portfolio and I\'m interested in starting a similar project. Can we discuss?', '_blank');
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 min-h-screen">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-700 rounded w-48 mx-auto"></div>
              <div className="h-12 bg-gray-700 rounded w-96 mx-auto"></div>
              <div className="h-6 bg-gray-700 rounded w-full max-w-3xl mx-auto"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Portfolio - Our Work & Projects | AxisMind UAE"
        description="Explore AxisMind's portfolio of successful projects in UAE. Web development, mobile apps, branding, and smart home solutions for Dubai, Abu Dhabi, and Sharjah clients. View our 5-star rated work."
        keywords="web development portfolio UAE, app development projects Dubai, tech portfolio UAE, website examples Dubai, branding projects UAE"
        url="https://axismind.click/portfolio"
      />

      <div className="bg-gray-900 text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Portfolio Showcase"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <Badge className="mb-6 bg-purple-500/20 text-purple-400 border-purple-500/30">
              Our Portfolio
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Work Speaks
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                for Itself
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our successful projects across web development, mobile apps,
              branding, and smart home solutions. Each project represents our commitment
              to excellence and innovation.
            </p>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            {/* Search and Filter */}
            <div className="mb-12 sticky top-20 z-30 bg-gray-900/80 backdrop-blur-md py-4 rounded-xl">
              <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search projects..."
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
                <div className="mb-8 text-center">
                  <p className="text-gray-400">
                    Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                    {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, index) => {
                    const CategoryIcon = categoryIcons[project.category];
                    return (
                      <Card
                        key={project.id}
                        className="group transition-all duration-500 hover:-translate-y-2 transform bg-gray-800 border-gray-700 shadow-xl overflow-hidden"
                      >
                        <CardContent className="p-0">
                          <div className="relative overflow-hidden h-48">
                            {project.image_url ? (
                              <OptimizedImage
                                src={project.image_url}
                                alt={`${project.title} - AxisMind Project`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                priority={index < 3}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center">
                                {CategoryIcon && <CategoryIcon className="w-12 h-12 text-blue-400" />}
                              </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                            <div className="absolute bottom-4 left-4">
                              <Badge className={`${categoryColors[project.category]} mb-2`}>
                                {CategoryIcon && <CategoryIcon className="w-3 h-3 mr-1" />}
                                {project.category.replace('_', ' ')}
                              </Badge>
                            </div>

                            {project.featured && (
                              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                                Featured
                              </Badge>
                            )}
                          </div>

                          <div className="p-6 space-y-4">
                            <div>
                              <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300 mb-2">
                                {project.title}
                              </h3>

                              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                {project.description}
                              </p>
                            </div>

                            {project.technologies && project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                  <Badge key={techIndex} variant="outline" className="bg-gray-700 text-gray-300 border-gray-600 text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                                {project.technologies.length > 3 && (
                                  <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600 text-xs">
                                    +{project.technologies.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            )}

                            <div className="pt-2">
                              {project.project_url ? (
                                <Button
                                  size="sm"
                                  onClick={() => window.open(project.project_url, '_blank')}
                                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View Project
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={handleWhatsAppInquiry}
                                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <MessageCircle className="w-4 h-4 mr-2" />
                                  Inquire
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  No Projects Found
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  {`No projects match your criteria. Try adjusting your search or contact us for more work samples!`}
                </p>
                <Button
                  onClick={handleWhatsAppInquiry}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Request Work Samples
                </Button>
              </div>
            )}

            <div className="mt-20 text-center bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Inspired by Our Work?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Let's create something amazing for your business. Our team is ready to
                bring your ideas to life with the same quality and attention to detail.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={handleWhatsAppInquiry}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Your Project
                </Button>

                <Link to={createPageUrl('Services')}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl backdrop-blur-sm"
                  >
                    View Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
