import { supabase } from "@/lib/supabaseClient";

const toLegacyShape = (row) => {
  if (!row) return row;
  return {
    ...row,
    created_date: row.created_date ?? row.created_at ?? null,
  };
};

const mapRows = (rows) => (rows ?? []).map(toLegacyShape);

const handleError = (error, context) => {
  if (error) {
    throw new Error(`${context}: ${error.message}`);
  }
};

export async function getPortfolioItems({ featured } = {}) {
  let query = supabase.from("Portfolio").select("*").order("created_at", { ascending: false });
  if (typeof featured === "boolean") {
    query = query.eq("featured", featured);
  }
  const { data, error } = await query;
  handleError(error, "Failed to fetch portfolio");
  return mapRows(data);
}

export async function getTestimonials({ featured } = {}) {
  let query = supabase.from("Testimonial").select("*").order("created_at", { ascending: false });
  if (typeof featured === "boolean") {
    query = query.eq("featured", featured);
  }
  const { data, error } = await query;
  handleError(error, "Failed to fetch testimonials");
  return mapRows(data);
}

export async function getTeamMembers({ limit } = {}) {
  let query = supabase.from("Team").select("*").order("order", { ascending: true });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  handleError(error, "Failed to fetch team");
  return mapRows(data);
}

export async function getSiteSettings() {
  const { data, error } = await supabase.from("SiteSettings").select("*");
  handleError(error, "Failed to fetch site settings");
  return mapRows(data);
}

export async function createContactSubmission(payload) {
  const { data, error } = await supabase.from("Contact").insert(payload).select("*").single();
  handleError(error, "Failed to submit contact form");
  return toLegacyShape(data);
}
