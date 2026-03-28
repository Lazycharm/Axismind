-- Dummy testimonials for AxisMind (UAE-focused). Run in Supabase SQL Editor once.
-- Safe to re-run only if you clear duplicates first, or use ON CONFLICT — this file uses plain INSERT.

insert into "Testimonial" (name, position, image_url, rating, text, project, date, featured)
values
  (
    'Sarah Al-Mansoori',
    'Founder, Bloom Retail DXB',
    null,
    5,
    'AxisMind rebuilt our e-commerce flow end-to-end. Traffic is up and checkout friction is down—we finally see consistent orders from Google and Instagram.',
    'E-commerce website & SEO',
    '2025',
    true
  ),
  (
    'James Mitchell',
    'Operations Director, Gulf Logistics Partners',
    null,
    5,
    'Professional, fast, and clear on scope. They automated our lead follow-up and connected WhatsApp to our CRM—our team saves hours every week.',
    'Business automation & integrations',
    '2025',
    true
  ),
  (
    'Fatima Al Zaabi',
    'Marketing Lead, Emirates Wellness Clinic',
    null,
    5,
    'Our new site looks premium and loads fast. Patients find us easily on Maps and the contact funnel actually works. Highly recommend for healthcare brands in the UAE.',
    'Web design & local SEO',
    '2024',
    true
  ),
  (
    'Omar Haddad',
    'CEO, Nexus Fintech Advisory',
    null,
    5,
    'They didn’t just “build an app”—they thought about onboarding, security, and how we scale. Launch was smooth and the handover documentation was excellent.',
    'Mobile app development',
    '2024',
    false
  ),
  (
    'Priya Nair',
    'Brand Manager, Desert Bloom Cosmetics',
    null,
    5,
    'Logo, packaging direction, and social templates—all cohesive. Our retail partners noticed the upgrade immediately.',
    'Brand identity & guidelines',
    '2024',
    false
  ),
  (
    'Khalid Rahman',
    'IT Manager, Al Noor Office Group',
    null,
    5,
    'Office Wi‑Fi, printers, and workstation setup done in one coordinated visit. Support tickets dropped because things were done right the first time.',
    'IT systems & office setup',
    '2025',
    false
  ),
  (
    'Elena Volkov',
    'Property Manager, Marina View Residences',
    null,
    5,
    'Smart lighting and access integration with a clean handover. Residents love the app control and we have fewer maintenance callbacks.',
    'Smart home consultation & install',
    '2023',
    false
  ),
  (
    'Marcus Chen',
    'Head of Growth, StudyPath Institute',
    null,
    5,
    'Email flows and landing pages finally match our campaigns. We’re seeing better open rates and more qualified demo requests from the UAE and GCC.',
    'Email marketing & automation',
    '2025',
    false
  );
