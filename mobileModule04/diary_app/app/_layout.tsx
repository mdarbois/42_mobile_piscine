import { Stack } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../utils/supabase";

export default function Layout() {
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(() => {});

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}