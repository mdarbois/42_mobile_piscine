import { supabase } from "./supabase";

export const getEntries = async (userId: string) => {
  return supabase
    .from("diary_entries")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });
};

export const createEntry = async (entry: any) => {
  return supabase.from("diary_entries").insert(entry);
};

export const deleteEntry = async (id: string) => {
  return supabase.from("diary_entries").delete().eq("id", id);
};

export const getEntryById = async (id: string) => {
  return supabase
    .from("diary_entries")
    .select("*")
    .eq("id", id)
    .single();
};