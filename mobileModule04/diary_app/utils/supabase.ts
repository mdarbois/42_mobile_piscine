import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bdtspxtsshlqifrkdgwi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdHNweHRzc2hscWlmcmtkZ3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDI2MzUsImV4cCI6MjA5MTkxODYzNX0.BHRWRxv4zT2EuF_jFVJBFngN31HI-wwkiGQvBl5SoZQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});