import { useEffect } from "react";
import { supabase } from "./supabase";
import { router } from "expo-router";

export function useAuthListener() {
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          router.replace("/diary");
        } else {
          router.replace("/auth");
        }
      }
    );

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);
}