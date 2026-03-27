
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MessageCircle, Users, ThumbsUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { getTestimonials } from '@/services/contentService';
import SEO from "@/components/common/SEO";
import OptimizedImage from "@/components/common/OptimizedImage";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
    setIsLoading(false);
  };

  const stats = [
    { icon: Users, number: "50+", label: "Happy Clients", color: "blue" },
    { icon: ThumbsUp, number: "100%", label: "Satisfaction Rate", color: "green" },
    { icon: Award, number: "5.0", label: "Average Rating", color: "yellow" },
    { icon: Star, number: "200+", label: "5-Star Reviews", color: "purple" }
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/971569520569?text=Hi! I saw the testimonials and I\'m interested in your services. Can we discuss my project?', '_blank');
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-700 rounded w-48 mx-auto"></div>
              <div className="h-12 bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Client Testimonials & Reviews - 5-Star Rated | AxisMind UAE"
        description="Read real testimonials from satisfied AxisMind clients in UAE. 100% satisfaction rate, 5.0 average rating. See what Dubai, Abu Dhabi, and Sharjah clients say about our web development, apps, and tech services."
        keywords="AxisMind reviews UAE, web development testimonials Dubai, client feedback UAE, 5 star tech company Dubai, customer reviews UAE"
        url="https://axismind.click/testimonials"
      />
      
      <div className="bg-gray-900 text-white">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Happy Clients"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <Badge className="mb-6 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Client Testimonials
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                What Our Clients
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Say About Us
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Don't just take our word for it. Here's what our satisfied clients 
                have to say about working with AxisMind and the results we've delivered.
              </p>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-20 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  const colorClasses = {
                      blue: "bg-blue-900/40 text-blue-400",
                      green: "bg-green-900/40 text-green-400", 
                      yellow: "bg-yellow-900/40 text-yellow-400",
                      purple: "bg-purple-900/40 text-purple-400"
                  };
                  
                  return (
                      <div key={index} className="text-center p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${colorClasses[stat.color]} flex items-center justify-center`}>
                          <Icon className="w-8 h-8" />
                      </div>
                      <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                      <div className="text-gray-300 font-medium">{stat.label}</div>
                      </div>
                  );
                  })}
              </div>
          </div>
        </section>


        {/* Testimonials Grid */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            {testimonials.length > 0 ? (
              <div className="grid lg:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="group transition-all duration-500 hover:-translate-y-2 transform bg-gray-800 border border-gray-700 shadow-xl">
                    <CardContent className="p-8 relative">
                      <Quote className="absolute top-6 right-6 w-16 h-16 text-gray-700/50" />
                      
                      <div className="flex space-x-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      <blockquote className="text-gray-200 leading-relaxed mb-6 italic text-lg">
                        "{testimonial.text}"
                      </blockquote>

                      {testimonial.project && (
                        <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
                          <div className="text-sm font-medium text-blue-400 mb-1">
                            Project: {testimonial.project}
                          </div>
                          {testimonial.date && (
                            <div className="text-sm text-gray-400">
                              Completed: {testimonial.date}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center space-x-4">
                        {testimonial.image_url ? (
                          <OptimizedImage
                            src={testimonial.image_url}
                            alt={`${testimonial.name} - AxisMind Client`}
                            className="w-16 h-16 rounded-full object-cover ring-4 ring-gray-700 group-hover:ring-blue-800 transition-all duration-300"
                            width="64px"
                            height="64px"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center ring-4 ring-gray-700">
                            <Users className="w-8 h-8 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-white text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-300">
                            {testimonial.position}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Testimonials Coming Soon
                </h3>
                <p className="text-gray-400 mb-6">
                  We're currently collecting feedback from our amazing clients. 
                  Check back soon to see what they have to say!
                </p>
              </div>
            )}

            <div className="mt-20 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join Our Growing List of Success Stories
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Every testimonial represents a successful partnership and a business that 
                achieved its goals with our help. Your success story could be next.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Your Success Story
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
