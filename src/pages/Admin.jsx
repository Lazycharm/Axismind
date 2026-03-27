import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { backend } from '@/api/backendClient';
import ImageUpload from "@/components/admin/ImageUpload";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Image as ImageIcon,
  Briefcase,
  MessageSquare,
  Mail,
  Star,
  Shield,
  Users,
  LayoutTemplate
} from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  // Check authentication and admin role
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await backend.auth.me();
      
      if (!currentUser) {
        // Not logged in
        setAccessDenied(true);
        setAuthLoading(false);
        return;
      }

      // Check if user is admin
      if (currentUser.role !== 'admin') {
        setAccessDenied(true);
        setAuthLoading(false);
        return;
      }

      // User is authenticated and is admin
      setUser(currentUser);
      setAccessDenied(false);
      setAuthLoading(false);
    } catch (error) {
      console.error('Auth error:', error);
      setAccessDenied(true);
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (user && !accessDenied) {
      loadData();
    }
  }, [activeTab, user, accessDenied]);

  const loadData = async () => {
    if (activeTab === 'users' || activeTab === 'site_images') {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      if (activeTab === 'portfolio') {
        const data = await backend.entities.Portfolio.list('-created_date');
        setPortfolioItems(data);
      } else if (activeTab === 'testimonials') {
        const data = await backend.entities.Testimonial.list('-created_date');
        setTestimonials(data);
      } else if (activeTab === 'contacts') {
        const data = await backend.entities.Contact.list('-created_date');
        setContacts(data);
      } else if (activeTab === 'team') {
        const data = await backend.entities.Team.list('order');
        setTeamMembers(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    backend.auth.logout();
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Show access denied if not authorized
  if (accessDenied) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
        <Card className="max-w-md w-full bg-gray-800 border-red-900/50">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              This area is restricted to administrators only. You need admin privileges to access the dashboard.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => backend.auth.redirectToLogin(window.location.pathname)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Shield className="w-4 h-4 mr-2" />
                Login as Admin
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Go to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contacts', label: 'Contact Submissions', icon: Mail },
    { id: 'team', label: 'Our Team', icon: Users },
    { id: 'site_images', label: 'Site Images', icon: LayoutTemplate },
    { id: 'users', label: 'User Management', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with User Info */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your website content</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="text-white font-semibold">{user?.full_name || user?.email}</p>
              <Badge className="bg-green-900/30 text-green-400 border-green-700 text-xs mt-1">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowForm(false);
                  setEditingItem(null);
                }}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`${
                  activeTab === tab.id
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'portfolio' && (
          <PortfolioManager
            items={portfolioItems}
            onRefresh={loadData}
            isLoading={isLoading}
            showForm={showForm}
            setShowForm={setShowForm}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        )}

        {activeTab === 'testimonials' && (
          <TestimonialManager
            items={testimonials}
            onRefresh={loadData}
            isLoading={isLoading}
            showForm={showForm}
            setShowForm={setShowForm}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        )}

        {activeTab === 'contacts' && (
          <ContactList
            items={contacts}
            onRefresh={loadData}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'team' && (
          <OurTeamManager
            items={teamMembers}
            onRefresh={loadData}
            isLoading={isLoading}
            showForm={showForm}
            setShowForm={setShowForm}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        )}

        {activeTab === 'site_images' && (
          <SiteImagesManager />
        )}

        {activeTab === 'users' && (
          <UserManager />
        )}
      </div>
    </div>
  );
}

// Portfolio Manager Component
function PortfolioManager({ items, onRefresh, isLoading, showForm, setShowForm, editingItem, setEditingItem }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web_design',
    image_url: '',
    project_url: '',
    technologies: [],
    featured: false
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
      setShowForm(true);
    } else {
      resetForm();
    }
  }, [editingItem]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'web_design',
      image_url: '',
      project_url: '',
      technologies: [],
      featured: false
    });
    setTechInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await backend.entities.Portfolio.update(editingItem.id, formData);
      } else {
        await backend.entities.Portfolio.create(formData);
      }
      resetForm();
      setShowForm(false);
      setEditingItem(null);
      onRefresh();
    } catch (error) {
      console.error('Error saving portfolio item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      try {
        await backend.entities.Portfolio.delete(id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting portfolio item:', error);
      }
    }
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index) => {
    const newTech = [...formData.technologies];
    newTech.splice(index, 1);
    setFormData({ ...formData, technologies: newTech });
  };

  return (
    <div>
      {/* Add New Button */}
      {!showForm && (
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
            resetForm();
          }}
          className="mb-6 bg-amber-600 hover:bg-amber-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Project
        </Button>
      )}

      {/* Form */}
      {showForm && (
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                {editingItem ? 'Edit Project' : 'Add New Project'}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Title *
                  </label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="E.g., E-Commerce Website"
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 text-white border-gray-600">
                      <SelectItem value="web_design">Web Design</SelectItem>
                      <SelectItem value="app_development">App Development</SelectItem>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="smart_home">Smart Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <Textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the project..."
                  rows={3}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  label="Project Image"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project URL
                  </label>
                  <Input
                    value={formData.project_url}
                    onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                    placeholder="https://project-website.com"
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Technologies Used
                </label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    placeholder="E.g., React, Node.js"
                    className="bg-gray-700 text-white border-gray-600"
                  />
                  <Button type="button" onClick={addTechnology} className="bg-blue-600 hover:bg-blue-700">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies?.map((tech, index) => (
                    <Badge
                      key={index}
                      className="bg-gray-700 text-gray-200 px-3 py-1 flex items-center gap-2"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(index)}
                        className="hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600"
                />
                <label htmlFor="featured" className="text-sm text-gray-300">
                  Feature this project on homepage
                </label>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  {editingItem ? 'Update' : 'Create'} Project
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Portfolio List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-gray-700 group hover:shadow-xl transition-all">
              <CardContent className="p-0">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 rounded-t-xl flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-500" />
                  </div>
                )}
                
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-white text-lg">{item.title}</h3>
                      {item.featured && (
                        <Badge className="bg-amber-500 text-white text-xs">Featured</Badge>
                      )}
                    </div>
                    <Badge className="bg-blue-900/30 text-blue-400 text-xs mb-3">
                      {item.category.replace('_', ' ')}
                    </Badge>
                    <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                  </div>

                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-gray-700 text-gray-300 border-gray-600">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => setEditingItem(item)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && items.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No portfolio items yet. Add your first project!</p>
        </div>
      )}
    </div>
  );
}

// Testimonial Manager Component
function TestimonialManager({ items, onRefresh, isLoading, showForm, setShowForm, editingItem, setEditingItem }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    image_url: '',
    rating: 5,
    text: '',
    project: '',
    date: '',
    featured: false
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
      setShowForm(true);
    } else {
      resetForm();
    }
  }, [editingItem]);

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      image_url: '',
      rating: 5,
      text: '',
      project: '',
      date: '',
      featured: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await backend.entities.Testimonial.update(editingItem.id, formData);
      } else {
        await backend.entities.Testimonial.create(formData);
      }
      resetForm();
      setShowForm(false);
      setEditingItem(null);
      onRefresh();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await backend.entities.Testimonial.delete(id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  return (
    <div>
      {/* Add New Button */}
      {!showForm && (
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
            resetForm();
          }}
          className="mb-6 bg-amber-600 hover:bg-amber-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Testimonial
        </Button>
      )}

      {/* Form */}
      {showForm && (
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Client Name *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Position/Company *
                  </label>
                  <Input
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="CEO, Company Name"
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Testimonial Text *
                </label>
                <Textarea
                  required
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="What did the client say about your service?"
                  rows={4}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating *
                  </label>
                  <Select
                    value={formData.rating.toString()}
                    onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                  >
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 text-white border-gray-600">
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Type
                  </label>
                  <Input
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    placeholder="E.g., Website Design"
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date
                  </label>
                  <Input
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="December 2023"
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </div>
              </div>

              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                label="Client Photo"
              />

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="featured-testimonial"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600"
                />
                <label htmlFor="featured-testimonial" className="text-sm text-gray-300">
                  Show on homepage
                </label>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  {editingItem ? 'Update' : 'Create'} Testimonial
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Testimonials List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-white">{item.name}</h3>
                      <p className="text-sm text-gray-400">{item.position}</p>
                    </div>
                  </div>
                  {item.featured && (
                    <Badge className="bg-amber-500 text-white text-xs">Featured</Badge>
                  )}
                </div>

                <div className="flex space-x-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-300 italic">"{item.text}"</p>

                {item.project && (
                  <Badge className="bg-blue-900/30 text-blue-400 text-xs">
                    {item.project}
                  </Badge>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => setEditingItem(item)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    variant="destructive"
                    className="flex-1"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && items.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No testimonials yet. Add your first review!</p>
        </div>
      )}
    </div>
  );
}

// Our Team Manager Component (Company Team Members)
function OurTeamManager({ items, onRefresh, isLoading, showForm, setShowForm, editingItem, setEditingItem }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    photo_url: '',
    bio: '',
    linkedin_url: '',
    email: '',
    order: 0
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
      setShowForm(true);
    } else {
      resetForm();
    }
  }, [editingItem]);

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      photo_url: '',
      bio: '',
      linkedin_url: '',
      email: '',
      order: 0
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await backend.entities.Team.update(editingItem.id, formData);
      } else {
        await backend.entities.Team.create(formData);
      }
      resetForm();
      setShowForm(false);
      setEditingItem(null);
      onRefresh();
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      try {
        await backend.entities.Team.delete(id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting team member:', error);
      }
    }
  };

  return (
    <div>
      {!showForm && (
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
            resetForm();
          }}
          className="mb-6 bg-amber-600 hover:bg-amber-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      )}

      {showForm && (
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                {editingItem ? 'Edit Team Member' : 'Add Team Member'}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Position/Title *
                  </label>
                  <Input
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="CEO, Lead Developer, Designer..."
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </div>
              </div>

              <ImageUpload
                value={formData.photo_url}
                onChange={(url) => setFormData({ ...formData, photo_url: url })}
                label="Photo (Professional headshot recommended)"
              />

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio/Description
                </label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief description about this team member..."
                  rows={3}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    LinkedIn URL
                  </label>
                  <Input
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Display Order
                </label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="bg-gray-700 text-white border-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  {editingItem ? 'Update' : 'Add'} Team Member
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((member) => (
            <Card key={member.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                {member.photo_url ? (
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-3xl font-bold">
                      {member.name?.charAt(0)}
                    </span>
                  </div>
                )}
                
                <h3 className="font-bold text-white text-lg mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm mb-3">{member.position}</p>
                
                {member.bio && (
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{member.bio}</p>
                )}

                <div className="flex gap-2 justify-center mb-4">
                  {member.linkedin_url && (
                    <Badge className="bg-blue-900/30 text-blue-400 text-xs">LinkedIn</Badge>
                  )}
                  {member.email && (
                    <Badge className="bg-green-900/30 text-green-400 text-xs">Email</Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setEditingItem(member)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(member.id)}
                    variant="destructive"
                    className="flex-1"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && items.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No team members yet. Add your first team member!</p>
        </div>
      )}
    </div>
  );
}

// User Manager Component (Admin Access)
function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('user');
  const [inviting, setInviting] = useState(false);

  const loadUsers = async () => {
    try {
      const userList = await backend.entities.User.list();
      setUsers(userList);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail) return;

    setInviting(true);
    try {
      await backend.users.inviteUser(inviteEmail, inviteRole);
      setInviteEmail('');
      setInviteRole('user');
      await loadUsers();
    } catch (error) {
      console.error('Error inviting user:', error);
      alert('Failed to invite user. Please try again.');
    } finally {
      setInviting(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    try {
      await backend.entities.User.delete(userId);
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to remove user. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading team members...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Invite Team Member
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@example.com"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={inviting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {inviting ? 'Sending Invite...' : 'Send Invitation'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Team Members ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users.map((user) => (
              <div 
                key={user.id}
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.full_name || 'No Name'}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    className={user.role === 'admin' 
                      ? 'bg-purple-900 text-purple-300 border-purple-700' 
                      : 'bg-blue-900 text-blue-300 border-blue-700'
                    }
                  >
                    {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : null}
                    {user.role}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Site Images Manager Component
function SiteImagesManager() {
  const [settings, setSettings] = useState({});
  const [saving, setSaving] = useState({});

  const imageSlots = [
    { key: 'brand_logo_url', label: 'Brand - Logo (Header & Footer)', section: 'Branding' },
    { key: 'brand_favicon_url', label: 'Brand - Favicon (Browser Tab Icon)', section: 'Branding' },
    { key: 'about_hero_bg', label: 'About Page - Hero Background', section: 'About' },
    { key: 'about_team_photo', label: 'About Page - Team Photo (Story Section)', section: 'About' },
    { key: 'home_hero_poster', label: 'Home Page - Hero Fallback Image', section: 'Home' },
  ];

  useEffect(() => {
    const loadSettings = async () => {
      const data = await backend.entities.SiteSettings.list();
      const map = {};
      data.forEach(s => { map[s.key] = s; });
      setSettings(map);
    };
    loadSettings();
  }, []);

  const handleSave = async (slot, imageUrl) => {
    setSaving(prev => ({ ...prev, [slot.key]: true }));
    if (settings[slot.key]) {
      await backend.entities.SiteSettings.update(settings[slot.key].id, { value: imageUrl });
    } else {
      const created = await backend.entities.SiteSettings.create({ key: slot.key, value: imageUrl, label: slot.label, section: slot.section });
      setSettings(prev => ({ ...prev, [slot.key]: created }));
    }
    setSaving(prev => ({ ...prev, [slot.key]: false }));
    window.dispatchEvent(new CustomEvent("site-settings-updated"));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-4 text-blue-300 text-sm">
        Upload images to replace sections across the website. Changes go live immediately.
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {imageSlots.map(slot => (
          <Card key={slot.key} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm font-medium">{slot.label}</CardTitle>
              <p className="text-xs text-gray-500">Section: {slot.section}</p>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={settings[slot.key]?.value || ''}
                onChange={(url) => {
                  setSettings(prev => ({
                    ...prev,
                    [slot.key]: { ...(prev[slot.key] || {}), value: url }
                  }));
                  handleSave(slot, url);
                }}
                label=""
              />
              {saving[slot.key] && (
                <p className="text-xs text-green-400 mt-2">✓ Saved</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Contact List Component
function ContactList({ items, onRefresh, isLoading }) {
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this contact submission?')) {
      try {
        await backend.entities.Contact.delete(id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{item.name}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-400">
                      <span>📧 {item.email}</span>
                      <span>📱 {item.phone}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {item.service_interest && (
                  <Badge className="bg-blue-900/30 text-blue-400 text-xs mb-3">
                    Interested in: {item.service_interest.replace('_', ' ')}
                  </Badge>
                )}

                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">{item.message}</p>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  Submitted: {new Date(item.created_date).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && items.length === 0 && (
        <div className="text-center py-12">
          <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No contact submissions yet.</p>
        </div>
      )}
    </div>
  );
}