import React, { useEffect, useState, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import { getSiteSettings, getTeamMembers } from "@/services/contentService";
import {
  Award,
  Clock,
  MapPin,
  Zap,
  Shield,
  Heart,
  Linkedin,
  Mail,
  MessageCircle
} from 'lucide-react';

function AnimateOnScroll({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </div>
  );
}

const features = [
  { icon: MapPin, title: "UAE-Based Support", description: "Local presence means faster response times and better understanding of your business needs." },
  { icon: Award, title: "5-Star Excellence", description: "Consistently delivering top-quality solutions that exceed client expectations." },
  { icon: Clock, title: "Quick Turnaround", description: "Efficient project delivery without compromising on quality or attention to detail." },
  { icon: Zap, title: "Latest Technologies", description: "We stay ahead of tech trends to provide cutting-edge solutions for your business." },
  { icon: Shield, title: "Reliable & Secure", description: "Your data and digital assets are protected with industry-standard security measures." },
  { icon: Heart, title: "Passionate Team", description: "We genuinely care about your success and treat your project as our own." }
];

export default function About() {
  const [team, setTeam] = useState([]);
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80');

  useEffect(() => {
    getTeamMembers({ limit: 20 }).then(setTeam).catch(() => {});
    getSiteSettings().then(results => {
      const filtered = results.filter((item) => item.key === 'about_hero_bg');
      if (filtered && filtered[0]?.value) setHeroImage(filtered[0].value);
    }).catch(() => {});
  }, []);

  return (
    <>
      <SEO
        title="About AxisMind - UAE Tech Solutions Company"
        description="Learn about AxisMind, your trusted UAE-based tech partner. Web development, app development, branding, smart home, and tech installation services."
        url="https://axismind.click/About"
      />

      <div className="bg-gray-900 text-white">
        {/* Hero */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img src={heroImage} alt="About AxisMind" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <AnimateOnScroll>
              <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">About Us</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Your Trusted
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">UAE Tech Partner</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                At AxisMind, we combine local UAE expertise with global standards to deliver exceptional technology solutions that drive real results.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Story & Stats */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <AnimateOnScroll>
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">Empowering Businesses Through Technology</h2>
                  <p className="text-gray-400 leading-relaxed">
                    Founded with a vision to bridge the gap between innovative technology and business growth,
                    AxisMind has been serving clients across the UAE with comprehensive tech solutions.
                    From startups to established enterprises, we've helped businesses transform their digital
                    presence and achieve their goals.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 glass rounded-2xl">
                      <div className="text-4xl font-bold text-blue-400 mb-1">50+</div>
                      <div className="text-sm text-gray-400">Projects Completed</div>
                    </div>
                    <div className="text-center p-6 glass rounded-2xl">
                      <div className="text-4xl font-bold text-amber-400 mb-1">100%</div>
                      <div className="text-sm text-gray-400">Client Satisfaction</div>
                    </div>
                  </div>
                  <Button
                    onClick={() => window.open('https://wa.me/971569520569?text=Hello! I want to learn more about AxisMind.', '_blank')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Get in Touch
                  </Button>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={150}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-20" />
                  <img
                    src={heroImage}
                    alt="AxisMind Team"
                    className="relative rounded-3xl shadow-2xl w-full object-cover"
                  />
                </div>
              </AnimateOnScroll>
            </div>

            {/* Features */}
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">Why Choose Us</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">What Sets Us Apart</h2>
              </div>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <AnimateOnScroll key={index} delay={index * 80}>
                    <Card className="glass border-white/10 hover:border-blue-500/30 transition-all duration-300 group h-full">
                      <CardContent className="p-6 text-center">
                        <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-7 h-7 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </AnimateOnScroll>
                );
              })}
            </div>

            {/* Team */}
            {team.length > 0 && (
              <>
                <AnimateOnScroll>
                  <div className="text-center mb-12">
                    <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">Our Team</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold">Meet the People Behind AxisMind</h2>
                  </div>
                </AnimateOnScroll>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                  {team.map((member, index) => (
                    <AnimateOnScroll key={member.id} delay={index * 80}>
                      <Card className="glass border-white/10 hover:border-blue-500/30 transition-all duration-300 group overflow-hidden">
                        {member.photo_url && (
                          <div className="h-56 overflow-hidden">
                            <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        )}
                        <CardContent className="p-6">
                          <h3 className="text-lg font-bold text-white">{member.name}</h3>
                          <p className="text-blue-400 text-sm mb-3">{member.position}</p>
                          {member.bio && <p className="text-gray-400 text-sm leading-relaxed mb-4">{member.bio}</p>}
                          <div className="flex gap-3">
                            {member.linkedin_url && (
                              <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Linkedin className="w-5 h-5" />
                              </a>
                            )}
                            {member.email && (
                              <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Mail className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </AnimateOnScroll>
                  ))}
                </div>
              </>
            )}

            {/* Mission */}
            <AnimateOnScroll>
              <div className="text-center bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl p-12 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto opacity-90">
                  "To empower businesses across the UAE with innovative technology solutions that drive growth, enhance efficiency, and create lasting digital impact."
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </div>
    </>
  );
}