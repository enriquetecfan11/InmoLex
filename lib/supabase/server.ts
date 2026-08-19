import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL!;
}

function getPublishableKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
}

const noSessionAuth = {
  persistSession: false,
  autoRefreshToken: false,
  detectSessionInUrl: false,
} as const;

/** Cookie-less client for public catalog reads. Does not touch Auth. */
export function createSupabasePublicClient() {
  return createClient(getSupabaseUrl(), getPublishableKey(), {
    auth: noSessionAuth,
  });
}

/** Cookie-based client for admin session, Server Actions, and Route Handlers. */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(getSupabaseUrl(), getPublishableKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll from a Server Component can be ignored; Proxy/middleware
          // refreshes the session on /admin requests.
        }
      },
    },
  });
}

/** Service-role client for privileged storage uploads. Never expose to the browser. */
export function createSupabaseServiceClient() {
  return createClient(getSupabaseUrl(), process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: noSessionAuth,
  });
}

export async function getAdminClaims() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return null;
  }

  return data.claims;
}
