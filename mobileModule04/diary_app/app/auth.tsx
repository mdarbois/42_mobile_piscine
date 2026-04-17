import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../utils/auth";

export default function AuthScreen() {
  const loginGoogle = async () => {
    await auth.loginGoogle();
  };

  const loginGithub = async () => {
    await auth.loginGithub();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>
          Login to continue diary demo
        </Text>

        <TouchableOpacity
          style={[styles.button]}
          onPress={loginGoogle}
          activeOpacity={0.8}
        >
          <Text style={styles.icon}>🔵</Text>
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button]}
          onPress={loginGithub}
          activeOpacity={0.8}
        >
          <Text style={styles.icon}>🐙</Text>
          <Text style={styles.buttonText}>Continue with GitHub</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#111827",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 24,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
});