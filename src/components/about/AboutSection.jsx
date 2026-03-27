import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Award, 
  Clock, 
  MapPin,
  Zap,
  Shield,
  Heart
} from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: "UAE-Based Support",
    description: "Local presence means faster response times and better understanding of your business needs."
  },
  {
    icon: Award,
    title: "5-Star Excellence",
    description: "Consistently delivering top-quality solutions that exceed client expectations."
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Efficient project delivery without compromising on quality or attention to detail."
  },
  {
    icon: Zap,
    title: "Latest Technologies",
    description: "We stay ahead of tech trends to provide cutting-edge solutions for your business."
  },
  {
    icon: Shield,
    title: "Reliable & Secure",
    description: "Your data and digital assets are protected with industry-standard security measures."
  },
  {
    icon: Heart,
    title: "Passionate Team",
    description: "We genuinely care about your success and treat your project as our own."
  }
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            About AxisMind
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Trusted UAE-Based
            <span className="block text-orange-500">Tech Partner</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At AxisMind, we're passionate about helping businesses thrive in the digital world. 
            Based in the UAE, we combine local expertise with global standards to deliver 
            exceptional technology solutions that drive real results.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Empowering Businesses Through Technology
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded with a vision to bridge the gap between innovative technology and business growth, 
                AxisMind has been serving clients across the UAE with comprehensive tech solutions. 
                From startups to established enterprises, we've helped businesses transform their 
                digital presence and achieve their goals.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-3xl font-bold text-orange-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="AxisMind Team"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            {/* Background decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full blur-2xl opacity-20 -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-2xl opacity-20 -z-10" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Our Mission
          </h3>
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto opacity-90">
            "To empower businesses across the UAE with innovative technology solutions 
            that drive growth, enhance efficiency, and create lasting digital impact."
          </p>
        </div>
      </div>
    </section>
  );
}