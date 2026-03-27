
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Portfolio } from '@/entities/Portfolio';
import { ExternalLink, Code, Palette, Smartphone, Home, MessageCircle } from 'lucide-react';

const categoryIcons = {
  web_design: Code,
  app_development: Smartphone,
  branding: Palette,
  smart_home: Home
};

const categoryColors = {
  web_design: "bg-blue-100 text-blue-800 border-blue-200",
  app_development: "bg-purple-100 text-purple-800 border-purple-200",
  branding: "bg-orange-100 text-orange-800 border-orange-200",
  smart_home: "bg-green-100 text-green-800 border-green-200"
};

export default function PortfolioSection() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await Portfolio.list('-created_date');
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
    setIsLoading(false);
  };

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'web_design', label: 'Web Design' },
    { value: 'app_development', label: 'App Development' },
    { value: 'branding', label: 'Branding' },
    { value: 'smart_home', label: 'Smart Home' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50" id="portfolio">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-full max-w-3xl mx-auto"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50" id="portfolio">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
            Our Portfolio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Projects That Drive
            <span className="block text-blue-600">Real Results</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our successful projects across web development, mobile apps, 
            branding, and smart home solutions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.value)}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                selectedCategory === category.value 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "hover:bg-blue-50"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const CategoryIcon = categoryIcons[project.category];
              return (
                <Card
                  key={project.id}
                  className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 transform bg-white border-0 shadow-lg"
                >
                  <CardContent className="p-0">
                    {/* Project Image */}
                    <div className="relative overflow-hidden rounded-t-xl">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                          {CategoryIcon && <CategoryIcon className="w-12 h-12 text-blue-600" />}
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <Badge className={`absolute top-3 left-3 ${categoryColors[project.category]}`}>
                        {CategoryIcon && <CategoryIcon className="w-3 h-3 mr-1" />}
                        {project.category.replace('_', ' ')}
                      </Badge>
                    </div>

                    {/* Project Info */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Action Button */}
                      {project.project_url && (
                        <Button
                          size="sm"
                          onClick={() => window.open(project.project_url, '_blank')}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Code className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Portfolio Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              We're currently working on showcasing our amazing projects. 
              Contact us to see our work samples!
            </p>
            <Button
              onClick={() => window.open('https://wa.me/971569520569?text=Hi! Can you show me some of your work samples?', '_blank')}
              className="bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Request Work Samples
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        {filteredProjects.length > 0 && (
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6">
              Ready to start your project? Let's discuss how we can help grow your business.
            </p>
            <Button
              size="lg"
              onClick={() => window.open('https://wa.me/971569520569?text=Hi! I saw your portfolio and I\'m interested in starting a project.', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold"
            >
              Start Your Project
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
