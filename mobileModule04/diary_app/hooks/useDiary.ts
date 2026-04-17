import { useEffect, useState } from "react";
import { createEntry, deleteEntry, getEntries } from "../utils/diary";
import { supabase } from "../utils/supabase";

export function useDiary() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  };

  const loadEntries = async () => {
    setLoading(true);

    const user = await getUser();
    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }

    const { data, error } = await getEntries(user.id);

    if (error) {
      console.log("LOAD ERROR:", error);
      setLoading(false);
      return;
    }

    setEntries(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const create = async (title: string, feeling: string, content: string) => {
    const user = await getUser();
    if (!user) return;

    const { error } = await createEntry({
      user_id: user.id,
      user_email: user.email!,
      title,
      feeling,
      content,
      date: new Date().toISOString(),
    });

    if (error) {
      console.log("CREATE ERROR:", error);
      return;
    }

    await loadEntries();
  };

  const remove = async (id: string) => {
    const { error } = await deleteEntry(id);

    if (error) {
      console.log("DELETE ERROR:", error);
      return;
    }

    await loadEntries();
  };

  return {
    entries,
    loading,
    createEntry: create,
    deleteEntry: remove,
    reload: loadEntries,
  };
}