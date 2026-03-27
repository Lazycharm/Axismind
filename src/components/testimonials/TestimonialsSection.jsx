
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MessageCircle } from 'lucide-react';

const testimonials = [
  {
    name: "Ahmed Al-Mansouri",
    position: "CEO, Emirates Trading LLC",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    text: "AxisMind transformed our online presence completely. Their web development team delivered beyond our expectations, and the ongoing support has been exceptional."
  },
  {
    name: "Sara Abdullah",
    position: "Founder, Bloom Boutique",
    image: "https://images.unsplash.com/photo-1494790108755-2616c5e06a5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    text: "The mobile app they developed for our boutique increased our sales by 300%. The team's attention to detail and professional approach is outstanding."
  },
  {
    name: "Omar Hassan",
    position: "Director, Smart Homes UAE",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    text: "Their smart home automation solutions are top-notch. Professional installation, great support, and the technology works flawlessly. Highly recommended!"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-100 text-yellow-800 border-yellow-200">
            Client Testimonials
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Clients
            <span className="block text-orange-500">Say About Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients 
            have to say about working with AxisMind.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 transform bg-white border-0 shadow-lg">
              <CardContent className="p-8 relative">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-12 h-12 text-gray-400" />
                </div>
                
                {/* Stars */}
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Join Our Happy Clients?
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Start your journey with AxisMind today and experience the difference 
              professional tech solutions can make for your business.
            </p>
            <button
              onClick={() => window.open('https://wa.me/971569520569?text=Hi! I saw the testimonials and I\'m interested in your services.', '_blank')}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Your Success Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
