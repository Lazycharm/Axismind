import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SEO from "@/components/common/SEO";
import {
  Globe,
  Smartphone,
  Palette,
  Home,
  Settings,
  MessageCircle,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Mail,
  Bot,
  Building2,
} from "lucide-react";
import { fadeUp, scaleIn } from "@/lib/motion";

const WHATSAPP = "971569520569";

const colorClasses = {
  blue: {
    gradient: "from-blue-800/30 to-blue-900/30",
    border: "border-blue-700",
    text: "text-blue-400",
    bg: "bg-blue-600",
    badge: "bg-blue-900 text-blue-300 border-blue-700",
  },
  teal: {
    gradient: "from-teal-800/30 to-teal-900/30",
    border: "border-teal-700",
    text: "text-teal-400",
    bg: "bg-teal-600",
    badge: "bg-teal-900 text-teal-300 border-teal-700",
  },
  purple: {
    gradient: "from-purple-800/30 to-purple-900/30",
    border: "border-purple-700",
    text: "text-purple-400",
    bg: "bg-purple-600",
    badge: "bg-purple-900 text-purple-300 border-purple-700",
  },
  rose: {
    gradient: "from-rose-800/30 to-rose-900/30",
    border: "border-rose-700",
    text: "text-rose-400",
    bg: "bg-rose-600",
    badge: "bg-rose-900 text-rose-300 border-rose-700",
  },
  emerald: {
    gradient: "from-emerald-800/30 to-emerald-900/30",
    border: "border-emerald-700",
    text: "text-emerald-400",
    bg: "bg-emerald-600",
    badge: "bg-emerald-900 text-emerald-300 border-emerald-700",
  },
  orange: {
    gradient: "from-orange-800/30 to-orange-900/30",
    border: "border-orange-700",
    text: "text-orange-400",
    bg: "bg-orange-600",
    badge: "bg-orange-900 text-orange-300 border-orange-700",
  },
  zinc: {
    gradient: "from-zinc-800/30 to-zinc-900/30",
    border: "border-zinc-600",
    text: "text-zinc-300",
    bg: "bg-zinc-600",
    badge: "bg-zinc-800 text-zinc-300 border-zinc-600",
  },
  indigo: {
    gradient: "from-indigo-800/30 to-indigo-900/30",
    border: "border-indigo-700",
    text: "text-indigo-400",
    bg: "bg-indigo-600",
    badge: "bg-indigo-900 text-indigo-300 border-indigo-700",
  },
  green: {
    gradient: "from-green-800/30 to-green-900/30",
    border: "border-green-700",
    text: "text-green-400",
    bg: "bg-green-600",
    badge: "bg-green-900 text-green-300 border-green-700",
  },
};

const coreServices = [
  {
    icon: Globe,
    title: "Web Design & Development",
    tagline: "Websites that convert visitors into customers",
    description:
      "High-performance sites engineered for clarity, speed, and measurable conversions—so your UAE brand turns traffic into qualified enquiries.",
    features: [
      "Conversion-led UX and mobile-first layouts",
      "Technical SEO foundations and structured content",
      "CMS, forms, and CRM-ready lead capture",
      "Performance, analytics, and ongoing optimisation",
      "Secure hosting-ready delivery and handover",
    ],
    technologies: ["React", "WordPress", "Next.js", "Tailwind", "Analytics"],
    color: "blue",
    deliveryTime: "Scoped to project",
    revisions: "Aligned to scope",
    popular: true,
    ctaLabel: "Build My Website",
    whatsappMessage:
      "Hey! I want a conversion-focused website for my UAE business — can we scope it?",
  },
  {
    icon: TrendingUp,
    title: "SEO & Lead Generation",
    tagline: "Rank on Google and capture high-intent demand",
    description:
      "Search visibility and paid demand work together: we help you show up where buyers search, then turn clicks into pipeline.",
    features: [
      "Keyword and competitor strategy for UAE markets",
      "On-page, technical SEO, and content alignment",
      "Google Business Profile and local presence",
      "Google Ads and landing-page alignment",
      "Reporting tied to leads—not vanity metrics",
    ],
    technologies: ["Google Ads", "GA4", "Search Console", "GBP", "Tracking"],
    color: "teal",
    deliveryTime: "Ongoing programmes",
    revisions: "Monthly optimisation",
    ctaLabel: "Get More Leads",
    whatsappMessage:
      "Hey! I want stronger SEO and lead generation for my business in the UAE — let's talk.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    tagline: "Premium mobile products your customers actually use",
    description:
      "Native and cross-platform apps with polished UX, reliable backends, and launch support—built for retention and revenue, not just downloads.",
    features: [
      "iOS & Android with product-grade UI/UX",
      "APIs, auth, and scalable architecture",
      "Push notifications and engagement loops",
      "Store submission and analytics instrumentation",
      "Post-launch support windows",
    ],
    technologies: ["React Native", "Swift", "Kotlin", "Firebase", "Node.js"],
    color: "purple",
    deliveryTime: "Phased delivery",
    revisions: "Design sprints",
    ctaLabel: "Launch My App",
    whatsappMessage:
      "Hey! I'm exploring a mobile app for my business — I'd like a premium build and roadmap.",
  },
  {
    icon: Mail,
    title: "Email Marketing & Automation",
    tagline: "Turn traffic into repeat buyers with email that sells",
    description:
      "High-converting email design, campaigns, and automated flows—Klaviyo-ready where you need ecommerce-grade lifecycle marketing.",
    features: [
      "Brand-aligned email design and templates",
      "Welcome, abandoned-cart, and nurture sequences",
      "Segmentation and automation logic",
      "Deliverability hygiene and testing",
      "Reporting on opens, clicks, and revenue signals",
    ],
    technologies: ["Klaviyo-ready", "Mailchimp", "HTML Email", "HubSpot", "Automations"],
    color: "rose",
    deliveryTime: "Campaign cycles",
    revisions: "Iterative tests",
    ctaLabel: "Start My Email Strategy",
    whatsappMessage:
      "Hey! I want email marketing and automation that drives repeat sales — can we plan it?",
  },
  {
    icon: Bot,
    title: "Business Automation & AI Systems",
    tagline: "Systems that save time and scale operations",
    description:
      "Workflow automation and AI-assisted tools that remove manual work, tighten follow-up, and give your team hours back every week.",
    features: [
      "Process mapping and automation blueprint",
      "CRM, WhatsApp, and lead routing workflows",
      "AI chatbots and knowledge assistants where fit",
      "Integrations across your stack",
      "Training and handover for your team",
    ],
    technologies: ["Zapier", "Make", "OpenAI", "APIs", "WhatsApp Business"],
    color: "emerald",
    deliveryTime: "Phased rollout",
    revisions: "Tuning cycles",
    ctaLabel: "Automate My Business",
    whatsappMessage:
      "Hey! I want to automate workflows and explore AI systems for my UAE business.",
  },
  {
    icon: Palette,
    title: "Logo & Brand Identity",
    tagline: "Trustworthy brand presentation that supports growth",
    description:
      "Strategic identity work—logo, palette, and guidelines—so every touchpoint looks credible, consistent, and ready for marketing scale.",
    features: [
      "Logo concepts aligned to positioning",
      "Colour, type, and usage guidelines",
      "Business collateral and social-ready assets",
      "Brand kit for web, ads, and email",
      "Export-ready files for vendors and teams",
    ],
    technologies: ["Figma", "Illustrator", "Photoshop", "Brand Systems"],
    color: "orange",
    deliveryTime: "Typ. 1–2 weeks",
    revisions: "Included rounds",
    ctaLabel: "Improve My Brand",
    whatsappMessage:
      "Hey! I want to elevate my brand identity for a more premium market presence.",
  },
];

const supportingServices = [
  {
    icon: Building2,
    title: "IT Systems & Office Setup",
    tagline: "Complete office technology your team can rely on",
    description:
      "We design and support business-grade IT: workstations, connectivity, peripherals, and responsive help—so laptops, desktops, and devices stay productive under one professional relationship.",
    features: [
      "Workstation and laptop setup for teams",
      "Wi‑Fi, routing, printers, and shared devices",
      "Performance upgrades, backups, and optimisation",
      "Troubleshooting and proactive maintenance",
      "Ongoing business tech support (incl. device repair paths)",
    ],
    technologies: ["Windows", "macOS", "Networking", "Microsoft 365", "Backups"],
    color: "zinc",
    deliveryTime: "Scheduled visits",
    revisions: "SLA-based",
    ctaLabel: "Set Up My Office",
    whatsappMessage:
      "Hey! I need IT systems and office setup support for my UAE business — what's the best approach?",
  },
  {
    icon: Settings,
    title: "Tech Installations",
    tagline: "Professional installs for business environments",
    description:
      "Structured setup for offices, retail, and hybrid workspaces—networks, security cameras, meeting tech, and smart peripherals—documented and maintained for teams.",
    features: [
      "Commercial Wi‑Fi and switching",
      "CCTV and access integrations",
      "Meeting-room AV and collaboration hardware",
      "Printers, scanners, and device provisioning",
      "Post-install verification and documentation",
    ],
    technologies: ["Ubiquiti", "UniFi", "IP Cameras", "VLANs", "Site surveys"],
    color: "indigo",
    deliveryTime: "Project-based",
    revisions: "Support window",
    ctaLabel: "Book Pro Install",
    whatsappMessage:
      "Hey! I need professional tech installation for my business premises — can you help?",
  },
  {
    icon: Home,
    title: "Smart Home Setup",
    tagline: "Premium residential automation (specialist add-on)",
    description:
      "For executives and premium residences: lighting, climate, security, and voice—installed cleanly with app control and handover you can trust.",
    features: [
      "Consultation, hardware selection, and commissioning",
      "Lighting, climate, and security integrations",
      "Voice assistants and unified mobile control",
      "Energy and comfort optimisation",
      "Training and aftercare",
    ],
    technologies: ["Home Assistant", "Alexa", "Google Home", "Zigbee", "Matter-ready"],
    color: "green",
    deliveryTime: "By property scope",
    revisions: "Fine-tuning",
    ctaLabel: "Plan My Smart Space",
    whatsappMessage:
      "Hey! I'm interested in premium smart home setup — can we discuss scope and options?",
  },
];

function openServiceWhatsApp(message) {
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
}

function ServiceCard({ service, index }) {
  const Icon = service.icon;
  const colors = colorClasses[service.color];

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={scaleIn}
      transition={{ delay: Math.min(index * 0.06, 0.36), duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card
        className={`relative group h-full transition-all duration-500 border bg-gray-800 ${colors.border} hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 transform`}
      >
        {service.popular && (
          <Badge className="absolute -top-3 left-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 border-0 z-10">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Core offer
          </Badge>
        )}

        <CardHeader className="pb-4 pt-2">
          <div className="flex items-start mb-4">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className={`w-8 h-8 ${colors.text}`} />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
          <p className={`text-sm font-medium ${colors.text} mb-3`}>{service.tagline}</p>

          <p className="text-gray-300 leading-relaxed mb-4">{service.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-300">Timeline: {service.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-gray-300">{service.revisions}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-0">
          <div>
            <h4 className="font-semibold text-white mb-3">What you get</h4>
            <ul className="space-y-2">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Stack & tools</h4>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, techIndex) => (
                <Badge key={techIndex} variant="outline" className={`text-xs ${colors.badge}`}>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            type="button"
            onClick={() => openServiceWhatsApp(service.whatsappMessage)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 group-hover:scale-[1.02] shadow-lg shadow-blue-500/20"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {service.ctaLabel}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Services() {
  return (
    <>
      <SEO
        title="Business Growth Services — Web, SEO, Apps & Automation | AxisMind UAE"
        description="AxisMind helps UAE businesses grow with conversion websites, SEO and lead generation, apps, email automation, AI workflows, brand identity, and professional IT systems."
        keywords="UAE digital agency, business growth Dubai, web development UAE, SEO services UAE, lead generation Dubai, email marketing UAE, business automation Dubai, IT office setup UAE"
        url="https://axismind.click/services"
      />

      <div className="bg-gray-900 text-white">
        <motion.section
          className="relative py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">UAE Business Growth Partner</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Technology That Grows
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Your Business
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              AxisMind builds end-to-end growth systems for UAE companies: high-converting websites, SEO and paid demand,
              apps, email marketing and automation, AI-enabled workflows, and dependable office IT—so marketing, sales,
              and operations work together.
            </p>
          </div>
        </motion.section>

        <section className="py-16 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="mb-12 max-w-3xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Growth &amp; revenue systems</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Core services designed to attract demand, convert customers, and compound results—aligned to how UAE
                businesses actually win online.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {coreServices.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="mb-12 max-w-3xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Office &amp; technical infrastructure</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Supporting services that keep teams productive—professional installs, business IT, and premium smart
                environments when your brand demands it.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {supportingServices.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 text-center bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl p-10 md:p-12 text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a custom growth roadmap?</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                Tell us your goals—we&apos;ll map the right mix of web, demand generation, automation, and IT so your
                business scales with clarity.
              </p>
              <Button
                type="button"
                size="lg"
                onClick={() =>
                  openServiceWhatsApp(
                    "Hey! I need a tailored growth and technology plan for my UAE business — can we strategise?"
                  )
                }
                className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Plan My Growth
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
