import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { getWeatherIcon, weatherCodeMap } from "../../utils/weatherCodes";

export default function CurrentScreen({
  location,
  weather,
  loading,
  error,
}: any) {
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Error</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }

  if (!weather?.current_weather) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>No data yet</Text>
      </View>
    );
  }

  const current = weather.current_weather;
  const weatherCode = current.weathercode;

  const weatherLabel = weatherCodeMap[weatherCode] || "Unknown";

  const iconName = getWeatherIcon(weatherCode);

  return (
    <View style={styles.container}>
      
      <Text style={styles.city}>
        {location?.city?.name || location?.label}
      </Text>

      <Text style={styles.region}>
        {location?.city
          ? `${location.city.admin1}, ${location.city.country}`
          : ""}
      </Text>

      <Text style={styles.temp}>
        {current.temperature}°C
      </Text>

      <View style={styles.weatherRow}>
        <Ionicons name={iconName} size={48} color="#fff" />
        <Text style={styles.weatherText}>
          {weatherLabel}
        </Text>
      </View>

      <View style={styles.windRow}>
        <Ionicons name="leaf" size={18} color="#fff" />
        <Text style={styles.windText}>
          {current.windspeed} km/h wind
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent",
  },

  city: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  region: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 20,
    textAlign: "center",
  },

  temp: {
    fontSize: 64,
    fontWeight: "200",
    color: "#fff",
    marginVertical: 10,
  },

  weatherRow: {
    alignItems: "center",
    marginTop: 10,
  },

  weatherText: {
    fontSize: 18,
    color: "#fff",
    marginTop: 6,
  },

  windRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 6,
  },

  windText: {
    color: "#fff",
    fontSize: 14,
  },
});