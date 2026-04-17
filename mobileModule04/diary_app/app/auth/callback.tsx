import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { supabase } from "../../utils/supabase";

export default function Callback() {
  useEffect(() => {
    supabase.auth.getSession().then(() => {
      router.replace("/diary");
    });
  }, []);
  return (
    <View>
      <Text>Signing you in...</Text>
    </View>
  );
}