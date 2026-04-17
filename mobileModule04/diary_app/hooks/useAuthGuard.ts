import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export function useAuthGuard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      await supabase.auth.getSession();
      setLoading(false);
    };

    checkUser();
  }, []);

  return loading;
}