import { supabase } from "@/lib/supabaseClient";
import { createContactSubmission } from "@/services/contentService";

const TABLE_MAP = {
  Portfolio: "Portfolio",
  Testimonial: "Testimonial",
  Contact: "Contact",
  Team: "Team",
  SiteSettings: "SiteSettings",
  User: "User",
};

const toLegacy = (row) => {
  if (!row) return row;
  return {
    ...row,
    created_date: row.created_date ?? row.created_at ?? null,
  };
};

const mapRows = (rows) => (rows ?? []).map(toLegacy);

const normalizeSort = (orderBy) => {
  if (!orderBy) return { column: "created_at", ascending: false };
  const descending = orderBy.startsWith("-");
  const clean = descending ? orderBy.slice(1) : orderBy;
  const column = clean === "created_date" ? "created_at" : clean;
  return { column, ascending: !descending };
};

const getTableName = (entity) => TABLE_MAP[entity] ?? entity;

const fetchUserProfile = async (authUser) => {
  const candidates = ["User", "users", "profiles"];
  for (const table of candidates) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", authUser.id)
      .maybeSingle();
    if (!error && data) {
      return data;
    }
  }
  return null;
};

const entityApi = (entityName) => ({
  list: async (orderBy, limit) => {
    const table = getTableName(entityName);
    const { column, ascending } = normalizeSort(orderBy);
    let query = supabase.from(table).select("*").order(column, { ascending });
    if (typeof limit === "number") {
      query = query.limit(limit);
    }
    const { data, error } = await query;
    if (error) throw error;
    return mapRows(data);
  },
  filter: async (where = {}) => {
    const table = getTableName(entityName);
    let query = supabase.from(table).select("*");
    Object.entries(where).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    const { data, error } = await query;
    if (error) throw error;
    return mapRows(data);
  },
  create: async (payload) => {
    const table = getTableName(entityName);
    const { data, error } = await supabase.from(table).insert(payload).select("*").single();
    if (error) throw error;
    return toLegacy(data);
  },
  update: async (id, payload) => {
    const table = getTableName(entityName);
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return toLegacy(data);
  },
  delete: async (id) => {
    const table = getTableName(entityName);
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;
    return true;
  },
});

export const backend = {
  entities: {
    Portfolio: entityApi("Portfolio"),
    Testimonial: entityApi("Testimonial"),
    Contact: entityApi("Contact"),
    Team: entityApi("Team"),
    SiteSettings: entityApi("SiteSettings"),
    User: entityApi("User"),
  },
  auth: {
    signInWithPassword: async ({ email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    },
    me: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        throw error ?? new Error("Not authenticated");
      }

      const profile = await fetchUserProfile(data.user);
      return {
        id: data.user.id,
        email: data.user.email,
        full_name:
          profile?.full_name ??
          data.user.user_metadata?.full_name ??
          data.user.user_metadata?.name ??
          null,
        role: profile?.role ?? "user",
      };
    },
    logout: async (redirectTo) => {
      await supabase.auth.signOut();
      if (redirectTo) {
        window.location.href = redirectTo;
      }
    },
    redirectToLogin: (returnTo = window.location.pathname) => {
      const target = returnTo || "/Admin";
      window.location.href = `/login?redirect=${encodeURIComponent(target)}`;
    },
  },
  users: {
    inviteUser: async (email, role) => {
      const { error } = await supabase.functions.invoke("invite-user", {
        body: { email, role },
      });
      if (error) throw error;
    },
  },
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        const ext = file.name.split(".").pop() ?? "bin";
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const path = `uploads/${fileName}`;
        const { error } = await supabase.storage.from("uploads").upload(path, file, {
          upsert: true,
        });
        if (error) throw error;
        const { data } = supabase.storage.from("uploads").getPublicUrl(path);
        return { file_url: data.publicUrl };
      },
    },
  },
  appLogs: {
    logUserInApp: async (pageName) => {
      await supabase.from("app_logs").insert({ page_name: pageName }).throwOnError();
    },
  },
  post: async (path, payload) => {
    if (path === "/contact") {
      return createContactSubmission(payload);
    }
    throw new Error(`Unsupported API path: ${path}`);
  },
};
