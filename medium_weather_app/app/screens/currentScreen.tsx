import { View, Text } from "react-native";
import { weatherCodeMap } from "../../utils/weatherCodes";

export default function CurrentScreen({
  location,
  weather,
  loading,
  error,
    }: any) {
    if (error) {
      return null;
    }
    if (loading) return <Text>Loading...</Text>;
    if (!weather?.current_weather) {
        return <Text>No data yet</Text>;
    }

  const current = weather.current_weather;
  const weatherLabel = weatherCodeMap[current.weathercode] || "Unknown";

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {location?.label}
      </Text>

      <Text style={{ fontSize: 40 }}>{current.temperature}°C</Text>

      <Text style={{ fontSize: 18 }}>
        {weatherLabel}
      </Text>

      <Text>Wind: {current.windspeed} km/h</Text>
    </View>
  );
}