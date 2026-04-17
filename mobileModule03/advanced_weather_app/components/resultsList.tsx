import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { City } from "../utils/types";

export default function ResultsList({ results, loading, onSelect }: any) {
  if (!loading && (!results || results.length === 0)) {
    return null;
  }
  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}

      <FlatList
        data={results}
        keyExtractor={(item: City) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item)}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
                gap: 10,
              }}
            >
              <Ionicons name="location-outline" size={20} color="#555" />

              <View>
                <Text style={{ fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text style={{ color: "#666" }}>
                  {item.admin1}, {item.country}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = {
  container: {
    margin: 10,
    maxHeight: 200,

    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 12,
    padding: 10,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },

  title: {
    fontWeight: "bold",
    color: "#111",
  },

  subtitle: {
    color: "#666",
  },
};