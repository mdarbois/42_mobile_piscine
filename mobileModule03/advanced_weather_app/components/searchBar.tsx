import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function SearchBar({ input, setInput, onSubmit, onGeo }: any) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Search locations</Text>

      <View style={styles.topBar}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#888" />

          <TextInput
            value={input}
            placeholder="City, country..."
            placeholderTextColor="#999"
            style={styles.input}
            onChangeText={setInput}
            onSubmitEditing={onSubmit}
            returnKeyType="search"
          />
        </View>

        <TouchableOpacity style={styles.geoBtn} onPress={onGeo}>
          <Ionicons name="navigate" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#6200ee",
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 10,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    height: 42,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    color: "#000",
    fontSize: 14,
  },

  geoBtn: {
    marginLeft: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#4a00c8",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
});