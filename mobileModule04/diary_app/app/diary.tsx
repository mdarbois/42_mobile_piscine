import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDiary } from "../hooks/useDiary";
import { supabase } from "../utils/supabase";

export default function Diary() {
  const { entries, loading, createEntry, deleteEntry, reload } = useDiary();

  const [title, setTitle] = useState("");
  const [feeling, setFeeling] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("LOGOUT ERROR:", error);
      return;
    }

    setUser(null);
    router.replace("/");
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* LOGOUT */}
        {user && (
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: "#ef4444",
              padding: 10,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Log out
            </Text>
          </TouchableOpacity>
        )}

        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
          My Diary
        </Text>


        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={{
            backgroundColor: "#eee",
            padding: 10,
            borderRadius: 8,
            marginBottom: 8,
          }}
        />

        <TextInput
          placeholder="Feeling"
          value={feeling}
          onChangeText={setFeeling}
          style={{
            backgroundColor: "#eee",
            padding: 10,
            borderRadius: 8,
            marginBottom: 8,
          }}
        />

        <TextInput
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline
          style={{
            backgroundColor: "#eee",
            padding: 10,
            borderRadius: 8,
            height: 100,
            marginBottom: 12,
          }}
        />

        {/* CREATE */}
        <TouchableOpacity
          onPress={async () => {
            await createEntry(title, feeling, content);

            setTitle("");
            setFeeling("");
            setContent("");
          }}
          style={{
            backgroundColor: "#2563eb",
            padding: 12,
            borderRadius: 10,
            marginBottom: 16,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            + New Entry
          </Text>
        </TouchableOpacity>

        <FlatList
          data={entries}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 14,
                borderRadius: 10,
                backgroundColor: "#111827",
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => router.push(`/diary/${item.id}`)}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {item.title}
                </Text>
                <Text style={{ color: "#9ca3af" }}>{item.feeling}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteEntry(item.id)}
                style={{
                  marginTop: 10,
                  padding: 8,
                  backgroundColor: "red",
                  borderRadius: 6,
                  alignSelf: "flex-start",
                }}
              >
                <Text style={{ color: "white" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}