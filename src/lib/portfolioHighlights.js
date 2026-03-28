/**
 * Default outcome strips when admin leaves fields blank — keeps cards strong and consistent.
 */
const DEFAULT_HIGHLIGHTS = {
  web_design: {
    line1: "Web Platform • UAE Market",
    line2: "Conversion & Lead Capture Focus",
    line3: "Built to Turn Traffic Into Enquiries",
  },
  app_development: {
    line1: "Mobile Product • UAE Market",
    line2: "Retention & Performance Focus",
    line3: "Built for Scale & App Store Growth",
  },
  branding: {
    line1: "Brand System • UAE Market",
    line2: "Trust & Recognition Focus",
    line3: "Built for Premium Market Presence",
  },
  smart_home: {
    line1: "Smart Installation • UAE",
    line2: "Executive-grade Living Experience",
    line3: "Built for Reliability & Control",
  },
};

/**
 * @param {Record<string, unknown>} project — Portfolio row from Supabase
 * @returns {{ line1: string, line2: string, line3: string }}
 */
export function resolvePortfolioHighlights(project) {
  const cat = project?.category || "web_design";
  const base = DEFAULT_HIGHLIGHTS[cat] || DEFAULT_HIGHLIGHTS.web_design;

  const pick = (key) => {
    const v = project?.[key];
    if (typeof v !== "string") return null;
    const t = v.trim();
    return t.length ? t : null;
  };

  return {
    line1: pick("highlight_line1") ?? base.line1,
    line2: pick("highlight_line2") ?? base.line2,
    line3: pick("highlight_line3") ?? base.line3,
  };
}
