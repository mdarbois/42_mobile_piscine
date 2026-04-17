import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getEntryById } from "../../utils/diary";

export default function Entry() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [entry, setEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      const { data, error } = await getEntryById(id as string);

      if (error) {
        console.log("LOAD ENTRY ERROR:", error);
        setLoading(false);
        return;
      }

      setEntry(data);
      setLoading(false);
    };

    load();
  }, [id]);

  if (loading) return <Text>Loading...</Text>;
  if (!entry) return <Text>No entry found</Text>;

  return (
    <View style={{ padding: 16 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: "blue" }}>← Back</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 22 }}>{entry.title}</Text>
      <Text>{entry.feeling}</Text>
      <Text>{entry.content}</Text>
    </View>
  );
}