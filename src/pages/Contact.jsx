
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createContactSubmission } from '@/services/contentService';
import SEO from "@/components/common/SEO";
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin,
  Send,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createContactSubmission(formData);
      setIsSubmitted(true);
      
      const whatsappMessage = `New contact form submission from ${formData.name}:
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
🛠️ Service: ${formData.service_interest}
💬 Message: ${formData.message}`;
      
      setTimeout(() => {
        window.open(`https://wa.me/971569520569?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
      }, 500);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+971 56 952 0569",
      description: "Instant responses • Available 24/7",
      action: () => window.open('https://wa.me/971569520569', '_blank'),
      color: "green",
      primary: true
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@axismind.click",
      description: "Professional inquiries • 24-hour response",
      action: () => window.open('mailto:info@axismind.click', '_blank'),
      color: "blue"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+971 56 952 0569",
      description: "Direct line • Business hours",
      action: () => window.open('tel:+971569520569', '_blank'),
      color: "purple"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "United Arab Emirates",
      description: "Serving Dubai, Abu Dhabi, Sharjah & beyond",
      action: null,
      color: "orange"
    }
  ];

  const services = [
    { value: 'web_design', label: 'Web Design & Development (AED 699)' },
    { value: 'app_development', label: 'App Development (AED 2,999+)' },
    { value: 'branding', label: 'Logo & Brand Identity (AED 499+)' },
    { value: 'smart_home', label: 'Smart Home Setup (AED 1,299+)' },
    { value: 'tech_installation', label: 'Tech Installations (AED 199+)' },
    { value: 'laptop_repair', label: 'Laptop Repair (AED 149+)' },
    { value: 'general_inquiry', label: 'General Inquiry / Custom Solution' }
  ];

  return (
    <>
      <SEO 
        title="Contact Us - Get In Touch | AxisMind UAE"
        description="Contact AxisMind for professional tech solutions in UAE. WhatsApp: +971 56 952 0569, Email: info@axismind.click. Serving Dubai, Abu Dhabi, Sharjah. Get a free quote today!"
        keywords="contact AxisMind UAE, tech support Dubai, web development contact UAE, WhatsApp business Dubai, get quote UAE"
        url="https://axismind.click/contact"
      />
      
      <div className="bg-gray-900 text-gray-100">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30">
                Get In Touch
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Ready to Start
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Your Project?
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Let's discuss your requirements and see how AxisMind can help 
                transform your business with our professional tech solutions.
              </p>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Multiple Ways to Reach Us
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Choose your preferred method. We're committed to providing fast, 
                    professional responses to all inquiries.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    const colorClasses = {
                      green: "border-l-green-500 hover:bg-gray-800",
                      blue: "border-l-blue-500 hover:bg-gray-800", 
                      purple: "border-l-purple-500 hover:bg-gray-800",
                      orange: "border-l-orange-500 hover:bg-gray-800"
                    };
                    
                    return (
                      <Card
                        key={index}
                        className={`group transition-all duration-300 bg-gray-800/50 border-gray-700 border-l-4 ${colorClasses[info.color]} ${
                          info.action ? 'cursor-pointer hover:scale-[1.02] hover:shadow-lg' : ''
                        } ${info.primary ? 'ring-2 ring-green-500/50' : ''}`}
                        onClick={info.action}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 rounded-full bg-${info.color}-900/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className={`w-6 h-6 text-${info.color}-400`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-bold text-white">{info.title}</h3>
                                {info.primary && (
                                  <Badge className="bg-green-500/20 text-green-400 text-xs border-0">
                                    Preferred
                                  </Badge>
                                )}
                              </div>
                              <div className="font-semibold text-gray-200 mb-1">
                                {info.value}
                              </div>
                              <div className="text-sm text-gray-400">
                                {info.description}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-800">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      Business Hours
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between"><span className="text-gray-300">Mon - Fri</span><span className="font-medium text-white">9:00 AM - 9:00 PM</span></div>
                    <div className="flex justify-between"><span className="text-gray-300">Saturday</span><span className="font-medium text-white">10:00 AM - 6:00 PM</span></div>
                    <div className="flex justify-between"><span className="text-gray-300">Sunday</span><span className="font-medium text-white">Closed</span></div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="shadow-2xl border-0 bg-gray-800">
                <CardHeader className="bg-gradient-to-r from-blue-700/50 to-purple-700/50 text-white rounded-t-xl border-b border-gray-700">
                  <h2 className="text-2xl font-bold">Send us a Message</h2>
                  <p className="opacity-90">
                    Fill out the form and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                          <Input required value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Your full name" className="h-12 bg-gray-700 text-white border-gray-600 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                          <Input required type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="+971 XX XXX XXXX" className="h-12 bg-gray-700 text-white border-gray-600 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                        <Input required type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="your@email.com" className="h-12 bg-gray-700 text-white border-gray-600 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Service of Interest</label>
                        <Select onValueChange={(value) => handleInputChange('service_interest', value)}>
                          <SelectTrigger className="h-12 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"><SelectValue placeholder="Select a service (optional)" /></SelectTrigger>
                          <SelectContent className="bg-gray-700 text-white border-gray-600">{services.map((service) => (<SelectItem key={service.value} value={service.value} className="hover:bg-gray-600 focus:bg-gray-600">{service.label}</SelectItem>))}</SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Project Details *</label>
                        <Textarea required value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} placeholder="Tell us about your project requirements..." rows={5} className="bg-gray-700 text-white border-gray-600 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500" />
                      </div>
                      <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold py-4 rounded-xl transition-all duration-300 h-14 text-base">
                        {isSubmitting ? (
                          <div className="flex items-center justify-center"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>Sending...</div>
                        ) : (
                          <div className="flex items-center justify-center"><Send className="w-5 h-5 mr-2" />Send Message & Connect</div>
                        )}
                      </Button>
                      <p className="text-xs text-gray-400 text-center">By submitting, you'll be connected to our WhatsApp for faster communication.</p>
                    </form>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-6 bg-green-900/30 rounded-full flex items-center justify-center"><CheckCircle className="w-10 h-10 text-green-400" /></div>
                      <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                      <p className="text-gray-300 mb-6 text-lg">Thank you, <strong>{formData.name}</strong>. We've received your inquiry and will be in touch shortly.</p>
                      <Button onClick={() => window.open('https://wa.me/971569520569', '_blank')} className="bg-green-600 hover:bg-green-700 text-white"><MessageCircle className="w-4 h-4 mr-2" />Continue on WhatsApp</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
