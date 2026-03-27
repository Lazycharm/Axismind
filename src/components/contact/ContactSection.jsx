import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Contact } from '@/entities/Contact';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin,
  Send,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function ContactSection() {
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
      await Contact.create(formData);
      setIsSubmitted(true);
      
      // Also send a WhatsApp message
      const whatsappMessage = `New contact form submission:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service_interest}
Message: ${formData.message}`;
      
      window.open(`https://wa.me/971569520569?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+971 56 952 0569",
      action: () => window.open('https://wa.me/971569520569', '_blank'),
      color: "green"
    },
    {
      icon: Mail,
      title: "Email",
      value: "hello@axismind.click",
      action: () => window.open('mailto:hello@axismind.click', '_blank'),
      color: "blue"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+971 56 952 0569",
      action: () => window.open('tel:+971569520569', '_blank'),
      color: "purple"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "UAE",
      action: null,
      color: "orange"
    }
  ];

  const services = [
    { value: 'web_design', label: 'Web Design & Development' },
    { value: 'app_development', label: 'App Development' },
    { value: 'branding', label: 'Logo & Brand Identity' },
    { value: 'smart_home', label: 'Smart Home Setup' },
    { value: 'tech_installation', label: 'Tech Installations' },
    { value: 'laptop_repair', label: 'Laptop Repair' },
    { value: 'general_inquiry', label: 'General Inquiry' }
  ];

  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
            Get In Touch
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Start
            <span className="block text-orange-500">Your Project?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let's discuss your requirements and see how AxisMind can help 
            transform your business with our tech solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We'd love to hear from you. Choose your preferred way to contact us, 
                and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card
                    key={index}
                    className={`group hover:shadow-lg transition-all duration-300 ${info.action ? 'cursor-pointer hover:scale-105' : ''} border-l-4 border-l-${info.color}-500`}
                    onClick={info.action}
                  >
                    <CardContent className="p-6 flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-${info.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 text-${info.color}-600`} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">
                          {info.title}
                        </div>
                        <div className="text-gray-600">
                          {info.value}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick WhatsApp CTA */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
              <h4 className="text-xl font-bold mb-2">
                Prefer WhatsApp?
              </h4>
              <p className="mb-4 opacity-90">
                Get instant responses and quick quotes through WhatsApp.
              </p>
              <Button
                onClick={() => window.open('https://wa.me/971569520569?text=Hi! I\'d like to know more about your services.', '_blank')}
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <h3 className="text-2xl font-bold text-gray-900">
                Send us a Message
              </h3>
              <p className="text-gray-600">
                Fill out the form and we'll get back to you within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+971 XX XXX XXXX"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service of Interest
                    </label>
                    <Select onValueChange={(value) => handleInputChange('service_interest', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us about your project requirements..."
                      rows={4}
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    Expected response time: 2-24 hours
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}