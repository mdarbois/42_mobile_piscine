import { Stack } from "expo-router";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
  <>
    <ImageBackground
      source={require("../assets/images/sky-background.jpg")}
      style={styles.background}
      resizeMode="cover"
      >
      <View style={styles.overlay} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#9e1c1c2f" },
          presentation: "transparentModal",
        }}
        />
    </ImageBackground>
  </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(0,0,0,0.3)",
  },
});