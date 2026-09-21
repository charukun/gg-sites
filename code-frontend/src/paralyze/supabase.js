import { createClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_PARALYZE_SUPABASE_URL || 'https://jfaeqbyxsolqnrhbnrnt.supabase.co';
const publishableKey = process.env.REACT_APP_PARALYZE_SUPABASE_KEY || 'sb_publishable_-kbKJK19xIG6NHKm69UAOg_eD-WbUvH';

export const supabase = createClient(url, publishableKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});
