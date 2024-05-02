import { createClient } from "@supabase/supabase-js";
const options = {
  // schema: 'public',
  // headers: { 'x-my-custom-header': 'my-app-name' },
  // autoRefreshToken: true,
  // persistSession: true,
  // detectSessionInUrl: true
};
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANONPUBLIC,
  options
);

export { supabase };