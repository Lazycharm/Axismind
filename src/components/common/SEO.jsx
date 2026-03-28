import { useEffect } from 'react';

export default function SEO({ 
  title = 'AxisMind — Technology & Digital Growth Agency UAE | Web, SEO, Apps & Automation',
  description = 'AxisMind is a UAE-based technology and digital growth agency. We help businesses grow through web development, SEO, Google Ads, mobile apps, and business automation. Serving Dubai, Abu Dhabi, Sharjah.',
  keywords = 'digital marketing agency UAE, web development Dubai, SEO services UAE, Google Ads UAE, mobile app development Dubai, business automation UAE, technology agency Dubai, IT solutions UAE, digital growth agency UAE',
  image = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  url = 'https://axismind.click',
  type = 'website'
}) {
  const siteTitle = title.includes('AxisMind') ? title : `${title} | AxisMind`;
  
  useEffect(() => {
    // Update document title
    document.title = siteTitle;
    
    // Helper function to set meta tag
    const setMetaTag = (name, content, property = false) => {
      if (!content) return;
      
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Primary Meta Tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('robots', 'index, follow');
    setMetaTag('language', 'English');
    setMetaTag('author', 'AxisMind');
    
    // Open Graph / Facebook
    setMetaTag('og:type', type, true);
    setMetaTag('og:url', url, true);
    setMetaTag('og:title', siteTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', image, true);
    setMetaTag('og:site_name', 'AxisMind', true);
    setMetaTag('og:locale', 'en_US', true);
    
    // Twitter
    setMetaTag('twitter:card', 'summary_large_image', true);
    setMetaTag('twitter:url', url, true);
    setMetaTag('twitter:title', siteTitle, true);
    setMetaTag('twitter:description', description, true);
    setMetaTag('twitter:image', image, true);
    
    // Geo Tags for UAE
    setMetaTag('geo.region', 'AE');
    setMetaTag('geo.placename', 'Dubai');
    setMetaTag('geo.position', '25.2048;55.2708');
    setMetaTag('ICBM', '25.2048, 55.2708');
    
    // Theme color
    setMetaTag('theme-color', '#f59e0b');
    
    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
    
    // Structured Data for Local Business
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "name": "AxisMind — Technology & Digital Growth Agency UAE",
      "image": image,
      "url": "https://axismind.click",
      "telephone": "+971569520569",
      "email": "info@axismind.click",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AE",
        "addressRegion": "Dubai"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "25.2048",
        "longitude": "55.2708"
      },
      "areaServed": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Al Ain", "Ras Al Khaimah", "UAE"],
      "description": "Technology & Digital Growth Agency helping UAE businesses grow through web development, SEO, Google Ads, mobile apps, and AI-powered business automation.",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "50"
      },
      "sameAs": [
        "https://www.instagram.com/axismind",
        "https://www.linkedin.com/company/axismind"
      ]
    });
  }, [siteTitle, description, keywords, image, url, type]);
  
  return null;
}